"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StyleCard } from "@/components/style-card";
import type { CatalogStyle } from "@/lib/catalog/types";

type Props = {
  initialCount: number;
  total: number;
  pageSize: number;
  /** Pre-serialized extra pages (page 2 and 3) for progressive enhancement. */
  extraPages: CatalogStyle[][];
};

export function ExploreLoadMore({
  initialCount,
  total,
  pageSize,
  extraPages,
}: Props) {
  const [loadedPages, setLoadedPages] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const autoCap = Math.min(2, extraPages.length);
  const autoDone = loadedPages >= autoCap;
  const shown =
    initialCount +
    extraPages.slice(0, loadedPages).reduce((n, page) => n + page.length, 0);

  useEffect(() => {
    if (autoDone) return;
    const node = sentinelRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setLoadedPages((prev) => Math.min(prev + 1, autoCap));
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [autoCap, autoDone]);

  const extras = extraPages.slice(0, loadedPages).flat();

  return (
    <>
      {extras.length > 0 ? (
        <div className="home-masonry home-masonry-extra">
          {extras.map((style) => (
            <StyleCard key={style.id} style={style} variant="masonry" />
          ))}
        </div>
      ) : null}
      <div ref={sentinelRef} className="home-load-more" aria-live="polite">
        {shown < total ? (
          <Link href={`/explore?page=${Math.floor(shown / pageSize) + 1}`}>
            Load more styles
          </Link>
        ) : null}
        <span>
          Showing {Math.min(shown, total)} of {total}
        </span>
      </div>
    </>
  );
}
