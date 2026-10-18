"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import type { StyleCardData } from "@/lib/catalog/style-card-data";

type RelatedProps = {
  styles: StyleCardData[];
  category: string;
};

/** Loads RelatedStyles only when the section approaches the viewport. */
export function RelatedStylesLazy(props: RelatedProps) {
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
        void import("@/components/styles/related-styles").then((mod) => {
          if (!cancelled) setComp(() => mod.RelatedStyles);
        });
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(node);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref}>
      {Comp ? (
        <Comp {...props} />
      ) : (
        <div className="container min-h-[320px] py-12 sm:py-16" aria-hidden />
      )}
    </div>
  );
}
