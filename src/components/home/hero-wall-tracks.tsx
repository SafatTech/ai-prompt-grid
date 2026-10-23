"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import type { HeroWallImage } from "@/lib/catalog/repository";

const COLUMN_COUNT = 6;
const COLUMN_DURATIONS = [70, 90, 62, 84, 76, 96];
const IMAGES_PER_COLUMN = 6;
/** Mobile only paints 3 columns; keep sizes small so hidden cols 4–6 stay cheap if fetched.
 * 34vw @390×2 ≈ 265 → 256/384 imageSizes (avoid 640 deviceSize). */
const WALL_SIZES = "(max-width:699px) 32vw, (min-width:1600px) 400px, 280px";

function chunkColumns(images: HeroWallImage[]): HeroWallImage[][] {
  const pool = images.length > 0 ? images : [];
  const columns: HeroWallImage[][] = [];
  for (let col = 0; col < COLUMN_COUNT; col++) {
    const slice: HeroWallImage[] = [];
    for (let i = 0; i < IMAGES_PER_COLUMN; i++) {
      const img = pool[(col * IMAGES_PER_COLUMN + i) % Math.max(pool.length, 1)];
      if (img) slice.push(img);
    }
    while (slice.length < IMAGES_PER_COLUMN && pool[0]) {
      slice.push(pool[slice.length % pool.length]!);
    }
    columns.push(slice);
  }
  return columns;
}

type Props = {
  images: HeroWallImage[];
};

/**
 * Add the duplicate loop copy only after the window load event, so the server
 * HTML carries one set of wall images (36) instead of two (72).
 */
function useLoopCopy(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const reveal = () => {
      const idle = (
        window as Window & {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback;
      if (idle) {
        idleId = idle(() => setReady(true), { timeout: 1500 });
      } else {
        timeoutId = setTimeout(() => setReady(true), 200);
      }
    };
    if (document.readyState === "complete") {
      reveal();
    } else {
      window.addEventListener("load", reveal, { once: true });
    }
    return () => {
      window.removeEventListener("load", reveal);
      if (idleId !== undefined) {
        (
          window as Window & { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback?.(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);
  return ready;
}

/**
 * Always render six columns so SSR and the client share the same markup (no CLS).
 * Columns 4–6 are display:none under 699px; those images stay lazy so mobile
 * typically never downloads them.
 *
 * Each track holds the real set plus a loop copy. Until the page has loaded,
 * the loop copy is a row of empty 4:5 placeholders with the exact same height,
 * so the -50% keyframes never jump. The real set sits where the animation
 * starts: second for "down" columns (they start at -50%), first for "up".
 */
export function HeroWallTracks({ images }: Props) {
  const columns = chunkColumns(images);
  const loopReady = useLoopCopy();

  return (
    <div className="hero-wall-layer" aria-hidden="true">
      {columns.map((colImages, colIndex) => {
        const duration = COLUMN_DURATIONS[colIndex] ?? 70;
        const down = colIndex % 2 === 0;
        const dir = down ? "hero-wall-down" : "hero-wall-up";
        // Desktop-only columns: never eager, so mobile/hidden cols stay off the network.
        // Visible columns: at most one eager image each; never high/priority (h1 paints first).
        const desktopOnly = colIndex >= 3;
        const primary = (
          <div key="primary">
            {colImages.map((image, imgIndex) => {
              const eager = !desktopOnly && imgIndex === 0;
              return (
                <Image
                  key={`a-${colIndex}-${imgIndex}-${image.src}`}
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  sizes={WALL_SIZES}
                  className="hero-wall-img"
                  loading={eager ? "eager" : "lazy"}
                  fetchPriority="auto"
                  decoding="async"
                  placeholder={image.blurDataURL ? "blur" : "empty"}
                  blurDataURL={image.blurDataURL}
                />
              );
            })}
          </div>
        );
        const copy = (
          <div key="copy" aria-hidden="true">
            {colImages.map((image, imgIndex) =>
              loopReady ? (
                <Image
                  key={`b-${colIndex}-${imgIndex}-${image.src}`}
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  sizes={WALL_SIZES}
                  className="hero-wall-img"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span key={`b-${colIndex}-${imgIndex}`} className="hero-wall-img" />
              ),
            )}
          </div>
        );
        return (
          <div
            key={colIndex}
            className="hero-wall-col"
            style={
              {
                "--d": `${duration}s`,
                "--dir": dir,
              } as CSSProperties
            }
          >
            <div className="hero-wall-track">
              {down ? [copy, primary] : [primary, copy]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
