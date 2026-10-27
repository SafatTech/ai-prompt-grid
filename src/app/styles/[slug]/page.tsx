import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RelatedStylesLazy } from "@/components/styles/related-styles-lazy";
import { StyleDetailClient } from "@/components/styles/style-detail-client";
import { usesMergeHero } from "@/lib/catalog/merge-inputs";
import { relatedStylesFor } from "@/lib/catalog/related-styles";
import {
  getPublishedStyleAmbientBlur,
  getPublishedStyleBySlug,
  listPublishedStyles,
  withStyleAmbientBlur,
} from "@/lib/catalog/repository";
import { toStyleCardDataList } from "@/lib/catalog/style-card-data";
import {
  styleMetadataTitle,
  stylePageDescription,
  styleSocialTitle,
} from "@/lib/catalog/style-meta";
import { absoluteUrl } from "@/lib/site-url";

/** Hourly safety net; admin catalog writes invalidate cached data and paths. */
export const revalidate = 3600;

/**
 * Generate style pages on first request, then keep them in ISR. Pre-rendering
 * the full catalog fans one large database read out across every build worker.
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const style = await getPublishedStyleBySlug(slug);
  if (!style) {
    return {
      title: "Style not found",
      robots: { index: false, follow: false },
    };
  }

  const description = stylePageDescription(
    style.description || style.note || "",
    style.title,
  );

  const title = styleMetadataTitle(style);
  const socialTitle = styleSocialTitle(style);
  const url = `/styles/${style.id}`;
  const ogImage = style.result || style.source || undefined;
  const ogAlt = style.examplePairs[0]?.altResult || `${style.title} result example`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      type: "article",
      images: ogImage ? [{ url: ogImage, alt: ogAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function StyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [style, catalog] = await Promise.all([
    getPublishedStyleBySlug(slug),
    listPublishedStyles(),
  ]);
  if (!style) notFound();

  // Shared catalog omits result_blur_data_url (cache budget). Merge print-stack
  // heroes still need the tiny blur for .mba-ambient — fetch one style only.
  const detailStyle = withStyleAmbientBlur(
    style,
    usesMergeHero(style) ? await getPublishedStyleAmbientBlur(style.id) : undefined,
  );

  const relatedStyles = toStyleCardDataList(
    relatedStylesFor(detailStyle.id, detailStyle.category, catalog),
    { sharedBlur: true },
  );
  // LCP: CompareSlider / MergeBeforeAfter use priority + fetchPriority="high"
  // (no react-dom preload — avoids a second request behind CSS).
  const pageUrl = absoluteUrl(`/styles/${detailStyle.id}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": pageUrl,
    name: detailStyle.title,
    description: detailStyle.note || detailStyle.description,
    url: pageUrl,
    image: detailStyle.result || detailStyle.source || undefined,
    about: detailStyle.category,
    dateModified: detailStyle.promptVariant.lastVerified || undefined,
    provider: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: "AI Prompt Grid",
      url: absoluteUrl("/"),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StyleDetailClient style={detailStyle}>
        <RelatedStylesLazy styles={relatedStyles} category={detailStyle.category} />
      </StyleDetailClient>
    </>
  );
}
