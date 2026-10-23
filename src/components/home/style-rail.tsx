import Link from "next/link";
import { RailArrows } from "@/components/home/rail-arrows";
import { StyleCardRail } from "@/components/style-card-rail";
import type { StyleCardData } from "@/lib/catalog/style-card-data";

type Props = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  styles: StyleCardData[];
  ranked?: boolean;
};

export function StyleRail({ id, title, subtitle, href, styles, ranked = false }: Props) {
  if (styles.length === 0) return null;

  const headingId = `rail-${id}`;
  const railId = `rail-scroller-${id}`;

  return (
    <section className="home-section" aria-labelledby={headingId}>
      <div className="home-section-header">
        <div>
          <h2 id={headingId}>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="home-section-header-actions">
          <Link href={href} className="home-see-all">
            {ranked ? "All trending →" : "See all →"}
          </Link>
          <RailArrows railId={railId} />
        </div>
      </div>
      <div
        id={railId}
        className={ranked ? "home-rail home-rail--trending" : "home-rail"}
        role="region"
        tabIndex={0}
        aria-label={`${title} styles, scroll sideways`}
      >
        {styles.map((style) => (
          <StyleCardRail
            key={style.id}
            style={style}
            variant="rail"
            /* No priority/eager on rails — homepage keeps a single feed preload. */
          />
        ))}
      </div>
    </section>
  );
}
