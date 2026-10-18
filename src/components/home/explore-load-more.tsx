"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StyleCard } from "@/components/style-card";
import type { CatalogStyle } from "@/lib/catalog/types";

type Props = {
  initialCount: number;
  total: number;
  pageSize: number;
};

const AUTO_FETCH_PAGES = 2;

export function ExploreLoadMore({ initialCount, total, pageSize }: Props) {
  const [extraStyles, setExtraStyles] = useState<CatalogStyle[]>([]);
  const [nextPage, setNextPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [autoFetches, setAutoFetches] = useState(0);
  const inFlight = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const shown = initialCount + extraStyles.length;
  const hasMore = shown < total;
  const autoDone = autoFetches >= AUTO_FETCH_PAGES || !hasMore;
  const exploreFallbackPage = Math.max(2, Math.floor(shown / pageSize) + 1);

  async function fetchPage(page: number) {
    if (inFlight.current || loading) return;
    inFlight.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/home/explore?page=${page}`);
      if (!res.ok) return;
      const data = (await res.json()) as { styles?: CatalogStyle[] };
      const styles = Array.isArray(data.styles) ? data.styles : [];
      setExtraStyles((prev) => {
        const seen = new Set(prev.map((s) => s.id));
        const merged = [...prev];
        for (const style of styles) {
          if (seen.has(style.id)) continue;
          seen.add(style.id);
          merged.push(style);
        }
        return merged;
      });
      setNextPage(page + 1);
      setAutoFetches((n) => n + 1);
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }

  useEffect(() => {
    if (autoDone) return;
    const node = sentinelRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || inFlight.current) return;
        void fetchPage(nextPage);
      },
      // Fetch well before the sentinel scrolls into view, so the sections below
      // the feed (trust strip, newsletter) move while they are still off screen
      // and the append does not count as a layout shift.
      { rootMargin: "0px 0px 1600px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- IO rebinds when next page / auto state changes
  }, [autoDone, nextPage]);

  return (
    <>
      {extraStyles.length > 0 ? (
        <div className="home-masonry home-masonry-extra">
          {extraStyles.map((style) => (
            <StyleCard key={style.id} style={style} variant="masonry" />
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
