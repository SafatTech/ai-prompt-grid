import Link from "next/link";

const cards = [
  {
    href: "/styles/modern-curb-refresh",
    source: "/catalog/place/source-06.png",
    result: "/catalog/place/result-06.png",
    from: "Place photo",
    to: "Modern curb refresh",
  },
  {
    href: "/styles/intimate-cinematic-portrait",
    source: "/catalog/editorial/source-05.png",
    result: "/catalog/editorial/result-05.png",
    from: "Simple selfie",
    to: "Cinematic portrait",
  },
  {
    href: "/styles/travel-fashion-bouquet",
    source: "/catalog/editorial/source-06.png",
    result: "/catalog/editorial/result-06.png",
    from: "Travel image",
    to: "Travel fashion",
  },
  {
    href: "/styles/anime-squad",
    source: "/catalog/group/source-05.png",
    result: "/catalog/group/result-05.png",
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
          <img src={featured.source} alt={featured.from} loading="eager" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured.result} alt={featured.to} loading="eager" />
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
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="mini-transform"
            aria-label={`${card.from} to ${card.to}`}
          >
            <div className="mini-images">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.source} alt={card.from} loading="eager" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.result} alt={card.to} loading="eager" />
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
