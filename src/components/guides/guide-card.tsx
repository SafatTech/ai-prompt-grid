import Image from "next/image";
import Link from "next/link";
import { guideCategoryLabel } from "@/lib/guides/categories";
import type { Guide } from "@/lib/guides/load";
import {
  formatGuideDateShort,
  formatReadTime,
  resolveGuideDisplayHero,
} from "@/lib/guides/prepare";

type Props = {
  guide: Guide;
};

export function GuideCard({ guide }: Props) {
  const hero = resolveGuideDisplayHero(guide);
  const href = `/guides/${guide.slug}`;
  const topic = guide.tags[0];

  return (
    <article className="guides-card">
      <Link href={href} className="guides-card-media">
        {hero.kind === "image" ? (
          <Image
            src={hero.url}
            alt=""
            fill
            sizes="(max-width:760px) 100vw, 360px"
            className="object-cover"
            style={{ objectPosition: hero.position }}
            loading="lazy"
          />
        ) : (
          <span className="guides-card-placeholder" aria-hidden="true" />
        )}
      </Link>
      <h3>
        <Link href={href}>{guide.title}</Link>
      </h3>
      <p>{guide.description}</p>
      <div className="guides-tags">
        <span className="guides-tag guides-tag-cat">
          {guideCategoryLabel(guide.category)}
        </span>
        {topic ? <span className="guides-tag">{topic}</span> : null}
      </div>
      <div className="guides-card-meta">
        <b>
          {guide.promptCount} prompt{guide.promptCount === 1 ? "" : "s"}
        </b>
        {" · "}
        {formatReadTime(guide.readMinutes)}
        {" · "}
        <time dateTime={guide.date}>{formatGuideDateShort(guide.date)}</time>
      </div>
    </article>
  );
}
