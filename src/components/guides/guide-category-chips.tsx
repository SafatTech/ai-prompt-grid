import Link from "next/link";
import { GuideCategoryIcon } from "@/components/guides/guide-category-icons";
import {
  GUIDE_CATEGORIES,
  type GuideCategorySlug,
} from "@/lib/guides/categories";
import { cn } from "@/lib/utils";

type Props = {
  active?: GuideCategorySlug | "all";
  populated: ReadonlySet<GuideCategorySlug>;
  className?: string;
};

export function GuideCategoryChips({
  active = "all",
  populated,
  className,
}: Props) {
  const categories = GUIDE_CATEGORIES.filter((category) =>
    populated.has(category.slug),
  );

  return (
    <nav
      aria-label="Guide categories"
      className={cn("guides-chips", className)}
    >
      <Chip href="/guides" label="All guides" icon="all" current={active === "all"} />
      {categories.map((category) => (
        <Chip
          key={category.slug}
          href={`/guides/category/${category.slug}`}
          label={category.label}
          icon={category.slug}
          current={active === category.slug}
        />
      ))}
    </nav>
  );
}

function Chip({
  href,
  label,
  icon,
  current,
}: {
  href: string;
  label: string;
  icon: GuideCategorySlug | "all";
  current: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("guides-chip", current && "guides-chip-active")}
      aria-current={current ? "page" : undefined}
    >
      <span className="guides-chip-icon" aria-hidden="true">
        <GuideCategoryIcon name={icon} />
      </span>
      {label}
    </Link>
  );
}
