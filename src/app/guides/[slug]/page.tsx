import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideBreadcrumbs } from "@/components/guides/guide-breadcrumbs";
import { GuideMarkdown } from "@/components/guides/guide-markdown";
import { getGuide, listVisibleGuides, visibleGuideSlugs } from "@/lib/guides/load";
import {
  canonicalGuideUrl,
  documentTitle,
  formatGuideDate,
  guideArticleImage,
  guideMetadataTitle,
  guideRobots,
  guideSocialImage,
  showsDraftGuides,
} from "@/lib/guides/prepare";
import { absoluteUrl } from "@/lib/site-url";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

const HALLOWEEN_OG_IMAGE = {
  url: "/guides/halloween-ai-prompts-for-selfies/pumpkin-patch-og.webp",
  width: 1200,
  height: 630,
  alt: "Smiling woman with long wavy hair in a cream knit sweater at a pumpkin patch at golden hour.",
} as const;

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
  const image =
    guide.slug === "halloween-ai-prompts-for-selfies"
      ? HALLOWEEN_OG_IMAGE
      : guideSocialImage(guide.body);

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
  const articleImage =
    guide.slug === "halloween-ai-prompts-for-selfies"
      ? absoluteUrl(HALLOWEEN_OG_IMAGE.url)
      : guideArticleImage(guide.body);
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
          name: "AI Prompt Grid",
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
    <article className="container max-w-[760px] py-10 pb-16 sm:py-14 sm:pb-[100px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <GuideBreadcrumbs current={guide.heading} />
      {guide.draft ? (
        <p className="m-0 mb-4 rounded-2xl border border-dashed border-[#8b6cff] bg-[#15151E] px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
          Draft. This URL returns 404 in production, and it is excluded from the index and
          the sitemap, until <code className="text-[var(--text)]">draft: false</code> is
          set in the guide file.
        </p>
      ) : null}
      <h1 className="m-0 mb-3 text-[clamp(32px,4.5vw,48px)] leading-[1.05] tracking-[-0.04em]">
        {guide.heading}
      </h1>
      <p className="m-0 mb-2 text-[17px] leading-relaxed text-[var(--muted)]">
        {guide.description}
      </p>
      <p className="m-0 mb-8 text-xs text-[var(--muted)]">
        Updated {formatGuideDate(guide.updated)} · AI Prompt Grid editorial
      </p>
      <GuideMarkdown markdown={guide.body} visibleSlugs={visibleSlugs} />
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
  );
}
