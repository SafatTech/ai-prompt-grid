import type { MetadataRoute } from "next";
import { listPublishedStyleSitemapEntries } from "@/lib/catalog/repository";
import { absoluteUrl } from "@/lib/site-url";

/** Refresh catalog URLs hourly so newly published styles appear for crawlers. */
export const revalidate = 3600;

const STATIC_PAGES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/explore", changeFrequency: "daily", priority: 0.9 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

function safeLastModified(value: Date | string | number | undefined): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
}

/**
 * Google-facing sitemap of indexable public URLs only.
 * Excludes auth, library, creations, admin, and API routes.
 * Always returns static pages even if the catalog query fails.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  let styleEntries: MetadataRoute.Sitemap = [];
  try {
    const styles = await listPublishedStyleSitemapEntries();
    const seen = new Set<string>();

    styleEntries = styles
      .filter((style) => {
        const slug = style.slug?.trim();
        if (!slug || seen.has(slug)) return false;
        seen.add(slug);
        return true;
      })
      .map((style) => ({
        url: absoluteUrl(`/styles/${style.slug.trim()}`),
        lastModified: safeLastModified(style.lastModified),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch (err) {
    console.warn("[sitemap] Style entries unavailable; serving static URLs only.", err);
  }

  return [...staticEntries, ...styleEntries];
}
