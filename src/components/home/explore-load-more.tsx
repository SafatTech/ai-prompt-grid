"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleCard } from "@/components/style-card";
import { StyleCardSkeleton } from "@/components/style-card-skeleton";
import { homeExploreFallbackPage } from "@/lib/catalog/explore-pages";
import type { StyleCardData } from "@/lib/catalog/style-card-data";

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
  // Lock the tallest in-flow height seen while slots fill so masonry aspect
  // swaps cannot collapse trust / load-more / newsletter / footer (R1 / N-19).
  const [gridMinHeight, setGridMinHeight] = useState<number | undefined>(undefined);
  const inFlight = useRef(false);
  const page2Cache = useRef<StyleCardData[] | null>(null);
  const page2Handled = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shown = initialCount + extraStyles.length;
  const hasMore = shown < total;
  const autoDone = autoFetches >= AUTO_FETCH_PAGES || shown >= softCap || !hasMore;
  const exploreFallbackPage = homeExploreFallbackPage(shown);
  // Aspect-ratio placeholders for every card still under the soft cap (≤72).
  // Never reserve past the known total or the cap.
  const skeletons = Math.max(0, softCap - shown);

  useLayoutEffect(() => {
    const node = gridRef.current;
    if (!node) return;
    const height = Math.ceil(node.getBoundingClientRect().height);
    if (height <= 0) return;
    setGridMinHeight((prev) => Math.max(prev ?? 0, height));
  }, [extraStyles.length, skeletons]);

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

  // Prefetch page 2 into cache while idle (layout already reserved).
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
          page2Cache.current = styles;
        } catch {
          /* network blips — sentinel fetch will retry */
        } finally {
          inFlight.current = false;
        }
      })();
    };

    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(run, { timeout: 2500 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(run, 900);
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
      { rootMargin: "240px 0px" },
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
