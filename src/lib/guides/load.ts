import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getPublishedStyles } from "@/lib/catalog/styles";
import {
  getGuideCategory,
  isGuideCategorySlug,
  type GuideCategorySlug,
} from "@/lib/guides/categories";
import {
  prepareGuideMarkdown,
  showsDraftGuides,
  type GuideHeroImage,
  type GuideOgImage,
  type StyleMention,
} from "@/lib/guides/prepare";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");
const DEFAULT_AUTHOR = "Safat Tech";

export type Guide = {
  slug: string;
  /** Meta title from frontmatter. Kept separate from the visible heading. */
  title: string;
  /** Visible H1. Writer files set `h1`; otherwise the meta title is used. */
  heading: string;
  description: string;
  date: string;
  updated: string;
  draft: boolean;
  /** When true, the article shows the “Tested prompts” badge. */
  promptsTested: boolean;
  /** Category slug from `GUIDE_CATEGORIES`. Required for published guides. */
  category: GuideCategorySlug;
  /** Optional topic tags for list cards (1–3). */
  tags: string[];
  /** Display byline. Defaults to Safat Tech. */
  author: string;
  /** Count of `###` headings in the body, or a front-matter override. */
  promptCount: number;
  /** Estimated minutes; at least 3 for list pages. */
  readMinutes: number;
  /** Optional SEO keywords used by list search. */
  primaryKeyword?: string;
  secondaryKeywords: string[];
  /** Social card from frontmatter. Absent guides fall back to the body hero. */
  ogImage?: GuideOgImage;
  /**
   * Full-bleed article hero. Absent guides fall back to `ogImage`, then a
   * gradient — never an auto-picked inline body image.
   */
  heroImage?: GuideHeroImage;
  /** Markdown body with the duplicate H1 removed and placeholders normalized. */
  body: string;
};

let productionCache: Guide[] | null = null;

export function loadAllGuides(): Guide[] {
  if (process.env.NODE_ENV === "production" && productionCache) return productionCache;

  if (!fs.existsSync(GUIDES_DIR)) return [];

  const styles = styleMentions();
  const guides = fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseGuideFile(file, styles))
    .sort(compareGuides);

  if (process.env.NODE_ENV === "production") productionCache = guides;
  return guides;
}

/** Published guides only. Safe for the sitemap and production links. */
export function listIndexableGuides(): Guide[] {
  return loadAllGuides().filter((guide) => !guide.draft);
}

/** Guides a visitor can open. Drafts are included in local dev and on Vercel previews. */
export function listVisibleGuides(): Guide[] {
  const showDrafts = showsDraftGuides();
  return loadAllGuides().filter((guide) => !guide.draft || showDrafts);
}

export function getGuide(slug: string): Guide | undefined {
  return loadAllGuides().find((guide) => guide.slug === slug);
}

export function visibleGuideSlugs(): Set<string> {
  return new Set(listVisibleGuides().map((guide) => guide.slug));
}

export function listGuidesByCategory(slug: GuideCategorySlug): Guide[] {
  return listVisibleGuides().filter((guide) => guide.category === slug);
}

export function listIndexableGuidesByCategory(slug: GuideCategorySlug): Guide[] {
  return listIndexableGuides().filter((guide) => guide.category === slug);
}

/** Categories that currently have at least one visible guide. */
export function listPopulatedGuideCategories() {
  const counts = new Map<GuideCategorySlug, number>();
  for (const guide of listVisibleGuides()) {
    counts.set(guide.category, (counts.get(guide.category) ?? 0) + 1);
  }
  return counts;
}

/**
 * Case-insensitive substring search over title, description, tags, and keywords.
 */
export function searchGuides(query: string, guides = listVisibleGuides()): Guide[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return guides;
  return guides.filter((guide) => {
    const haystack = [
      guide.title,
      guide.description,
      guide.primaryKeyword ?? "",
      ...guide.tags,
      ...guide.secondaryKeywords,
      getGuideCategory(guide.category)?.label ?? "",
    ]
      .join("\n")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function countPromptHeadings(markdown: string): number {
  const matches = markdown.match(/^###\s+\S/gm);
  return matches?.length ?? 0;
}

/** List/card reading time: at least 3 minutes. */
export function estimateGuideListReadMinutes(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[#>*_`~-]/g, " ");
  const words = plain.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 220));
}

function parseGuideFile(file: string, styles: readonly StyleMention[]): Guide {
  const slug = file.slice(0, -".mdx".length);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${file}: slug must be lowercase words separated by hyphens`);
  }

  const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf8");
  const parsed = matter(raw);
  const data = parsed.data;
  const body = prepareGuideMarkdown(parsed.content, styles);

  const title = requireString(data.title, "title", file);
  const draft = requireDraft(data.draft, file);
  const category = requireCategory(data.category, draft, file);
  const promptOverride = optionalPositiveInt(data.promptCount, "promptCount", file);

  return {
    slug,
    title,
    heading: optionalString(data.h1) ?? title,
    description: requireString(data.description, "description", file),
    date: requireDate(data.date, "date", file),
    updated:
      data.updated == null
        ? requireDate(data.date, "date", file)
        : requireDate(data.updated, "updated", file),
    draft,
    promptsTested: requireOptionalBoolean(data.promptsTested, "promptsTested", file),
    category,
    tags: parseTags(data.tags, file),
    author: optionalString(data.author) ?? DEFAULT_AUTHOR,
    promptCount: promptOverride ?? countPromptHeadings(body),
    readMinutes: estimateGuideListReadMinutes(body),
    primaryKeyword: optionalString(data.primaryKeyword),
    secondaryKeywords: parseStringArray(data.secondaryKeywords, "secondaryKeywords", file),
    ogImage: parseGuideOgImage(data.ogImage, file),
    heroImage: parseGuideHeroImage(data.heroImage, file),
    body,
  };
}

/** Optional `heroImage` frontmatter. Missing means fall back to ogImage/gradient. */
export function parseGuideHeroImage(
  value: unknown,
  file: string,
): GuideHeroImage | undefined {
  if (value == null) return undefined;
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new Error(
      `${file}: frontmatter heroImage must be an object with url and alt`,
    );
  }
  const record = value as Record<string, unknown>;
  const url = requireString(record.url, "heroImage.url", file);
  if (url.startsWith("//") || url.includes("..")) {
    throw new Error(
      `${file}: frontmatter heroImage.url must not be protocol-relative or contain ..`,
    );
  }
  if (!url.startsWith("/") && !/^https?:\/\//i.test(url)) {
    throw new Error(
      `${file}: frontmatter heroImage.url must be a root-relative or absolute URL`,
    );
  }
  const focus = optionalString(record.focus);
  const position = optionalString(record.position) ?? focus;
  if (position && !/^[\w%.\s,-]+$/u.test(position)) {
    throw new Error(
      `${file}: frontmatter heroImage.position must be a CSS object-position value`,
    );
  }
  const width = optionalPositiveInt(record.width, "heroImage.width", file);
  const height = optionalPositiveInt(record.height, "heroImage.height", file);
  return {
    url,
    alt: requireString(record.alt, "heroImage.alt", file),
    ...(position ? { position } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };
}

/** Optional `ogImage` frontmatter. Missing means use the body fallback. */
export function parseGuideOgImage(
  value: unknown,
  file: string,
): GuideOgImage | undefined {
  if (value == null) return undefined;
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new Error(
      `${file}: frontmatter ogImage must be an object with url, width, height and alt`,
    );
  }
  const record = value as Record<string, unknown>;
  const url = requireString(record.url, "ogImage.url", file);
  if (url.startsWith("//") || url.includes("..")) {
    throw new Error(
      `${file}: frontmatter ogImage.url must not be protocol-relative or contain ..`,
    );
  }
  if (!url.startsWith("/") && !/^https?:\/\//i.test(url)) {
    throw new Error(
      `${file}: frontmatter ogImage.url must be a root-relative or absolute URL`,
    );
  }
  return {
    url,
    width: requirePositiveInt(record.width, "ogImage.width", file),
    height: requirePositiveInt(record.height, "ogImage.height", file),
    alt: requireString(record.alt, "ogImage.alt", file),
  };
}

function requireCategory(
  value: unknown,
  draft: boolean,
  file: string,
): GuideCategorySlug {
  if (value == null) {
    if (draft) {
      // Drafts without a category still need a slug for typing; treat as styles.
      return "styles";
    }
    throw new Error(
      `${file}: frontmatter category is required for published guides`,
    );
  }
  if (typeof value !== "string" || !isGuideCategorySlug(value)) {
    throw new Error(
      `${file}: frontmatter category must be one of ${GUIDE_CATEGORY_SLUGS.join(", ")}`,
    );
  }
  return value;
}

const GUIDE_CATEGORY_SLUGS = [
  "festivals",
  "couples-family",
  "trends",
  "seasonal",
  "occasions",
  "professional",
  "styles",
] as const;

function parseTags(value: unknown, file: string): string[] {
  if (value == null) return [];
  const tags = parseStringArray(value, "tags", file);
  if (tags.length > 3) {
    throw new Error(`${file}: frontmatter tags must have at most 3 items`);
  }
  return tags;
}

function parseStringArray(value: unknown, field: string, file: string): string[] {
  if (value == null) return [];
  if (!Array.isArray(value)) {
    throw new Error(`${file}: frontmatter ${field} must be an array of strings`);
  }
  return value.map((item, index) => {
    if (typeof item !== "string" || item.trim() === "") {
      throw new Error(
        `${file}: frontmatter ${field}[${index}] must be a non-empty string`,
      );
    }
    return item.trim();
  });
}

function requirePositiveInt(value: unknown, field: string, file: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new Error(`${file}: frontmatter ${field} must be a positive integer`);
  }
  return value;
}

function optionalPositiveInt(
  value: unknown,
  field: string,
  file: string,
): number | undefined {
  if (value == null) return undefined;
  return requirePositiveInt(value, field, file);
}

function optionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function requireString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file}: frontmatter ${field} must be a non-empty string`);
  }
  return value.trim();
}

function requireDraft(value: unknown, file: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`${file}: frontmatter draft must be true or false`);
  }
  return value;
}

function requireOptionalBoolean(
  value: unknown,
  field: string,
  file: string,
): boolean {
  if (value == null) return false;
  if (typeof value !== "boolean") {
    throw new Error(`${file}: frontmatter ${field} must be true or false`);
  }
  return value;
}

function requireDate(value: unknown, field: string, file: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  throw new Error(`${file}: frontmatter ${field} must be YYYY-MM-DD`);
}

function styleMentions(): StyleMention[] {
  return getPublishedStyles().map((style) => ({ id: style.id, title: style.title }));
}

function compareGuides(a: Guide, b: Guide): number {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.title.localeCompare(b.title);
}
