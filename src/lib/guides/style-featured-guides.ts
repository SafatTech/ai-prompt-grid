import type { StyleGuideLink } from "@/lib/catalog/style-seo-override-types";
import {
  STYLE_GUIDE_CARDS,
  STYLE_GUIDE_MEMBERSHIP,
} from "@/lib/guides/style-guide-index.generated";
import type { StyleGuideCardData } from "@/lib/guides/style-guide-index";

export type FeaturedGuidesBlock = {
  /** True when the style is linked from at least one published guide body. */
  readonly featured: boolean;
  readonly heading: string;
  readonly guides: readonly StyleGuideCardData[];
};

const MAX_FEATURED = 4;
const MAX_FALLBACK = 2;

/** Theme tokens shared across style titles and guide titles/tags/categories. */
const STOP_WORDS = new Set([
  "ai",
  "photo",
  "photos",
  "prompt",
  "prompts",
  "free",
  "gemini",
  "chatgpt",
  "editing",
  "edit",
  "copy",
  "paste",
  "for",
  "the",
  "and",
  "with",
  "from",
  "into",
  "your",
  "you",
  "this",
  "that",
  "look",
  "looks",
  "style",
  "styles",
  "image",
  "images",
  "portrait",
  "portraits",
]);

function themeTokens(...parts: string[]): Set<string> {
  const tokens = new Set<string>();
  for (const part of parts) {
    for (const raw of part.toLowerCase().split(/[^a-z0-9]+/)) {
      if (raw.length < 3 || STOP_WORDS.has(raw)) continue;
      tokens.add(raw);
    }
  }
  return tokens;
}

function guideSlugFromHref(href: string): string | null {
  const trimmed = href.trim();
  const match = /\/guides\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/i.exec(trimmed);
  return match?.[1] ?? null;
}

function cardForSlug(slug: string): StyleGuideCardData | undefined {
  return STYLE_GUIDE_CARDS[slug];
}

/**
 * Published guides that include this style (body `/styles/{id}` links),
 * merged with SEO `guideLinks`, deduped. Falls back to same-category/theme
 * guides when the style is not featured in any guide.
 */
export function featuredGuidesForStyle(input: {
  styleId: string;
  styleTitle: string;
  styleCategory: string;
  styleNote?: string | null;
  guideLinks?: readonly StyleGuideLink[];
}): FeaturedGuidesBlock {
  const seen = new Set<string>();
  const featured: StyleGuideCardData[] = [];

  const push = (slug: string) => {
    if (seen.has(slug)) return;
    const card = cardForSlug(slug);
    if (!card) return;
    seen.add(slug);
    featured.push(card);
  };

  for (const slug of STYLE_GUIDE_MEMBERSHIP[input.styleId] ?? []) {
    push(slug);
    if (featured.length >= MAX_FEATURED) break;
  }

  if (input.guideLinks) {
    for (const link of input.guideLinks) {
      const slug = guideSlugFromHref(link.href);
      if (!slug) continue;
      push(slug);
      if (featured.length >= MAX_FEATURED) break;
    }
  }

  if (featured.length > 0) {
    return {
      featured: true,
      heading: "Featured in these guides",
      guides: featured.slice(0, MAX_FEATURED),
    };
  }

  return {
    featured: false,
    heading: "You may also like these guides",
    guides: fallbackGuidesForStyle(input).slice(0, MAX_FALLBACK),
  };
}

/** Same guide-category / shared theme words when a style is not in any guide. */
export function fallbackGuidesForStyle(input: {
  styleId: string;
  styleTitle: string;
  styleCategory: string;
  styleNote?: string | null;
}): StyleGuideCardData[] {
  const styleTokens = themeTokens(
    input.styleTitle,
    input.styleCategory,
    input.styleNote ?? "",
  );
  const preferredGuideCategories = guideCategoriesForStyleTheme(
    input.styleTitle,
    input.styleCategory,
    input.styleNote ?? "",
  );

  const scored: Array<{ card: StyleGuideCardData; score: number }> = [];
  for (const card of Object.values(STYLE_GUIDE_CARDS)) {
    let score = 0;
    if (preferredGuideCategories.has(card.category)) score += 40;
    const guideTokens = themeTokens(
      card.title,
      card.description,
      card.category,
      ...card.tags,
    );
    let shared = 0;
    for (const token of styleTokens) {
      if (guideTokens.has(token)) shared += 1;
    }
    score += shared * 8;
    if (score <= 0) continue;
    scored.push({ card, score });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.card.title.localeCompare(b.card.title);
  });

  const picked = scored.slice(0, MAX_FALLBACK).map((item) => item.card);
  if (picked.length >= MAX_FALLBACK) return picked;

  // Absolute fallback: newest-feeling published guides by title stability.
  const rest = Object.values(STYLE_GUIDE_CARDS)
    .filter((card) => !picked.some((p) => p.slug === card.slug))
    .sort((a, b) => a.title.localeCompare(b.title));
  return [...picked, ...rest].slice(0, MAX_FALLBACK);
}

/**
 * Map style theme words / catalog category onto guide category slugs so
 * orphan styles still get thematically adjacent guide cards.
 */
export function guideCategoriesForStyleTheme(
  title: string,
  category: string,
  note = "",
): Set<string> {
  const hay = `${title} ${category} ${note}`.toLowerCase();
  const out = new Set<string>();

  if (/\b(diwali|christmas|halloween|festive|holiday)\b/.test(hay)) {
    out.add("festivals");
  }
  if (/\b(winter|snow|snowfall|cozy)\b/.test(hay)) out.add("seasonal");
  if (/\b(birthday|wedding|bridal|walima|mehndi)\b/.test(hay)) {
    out.add("occasions");
  }
  if (/\b(linkedin|cv|resume|headshot|passport|professional)\b/.test(hay)) {
    out.add("professional");
  }
  if (/\b(anime|luxury|lifestyle|painting)\b/.test(hay) || category === "Anime") {
    out.add("styles");
  }
  if (
    /\b(couple|family|merge|two photos|group)\b/.test(hay) ||
    category === "Couple"
  ) {
    out.add("couples-family");
  }
  if (
    /\b(80s|boys|stylish|outfit|trending|retro|vintage|saree|sari)\b/.test(hay) ||
    category === "Vintage" ||
    category === "Retro"
  ) {
    out.add("trends");
  }

  if (out.size === 0) {
    if (category === "Professional portraits") out.add("professional");
    else if (category === "Travel" || category === "Cinematic") out.add("trends");
    else out.add("styles");
  }
  return out;
}

/** Style ids that share at least one published guide with `styleId`. */
export function styleIdsSharingGuide(styleId: string): ReadonlySet<string> {
  const guides = STYLE_GUIDE_MEMBERSHIP[styleId];
  if (!guides?.length) return new Set();
  const peers = new Set<string>();
  for (const [otherId, otherGuides] of Object.entries(STYLE_GUIDE_MEMBERSHIP)) {
    if (otherId === styleId) continue;
    if (otherGuides.some((slug) => guides.includes(slug))) peers.add(otherId);
  }
  return peers;
}

export function publishedGuideSlugsForStyle(styleId: string): readonly string[] {
  return STYLE_GUIDE_MEMBERSHIP[styleId] ?? [];
}
