import Link from "next/link";
import { categories } from "@/lib/catalog/styles";
import type { Season } from "@/lib/home/seasons";

type Props = {
  season: Season | null;
};

export function CategoryChipsBar({ season }: Props) {
  const chips: { label: string; href: string; active?: boolean }[] = [
    { label: "All", href: "/explore", active: true },
    ...categories.map((category) => ({
      label: category,
      href: `/explore?category=${encodeURIComponent(category)}`,
    })),
    {
      label: "Merge 2 photos",
      href: `/explore?requirement=${encodeURIComponent("Two photos")}`,
    },
  ];

  if (season) {
    chips.splice(1, 0, {
      label: season.heroChip,
      href: `/explore?q=${encodeURIComponent(season.ctaCategoryQuery)}`,
    });
  }

  return (
    <div className="home-chips-sticky">
      <nav className="home-chips" aria-label="Style categories">
        {chips.map((chip) => (
          <Link
            key={chip.label + chip.href}
            href={chip.href}
            className={chip.active ? "home-chip home-chip--on" : "home-chip"}
          >
            {chip.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
