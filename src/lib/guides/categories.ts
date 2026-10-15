/**
 * Guide category config. Labels and intros are edited here only; MDX stores the slug.
 */

export const GUIDE_CATEGORIES = [
  {
    slug: "festivals",
    label: "Festivals",
    icon: "festivals",
    intro:
      "Festival AI photo prompt guides for Diwali, Halloween, and other celebrations, with copy-paste looks that keep your real face.",
  },
  {
    slug: "couples-family",
    label: "Couples & Family",
    icon: "couples",
    intro:
      "Couple and family AI photo prompt guides, including two-photo merge recipes you can paste into Gemini or ChatGPT.",
  },
  {
    slug: "trends",
    label: "Trends",
    icon: "trends",
    intro:
      "Trending AI photo prompt guides for the looks people are posting now, from retro decades to viral boy edits.",
  },
  {
    slug: "seasonal",
    label: "Seasonal",
    icon: "seasonal",
    intro:
      "Seasonal AI photo prompt guides for winter snow, cozy outdoor looks, and weather-led scenes.",
  },
  {
    slug: "occasions",
    label: "Occasions",
    icon: "occasions",
    intro:
      "Occasion AI photo prompt guides for birthdays and other milestones, with cake, party, and portrait looks.",
  },
  {
    slug: "professional",
    label: "Professional",
    icon: "professional",
    intro:
      "Professional AI photo prompt guides for LinkedIn, CV, and office headshots that keep your real face.",
  },
  {
    slug: "styles",
    label: "Styles",
    icon: "styles",
    intro:
      "Style-led AI photo prompt guides for anime and other artistic looks you can copy into Gemini or ChatGPT.",
  },
] as const;

export type GuideCategorySlug = (typeof GUIDE_CATEGORIES)[number]["slug"];

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];

const CATEGORY_BY_SLUG = new Map<string, GuideCategory>(
  GUIDE_CATEGORIES.map((category) => [category.slug, category]),
);

export function isGuideCategorySlug(value: string): value is GuideCategorySlug {
  return CATEGORY_BY_SLUG.has(value);
}

export function getGuideCategory(slug: string): GuideCategory | undefined {
  return CATEGORY_BY_SLUG.get(slug);
}

export function guideCategoryLabel(slug: GuideCategorySlug): string {
  return CATEGORY_BY_SLUG.get(slug)?.label ?? slug;
}
