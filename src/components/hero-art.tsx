import Link from "next/link";

const cards = [
  {
    href: "/styles/modern-curb-refresh",
    source: "/brand/hero/place-source-06.webp",
    result: "/brand/hero/place-result-06.webp",
    from: "Place photo",
    to: "Modern curb refresh",
  },
  {
    href: "/styles/intimate-cinematic-portrait",
    source: "/brand/hero/editorial-source-05.webp",
    result: "/brand/hero/editorial-result-05.webp",
    from: "Simple selfie",
    to: "Cinematic portrait",
  },
  {
    href: "/styles/travel-fashion-bouquet",
    source: "/brand/hero/editorial-source-06.webp",
    result: "/brand/hero/editorial-result-06.webp",
    from: "Travel image",
    to: "Travel fashion",
  },
  {
    href: "/styles/anime-squad",
    source: "/brand/hero/group-source-05.webp",
    result: "/brand/hero/group-result-05.webp",
    from: "Group photo",
    to: "Anime squad",
  },
] as const;

const featured = cards[1];

/** Desktop: floating collage. Mobile (≤480px): one clear before/after card. */
export function HeroArt() {
  return (
    <div
      className="hero-art"
      aria-label="Examples of source photos transformed into AI styles"
    >
      <Link
        href={featured.href}
        className="hero-comparison-card"
        aria-label={`${featured.from} to ${featured.to}`}
      >
        <div className="hero-comparison-images">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.source}
            alt={featured.from}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.result}
            alt={featured.to}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <span className="mini-arrow" aria-hidden>
            →
          </span>
        </div>
        <div className="hero-comparison-caption">
          <span>{featured.from}</span>
          <span>{featured.to}</span>
        </div>
      </Link>

      <div className="hero-floating-cards">
        {cards.map((card, index) => (
          <Link
            key={card.href}
            href={card.href}
            className="mini-transform"
            aria-label={`${card.from} to ${card.to}`}
          >
            <div className="mini-images">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.source}
                alt={card.from}
                loading={index < 2 ? "eager" : "lazy"}
                fetchPriority={index < 2 ? "high" : "low"}
                decoding="async"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.result}
                alt={card.to}
                loading={index < 2 ? "eager" : "lazy"}
                fetchPriority={index < 2 ? "high" : "low"}
                decoding="async"
              />
              <span className="mini-arrow" aria-hidden>
                →
              </span>
            </div>
            <div className="mini-caption">
              <span>{card.from}</span>
              <span>{card.to}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
