"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleCard } from "@/components/style-card";
import { StyleCardSkeleton } from "@/components/style-card-skeleton";
import { homeExploreFallbackPage } from "@/lib/catalog/explore-pages";
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

/** Soft cap for auto-appended home feed cards (SSR page + AUTO_FETCH_PAGES). */
const AUTO_FETCH_PAGES = 2;

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
  const [loading, setLoading] = useState(false);
  const [autoFetches, setAutoFetches] = useState(0);
  // While slots fill, floor min-height so batch commits cannot collapse trust /
  // load-more / newsletter (R1 / N-19). Reserve remaining slots × measured
  // card height only — then release to natural content once the last batch
  // lands so we do not leave a blank band above "Load more" (N-24).
  const [gridMinHeight, setGridMinHeight] = useState<number | undefined>(undefined);
  const inFlight = useRef(false);
  const page2Cache = useRef<StyleCardData[] | null>(null);
  const page2Handled = useRef(false);
  const heightLocked = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shown = initialCount + extraStyles.length;
  const hasMore = shown < total;
  const autoDone = autoFetches >= AUTO_FETCH_PAGES || shown >= softCap || !hasMore;
  const exploreFallbackPage = homeExploreFallbackPage(shown);
  // Reserve aspect-ratio slots only while auto-fetch can still deliver cards.
  // Once the soft cap / last batch is done, drop skeletons so min-height cannot
  // keep ratcheting from empty reserved rows (N-19 @ 390).
  const remainingSlots = Math.max(0, softCap - shown);
  const skeletons = autoDone ? 0 : remainingSlots;

  useLayoutEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    if (autoDone) {
      // N-24: measure with min-height cleared so a prior soft-cap floor cannot
      // inflate the lock and leave a blank band above "Load more styles".
      if (heightLocked.current) return;
      const height = measureMasonryContentHeight(node);
      if (height <= 0) return;
      heightLocked.current = true;
      setGridMinHeight(height);
      return;
    }

    const measured = Math.ceil(node.getBoundingClientRect().height);
    const reserved = reserveMasonryHeight(node, remainingSlots) ?? 0;
    const next = Math.max(measured, reserved);
    if (next <= 0) return;
    setGridMinHeight((prev) => Math.max(prev ?? 0, next));
  }, [extraStyles.length, skeletons, autoDone, remainingSlots]);

  function commitPage(page: number, styles: StyleCardData[]) {
    setExtraStyles((prev) => mergeUnique(prev, styles));
    setNextPage(page + 1);
    setAutoFetches((n) => n + 1);
  }

  async function fetchPage(page: number) {
    if (inFlight.current || loading) return;

    if (page === 2 && page2Cache.current) {
      const cached = page2Cache.current;
      page2Cache.current = null;
      page2Handled.current = true;
      commitPage(2, cached);
      return;
    }

    inFlight.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/home/explore?page=${page}`);
      if (!res.ok) return;
      const data = (await res.json()) as { styles?: StyleCardData[] };
      const styles = Array.isArray(data.styles) ? data.styles : [];
      if (page === 2) page2Handled.current = true;
      commitPage(page, styles);
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }

  // Fetch page 2 while idle and commit as soon as it arrives (layout already
  // reserved). Waiting for the sentinel left mobile on blur skeletons too long.
  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled || page2Handled.current || inFlight.current) return;
      inFlight.current = true;
      void (async () => {
        try {
          const res = await fetch("/api/home/explore?page=2");
          if (!res.ok || cancelled) return;
          const data = (await res.json()) as { styles?: StyleCardData[] };
          const styles = Array.isArray(data.styles) ? data.styles : [];
          if (cancelled || styles.length === 0) return;
          page2Handled.current = true;
          page2Cache.current = null;
          commitPage(2, styles);
        } catch {
          /* network blips — sentinel fetch will retry */
        } finally {
          inFlight.current = false;
        }
      })();
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
  }, []);


  useEffect(() => {
    if (autoDone) return;
    const node = sentinelRef.current;
    if (!node) return;

    const fetchIo = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || inFlight.current) return;
        void fetchPage(nextPage);
      },
      // Start the next batch ~1–1.5 viewports early so mobile never hits empty
      // skeletons while waiting on /api/home/explore.
      { rootMargin: "1400px 0px" },
    );
    fetchIo.observe(node);

    return () => {
      fetchIo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- IO rebinds when next page / auto state changes
  }, [autoDone, nextPage, pageSize]);

  return (
    <>
      <div
        ref={gridRef}
        className="home-masonry home-masonry-extra"
        aria-busy={skeletons > 0 || undefined}
        style={gridMinHeight ? { minHeight: gridMinHeight } : undefined}
      >
        {extraStyles.map((style) => (
          <StyleCard key={style.id} style={style} variant="masonry" />
        ))}
        {Array.from({ length: skeletons }, (_, index) => (
          <StyleCardSkeleton
            key={`home-pending-${index}`}
            variant="masonry"
            index={extraStyles.length + index}
          />
        ))}
      </div>
      <div ref={sentinelRef} className="home-load-more" aria-live="polite">
        {hasMore ? (
          <Link href={`/explore?page=${exploreFallbackPage}`}>Load more styles</Link>
        ) : null}
        <span>
          Showing {Math.min(shown, total)} of {total}
          {loading ? " · loading…" : ""}
        </span>
      </div>
    </>
  );
}
