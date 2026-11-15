"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ExplorePromoBanner } from "@/lib/catalog/explore-hero";

type Props = {
  banners: ExplorePromoBanner[];
  onFilter: (key: string) => void;
};

export function ExplorePromoBanners({ banners, onFilter }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    function onScroll() {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const cards = [...scroller.querySelectorAll<HTMLElement>(".promo")];
      if (!cards.length) return;
      const w = cards[0].offsetWidth + 10;
      const i = Math.max(
        0,
        Math.min(cards.length - 1, Math.round(scroller.scrollLeft / w)),
      );
      setActive(i);
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [banners.length]);

  if (!banners.length) return null;

  return (
    <div className="banners-wrap" data-testid="explore-banners">
      <div className="banners" ref={scrollerRef}>
        {banners.map((banner) => (
          <button
            key={banner.key}
            type="button"
            className={`promo ${banner.toneClass}`}
            data-f={banner.key}
            onClick={() => onFilter(banner.key)}
          >
            <div className="promo-copy">
              <span className={`badge ${banner.badgeClass}`}>{banner.badge}</span>
              <h2>{banner.title}</h2>
              <p>
                {banner.blurb} {banner.count} styles.
              </p>
              <span className="promo-go">View {banner.key.toLowerCase()}</span>
            </div>
            <div className="promo-thumbs" aria-hidden="true">
              {banner.thumbs.map((thumb) => (
                <span key={thumb.id} className="promo-thumb">
                  <Image
                    src={thumb.result}
                    alt=""
                    fill
                    sizes="64px"
                    loading="lazy"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
      <div className="banner-dots" aria-hidden="true">
        {banners.map((banner, i) => (
          <button
            key={`bd-${banner.key}`}
            type="button"
            className={`banner-dot${i === active ? " is-on" : ""}`}
            aria-label={`${banner.key} banner`}
            onClick={() => {
              const cards = scrollerRef.current?.querySelectorAll(".promo");
              cards?.[i]?.scrollIntoView({
                behavior: "smooth",
                inline: "start",
                block: "nearest",
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
