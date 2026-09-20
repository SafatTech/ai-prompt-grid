const cards = [
  {
    sourceSeed: "simple-selfie",
    resultSeed: "cinematic-selfie",
    from: "Simple selfie",
    to: "Cinematic portrait",
  },
  {
    sourceSeed: "friendly-pet",
    resultSeed: "painted-pet-art",
    from: "Pet photo",
    to: "Painted portrait",
  },
  {
    sourceSeed: "travel-view",
    resultSeed: "watercolor-travel",
    from: "Travel image",
    to: "Watercolor postcard",
  },
  {
    sourceSeed: "portrait-source",
    resultSeed: "anime-portrait",
    from: "Portrait",
    to: "Anime character",
  },
] as const;

/** Matches prototype hero art: four floating before/after cards. */
export function HeroArt() {
  return (
    <div
      className="hero-art"
      aria-label="Examples of source photos transformed into AI styles"
    >
      {cards.map((card) => (
        <div key={card.from} className="mini-transform">
          <div className="mini-images">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${card.sourceSeed}/420/320`}
              alt={card.from}
              loading="eager"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${card.resultSeed}/420/320`}
              alt={card.to}
              loading="eager"
            />
            <span className="mini-arrow">→</span>
          </div>
          <div className="mini-caption">
            <span>{card.from}</span>
            <span>{card.to}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
