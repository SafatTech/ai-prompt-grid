import Link from "next/link";
import { HeroWallPause } from "@/components/home/hero-wall-pause";
import { HeroWallTracks } from "@/components/home/hero-wall-tracks";
import type { HeroWallImage } from "@/lib/catalog/repository";
import type { Season } from "@/lib/home/seasons";
import { popularQueriesForSeason } from "@/lib/home/seasons";

type Props = {
  images: HeroWallImage[];
  season: Season | null;
  publishedCount: number;
};

export function HeroWall({ images, season, publishedCount }: Props) {
  const popular = popularQueriesForSeason(season);
  const countLabel =
    publishedCount > 0 ? `Explore ${publishedCount} styles →` : "Explore styles →";

  return (
    <section className="hero-wall" data-hero-wall>
      <HeroWallTracks images={images} />

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
            <Link key={query} href={`/explore?q=${encodeURIComponent(query)}`}>
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
