"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MergeBeforeAfter } from "@/components/merge-before-after";
import type { StyleCardData } from "@/lib/catalog/style-card-data";

type Props = {
  style: StyleCardData;
  sizes: string;
  priority?: boolean;
  eager?: boolean;
  /** Masonry: mount media after layout IO (CSS columns break native lazy). */
  layoutAware?: boolean;
  /** Masonry uses natural result aspect; rails stay 4:5. */
  naturalAspect?: boolean;
  hoverPreview?: ReactNode;
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
 * Keeps the card chrome as a Server Component.
 */
export function StyleCardMasonryMedia({
  style,
  sizes,
  priority = false,
  eager = false,
  layoutAware = false,
  naturalAspect = false,
  hoverPreview,
}: Props) {
  const mergePhotos = style.mergePhotos;
  const { mediaRef, mediaReady } = useMasonryMediaGate(layoutAware);
  // Only priority / explicit eager flip loading — never "mediaReady ⇒ eager".
  const mediaLoading = priority ? undefined : eager ? "eager" : "lazy";

  return (
    <div
      ref={mediaRef}
      className="style-card-rail-media relative overflow-hidden rounded-t-[var(--radius)] bg-[var(--surface-2)]"
      style={
        naturalAspect
          ? {
              aspectRatio: `${style.mediaWidth} / ${style.mediaHeight}`,
              ...(style.resultBlur && !mediaReady
                ? {
                    backgroundImage: `url(${style.resultBlur})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : null),
            }
          : { aspectRatio: "4 / 5" }
      }
    >
      {mediaReady ? (
        mergePhotos.length >= 2 && style.mergeResult ? (
          <Link
            href={`/styles/${style.id}`}
            className="absolute inset-0 block"
            aria-label={`Open ${style.title}`}
          >
            <>
              <MergeBeforeAfter
                variant="card"
                title={style.title}
                inputs={mergePhotos}
                result={style.mergeResult}
                sizes={sizes}
                priority={priority}
                eager={eager}
              />
              {hoverPreview}
            </>
          </Link>
        ) : (
          <Link
            href={`/styles/${style.id}`}
            className="absolute inset-0 block"
            aria-label={`Open ${style.title}`}
          >
            <>
              <Image
                src={style.result}
                alt={`${style.title} AI photo result`}
                fill
                sizes={sizes}
                className="object-cover"
                priority={priority}
                loading={mediaLoading}
                fetchPriority={priority ? "high" : "auto"}
                placeholder={style.resultBlur ? "blur" : "empty"}
                blurDataURL={style.resultBlur}
              />
              {hoverPreview}
            </>
          </Link>
        )
      ) : (
        <Link
          href={`/styles/${style.id}`}
          className="absolute inset-0 block"
          aria-label={`Open ${style.title}`}
          tabIndex={-1}
        />
      )}
    </div>
  );
}
