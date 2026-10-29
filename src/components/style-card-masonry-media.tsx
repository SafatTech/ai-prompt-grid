"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MergeBeforeAfter } from "@/components/merge-before-after";
import { focusObjectPositionFromCoords } from "@/lib/catalog/image-focus";
import type {
  StyleCardMergePhoto,
  StyleCardMergeResult,
} from "@/lib/catalog/style-card-data";
import { cn } from "@/lib/utils";

const RAIL_SIZES = "(max-width:699px) 50vw, (max-width:767px) 55vw, 250px";
const MASONRY_SIZES = "(max-width:699px) 48vw, 236px";

export type StyleCardMediaProps = {
  /** Style slug / id — only scalar identity crosses this client boundary. */
  styleId: string;
  result: string;
  /** Unique blur only — shared placeholder is CSS / client-chunk, not RSC props. */
  resultBlur?: string;
  /** Result cover focus (0–100). Small scalars only. */
  resultFocusX?: number;
  resultFocusY?: number;
  mediaWidth?: number;
  mediaHeight?: number;
  mergePhotos?: StyleCardMergePhoto[];
  mergeResult?: StyleCardMergeResult;
  /** Prefer over passing a duplicated sizes string per card. */
  variant?: "rail" | "masonry";
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
  result,
  resultBlur,
  resultFocusX,
  resultFocusY,
  mediaWidth = 800,
  mediaHeight = 1000,
  mergePhotos = [],
  mergeResult,
  variant = "rail",
  priority = false,
  eager = false,
  layoutAware = false,
  naturalAspect = false,
}: StyleCardMediaProps) {
  const { mediaRef, mediaReady } = useMasonryMediaGate(layoutAware);
  const mediaLoading = priority ? undefined : eager ? "eager" : "lazy";
  const sizes = variant === "masonry" ? MASONRY_SIZES : RAIL_SIZES;
  // Unique blur only when provided; otherwise empty placeholder (shared CSS covers pending).
  const uniqueBlur = resultBlur || undefined;
  const resultObjectPosition = focusObjectPositionFromCoords(
    resultFocusX,
    resultFocusY,
  );

  return (
    <div
      ref={mediaRef}
      className={cn(
        "style-card-rail-media relative overflow-hidden rounded-t-[var(--radius)] bg-[var(--surface-2)]",
        layoutAware && !mediaReady && "is-pending",
      )}
      style={
        naturalAspect
          ? { aspectRatio: `${mediaWidth} / ${mediaHeight}` }
          : { aspectRatio: "4 / 5" }
      }
    >
      {mediaReady ? (
        mergePhotos.length >= 2 && mergeResult ? (
          <Link
            href={`/styles/${styleId}`}
            className="absolute inset-0 block"
            aria-label="Open style"
          >
            <MergeBeforeAfter
              variant="card"
              title="Style"
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
            aria-label="Open style"
          >
            <Image
              src={result}
              alt="AI photo result"
              fill
              sizes={sizes}
              className="object-cover"
              style={{ objectPosition: resultObjectPosition }}
              priority={priority}
              loading={mediaLoading}
              fetchPriority={priority ? "high" : "auto"}
              placeholder={uniqueBlur ? "blur" : "empty"}
              blurDataURL={uniqueBlur}
            />
          </Link>
        )
      ) : (
        <Link
          href={`/styles/${styleId}`}
          className="absolute inset-0 block"
          aria-label="Open style"
          tabIndex={-1}
        />
      )}
    </div>
  );
}
