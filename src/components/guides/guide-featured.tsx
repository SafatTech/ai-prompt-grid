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

function authorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "ST";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

export function GuideFeatured({ guide }: Props) {
  const hero = resolveGuideDisplayHero(guide);
  const href = `/guides/${guide.slug}`;
  const tags = guide.tags.slice(0, 2);

  return (
    <section className="guides-featured" aria-label="Featured guide">
      <div className="guides-wrap guides-featured-grid">
        <Link href={href} className="guides-featured-media">
          {hero.kind === "image" ? (
            <Image
              src={hero.url}
              alt={hero.alt}
              width={guide.heroImage?.width ?? 1200}
              height={guide.heroImage?.height ?? 800}
              sizes="(max-width:760px) 100vw, 560px"
              className="h-full w-full object-cover"
              style={{ objectPosition: hero.position }}
              priority
              fetchPriority="high"
              quality={75}
            />
          ) : (
            <span className="guides-card-placeholder" aria-hidden="true" />
          )}
        </Link>
        <div>
          <p className="guides-eyebrow">Featured guide · New</p>
          <h2>
            <Link href={href}>{guide.title}</Link>
          </h2>
          <p className="guides-featured-excerpt">{guide.description}</p>
          <div className="guides-tags">
            <span className="guides-tag guides-tag-cat">
              {guideCategoryLabel(guide.category)}
            </span>
            {tags.map((tag) => (
              <span key={tag} className="guides-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="guides-byline">
            <span className="guides-avatar" aria-hidden="true">
              {authorInitials(guide.author)}
            </span>
            <span>
              <b>{guide.author}</b>
              <span>
                {formatGuideDateShort(guide.date)} · {guide.promptCount} prompts ·{" "}
                {formatReadTime(guide.readMinutes)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
