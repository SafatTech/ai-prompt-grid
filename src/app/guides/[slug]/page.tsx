import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLinkButton } from "@/components/guides/copy-link-button";
import { GuideBreadcrumbs } from "@/components/guides/guide-breadcrumbs";
import { GuideHero } from "@/components/guides/guide-hero";
import { GuideMarkdown } from "@/components/guides/guide-markdown";
import { GuideRelated } from "@/components/guides/guide-related";
import { GuideTocDesktop, GuideTocMobile } from "@/components/guides/guide-toc";
import {
  getGuide,
  listIndexableGuides,
  listVisibleGuides,
  visibleGuideSlugs,
} from "@/lib/guides/load";
import {
  canonicalGuideUrl,
  documentTitle,
  estimateReadingMinutes,
  extractGuideToc,
  formatGuideDateShort,
  guideMetadataTitle,
  guideRobots,
  resolveGuideArticleImage,
  resolveGuideDisplayHero,
  resolveGuideSocialImage,
  showsDraftGuides,
} from "@/lib/guides/prepare";
import { absoluteUrl } from "@/lib/site-url";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listVisibleGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide || (guide.draft && !showsDraftGuides())) {
    return { title: "Guide not found", robots: { index: false, follow: false } };
  }

  const canonical = canonicalGuideUrl(guide.slug);
  const title = documentTitle(guide.title);
  const image = resolveGuideSocialImage(guide);

  return {
    title: guideMetadataTitle(guide.title),
    description: guide.description,
    alternates: { canonical },
    robots: guideRobots(guide.draft),
    openGraph: {
      title,
      description: guide.description,
      url: canonical,
      type: "article",
      publishedTime: guide.date,
      modifiedTime: guide.updated,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: guide.description,
      images: [image],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide || (guide.draft && !showsDraftGuides())) notFound();

  const canonical = canonicalGuideUrl(guide.slug);
  const visibleSlugs = visibleGuideSlugs();
  const articleImage = resolveGuideArticleImage(guide);
  const hero = resolveGuideDisplayHero(guide);
  const toc = extractGuideToc(guide.body);
  const readingMinutes = estimateReadingMinutes(guide.body);
  const related = listIndexableGuides()
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.heading,
        description: guide.description,
        datePublished: guide.date,
        dateModified: guide.updated,
        ...(articleImage ? { image: articleImage } : {}),
        author: {
          "@type": "Organization",
          name: "Safat Tech",
          url: "https://aipromptgrid.com/",
        },
        publisher: {
          "@type": "Organization",
          "@id": absoluteUrl("/#organization"),
          name: "AI Prompt Grid",
          url: "https://aipromptgrid.com/",
          logo: {
            "@type": "ImageObject",
            url: "https://aipromptgrid.com/brand/logo.png",
          },
        },
        mainEntityOfPage: canonical,
        url: canonical,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://aipromptgrid.com/",
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
            name: guide.heading,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1380px] px-5 py-3">
          <GuideBreadcrumbs current={guide.heading} />
        </div>
      </div>
      {guide.draft ? (
        <p className="mx-auto mt-4 mb-0 max-w-[1380px] rounded-2xl border border-dashed border-[#8b6cff] bg-[#15151E] px-5 py-3 text-sm leading-relaxed text-[var(--muted)]">
          Draft. This URL returns 404 in production, and it is excluded from the index and
          the sitemap, until <code className="text-[var(--text)]">draft: false</code> is
          set in the guide file.
        </p>
      ) : null}
      <GuideHero
        hero={hero}
        label="Guide"
        heading={guide.heading}
        description={guide.description}
        dateLabel={formatGuideDateShort(guide.date)}
        readingMinutes={readingMinutes}
        promptsTested={guide.promptsTested}
        shareActions={
          <div className="flex gap-2">
            <CopyLinkButton url={canonical} />
          </div>
        }
      />
      <div className="mx-auto mt-12 grid max-w-[1380px] gap-14 px-5 pb-16 lg:grid-cols-[1fr_320px] sm:pb-[100px]">
        <article className="max-w-3xl min-w-0">
          <GuideTocMobile items={toc} />
          <GuideMarkdown
            markdown={guide.body}
            visibleSlugs={visibleSlugs}
            eagerFirstPair={false}
          />
          <p className="mt-12 mb-0 text-sm text-[var(--muted)]">
            <Link
              href="/guides"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              All guides
            </Link>
            {" · "}
            <Link
              href="/explore"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              Explore styles
            </Link>
          </p>
        </article>
        <GuideTocDesktop items={toc} />
      </div>
      <GuideRelated guides={related} />
    </>
  );
}
