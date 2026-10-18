"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import type { Guide } from "@/lib/guides/load";

type RelatedProps = {
  guides: readonly Guide[];
};

/** Loads GuideRelated only when the section approaches the viewport. */
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
      {Comp ? <Comp {...props} /> : <div className="mt-24 min-h-[280px]" aria-hidden />}
    </div>
  );
}
