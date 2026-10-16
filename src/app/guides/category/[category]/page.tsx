import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/guides/guide-card";
import { GuideCategoryChips } from "@/components/guides/guide-category-chips";
import { GuidesCta } from "@/components/guides/guides-cta";
import { GuidesSearchForm } from "@/components/guides/guides-search-form";
import {
  GUIDE_CATEGORIES,
  getGuideCategory,
  type GuideCategorySlug,
} from "@/lib/guides/categories";
import {
  listGuidesByCategory,
  listIndexableGuidesByCategory,
  listPopulatedGuideCategories,
} from "@/lib/guides/load";
import {
  canonicalGuideUrl,
  defaultOgImage,
  documentTitle,
} from "@/lib/guides/prepare";
import { absoluteUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return GUIDE_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getGuideCategory(slug);
  if (!category) return {};

  const title = `${category.label} AI Photo Prompt Guides`;
  const indexable = listIndexableGuidesByCategory(category.slug).length >= 2;
  const canonical = absoluteUrl(`/guides/category/${category.slug}`);

  return {
    title,
    description: category.intro,
    alternates: { canonical },
    openGraph: {
      title: documentTitle(title),
      description: category.intro,
      url: canonical,
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle(title),
      description: category.intro,
      images: [defaultOgImage],
    },
    robots: indexable ? undefined : { index: false, follow: true },
  };
}

export default async function GuideCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getGuideCategory(slug);
  if (!category) notFound();

  const guides = listGuidesByCategory(category.slug);
  const populated = new Set(
    [...listPopulatedGuideCategories().keys()] as GuideCategorySlug[],
  );
  const title = `${category.label} AI Photo Prompt Guides`;
  const canonical = absoluteUrl(`/guides/category/${category.slug}`);

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
      {
        "@type": "ListItem",
        position: 3,
        name: category.label,
        item: canonical,
      },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: guides.map((guide, index) => ({
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

      <section className="guides-latest guides-category">
        <div className="guides-wrap">
          <div className="guides-latest-title-row">
            <h1>{title}</h1>
            <GuidesSearchForm />
          </div>
          <p className="guides-latest-intro">{category.intro}</p>
          <GuideCategoryChips active={category.slug} populated={populated} />

          {guides.length === 0 ? (
            <p className="mt-10 text-[15px] leading-relaxed text-[var(--muted)]">
              No guides in this category yet.
            </p>
          ) : (
            <div className="guides-grid">
              {guides.map((guide) => (
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
