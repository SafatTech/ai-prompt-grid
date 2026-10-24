"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MergeBeforeAfter } from "@/components/merge-before-after";
import { SHARED_STYLE_BLUR } from "@/lib/catalog/shared-blur";
import type {
  StyleCardMergePhoto,
  StyleCardMergeResult,
} from "@/lib/catalog/style-card-data";

export type StyleCardMediaProps = {
  /** Style slug / id — only scalar identity crosses this client boundary. */
  styleId: string;
  title: string;
  result: string;
  /** Unique blur only — shared placeholder is imported here (not RSC props). */
  resultBlur?: string;
  mediaWidth: number;
  mediaHeight: number;
  mergePhotos?: StyleCardMergePhoto[];
  mergeResult?: StyleCardMergeResult;
  sizes: string;
  priority?: boolean;
  eager?: boolean;
  /** Masonry: mount media after layout IO (CSS columns break native lazy). */
  layoutAware?: boolean;
  /** Masonry uses natural result aspect; rails stay 4:5. */
  naturalAspect?: boolean;
};

/**
 * CSS columns break native loading="lazy" distance (pre-column flow). Mount
 * the image only after post-layout IntersectionObserver — never force
 * loading="eager" on rails (that regressed home to ~40 eager cards in #43).
 */
function useMasonryMediaGate(active: boolean) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(!active);

  useEffect(() => {
    if (!active || inView) return;
    const node = mediaRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [active, inView]);

  return { mediaRef, mediaReady: !active || inView };
}

/**
 * Tiny client island for rail/masonry media (IO gate + next/image).
 * Receives only media fields — never the full StyleCardData RSC blob.
 */
export function StyleCardMasonryMedia({
  styleId,
  title,
  result,
  resultBlur,
  mediaWidth,
  mediaHeight,
  mergePhotos = [],
  mergeResult,
  sizes,
  priority = false,
  eager = false,
  layoutAware = false,
  naturalAspect = false,
}: StyleCardMediaProps) {
  const { mediaRef, mediaReady } = useMasonryMediaGate(layoutAware);
  // Only priority / explicit eager flip loading — never "mediaReady ⇒ eager".
  const mediaLoading = priority ? undefined : eager ? "eager" : "lazy";
  // Prefer a unique blur when provided; otherwise the tiny shared placeholder
  // stays in the client chunk instead of repeating in every RSC card prop.
  const blur = resultBlur || SHARED_STYLE_BLUR;

  return (
    <div
      ref={mediaRef}
      className="style-card-rail-media relative overflow-hidden rounded-t-[var(--radius)] bg-[var(--surface-2)]"
      style={
        naturalAspect
          ? {
              aspectRatio: `${mediaWidth} / ${mediaHeight}`,
              ...(!mediaReady
                ? {
                    backgroundImage: `url(${blur})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : null),
            }
          : { aspectRatio: "4 / 5" }
      }
    >
      {mediaReady ? (
        mergePhotos.length >= 2 && mergeResult ? (
          <Link
            href={`/styles/${styleId}`}
            className="absolute inset-0 block"
            aria-label={`Open ${title}`}
          >
            <MergeBeforeAfter
              variant="card"
              title={title}
              inputs={mergePhotos}
              result={mergeResult}
              sizes={sizes}
              priority={priority}
              eager={eager}
            />
          </Link>
        ) : (
          <Link
            href={`/styles/${styleId}`}
            className="absolute inset-0 block"
            aria-label={`Open ${title}`}
          >
            <Image
              src={result}
              alt={`${title} AI photo result`}
              fill
              sizes={sizes}
              className="object-cover"
              priority={priority}
              loading={mediaLoading}
              fetchPriority={priority ? "high" : "auto"}
              placeholder="blur"
              blurDataURL={blur}
            />
          </Link>
        )
      ) : (
        <Link
          href={`/styles/${styleId}`}
          className="absolute inset-0 block"
          aria-label={`Open ${title}`}
          tabIndex={-1}
        />
      )}
    </div>
  );
}
