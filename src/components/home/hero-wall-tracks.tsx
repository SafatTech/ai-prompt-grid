"use client";

import Image from "next/image";
import { useSyncExternalStore, type CSSProperties } from "react";
import type { HeroWallImage } from "@/lib/catalog/repository";

const COLUMN_DURATIONS = [70, 90, 62, 84, 76, 96];
const IMAGES_PER_COLUMN = 6;
const WALL_SIZES = "(max-width:699px) 34vw, (min-width:1600px) 400px, 300px";

function subscribeMobile(onChange: () => void) {
  const mq = window.matchMedia("(max-width:699px)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function isMobileViewport() {
  return window.matchMedia("(max-width:699px)").matches;
}

function chunkColumns(images: HeroWallImage[], columnCount: number): HeroWallImage[][] {
  const pool = images.length > 0 ? images : [];
  const columns: HeroWallImage[][] = [];
  for (let col = 0; col < columnCount; col++) {
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
 * Renders 3 columns on mobile (SSR + client) and upgrades to 6 on desktop after
 * hydrate, so hidden mobile columns are never in the DOM / downloaded.
 */
export function HeroWallTracks({ images }: Props) {
  // SSR assumes mobile so columns 4–6 are not in the initial HTML.
  const mobile = useSyncExternalStore(subscribeMobile, isMobileViewport, () => true);
  const columnCount = mobile ? 3 : 6;
  const columns = chunkColumns(images, columnCount);

  return (
    <div className="hero-wall-layer" aria-hidden="true">
      {columns.map((colImages, colIndex) => {
        const duration = COLUMN_DURATIONS[colIndex] ?? 70;
        const dir = colIndex % 2 === 0 ? "hero-wall-down" : "hero-wall-up";
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
              <div>
                {colImages.map((image, imgIndex) => {
                  const eager = imgIndex < 2;
                  const high = colIndex < 2 && imgIndex === 0;
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
                      fetchPriority={high ? "high" : "auto"}
                      decoding="async"
                      placeholder={image.blurDataURL ? "blur" : "empty"}
                      blurDataURL={image.blurDataURL}
                    />
                  );
                })}
              </div>
              <div aria-hidden="true">
                {colImages.map((image, imgIndex) => (
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
                    placeholder={image.blurDataURL ? "blur" : "empty"}
                    blurDataURL={image.blurDataURL}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
