/**
 * Homepage rail definitions.
 * Couples / Family / Trends are thematic (search + filters), not DB category names.
 * Professional uses a curated LinkedIn/CV headshot slug list (not the catch-all category).
 */

export type HomeRailDef = {
  id: string;
  title: string;
  subtitle: string;
  /** Explore href for "See all". */
  href: string;
  /** Exact category name from `categories` when filtering by category. */
  category?: string;
  /** Ordered published-style slugs; unresolved slugs are skipped. */
  slugs?: string[];
  /** Explore search string used to gather thematic styles. */
  q?: string;
  /** Input requirement filter (e.g. "Two photos"). */
  requirement?: string;
  limit: number;
};

/** Include slug/title tokens for Professional rail fallback fill. */
const PROFESSIONAL_FALLBACK_INCLUDE =
  /linkedin|headshot|cv|passport|corporate|office/i;

/** Exclude glam/editorial false positives from the Professional catch-all category. */
const PROFESSIONAL_FALLBACK_EXCLUDE = /saree|bridal|triptych|glam/i;

/** Minimum curated hits before the Professional rail falls back to keyword fill. */
export const PROFESSIONAL_RAIL_FALLBACK_MIN = 8;

export function isProfessionalHeadshotFallback(
  slug: string,
  title: string,
): boolean {
  const haystack = `${slug} ${title}`;
  if (PROFESSIONAL_FALLBACK_EXCLUDE.test(haystack)) return false;
  return PROFESSIONAL_FALLBACK_INCLUDE.test(haystack);
}

/**
 * Keep curated order, then append fallback candidates until `limit`.
 * Fallback only runs when curated resolves fewer than {@link PROFESSIONAL_RAIL_FALLBACK_MIN}.
 */
export function mergeProfessionalRailStyles<T extends { id: string }>(
  curated: T[],
  fallbackCandidates: T[],
  limit: number,
): T[] {
  const capped = Math.min(Math.max(limit, 1), 24);
  if (curated.length >= Math.min(PROFESSIONAL_RAIL_FALLBACK_MIN, capped)) {
    return curated.slice(0, capped);
  }
  const seen = new Set(curated.map((style) => style.id));
  const extras = fallbackCandidates.filter((style) => !seen.has(style.id));
  return curated.concat(extras).slice(0, capped);
}

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
    href: "/guides/gemini-headshot-cv-photo-prompts",
    slugs: [
      "executive-corporate-linkedin-profile-picture-prompt-gemini",
      "black-blazer-linkedin-profile-picture-prompt-gemini-women",
      "charcoal-suit-corporate-linkedin-profile-picture-prompt-gemini-men",
      "hijab-office-linkedin-profile-picture-prompt-gemini-women",
      "navy-blazer-linkedin-profile-picture-prompt-gemini",
      "dupatta-office-linkedin-profile-picture-prompt-gemini-women",
      "cv-photo-ai-prompt-plain-background-resume-headshot",
      "passport-size-photo-ai-prompt-gemini-white-background",
      "modern-office-linkedin-profile-picture-prompt-gemini",
      "shalwar-kameez-linkedin-profile-picture-prompt-gemini-men",
      "outdoor-natural-light-linkedin-profile-picture-prompt-gemini",
      "home-office-linkedin-profile-picture-prompt-gemini",
    ],
    limit: 12,
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

/** Recently published styles — lazy rail, slim DTOs, no priority images. */
export const NEW_STYLES_RAIL = {
  id: "new-styles",
  title: "New styles",
  subtitle: "Fresh looks just added to the catalog.",
  href: "/explore?sort=Newest",
  limit: 12,
} as const;
