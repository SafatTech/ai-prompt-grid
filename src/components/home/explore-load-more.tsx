"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleCardRailClient } from "@/components/style-card-rail-client";
import { StyleCardSkeleton } from "@/components/style-card-skeleton";
import type { StyleCardData } from "@/lib/catalog/style-card-data";
import {
  measureMasonryContentHeight,
  reserveMasonryHeight,
} from "@/lib/home/masonry-reserve";

type Props = {
  initialCount: number;
  total: number;
  pageSize: number;
};

/** Maximum number of styles expanded in-place after the first user click. */
const HOME_MASONRY_SOFT_CAP = 100;

/** Hide stuck placeholders even if a fetch hangs (N-25 intermittent). */
const PENDING_GUARD_MS = 1500;

function softCapFor(total: number) {
  return Math.min(total, HOME_MASONRY_SOFT_CAP);
}

function mergeUnique(
  prev: StyleCardData[],
  styles: StyleCardData[],
): StyleCardData[] {
  const seen = new Set(prev.map((style) => style.id));
  const merged = [...prev];
  for (const style of styles) {
    if (seen.has(style.id)) continue;
    seen.add(style.id);
    merged.push(style);
  }
  return merged;
}

export function ExploreLoadMore({ initialCount, total, pageSize }: Props) {
  const softCap = softCapFor(total);
  const [extraStyles, setExtraStyles] = useState<StyleCardData[]>([]);
  const [nextPage, setNextPage] = useState(2);
  const [expansionRequested, setExpansionRequested] = useState(false);
  /** True only while a real network fetch is in flight. */
  const [pending, setPending] = useState(false);
  // While slots fill, floor min-height so batch commits cannot collapse trust /
  // load-more / newsletter (R1 / N-19). Reserve remaining slots × measured
  // card height only — then release to natural content once the last batch
  // lands so we do not leave a blank band above "Load more" (N-24).
  const [gridMinHeight, setGridMinHeight] = useState<number | undefined>(undefined);
  const inFlight = useRef(false);
  const heightLocked = useRef(false);
  const nextPageRef = useRef(nextPage);
  const gridRef = useRef<HTMLDivElement>(null);
  const shown = initialCount + extraStyles.length;
  const hasMore = shown < total;
  const expansionDone = shown >= softCap || !hasMore;
  const remainingSlots = Math.max(0, softCap - shown);
  // Pending rail is outside the CSS multi-column grid and only appears after
  // the user requests the on-home expansion.
  const skeletons =
    !expansionRequested || expansionDone || !pending
      ? 0
      : Math.min(pageSize, Math.max(remainingSlots, 1));

  useEffect(() => {
    nextPageRef.current = nextPage;
  }, [nextPage]);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    if (!expansionRequested) {
      heightLocked.current = false;
      return;
    }

    if (expansionDone) {
      if (heightLocked.current) return;
      const height = measureMasonryContentHeight(grid);
      if (height <= 0) return;
      heightLocked.current = true;
      setGridMinHeight(height);
      return;
    }

    const measured = Math.ceil(grid.getBoundingClientRect().height);
    const reserved = reserveMasonryHeight(grid, remainingSlots) ?? 0;
    const next = Math.max(measured, reserved);
    if (next <= 0) return;
    setGridMinHeight((prev) => Math.max(prev ?? 0, next));
  }, [
    expansionDone,
    expansionRequested,
    extraStyles.length,
    remainingSlots,
    skeletons,
  ]);

  function commitPage(page: number, styles: StyleCardData[]) {
    setExtraStyles((prev) => mergeUnique(prev, styles));
    setNextPage(page + 1);
  }

  async function loadNext() {
    if (inFlight.current || !expansionRequested || expansionDone) return;
    const page = nextPageRef.current;
    if (page < 2) return;

    inFlight.current = true;
    setPending(true);
    let committed = false;
    try {
      const res = await fetch(
        `/api/home/explore?page=${page}&pageSize=${pageSize}`,
      );
      if (!res.ok) return;
      const data = (await res.json()) as { styles?: StyleCardData[] };
      const styles = Array.isArray(data.styles)
        ? data.styles.slice(0, remainingSlots)
        : [];
      if (styles.length > 0) {
        committed = true;
        commitPage(page, styles);
      }
    } catch {
      /* Restore the expansion button so the user can retry. */
    } finally {
      inFlight.current = false;
      setPending(false);
      if (!committed) {
        heightLocked.current = false;
        setGridMinHeight(undefined);
        setExpansionRequested(false);
      }
    }
  }

  // A single user action drives sequential pages until the on-home cap. There
  // is intentionally no idle or intersection-observer auto-fetch.
  useEffect(() => {
    if (
      !expansionRequested ||
      expansionDone ||
      remainingSlots === 0 ||
      inFlight.current
    ) {
      return;
    }
    void loadNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- continue only after click/page commit
  }, [
    expansionDone,
    expansionRequested,
    extraStyles.length,
    nextPage,
    remainingSlots,
  ]);

  // Guard: never leave grey placeholders up longer than PENDING_GUARD_MS.
  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => {
      setPending(false);
    }, PENDING_GUARD_MS);
    return () => window.clearTimeout(timer);
  }, [pending]);

  return (
    <>
      <div
        id="home-masonry-expansion"
        className="home-masonry-extra-wrap"
        aria-busy={pending || undefined}
        style={gridMinHeight ? { minHeight: gridMinHeight } : undefined}
      >
        <div ref={gridRef} className="home-masonry home-masonry-extra">
          {extraStyles.map((style) => (
            <StyleCardRailClient
              key={style.id}
              style={style}
              variant="masonry"
              /* Extras never eager/priority — layout-aware IO in media island. */
            />
          ))}
        </div>
        {skeletons > 0 ? (
          <div
            className="home-masonry-pending"
            data-testid="home-masonry-pending"
          >
            {Array.from({ length: skeletons }, (_, index) => (
              <StyleCardSkeleton
                key={`home-pending-${index}`}
                variant="masonry"
                index={extraStyles.length + index}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div className="home-load-more" aria-live="polite">
        {hasMore && !expansionDone ? (
          <button
            type="button"
            className="home-load-more-btn"
            aria-controls="home-masonry-expansion"
            disabled={expansionRequested}
            onClick={() => setExpansionRequested(true)}
          >
            {expansionRequested ? "Loading styles…" : "Load more styles"}
          </button>
        ) : total > 0 ? (
          <Link href={hasMore ? `/explore?offset=${shown}` : "/explore"}>
            Explore styles
          </Link>
        ) : null}
        <span>
          Showing {Math.min(shown, total)} of {total}
          {pending ? " · loading…" : ""}
        </span>
      </div>
    </>
  );
}
