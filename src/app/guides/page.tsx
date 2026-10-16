import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/guides/guide-card";
import { GuideCategoryChips } from "@/components/guides/guide-category-chips";
import { GuideFeatured } from "@/components/guides/guide-featured";
import { GuideTextCard } from "@/components/guides/guide-text-card";
import { GuidesCta } from "@/components/guides/guides-cta";
import { GuidesSearchForm } from "@/components/guides/guides-search-form";
// AdSlot kept in src/components/ad-slot.tsx for post-AdSense approval; not rendered yet.
import type { GuideCategorySlug } from "@/lib/guides/categories";
import {
  listIndexableGuides,
  listPopulatedGuideCategories,
  listVisibleGuides,
  type Guide,
} from "@/lib/guides/load";
import {
  canonicalGuideUrl,
  defaultOgImage,
  documentTitle,
} from "@/lib/guides/prepare";
import { absoluteUrl } from "@/lib/site-url";

const PAGE_SIZE = 6;
const title = "Latest AI photo prompt guides";
const description =
  "Copy-paste prompt guides for Gemini and ChatGPT. Every prompt is tested on real photos, with before and after examples.";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

function parsePage(value: string | undefined): number {
  return Math.max(1, Number.parseInt(value ?? "1", 10) || 1);
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = parsePage((await searchParams).page);
  const canonical =
    page > 1 ? absoluteUrl(`/guides?page=${page}`) : canonicalGuideUrl();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: documentTitle(title),
      description,
      url: canonical,
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle(title),
      description,
      images: [defaultOgImage],
    },
    robots: listIndexableGuides().length > 0 ? undefined : { index: false, follow: true },
  };
}

export default async function GuidesIndexPage({ searchParams }: Props) {
  const page = parsePage((await searchParams).page);
  const guides = listVisibleGuides();
  const showingDrafts = guides.some((guide) => guide.draft);
  const populated = new Set(
    [...listPopulatedGuideCategories().keys()] as GuideCategorySlug[],
  );

  const featured = page === 1 ? guides[0] : undefined;
  const remaining = featured ? guides.slice(1) : guides;
  const start = (page - 1) * PAGE_SIZE;
  const pageGuides = remaining.slice(start, start + PAGE_SIZE);
  const hasMore = start + PAGE_SIZE < remaining.length;

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

      {showingDrafts ? (
        <div className="guides-wrap pt-6">
          <p className="m-0 rounded-2xl border border-dashed border-[#8b6cff] bg-[#15151E] px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
            Draft preview. These guides stay off the public index, sitemap, and production
            URLs until <code className="text-[var(--text)]">draft</code> is set to{" "}
            <code className="text-[var(--text)]">false</code>.
          </p>
        </div>
      ) : null}

      {featured ? <GuideFeatured guide={featured} /> : null}

      <section className="guides-latest">
        <div className="guides-wrap">
          <div className="guides-latest-title-row">
            <h1>{title}</h1>
            <GuidesSearchForm />
          </div>
          <p className="guides-latest-intro">{description}</p>
          <GuideCategoryChips active="all" populated={populated} />

          {guides.length === 0 ? (
            <p className="mt-10 text-[15px] leading-relaxed text-[var(--muted)]">
              New guides are in review. Nothing is published yet.
            </p>
          ) : (
            <>
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
