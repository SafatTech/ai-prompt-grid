import {
  EXPLORE_COLLECTION_KEYS,
  isExploreCollectionKey,
  type ExploreCollectionKey,
  stylesForCollection,
} from "@/lib/catalog/explore-collections";
import { resolveCatalogMediaUrl } from "@/lib/catalog/seed-asset-url";
import type { CatalogStyle } from "@/lib/catalog/types";

export type ExploreHeroTagTone =
  | "amber"
  | "teal"
  | "violet"
  | "rose"
  | "sky"
  | "lime";

export type ExploreHeroTag = {
  label: string;
  icon?: string;
  /** Collection or category / search key applied when the tag is clicked. */
  filter?: string;
  band: "top" | "bottom";
  countish?: boolean;
  tone?: ExploreHeroTagTone;
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

const TAG_TONES: readonly ExploreHeroTagTone[] = [
  "amber",
  "teal",
  "violet",
  "rose",
  "sky",
  "lime",
];

const MAX_TOP_TAGS = 3;
const MAX_BOTTOM_TAGS = 3;

/**
 * Static copy for the six hero moods. Counts and images are filled from the
 * live catalog; slides with fewer than 2 styles are omitted. The New slide
 * lede/tags/quick chips are overwritten from the newest styles' categories.
 */
export const EXPLORE_HERO_DEFS: readonly ExploreHeroSlideDef[] = [
  {
    key: "Trending",
    kicker: "Collection",
    mood: "trending",
    cta: "Browse trending",
    lede: "The looks people open first, from street fashion, saree editorials, travel, and festive portraits.",
    tags: [
      { label: "Hot", icon: "🔥", filter: "Trending", band: "top", tone: "rose" },
      { label: "Street Fashion", band: "top", tone: "amber" },
      { label: "Saree", filter: "Sari", band: "top", tone: "violet" },
      { label: "Anime", filter: "Anime", band: "bottom", tone: "sky" },
      { label: "Travel", filter: "Travel", band: "bottom", tone: "teal" },
      { label: "styles", filter: "Trending", band: "bottom", countish: true, tone: "lime" },
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
    lede: "The newest styles just added to the catalog.",
    tags: [
      { label: "New", filter: "New", band: "top", tone: "teal" },
      { label: "styles", filter: "New", band: "bottom", countish: true, tone: "lime" },
    ],
    quick: [
      { label: "Cinematic", key: "Cinematic" },
      { label: "Portraits", key: "Professional portraits" },
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
      { label: "Golden Saree", band: "top", tone: "amber" },
      { label: "Red Bangles", band: "top", tone: "rose" },
      { label: "Black & White", band: "top", tone: "sky" },
      { label: "Triptych", band: "bottom", tone: "violet" },
      { label: "Editorial", band: "bottom", tone: "teal" },
      { label: "styles", filter: "Sari", band: "bottom", countish: true, tone: "lime" },
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
      { label: "Diya", icon: "🪔", band: "top", tone: "amber" },
      { label: "Rangoli", band: "top", tone: "rose" },
      { label: "Couple", icon: "💑", band: "top", tone: "violet" },
      { label: "Sparklers", band: "bottom", tone: "sky" },
      { label: "Puja", band: "bottom", tone: "teal" },
      { label: "styles", filter: "Diwali", band: "bottom", countish: true, tone: "lime" },
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
      { label: "Snowflake", icon: "❄️", band: "top", tone: "sky" },
      { label: "Fog", band: "top", tone: "teal" },
      { label: "Shawl", band: "top", tone: "violet" },
      { label: "Snowfall", band: "bottom", tone: "amber" },
      { label: "Couple", band: "bottom", tone: "rose" },
      { label: "styles", filter: "Winter", band: "bottom", countish: true, tone: "lime" },
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
      { label: "Birthday", icon: "🎂", filter: "Birthday", band: "top", tone: "rose" },
      { label: "Pastel", band: "top", tone: "violet" },
      { label: "Collage", band: "top", tone: "amber" },
      { label: "Friends", band: "bottom", tone: "sky" },
      { label: "Partner", band: "bottom", tone: "teal" },
      { label: "styles", filter: "Birthday", band: "bottom", countish: true, tone: "lime" },
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

function styleHaystack(style: CatalogStyle): string {
  return [style.id, style.title, style.category, style.note, style.description]
    .join("\n")
    .toLowerCase();
}

/** Prefer themed collection labels when the newest styles match them. */
function themeLabelForStyle(style: CatalogStyle): string | null {
  const hay = styleHaystack(style);
  if (/\bsaree\b|\bsari\b|\bsarees\b/.test(hay)) return "Sari";
  if (/\bdiwali\b|\bdiya\b|\brangoli\b|\bphuljhadi\b/.test(hay)) return "Diwali";
  if (/\bwinter\b|\bsnowfall\b|\bsnow\b|\bfoggy\b|\bshawl\b/.test(hay)) return "Winter";
  if (/\bbirthday\b/.test(hay)) return "Birthday";
  return null;
}

function uniqueLabels(
  styles: CatalogStyle[],
  limit: number,
): Array<{ label: string; filter: string }> {
  const seen = new Set<string>();
  const out: Array<{ label: string; filter: string }> = [];
  for (const style of styles) {
    const theme = themeLabelForStyle(style);
    const label = theme ?? style.category;
    const filter = theme && isExploreCollectionKey(theme) ? theme : style.category;
    const key = label.toLowerCase();
    if (seen.has(key) || key === "new") continue;
    seen.add(key);
    out.push({ label, filter });
    if (out.length >= limit) break;
  }
  return out;
}

function assignTones(tags: ExploreHeroTag[]): ExploreHeroTag[] {
  return tags.map((tag, index) => ({
    ...tag,
    tone: tag.tone ?? TAG_TONES[index % TAG_TONES.length],
  }));
}

function clampSlideTags(tags: ExploreHeroTag[]): ExploreHeroTag[] {
  const top = tags.filter((tag) => tag.band !== "bottom").slice(0, MAX_TOP_TAGS);
  const bottomRaw = tags.filter((tag) => tag.band === "bottom");
  const count = bottomRaw.find((tag) => tag.countish);
  const bottomRest = bottomRaw
    .filter((tag) => !tag.countish)
    .slice(0, Math.max(0, MAX_BOTTOM_TAGS - (count ? 1 : 0)));
  return assignTones([...top, ...bottomRest, ...(count ? [count] : [])]);
}

function normalizeLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/^(professional\s+)/, "")
    .replace(/\s+and\s+objects$/, "")
    .replace(/\bsaree\b/g, "sari")
    .replace(/[^a-z0-9]+/g, "");
}

/** Keep colored pills and quick chips from repeating the same label. */
export function dedupeHeroPillsAndChips(
  tags: ExploreHeroTag[],
  quick: ExploreHeroQuickChip[],
): { tags: ExploreHeroTag[]; quick: ExploreHeroQuickChip[] } {
  const pillKeys = new Set(
    tags
      .filter((tag) => !tag.countish)
      .map((tag) => normalizeLabel(tag.label)),
  );
  const quickOut: ExploreHeroQuickChip[] = [];
  const used = new Set(pillKeys);
  for (const chip of quick) {
    const key = normalizeLabel(chip.label);
    if (used.has(key)) continue;
    used.add(key);
    quickOut.push(chip);
  }
  return { tags, quick: quickOut };
}

/** Build New-slide copy from the newest styles so future uploads stay accurate. */
export function buildNewHeroContent(newest: CatalogStyle[]): {
  lede: string;
  tags: ExploreHeroTag[];
  quick: ExploreHeroQuickChip[];
  blurb: string;
} {
  // Prefer themes from the leading newest pack, not the whole 24-item tail.
  const lead = newest.slice(0, Math.min(8, newest.length));
  const themes = uniqueLabels(lead, 3);
  const names = themes.map((entry) => entry.label);
  const primary = names[0] ?? "catalog";
  const lede =
    names.length === 0
      ? "The newest styles just added to the catalog."
      : names.length === 1
        ? `Fresh ${primary} looks just added to the catalog.`
        : names.length === 2
          ? `Fresh ${names[0]} and ${names[1]} looks just added to the catalog.`
          : `Fresh ${names[0]}, ${names[1]}, and ${names[2]} looks just added to the catalog.`;

  const topExtras = themes.slice(0, 2);
  const used = new Set(
    ["new", ...themes.map((entry) => entry.label.toLowerCase())],
  );
  const bottomExtras: Array<{ label: string; filter: string }> = [
    ...themes.slice(2, 3),
  ];
  for (const style of lead) {
    if (bottomExtras.length >= 2) break;
    const label = style.category;
    const key = label.toLowerCase();
    if (used.has(key)) continue;
    used.add(key);
    bottomExtras.push({ label, filter: label });
  }
  const rawTags = clampSlideTags([
    { label: "New", filter: "New", band: "top", tone: "teal" },
    ...topExtras.map((entry, index) => ({
      label: entry.label,
      filter: entry.filter,
      band: "top" as const,
      tone: TAG_TONES[(index + 2) % TAG_TONES.length],
    })),
    ...bottomExtras.map((entry, index) => ({
      label: entry.label,
      filter: entry.filter,
      band: "bottom" as const,
      tone: TAG_TONES[(index + 4) % TAG_TONES.length],
    })),
    {
      label: "styles",
      filter: "New",
      band: "bottom",
      countish: true,
      tone: "lime" as const,
    },
  ]);

  const quickSource = uniqueLabels(lead, 5);
  let quick = quickSource.map((entry) => ({
    label: entry.label,
    key: entry.filter,
  }));
  if (quick.length < 3) {
    for (const fallback of ["Cinematic", "Travel", "Anime"] as const) {
      if (quick.some((chip) => chip.key === fallback)) continue;
      quick.push({ label: fallback, key: fallback });
      if (quick.length >= 3) break;
    }
  }
  const deduped = dedupeHeroPillsAndChips(rawTags, quick);
  const tags = deduped.tags;
  quick = deduped.quick;
  if (quick.length < 2) {
    for (const fallback of [
      { label: "Travel", key: "Travel" },
      { label: "Vintage", key: "Vintage" },
      { label: "Fantasy", key: "Fantasy" },
    ]) {
      if (quick.some((chip) => normalizeLabel(chip.label) === normalizeLabel(fallback.label))) {
        continue;
      }
      if (tags.some((tag) => normalizeLabel(tag.label) === normalizeLabel(fallback.label))) {
        continue;
      }
      quick.push(fallback);
      if (quick.length >= 2) break;
    }
  }

  const blurb =
    names.length === 0
      ? "The most recently added styles in the catalog."
      : names.length === 1
        ? `Recently added ${primary} styles from the live catalog.`
        : `Recently added ${names.join(", ")} styles from the live catalog.`;

  return { lede, tags, quick, blurb };
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

    const dynamic =
      def.key === "New" ? buildNewHeroContent(list) : null;
    const baseTags = clampSlideTags(dynamic?.tags ?? def.tags);
    const countedTags = baseTags.map((tag) =>
      tag.countish
        ? { ...tag, label: `${list.length} ${styleWord(list.length)}` }
        : tag,
    );
    const { tags, quick } = dedupeHeroPillsAndChips(
      countedTags,
      dynamic?.quick?.length ? dynamic.quick : [...def.quick],
    );

    slides.push({
      ...def,
      lede: dynamic?.lede ?? def.lede,
      quick,
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
    const { blurb } = buildNewHeroContent(newest);
    banners.push({
      key: "New",
      badge: "New",
      badgeClass: "badge-new",
      toneClass: "promo-new",
      title: "Newly listed styles",
      blurb,
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
