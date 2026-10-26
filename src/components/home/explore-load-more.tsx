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

/** Soft cap for auto-appended home feed cards (SSR page + AUTO_FETCH_PAGES).
 *  One append page adds another five desktop masonry rows. */
const AUTO_FETCH_PAGES = 1;

/** Hide stuck placeholders even if a fetch hangs (N-25 intermittent). */
const PENDING_GUARD_MS = 1500;

function softCapFor(initialCount: number, total: number, pageSize: number) {
  return Math.min(total, initialCount + AUTO_FETCH_PAGES * pageSize);
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
  const softCap = softCapFor(initialCount, total, pageSize);
  const [extraStyles, setExtraStyles] = useState<StyleCardData[]>([]);
  const [nextPage, setNextPage] = useState(2);
  /** True only while a real network fetch is in flight — never from queued IO. */
  const [pending, setPending] = useState(false);
  const [autoFetches, setAutoFetches] = useState(0);
  // While slots fill, floor min-height so batch commits cannot collapse trust /
  // load-more / newsletter (R1 / N-19). Reserve remaining slots × measured
  // card height only — then release to natural content once the last batch
  // lands so we do not leave a blank band above "Load more" (N-24).
  const [gridMinHeight, setGridMinHeight] = useState<number | undefined>(undefined);
  const inFlight = useRef(false);
  const page2Handled = useRef(false);
  const heightLocked = useRef(false);
  const nextPageRef = useRef(nextPage);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<HTMLDivElement>(null);
  const shown = initialCount + extraStyles.length;
  const hasMore = shown < total;
  const autoDone = autoFetches >= AUTO_FETCH_PAGES || shown >= softCap || !hasMore;
  const remainingSlots = Math.max(0, softCap - shown);
  // N-25: pending rail only while a fetch is actually running — never from a
  // queued/idle arm, and never inside the CSS multi-column grid.
  const skeletons =
    autoDone || !pending ? 0 : Math.min(pageSize, Math.max(remainingSlots, 1));

  useEffect(() => {
    nextPageRef.current = nextPage;
  }, [nextPage]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const grid = gridRef.current;
    if (!wrap || !grid) return;

    if (autoDone) {
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
  }, [extraStyles.length, skeletons, autoDone, remainingSlots]);

  function commitPage(page: number, styles: StyleCardData[]) {
    setExtraStyles((prev) => mergeUnique(prev, styles));
    setNextPage(page + 1);
    setAutoFetches((n) => n + 1);
  }

  async function loadNext() {
    if (inFlight.current || autoDone) return;
    const page = nextPageRef.current;
    if (page < 2) return;

    inFlight.current = true;
    setPending(true);
    try {
      const res = await fetch(
        `/api/home/explore?page=${page}&pageSize=${pageSize}`,
      );
      if (!res.ok) return;
      const data = (await res.json()) as { styles?: StyleCardData[] };
      const styles = Array.isArray(data.styles) ? data.styles : [];
      if (page === 2) page2Handled.current = true;
      if (styles.length > 0) commitPage(page, styles);
    } catch {
      /* sentinel / visible-skeleton retry */
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  // Idle page-2 prefetch — pending flips only when the real fetch starts.
  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled || page2Handled.current || inFlight.current) return;
      void loadNext();
    };

    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(run, { timeout: 1200 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(run, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only idle arm
  }, []);

  useEffect(() => {
    if (autoDone) return;
    const node = sentinelRef.current;
    if (!node) return;

    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const tryFetch = () => {
      if (cancelled || inFlight.current) return;
      void loadNext();
    };

    const fetchIo = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        if (inFlight.current) {
          if (retryTimer !== undefined) clearTimeout(retryTimer);
          retryTimer = setTimeout(tryFetch, 200);
          return;
        }
        tryFetch();
      },
      { rootMargin: "2400px 0px" },
    );
    fetchIo.observe(node);

    return () => {
      cancelled = true;
      fetchIo.disconnect();
      if (retryTimer !== undefined) clearTimeout(retryTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- IO rebinds when next page / auto state changes
  }, [autoDone, nextPage, pageSize]);

  // After each commit, if more auto pages remain and the sentinel is near, keep
  // fetching without requiring a scroll.
  useEffect(() => {
    if (autoDone || remainingSlots === 0 || inFlight.current) return;
    const node = sentinelRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const viewportH = window.innerHeight || 0;
    if (rect.top <= viewportH + 2400) {
      void loadNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional after batch commits
  }, [extraStyles.length, autoDone, remainingSlots, nextPage]);

  // N-25: if placeholders are visible and nothing is in flight, load immediately.
  useEffect(() => {
    if (autoDone || !pending || inFlight.current) return;
    const root = pendingRef.current;
    if (!root) return;

    const visible = [...root.querySelectorAll('[data-testid="style-card-skeleton"]')].some(
      (node) => {
        const rect = (node as HTMLElement).getBoundingClientRect();
        const vh = window.innerHeight || 0;
        return rect.bottom > 0 && rect.top < vh && rect.width > 0;
      },
    );
    if (visible && !inFlight.current) {
      void loadNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-check when pending rail mounts
  }, [autoDone, pending, skeletons, nextPage]);

  // Visible-skeleton safety net while a fetch is marked pending.
  useEffect(() => {
    if (autoDone || skeletons === 0) return;
    const root = pendingRef.current;
    if (!root) return;

    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const tryFetch = () => {
      if (cancelled || inFlight.current) return;
      void loadNext();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (inFlight.current) {
          if (retryTimer !== undefined) clearTimeout(retryTimer);
          retryTimer = setTimeout(tryFetch, 200);
          return;
        }
        tryFetch();
      },
      { rootMargin: "200px 0px" },
    );

    const nodes = root.querySelectorAll('[data-testid="style-card-skeleton"]');
    if (nodes.length === 0) io.observe(root);
    else nodes.forEach((node) => io.observe(node));

    return () => {
      cancelled = true;
      io.disconnect();
      if (retryTimer !== undefined) clearTimeout(retryTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDone, skeletons, nextPage, pending]);

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
        ref={wrapRef}
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
            ref={pendingRef}
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
      <div ref={sentinelRef} className="home-load-more" aria-live="polite">
        {hasMore ? (
          /* N-27: page=ceil(shown/18)+1 skipped cards; continue from offset. */
          <Link href={`/explore?offset=${shown}`}>Load more styles</Link>
        ) : null}
        <span>
          Showing {Math.min(shown, total)} of {total}
          {pending ? " · loading…" : ""}
        </span>
      </div>
    </>
  );
}
