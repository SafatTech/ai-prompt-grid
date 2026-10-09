import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RelatedStyles } from "@/components/styles/related-styles";
import { StyleDetailClient } from "@/components/styles/style-detail-client";
import { relatedStylesFor } from "@/lib/catalog/related-styles";
import { getPublishedStyleBySlug, listPublishedStyles } from "@/lib/catalog/repository";
import {
  styleMetadataTitle,
  stylePageDescription,
  styleSocialTitle,
} from "@/lib/catalog/style-meta";
import { absoluteUrl } from "@/lib/site-url";

export async function generateStaticParams() {
  const styles = await listPublishedStyles();
  return styles.map((style) => ({ slug: style.id }));
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
    style.note || style.description || "",
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

  const relatedStyles = relatedStylesFor(style.id, style.category, catalog);
  const pageUrl = absoluteUrl(`/styles/${style.id}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": pageUrl,
    name: style.title,
    description: style.note || style.description,
    url: pageUrl,
    image: style.result || style.source || undefined,
    about: style.category,
    dateModified: style.promptVariant.lastVerified || undefined,
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
      <StyleDetailClient style={style}>
        <RelatedStyles styles={relatedStyles} category={style.category} />
      </StyleDetailClient>
    </>
  );
}
