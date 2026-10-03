import type { MetadataRoute } from "next";
import { listPublishedStyleSitemapEntries } from "@/lib/catalog/repository";
import { publishedGuides } from "@/lib/guides/published-slugs.generated";
import { guideSitemapEntries } from "@/lib/seo/guide-sitemap";
import { dedupedStylePaths, explorePaginationPaths } from "@/lib/seo/public-paths";
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
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
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
 * Always returns static pages even if the catalog query or guide manifest fails.
 *
 * Guide URLs come from the build-time published manifest (draft: false only).
 * Skipping the guide body pipeline is defensive hardening. It is not a
 * confirmed explanation of the production 500s.
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
  let explorePageEntries: MetadataRoute.Sitemap = [];
  try {
    const styles = await listPublishedStyleSitemapEntries();
    const lastModifiedBySlug = new Map<string, Date>();
    for (const style of styles) {
      const slug = style.slug?.trim();
      if (!slug || lastModifiedBySlug.has(slug)) continue;
      lastModifiedBySlug.set(slug, safeLastModified(style.lastModified));
    }

    styleEntries = dedupedStylePaths([...lastModifiedBySlug.keys()]).map((path) => ({
      url: absoluteUrl(path),
      lastModified: lastModifiedBySlug.get(path.slice("/styles/".length)) ?? now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    explorePageEntries = explorePaginationPaths(styleEntries.length).map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.5,
    }));
  } catch (err) {
    console.warn("[sitemap] Style entries unavailable; serving static URLs only.", err);
  }

  let guideEntries: MetadataRoute.Sitemap = [];
  try {
    guideEntries = guideSitemapEntries(publishedGuides, now);
  } catch (err) {
    console.warn(
      "[sitemap] Guide entries unavailable; serving the rest of the sitemap.",
      err,
    );
  }

  return [...staticEntries, ...explorePageEntries, ...guideEntries, ...styleEntries];
}
