import Link from "next/link";
import { GuideCard } from "@/components/guides/guide-card";
import { GuideCategoryChips } from "@/components/guides/guide-category-chips";
import { GuideFeatured } from "@/components/guides/guide-featured";
import { GuideTextCard } from "@/components/guides/guide-text-card";
import { GuidesCta } from "@/components/guides/guides-cta";
import { GuidesSearchForm } from "@/components/guides/guides-search-form";
import {
  GUIDE_CATEGORIES,
  type GuideCategorySlug,
} from "@/lib/guides/categories";
import { listIndexableGuides, type Guide } from "@/lib/guides/load";
import { canonicalGuideUrl } from "@/lib/guides/prepare";
import { absoluteUrl } from "@/lib/site-url";

export const GUIDES_PAGE_SIZE = 6;
export const GUIDES_INDEX_TITLE = "Latest AI photo prompt guides";
export const GUIDES_INDEX_DESCRIPTION =
  "Copy-paste prompt guides for Gemini and ChatGPT. Every prompt is tested on real photos, with before and after examples.";

/** How many listing pages exist for the published guide set. */
export function listGuidesPageNumbers(): number[] {
  const guides = listIndexableGuides();
  if (guides.length === 0) return [1];
  const remaining = Math.max(0, guides.length - 1);
  const total = Math.max(1, Math.ceil(remaining / GUIDES_PAGE_SIZE));
  return Array.from({ length: total }, (_, i) => i + 1);
}

export function GuidesIndex({ page }: { page: number }) {
  const guides = listIndexableGuides();
  const populated = new Set(
    GUIDE_CATEGORIES.filter((category) =>
      guides.some((guide) => guide.category === category.slug),
    ).map((category) => category.slug),
  ) as Set<GuideCategorySlug>;

  // Featured is always guides[0]; page 2+ must page through the rest only
  // so the last card on page 1 is not repeated.
  const featured = page === 1 ? guides[0] : undefined;
  const remaining = guides.slice(1);
  const start = (page - 1) * GUIDES_PAGE_SIZE;
  const pageGuides = remaining.slice(start, start + GUIDES_PAGE_SIZE);
  const hasMore = start + GUIDES_PAGE_SIZE < remaining.length;

  const recentlyUpdated = [...guides]
    .sort((a, b) => {
      if (a.updated !== b.updated) return a.updated < b.updated ? 1 : -1;
      return a.title.localeCompare(b.title);
    })
    .slice(0, 4);

  const listedForJsonLd: Guide[] = [
    ...(featured ? [featured] : []),
    ...pageGuides,
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: canonicalGuideUrl(),
      },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: listedForJsonLd.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/guides/${guide.slug}`),
      name: guide.title,
    })),
  };

  return (
    <div className="guides-list-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListLd).replace(/</g, "\\u003c"),
        }}
      />

      {featured ? <GuideFeatured guide={featured} /> : null}

      <section className="guides-latest">
        <div className="guides-wrap">
          <div className="guides-latest-title-row">
            <h1>{GUIDES_INDEX_TITLE}</h1>
            <GuidesSearchForm />
          </div>
          <p className="guides-latest-intro">{GUIDES_INDEX_DESCRIPTION}</p>
          <GuideCategoryChips active="all" populated={populated} />

          {guides.length === 0 ? (
            <p className="mt-10 text-[15px] leading-relaxed text-[var(--muted)]">
              New guides are in review. Nothing is published yet.
            </p>
          ) : (
            <>
              <h2 className="sr-only">Guide articles</h2>
              <div className="guides-grid">
                {pageGuides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
              {hasMore ? (
                <div className="guides-more">
                  <Link href={`/guides?page=${page + 1}`}>View more guides</Link>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {recentlyUpdated.length > 0 ? (
        <section className="guides-updated">
          <div className="guides-wrap">
            <h2>Recently updated</h2>
            <p className="guides-updated-sub">
              Prompts we re-tested this week, with the latest Gemini and ChatGPT models.
            </p>
            <div className="guides-updated-grid">
              {recentlyUpdated.map((guide) => (
                <GuideTextCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <GuidesCta />
    </div>
  );
}
