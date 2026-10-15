import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/guides/guide-card";
import { GuideCategoryChips } from "@/components/guides/guide-category-chips";
import { GuidesCta } from "@/components/guides/guides-cta";
import { GuidesSearchForm } from "@/components/guides/guides-search-form";
import type { GuideCategorySlug } from "@/lib/guides/categories";
import {
  listPopulatedGuideCategories,
  searchGuides,
} from "@/lib/guides/load";
import {
  canonicalGuideUrl,
  defaultOgImage,
  documentTitle,
} from "@/lib/guides/prepare";

const description =
  "Search copy-paste AI photo prompt guides for Gemini and ChatGPT.";

export const metadata: Metadata = {
  title: "Search guides",
  description,
  alternates: { canonical: canonicalGuideUrl() },
  robots: { index: false, follow: true },
  openGraph: {
    title: documentTitle("Search guides"),
    description,
    url: canonicalGuideUrl(),
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: documentTitle("Search guides"),
    description,
    images: [defaultOgImage],
  },
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function GuidesSearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = searchGuides(query);
  const populated = new Set(
    [...listPopulatedGuideCategories().keys()] as GuideCategorySlug[],
  );

  return (
    <div className="guides-list-page">
      <section className="guides-latest guides-category">
        <div className="guides-wrap">
          <h1>
            {query
              ? `Results for “${query}” (${results.length})`
              : "Search guides"}
          </h1>
          <div className="guides-latest-head">
            <p>
              {query
                ? "Matching guides by title, description, tags, and keywords."
                : description}
            </p>
            <GuidesSearchForm defaultValue={query} />
          </div>
          <GuideCategoryChips active="all" populated={populated} />

          {results.length === 0 ? (
            <div className="mt-10">
              <p className="m-0 mb-6 text-[15px] leading-relaxed text-[var(--muted)]">
                No guides matched{query ? ` “${query}”` : ""}. Try another term or
                browse a category.
              </p>
              <GuideCategoryChips active="all" populated={populated} />
              <p className="mt-6">
                <Link
                  href="/guides"
                  className="font-semibold text-[var(--text)] underline-offset-2 hover:underline"
                >
                  Back to all guides
                </Link>
              </p>
            </div>
          ) : (
            <div className="guides-grid">
              {results.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          )}
        </div>
      </section>
      <GuidesCta />
    </div>
  );
}
