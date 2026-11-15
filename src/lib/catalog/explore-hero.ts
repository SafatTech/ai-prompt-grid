import {
  EXPLORE_COLLECTION_KEYS,
  type ExploreCollectionKey,
  stylesForCollection,
} from "@/lib/catalog/explore-collections";
import { resolveCatalogMediaUrl } from "@/lib/catalog/seed-asset-url";
import type { CatalogStyle } from "@/lib/catalog/types";

export type ExploreHeroTag = {
  label: string;
  hash?: boolean;
  icon?: string;
  /** Collection or category / search key applied when the tag is clicked. */
  filter?: string;
  band: "top" | "bottom";
  countish?: boolean;
};

export type ExploreHeroQuickChip = {
  label: string;
  key: string;
};

export type ExploreHeroSlideDef = {
  key: ExploreCollectionKey;
  kicker: string;
  mood: string;
  cta: string;
  lede: string;
  tags: ExploreHeroTag[];
  quick: ExploreHeroQuickChip[];
};

export type ExploreHeroSlide = ExploreHeroSlideDef & {
  count: number;
  stats: string;
  /** Blurred background + collage images from live catalog styles. */
  styles: Array<{
    id: string;
    title: string;
    result: string;
  }>;
  bg: string;
};

/**
 * Static copy for the six hero moods. Counts and images are filled from the
 * live catalog; slides with fewer than 2 styles are omitted.
 */
export const EXPLORE_HERO_DEFS: readonly ExploreHeroSlideDef[] = [
  {
    key: "Trending",
    kicker: "Collection",
    mood: "trending",
    cta: "Browse trending",
    lede: "The looks people open first, from street fashion, saree editorials, travel, and festive portraits.",
    tags: [
      { label: "Hot", hash: true, icon: "🔥", filter: "Trending", band: "top" },
      { label: "Street Fashion", hash: true, band: "top" },
      { label: "Saree", hash: true, filter: "Sari", band: "top" },
      { label: "Travel", hash: true, filter: "Travel", band: "top" },
      { label: "Anime", hash: true, filter: "Anime", band: "bottom" },
      { label: "Comic Book", hash: true, band: "bottom" },
      { label: "styles", filter: "Trending", band: "bottom", countish: true },
    ],
    quick: [
      { label: "Cinematic", key: "Cinematic" },
      { label: "Portraits", key: "Professional portraits" },
      { label: "Vintage", key: "Vintage" },
      { label: "Fantasy", key: "Fantasy" },
      { label: "Product", key: "Product and objects" },
    ],
  },
  {
    key: "New",
    kicker: "Collection",
    mood: "new",
    cta: "Browse new styles",
    lede: "Fresh winter portraits, new Diwali family frames, and pinned seasonal looks just added to the catalog.",
    tags: [
      { label: "New", hash: true, icon: "✨", filter: "New", band: "top" },
      { label: "Winter", hash: true, filter: "Winter", band: "top" },
      { label: "Diwali", hash: true, filter: "Diwali", band: "top" },
      { label: "Snowflake", hash: true, band: "top" },
      { label: "Family", hash: true, band: "bottom" },
      { label: "Fog", hash: true, band: "bottom" },
      { label: "styles", filter: "New", band: "bottom", countish: true },
    ],
    quick: [
      { label: "Winter", key: "Winter" },
      { label: "Diwali", key: "Diwali" },
      { label: "Cinematic", key: "Cinematic" },
      { label: "Anime", key: "Anime" },
      { label: "Travel", key: "Travel" },
    ],
  },
  {
    key: "Sari",
    kicker: "Category",
    mood: "sari",
    cta: "Browse Sari styles",
    lede: "South Asian editorial portraits in gold, courtyard light, red bangles, and black-and-white storyboards.",
    tags: [
      { label: "Golden Saree", hash: true, band: "top" },
      { label: "Red Bangles", hash: true, band: "top" },
      { label: "Black & White", hash: true, band: "top" },
      { label: "Royal Blue", hash: true, band: "top" },
      { label: "Triptych", hash: true, band: "bottom" },
      { label: "Editorial", hash: true, band: "bottom" },
      { label: "Courtyard", hash: true, band: "bottom" },
      { label: "styles", filter: "Sari", band: "bottom", countish: true },
    ],
    quick: [
      { label: "Portraits", key: "Professional portraits" },
      { label: "Trending", key: "Trending" },
      { label: "Sari", key: "Sari" },
    ],
  },
  {
    key: "Diwali",
    kicker: "Category",
    mood: "diwali",
    cta: "Browse Diwali styles",
    lede: "Couples, families, and festival nights, with diyas, rangoli, sparklers, and puja doorways ready to copy.",
    tags: [
      { label: "Diya", hash: true, icon: "🪔", band: "top" },
      { label: "Rangoli", hash: true, band: "top" },
      { label: "Couple", hash: true, icon: "💑", band: "top" },
      { label: "Family", hash: true, band: "top" },
      { label: "Sparklers", hash: true, band: "bottom" },
      { label: "Phuljhadi", hash: true, band: "bottom" },
      { label: "Puja", hash: true, band: "bottom" },
      { label: "styles", filter: "Diwali", band: "bottom", countish: true },
    ],
    quick: [
      { label: "Fantasy", key: "Fantasy" },
      { label: "Cinematic", key: "Cinematic" },
      { label: "New", key: "New" },
      { label: "Portraits", key: "Professional portraits" },
    ],
  },
  {
    key: "Winter",
    kicker: "Category",
    mood: "winter",
    cta: "Browse Winter styles",
    lede: "Foggy streets, snowfall close-ups, shared shawls, pine forests, and chai-side winter portraits.",
    tags: [
      { label: "Snowflake", hash: true, icon: "❄️", band: "top" },
      { label: "Fog", hash: true, band: "top" },
      { label: "Shawl", hash: true, band: "top" },
      { label: "Pine Forest", hash: true, icon: "🌲", band: "top" },
      { label: "Chai", hash: true, band: "bottom" },
      { label: "Snowfall", hash: true, band: "bottom" },
      { label: "Couple", hash: true, band: "bottom" },
      { label: "styles", filter: "Winter", band: "bottom", countish: true },
    ],
    quick: [
      { label: "New", key: "New" },
      { label: "Cinematic", key: "Cinematic" },
      { label: "Travel", key: "Travel" },
    ],
  },
  {
    key: "Birthday",
    kicker: "Category",
    mood: "birthday",
    cta: "Browse Birthday styles",
    lede: "Pastel scrapbook collages, cake-table portraits, and party looks ready to copy for friends or a partner.",
    tags: [
      { label: "Birthday", hash: true, icon: "🎂", filter: "Birthday", band: "top" },
      { label: "Pastel", hash: true, band: "top" },
      { label: "Collage", hash: true, band: "top" },
      { label: "Friends", hash: true, band: "bottom" },
      { label: "Partner", hash: true, band: "bottom" },
      { label: "styles", filter: "Birthday", band: "bottom", countish: true },
    ],
    quick: [
      { label: "Vintage", key: "Vintage" },
      { label: "Trending", key: "Trending" },
    ],
  },
];

const MIN_SLIDE_STYLES = 2;

function promptWord(count: number): string {
  return count === 1 ? "prompt" : "prompts";
}

function styleWord(count: number): string {
  return count === 1 ? "style" : "styles";
}

export function buildExploreHeroSlides(
  published: CatalogStyle[],
): ExploreHeroSlide[] {
  const slides: ExploreHeroSlide[] = [];
  for (const def of EXPLORE_HERO_DEFS) {
    const list = stylesForCollection(published, def.key).filter((s) => s.result);
    if (list.length < MIN_SLIDE_STYLES) continue;
    const collageCount = Math.min(list.length === 1 ? 1 : 6, list.length);
    const collage = list.slice(0, collageCount).map((style) => ({
      id: style.id,
      title: style.title,
      result: resolveCatalogMediaUrl(style.result),
    }));
    const tags = def.tags.map((tag) =>
      tag.countish
        ? { ...tag, label: `${list.length} ${styleWord(list.length)}` }
        : tag,
    );
    slides.push({
      ...def,
      tags,
      count: list.length,
      stats: `${list.length} ${promptWord(list.length)} · Free · Works with Gemini & ChatGPT`,
      styles: collage,
      bg: collage[0]?.result ?? resolveCatalogMediaUrl(list[0].result),
    });
  }
  // Preserve declared order even if some keys were skipped.
  const order = new Map(EXPLORE_COLLECTION_KEYS.map((key, i) => [key, i]));
  slides.sort((a, b) => (order.get(a.key) ?? 99) - (order.get(b.key) ?? 99));
  return slides;
}

export type ExplorePromoBanner = {
  key: ExploreCollectionKey;
  badge: string;
  badgeClass: "badge-hot" | "badge-new";
  toneClass: "promo-trending" | "promo-new";
  title: string;
  blurb: string;
  count: number;
  thumbs: Array<{ id: string; result: string; title: string }>;
};

export function buildExplorePromoBanners(
  published: CatalogStyle[],
): ExplorePromoBanner[] {
  const trending = stylesForCollection(published, "Trending").filter((s) => s.result);
  const newest = stylesForCollection(published, "New").filter((s) => s.result);
  const banners: ExplorePromoBanner[] = [];
  if (trending.length >= 1) {
    banners.push({
      key: "Trending",
      badge: "Hot",
      badgeClass: "badge-hot",
      toneClass: "promo-trending",
      title: "Trending styles",
      blurb:
        "Looks people browse first, including official trending ranks.",
      count: trending.length,
      thumbs: trending.slice(0, 5).map((s) => ({
        id: s.id,
        result: resolveCatalogMediaUrl(s.result),
        title: s.title,
      })),
    });
  }
  if (newest.length >= 1) {
    banners.push({
      key: "New",
      badge: "New",
      badgeClass: "badge-new",
      toneClass: "promo-new",
      title: "Newly listed styles",
      blurb:
        "Recent winter portraits, new Diwali family frames, and pinned new looks.",
      count: newest.length,
      thumbs: newest.slice(0, 5).map((s) => ({
        id: s.id,
        result: resolveCatalogMediaUrl(s.result),
        title: s.title,
      })),
    });
  }
  return banners;
}
