import Image from "next/image";
import Link from "next/link";
import { GuideCategoryIcon } from "@/components/guides/guide-category-icons";
import { guideCategoryLabel } from "@/lib/guides/categories";
import type { Guide } from "@/lib/guides/load";
import {
  formatGuideDateShort,
  resolveGuideDisplayHero,
} from "@/lib/guides/prepare";

type Props = {
  guide: Guide;
};

export function GuideTextCard({ guide }: Props) {
  const hero = resolveGuideDisplayHero(guide);

  return (
    <Link href={`/guides/${guide.slug}`} className="guides-text-card">
      {hero.kind === "image" ? (
        <Image
          src={hero.url}
          alt=""
          fill
          sizes="(max-width:760px) 100vw, 280px"
          className="guides-text-card-media object-cover"
          style={{ objectPosition: hero.position }}
          loading="lazy"
        />
      ) : (
        <span className="guides-text-card-fallback" aria-hidden="true" />
      )}
      <span className="guides-text-card-scrim" aria-hidden="true" />
      <time dateTime={guide.updated}>
        Updated {formatGuideDateShort(guide.updated)}
      </time>
      <h3>{guide.title}</h3>
      <div className="guides-text-card-foot">
        <span className="guides-text-card-icon" aria-hidden="true">
          <GuideCategoryIcon name={guide.category} />
        </span>
        {guideCategoryLabel(guide.category)} · {guide.promptCount} prompts
      </div>
    </Link>
  );
}
