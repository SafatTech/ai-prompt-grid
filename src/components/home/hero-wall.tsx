import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { HeroWallPause } from "@/components/home/hero-wall-pause";
import type { HeroWallImage } from "@/lib/catalog/repository";
import type { Season } from "@/lib/home/seasons";
import { popularQueriesForSeason } from "@/lib/home/seasons";

const COLUMN_DURATIONS = [70, 90, 62, 84, 76, 96];
const IMAGES_PER_COLUMN = 5;

type Props = {
  images: HeroWallImage[];
  season: Season | null;
  publishedCount: number;
};

function chunkColumns(images: HeroWallImage[]): HeroWallImage[][] {
  const pool = images.length > 0 ? images : [];
  const columns: HeroWallImage[][] = [];
  for (let col = 0; col < 6; col++) {
    const slice: HeroWallImage[] = [];
    for (let i = 0; i < IMAGES_PER_COLUMN; i++) {
      const img = pool[(col * IMAGES_PER_COLUMN + i) % Math.max(pool.length, 1)];
      if (img) slice.push(img);
    }
    // Ensure 5 slots even with a short pool by repeating.
    while (slice.length < IMAGES_PER_COLUMN && pool[0]) {
      slice.push(pool[slice.length % pool.length]!);
    }
    columns.push(slice);
  }
  return columns;
}

export function HeroWall({ images, season, publishedCount }: Props) {
  const columns = chunkColumns(images);
  const popular = popularQueriesForSeason(season);
  const countLabel =
    publishedCount > 0 ? `Explore ${publishedCount} styles →` : "Explore styles →";

  return (
    <section className="hero-wall" data-hero-wall>
      <div className="hero-wall-layer" aria-hidden="true">
        {columns.map((colImages, colIndex) => {
          const duration = COLUMN_DURATIONS[colIndex] ?? 70;
          const dir = colIndex % 2 === 0 ? "down" : "up";
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
                    const eager = imgIndex < 3;
                    const high = colIndex < 2 && imgIndex === 0;
                    return (
                      <Image
                        key={`a-${colIndex}-${imgIndex}-${image.src}`}
                        src={image.src}
                        alt=""
                        width={image.width}
                        height={image.height}
                        sizes="(min-width:1600px) 400px, 300px"
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
                      sizes="(min-width:1600px) 400px, 300px"
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

      <HeroWallPause />

      <div className="hero-wall-content">
        {season ? (
          <p className="hero-wall-eyebrow">
            <span>NEW</span>
            {season.heroEyebrow}
          </p>
        ) : null}
        <h1 className="hero-wall-title">
          Turn your photo into <em>any look.</em>
        </h1>
        <p className="hero-wall-sub">
          Tested, copy-paste prompts for major AI image editors. Pick a style, see the
          result first, keep your real face.
        </p>
        <form className="hero-wall-search" role="search" action="/explore" method="get">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <label htmlFor="home-hero-q" className="sr-only">
            Search styles
          </label>
          <input
            id="home-hero-q"
            name="q"
            placeholder='Try "Diwali couple", "LinkedIn headshot"…'
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </form>
        <div className="hero-wall-popular">
          <span>Popular:</span>
          {popular.map((query) => (
            <Link
              key={query}
              href={`/explore?q=${encodeURIComponent(query)}`}
            >
              {query}
            </Link>
          ))}
        </div>
        <div className="hero-wall-ctas">
          <Link href="/explore" data-testid="hero-explore" className="hero-wall-cta-primary">
            {countLabel}
          </Link>
          <Link href="/how-it-works" className="hero-wall-cta-secondary">
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}
