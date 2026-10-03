import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

export type GuideSitemapSource = {
  slug: string;
  updated?: string;
};

function safeLastModified(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

/**
 * Indexable guide URLs. An empty list means every guide is still a draft, so
 * `/guides` stays out of the sitemap until something is published.
 */
export function guideSitemapEntries(
  guides: readonly GuideSitemapSource[],
  now: Date,
): MetadataRoute.Sitemap {
  const published = guides.filter((guide) => guide.slug.trim().length > 0);
  if (published.length === 0) return [];

  return [
    {
      url: absoluteUrl("/guides"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...published.map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug.trim()}`),
      lastModified: safeLastModified(guide.updated, now),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
