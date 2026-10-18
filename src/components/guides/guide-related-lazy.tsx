"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import type { Guide } from "@/lib/guides/load";
import { formatGuideDateShort } from "@/lib/guides/prepare";

type RelatedProps = {
  guides: readonly Guide[];
};

/**
 * Always SSR "Keep exploring" links (N-17). Lazy-loads image-heavy cards when
 * near the viewport; aspect-ratio placeholders hold footer position (R2).
 */
export function GuideRelatedLazy(props: RelatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [Comp, setComp] = useState<ComponentType<RelatedProps> | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        void import("@/components/guides/guide-related").then((mod) => {
          if (!cancelled) setComp(() => mod.GuideRelated);
        });
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(node);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  if (props.guides.length === 0) return null;

  if (Comp) {
    return (
      <div ref={ref}>
        <Comp {...props} />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <section className="guide-related-skeleton mt-24 bg-[color-mix(in_srgb,var(--surface)_60%,transparent)] py-16">
        <div className="mx-auto max-w-[1380px] px-5">
          <div className="flex items-end justify-between gap-4">
            <h2 className="m-0 text-3xl font-bold tracking-tight text-[var(--text)]">
              Keep exploring
            </h2>
            <Link
              href="/guides"
              className="shrink-0 text-sm font-medium text-[var(--peach)] underline-offset-2 hover:underline"
            >
              All guides →
            </Link>
          </div>
          <ul className="-mx-5 mt-8 m-0 flex list-none snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {props.guides.map((guide) => (
              <li
                key={guide.slug}
                className="w-[80%] shrink-0 snap-start md:w-auto"
              >
                <Link
                  href={`/guides/${guide.slug}`}
                  prefetch={false}
                  className="guide-related-card relative block overflow-hidden rounded-3xl bg-[var(--bg)] no-underline"
                >
                  <div
                    className="aspect-[4/5] bg-[var(--surface-2)]"
                    aria-hidden
                  />
                  <div className="p-5">
                    <h3 className="m-0 font-semibold leading-snug text-[var(--text)]">
                      {guide.heading}
                    </h3>
                    <p className="mt-2 mb-0 line-clamp-2 text-sm text-[var(--muted)]">
                      {guide.description}
                    </p>
                    <p className="mt-4 mb-0 text-xs text-[var(--muted)]">
                      {formatGuideDateShort(guide.date)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
