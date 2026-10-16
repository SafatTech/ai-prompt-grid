import Link from "next/link";
import { GuideCategoryIcon } from "@/components/guides/guide-category-icons";
import { guideCategoryLabel } from "@/lib/guides/categories";
import type { Guide } from "@/lib/guides/load";
import { formatGuideDateShort } from "@/lib/guides/prepare";

type Props = {
  guide: Guide;
};

export function GuideTextCard({ guide }: Props) {
  return (
    <Link href={`/guides/${guide.slug}`} className="guides-text-card">
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
