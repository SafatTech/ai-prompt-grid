import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getPublishedStyles } from "@/lib/catalog/styles";
import {
  prepareGuideMarkdown,
  showsDraftGuides,
  type StyleMention,
} from "@/lib/guides/prepare";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export type Guide = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  draft: boolean;
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

/** Guides a visitor can open. Drafts are included only outside production. */
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

function parseGuideFile(file: string, styles: readonly StyleMention[]): Guide {
  const slug = file.slice(0, -".mdx".length);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${file}: slug must be lowercase words separated by hyphens`);
  }

  const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf8");
  const parsed = matter(raw);
  const data = parsed.data;

  return {
    slug,
    title: requireString(data.title, "title", file),
    description: requireString(data.description, "description", file),
    date: requireDate(data.date, "date", file),
    updated:
      data.updated == null
        ? requireDate(data.date, "date", file)
        : requireDate(data.updated, "updated", file),
    draft: requireDraft(data.draft, file),
    body: prepareGuideMarkdown(parsed.content, styles),
  };
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
