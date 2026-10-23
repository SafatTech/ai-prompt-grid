/**
 * Homepage rail definitions.
 * Couples / Family / Trends are thematic (search + filters), not DB category names.
 * Professional maps to the existing "Professional portraits" category.
 */

export type HomeRailDef = {
  id: string;
  title: string;
  subtitle: string;
  /** Explore href for "See all". */
  href: string;
  /** Exact category name from `categories` when filtering by category. */
  category?: string;
  /** Explore search string used to gather thematic styles. */
  q?: string;
  /** Input requirement filter (e.g. "Two photos"). */
  requirement?: string;
  limit: number;
};

export const HOME_RAILS: HomeRailDef[] = [
  {
    id: "couples-shaadi",
    title: "Couples & Shaadi",
    subtitle: "Mehndi, baraat, walima and everyday couple shots.",
    href: "/explore?q=couple",
    q: "couple",
    limit: 8,
  },
  {
    id: "family-eid",
    title: "Family & Eid",
    subtitle: "Merge family photos, Eid frames and birthdays.",
    href: "/explore?q=family",
    q: "family",
    limit: 8,
  },
  {
    id: "professional",
    title: "Professional",
    subtitle: "LinkedIn, CV and passport photos from a selfie.",
    href: `/explore?category=${encodeURIComponent("Professional portraits")}`,
    category: "Professional portraits",
    limit: 8,
  },
  {
    id: "trends",
    title: "Trends",
    subtitle: "Anime, retro, and the looks people are trying now.",
    href: "/explore?q=trending",
    q: "anime",
    limit: 8,
  },
];

export const TRENDING_RAIL = {
  id: "trending",
  title: "Trending this week",
  subtitle: "Editor picks and the styles climbing the catalog.",
  href: "/explore?sort=Trending",
  limit: 8,
} as const;
