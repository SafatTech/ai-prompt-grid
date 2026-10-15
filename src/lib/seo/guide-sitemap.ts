import type { MetadataRoute } from "next";
import { GUIDE_CATEGORIES, isGuideCategorySlug } from "@/lib/guides/categories";
import { absoluteUrl } from "@/lib/site-url";

export type GuideSitemapSource = {
  slug: string;
  updated?: string;
  category?: string;
};

function safeLastModified(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

/**
 * Indexable guide URLs. An empty list means every guide is still a draft, so
 * `/guides` stays out of the sitemap until something is published.
 * Category index pages are included when they have at least one published guide.
 */
export function guideSitemapEntries(
  guides: readonly GuideSitemapSource[],
  now: Date,
): MetadataRoute.Sitemap {
  const published = guides.filter((guide) => guide.slug.trim().length > 0);
  if (published.length === 0) return [];

  const categorySlugs = new Set<string>();
  for (const guide of published) {
    const category = guide.category?.trim() ?? "";
    if (category && isGuideCategorySlug(category)) categorySlugs.add(category);
  }

  const categoryEntries = GUIDE_CATEGORIES.filter((category) =>
    categorySlugs.has(category.slug),
  ).map((category) => ({
    url: absoluteUrl(`/guides/category/${category.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [
    {
      url: absoluteUrl("/guides"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...categoryEntries,
    ...published.map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug.trim()}`),
      lastModified: safeLastModified(guide.updated, now),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
