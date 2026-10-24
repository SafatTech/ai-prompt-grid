"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import type { StyleCardData } from "@/lib/catalog/style-card-data";

type RelatedProps = {
  styles: StyleCardData[];
  category: string;
};

/**
 * Always SSR section chrome + crawlable title links (N-17).
 * Lazy-loads the heavier StyleCard grid when near the viewport; skeleton
 * cards with matching aspect ratios keep scroll CLS near zero (R2).
 */
export function RelatedStylesLazy(props: RelatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [Comp, setComp] = useState<ComponentType<RelatedProps> | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let cancelled = false;
    // Slightly larger mobile prefetch so mid-scroll placeholders clear faster;
    // keep desktop tight so related cards stay lazy.
    const rootMargin =
      typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
        ? "2800px 0px"
        : "600px 0px";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        void import("@/components/styles/related-styles").then((mod) => {
          if (!cancelled) setComp(() => mod.RelatedStyles);
        });
      },
      { rootMargin },
    );
    io.observe(node);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  if (Comp) {
    return (
      <div ref={ref}>
        <Comp {...props} />
      </div>
    );
  }

  const categoryHref = `/explore?category=${encodeURIComponent(props.category)}`;

  return (
    <div ref={ref}>
      <section
        className="container related-styles-skeleton py-12 sm:py-16 lg:py-[88px]"
        data-testid="related-styles"
      >
        <div className="mb-7 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <h2 className="m-0 text-[clamp(28px,3vw,42px)] tracking-[-0.035em]">
            Related styles
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href={categoryHref} className="font-bold text-[#bbaeff]">
              More {props.category} styles →
            </Link>
            <Link href="/explore" className="font-bold text-[#bbaeff]">
              Explore all →
            </Link>
          </div>
        </div>
        {props.styles.length ? (
          <ul className="m-0 grid list-none grid-cols-1 gap-[18px] p-0 sm:grid-cols-2 lg:grid-cols-3">
            {props.styles.map((item) => {
              const mediaH = Math.min(item.height || 320, 320);
              return (
                <li key={item.id}>
                  <article className="overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]">
                    <div
                      className="bg-[var(--surface-2)]"
                      style={{ height: mediaH }}
                      aria-hidden
                    />
                    <div className="min-h-[170px] p-[17px]">
                      <Link
                        href={`/styles/${item.id}`}
                        className="font-semibold text-[var(--text)] no-underline"
                      >
                        {item.title}
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>
    </div>
  );
}
