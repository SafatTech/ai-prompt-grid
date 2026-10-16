import Image from "next/image";
import Link from "next/link";
import type { CatalogStyle } from "@/lib/catalog/types";
import {
  daysUntilFestival,
  type Season,
} from "@/lib/home/seasons";

type Props = {
  season: Season;
  styles: CatalogStyle[];
  seasonStyleCount: number;
};

export function SeasonBanner({ season, styles, seasonStyleCount }: Props) {
  const days = daysUntilFestival(season);
  const collage = styles.slice(0, 5);
  const ctaLabel =
    seasonStyleCount > 0
      ? `See ${seasonStyleCount} ${season.heroChip} prompts`
      : `Browse ${season.heroChip} prompts`;

  return (
    <section
      className={`home-season home-season--${season.theme}`}
      aria-labelledby="home-season-heading"
    >
      <div className="home-season-copy">
        <p className="home-season-eyebrow">{season.eyebrow}</p>
        <h2 id="home-season-heading">{season.title}</h2>
        <p>{season.body}</p>
        <div className="home-season-actions">
          {season.ctaGuide ? (
            <Link href={season.ctaGuide}>{ctaLabel}</Link>
          ) : (
            <Link href={`/explore?q=${encodeURIComponent(season.ctaCategoryQuery)}`}>
              {ctaLabel}
            </Link>
          )}
          <Link href={`/explore?q=${encodeURIComponent(season.ctaCategoryQuery)}`}>
            Browse {season.heroChip} styles
          </Link>
        </div>
        {days != null ? (
          <p className="home-season-countdown">
            ✦ {days} {days === 1 ? "day" : "days"} to {season.heroChip}
            {season.next ? ` · then ${season.next}` : ""}
          </p>
        ) : null}
      </div>
      {collage.length > 0 ? (
        <div className="home-season-collage">
          {collage.map((style) => (
            <Link
              key={style.id}
              href={`/styles/${style.id}`}
              aria-label={style.title}
            >
              <Image
                src={style.result}
                alt={`${style.title} AI photo result`}
                width={600}
                height={750}
                sizes="(max-width:700px) 33vw, 220px"
                className="object-cover"
                loading="lazy"
                placeholder={style.resultBlur ? "blur" : "empty"}
                blurDataURL={style.resultBlur}
              />
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
