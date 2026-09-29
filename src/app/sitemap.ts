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
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

/**
 * Google-facing sitemap of indexable public URLs only.
 * Excludes auth, library, creations, admin, and API routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const styles = await listPublishedStyleSitemapEntries();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const styleEntries: MetadataRoute.Sitemap = styles.map((style) => ({
    url: absoluteUrl(`/styles/${style.slug}`),
    lastModified: style.lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...styleEntries];
}
