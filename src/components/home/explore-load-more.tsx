"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StyleCard } from "@/components/style-card";
import { StyleCardSkeleton } from "@/components/style-card-skeleton";
import { homeExploreFallbackPage } from "@/lib/catalog/explore-pages";
import type { StyleCardData } from "@/lib/catalog/style-card-data";

type Props = {
  initialCount: number;
  total: number;
  pageSize: number;
};

const AUTO_FETCH_PAGES = 2;

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
  const [extraStyles, setExtraStyles] = useState<StyleCardData[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [autoFetches, setAutoFetches] = useState(0);
  const inFlight = useRef(false);
  const page2Cache = useRef<StyleCardData[] | null>(null);
  const page2Handled = useRef(false);
  const primedRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const shown = initialCount + extraStyles.length;
  const hasMore = shown < total;
  const autoDone = autoFetches >= AUTO_FETCH_PAGES || !hasMore;
  const exploreFallbackPage = homeExploreFallbackPage(shown);

  function commitPage(page: number, styles: StyleCardData[]) {
    setExtraStyles((prev) => mergeUnique(prev, styles));
    setNextPage(page + 1);
    setAutoFetches((n) => {
      const next = n + 1;
      // Keep one page of skeleton slots for the next auto-fetch so load-more
      // / trust do not jump when page 3 arrives.
      setPendingCount(next < AUTO_FETCH_PAGES ? pageSize : 0);
      return next;
    });
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
    if (pendingCount < pageSize) setPendingCount(pageSize);
    try {
      const res = await fetch(`/api/home/explore?page=${page}`);
      if (!res.ok) {
        setPendingCount(0);
        return;
      }
      const data = (await res.json()) as { styles?: StyleCardData[] };
      const styles = Array.isArray(data.styles) ? data.styles : [];
      if (page === 2) page2Handled.current = true;
      commitPage(page, styles);
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }

  // Prefetch page 2 into cache while idle (no layout change until primed).
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

    // Prime skeleton slots well before they enter the viewport so the append
    // shift happens off-screen (CLS ≈ 0) and no empty dark reserve remains.
    const primeIo = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || primedRef.current) return;
        primedRef.current = true;
        setPendingCount((n) => Math.max(n, pageSize));
      },
      { rootMargin: "900px 0px" },
    );
    primeIo.observe(node);

    const fetchIo = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || inFlight.current) return;
        void fetchPage(nextPage);
      },
      { rootMargin: "240px 0px" },
    );
    fetchIo.observe(node);

    return () => {
      primeIo.disconnect();
      fetchIo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- IO rebinds when next page / auto state changes
  }, [autoDone, nextPage, pageSize]);

  return (
    <>
      <div
        className="home-masonry home-masonry-extra"
        aria-busy={pendingCount > 0 || undefined}
      >
        {extraStyles.map((style) => (
          <StyleCard key={style.id} style={style} variant="masonry" />
        ))}
        {Array.from({ length: pendingCount }, (_, index) => (
          <StyleCardSkeleton
            key={`home-pending-${index}`}
            variant="masonry"
            index={index}
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
