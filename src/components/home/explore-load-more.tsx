"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StyleCard } from "@/components/style-card";
import { StyleCardSkeleton } from "@/components/style-card-skeleton";
import type { CatalogStyle } from "@/lib/catalog/types";

type Props = {
  initialCount: number;
  total: number;
  pageSize: number;
};

const AUTO_FETCH_PAGES = 2;

function mergeUnique(
  prev: CatalogStyle[],
  styles: CatalogStyle[],
): CatalogStyle[] {
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
  const [extraStyles, setExtraStyles] = useState<CatalogStyle[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [autoFetches, setAutoFetches] = useState(0);
  const inFlight = useRef(false);
  const page2Cache = useRef<CatalogStyle[] | null>(null);
  const page2Handled = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const shown = initialCount + extraStyles.length;
  const hasMore = shown < total;
  const autoDone = autoFetches >= AUTO_FETCH_PAGES || !hasMore;
  const exploreFallbackPage = Math.max(2, Math.floor(shown / pageSize) + 1);

  function commitPage(page: number, styles: CatalogStyle[]) {
    setExtraStyles((prev) => mergeUnique(prev, styles));
    setNextPage(page + 1);
    setAutoFetches((n) => n + 1);
    setPendingCount(0);
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
    // Reserve masonry space immediately so trust/newsletter below do not jump later.
    setPendingCount(pageSize);
    try {
      const res = await fetch(`/api/home/explore?page=${page}`);
      if (!res.ok) {
        setPendingCount(0);
        return;
      }
      const data = (await res.json()) as { styles?: CatalogStyle[] };
      const styles = Array.isArray(data.styles) ? data.styles : [];
      if (page === 2) page2Handled.current = true;
      commitPage(page, styles);
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }

  // Prefetch page 2 while idle and append early so space is reserved off-screen.
  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled || page2Handled.current || inFlight.current) return;
      inFlight.current = true;
      void (async () => {
        try {
          const res = await fetch("/api/home/explore?page=2");
          if (!res.ok || cancelled) return;
          const data = (await res.json()) as { styles?: CatalogStyle[] };
          const styles = Array.isArray(data.styles) ? data.styles : [];
          if (cancelled || styles.length === 0) return;
          if (page2Handled.current) {
            page2Cache.current = styles;
            return;
          }
          page2Handled.current = true;
          commitPage(2, styles);
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
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || inFlight.current) return;
        void fetchPage(nextPage);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- IO rebinds when next page / auto state changes
  }, [autoDone, nextPage]);

  return (
    <>
      {extraStyles.length > 0 || pendingCount > 0 ? (
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
      ) : null}
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
