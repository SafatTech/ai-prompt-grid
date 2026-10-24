import Image from "next/image";
import Link from "next/link";
import type { CatalogStyle } from "@/lib/catalog/types";
import {
  daysUntilFestival,
  formatFestivalDay,
  styleLabelForSeason,
  type Season,
  type SeasonChip,
} from "@/lib/home/seasons";

type Props = {
  season: Season;
  /** Styles whose primary after-images are displayed in the banner artwork. */
  imageStyles?: CatalogStyle[];
  styles: CatalogStyle[];
  /** Extra season-matched styles used to fill the mobile strip without repeating band photos. */
  matchedStyles?: CatalogStyle[];
  seasonStyleCount: number;
};

function pickBackgroundStyles(styles: CatalogStyle[], count: number): CatalogStyle[] {
  return styles.slice(0, count);
}

function pickStripStyles(
  featured: CatalogStyle[],
  matched: CatalogStyle[],
  excludeIds: Set<string>,
  count: number,
): CatalogStyle[] {
  const seen = new Set(excludeIds);
  const out: CatalogStyle[] = [];
  for (const style of [...featured, ...matched]) {
    if (seen.has(style.id)) continue;
    seen.add(style.id);
    out.push(style);
    if (out.length >= count) break;
  }
  return out;
}

function ChipIcon({ icon }: { icon: SeasonChip["icon"] }) {
  if (icon === "couple") {
    return (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <circle cx="5.5" cy="5" r="2.2" />
        <circle cx="10.8" cy="5" r="2.2" />
        <path d="M1.8 13.5c.4-2.4 1.9-3.7 3.7-3.7s3.3 1.3 3.7 3.7M8.3 11c.6-.8 1.5-1.2 2.5-1.2 1.8 0 3.1 1.3 3.5 3.7" />
      </svg>
    );
  }
  if (icon === "family") {
    return (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M2.5 7.5 8 3l5.5 4.5V13a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z" />
        <path d="M6.5 13.5v-3h3v3" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
    >
      <circle cx="8" cy="8" r="1.6" />
      <path d="M8 1.8c1.4 1.6 1.4 3.2 0 4.6-1.4-1.4-1.4-3 0-4.6zM8 14.2c1.4-1.6 1.4-3.2 0-4.6-1.4 1.4-1.4 3 0 4.6zM1.8 8c1.6-1.4 3.2-1.4 4.6 0-1.4 1.4-3 1.4-4.6 0zM14.2 8c-1.6-1.4-3.2-1.4-4.6 0 1.4 1.4 3 1.4 4.6 0z" />
    </svg>
  );
}

function RangoliMark() {
  return (
    <svg
      className="home-season-rangoli"
      viewBox="0 0 320 320"
      aria-hidden
      focusable="false"
    >
      <circle cx="160" cy="160" r="7" fill="currentColor" />
      {[
        [180.3, 168.4],
        [168.4, 180.3],
        [151.6, 180.3],
        [139.7, 168.4],
        [139.7, 151.6],
        [151.6, 139.7],
        [168.4, 139.7],
        [180.3, 151.6],
      ].map(([cx, cy]) => (
        <circle key={`a-${cx}-${cy}`} cx={cx} cy={cy} r="3.2" fill="#ff9b82" />
      ))}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <circle
            key={`b-${i}`}
            cx={160 + Math.cos(a) * 40}
            cy={160 + Math.sin(a) * 40}
            r="3"
            fill="currentColor"
          />
        );
      })}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <circle
            key={`c-${i}`}
            cx={160 + Math.cos(a) * 58}
            cy={160 + Math.sin(a) * 58}
            r="2.6"
            fill="#f5d08a"
          />
        );
      })}
      {Array.from({ length: 16 }, (_, i) => {
        const a = ((i + 0.5) / 16) * Math.PI * 2;
        return (
          <circle
            key={`d-${i}`}
            cx={160 + Math.cos(a) * 77}
            cy={160 + Math.sin(a) * 77}
            r="3.2"
            fill="#ff9b82"
          />
        );
      })}
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <circle
            key={`e-${i}`}
            cx={160 + Math.cos(a) * 98}
            cy={160 + Math.sin(a) * 98}
            r="2.4"
            fill="currentColor"
          />
        );
      })}
      {Array.from({ length: 28 }, (_, i) => {
        const a = (i / 28) * Math.PI * 2;
        return (
          <circle
            key={`f-${i}`}
            cx={160 + Math.cos(a) * 120}
            cy={160 + Math.sin(a) * 120}
            r="2.8"
            fill="#f5d08a"
          />
        );
      })}
      {Array.from({ length: 32 }, (_, i) => {
        const a = ((i + 0.5) / 32) * Math.PI * 2;
        return (
          <circle
            key={`g-${i}`}
            cx={160 + Math.cos(a) * 141}
            cy={160 + Math.sin(a) * 141}
            r="2.2"
            fill="#ff9b82"
          />
        );
      })}
    </svg>
  );
}

export function SeasonBanner({
  season,
  styles,
  imageStyles = styles,
  matchedStyles = [],
  seasonStyleCount,
}: Props) {
  const days = daysUntilFestival(season);
  const festivalDay = formatFestivalDay(season.festivalDate);
  const bgStyles = pickBackgroundStyles(imageStyles, 3);
  /** Mobile band shows the first two background panes; strip must not repeat them. */
  const bandIds = new Set(bgStyles.slice(0, 2).map((style) => style.id));
  const stripStyles = pickStripStyles(imageStyles, matchedStyles, bandIds, 5);
  const chips = season.chips ?? [];
  const exploreHref = `/explore?q=${encodeURIComponent(season.ctaCategoryQuery)}`;
  const ctaLabel =
    seasonStyleCount > 0
      ? `See ${seasonStyleCount} ${season.heroChip} prompts`
      : `Browse ${season.heroChip} prompts`;

  return (
    <section
      className={`home-season home-season-b home-season--${season.theme}`}
      aria-labelledby="home-season-heading"
    >
      {bgStyles.length > 0 ? (
        <div className="home-season-bg">
          {bgStyles.map((style) => {
            const label = styleLabelForSeason(season, style.id, style.title);
            return (
              <Link key={style.id} href={`/styles/${style.id}`} aria-label={label}>
                <Image
                  src={style.result}
                  alt=""
                  width={600}
                  height={750}
                  sizes="(max-width:699px) 50vw, 300px"
                  className="object-cover"
                  loading="lazy"
                  fetchPriority="auto"
                />
              </Link>
            );
          })}
        </div>
      ) : null}

      <div className="home-season-veil" aria-hidden="true" />
      <RangoliMark />

      <div className="home-season-text">
        {days != null ? (
          <p className="home-season-pill">
            <b>
              {days} {days === 1 ? "day" : "days"}
            </b>
            <span>
              to {season.heroChip} · {festivalDay}
            </span>
          </p>
        ) : null}
        <p className="home-season-eyebrow">{season.eyebrow}</p>
        <h2 id="home-season-heading">{season.title}</h2>
        <p className="home-season-desc">{season.body}</p>
        <div className="home-season-btns">
          <Link href={exploreHref} className="home-season-btn home-season-btn--primary">
            {ctaLabel}
          </Link>
          <Link href={exploreHref} className="home-season-btn home-season-btn--outline">
            Browse {season.heroChip} styles
          </Link>
        </div>
        {chips.length > 0 ? (
          <div
            className="home-season-chips"
            aria-label={`Popular ${season.heroChip} themes`}
          >
            {chips.map((chip) => (
              <Link
                key={chip.label}
                href={`/explore?q=${encodeURIComponent(chip.q)}`}
                className="home-season-chip"
              >
                <ChipIcon icon={chip.icon} />
                {chip.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {styles.length > 0 ? (
        <nav
          className="home-season-links"
          aria-label={`Featured ${season.heroChip} styles`}
        >
          {styles.slice(0, 5).map((style) => (
            <Link key={style.id} href={`/styles/${style.id}`}>
              {styleLabelForSeason(season, style.id, style.title)} →
            </Link>
          ))}
        </nav>
      ) : null}

      {stripStyles.length > 0 ? (
        <div className="home-season-strip">
          {stripStyles.map((style) => {
            const label = styleLabelForSeason(season, style.id, style.title);
            return (
              <Link key={style.id} href={`/styles/${style.id}`}>
                <span>
                  <Image
                    src={style.result}
                    alt={`${label} AI photo result`}
                    width={600}
                    height={750}
                    sizes="40vw"
                    className="object-cover"
                    loading="lazy"
                    fetchPriority="auto"
                  />
                </span>
                <b>{label}</b>
              </Link>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
