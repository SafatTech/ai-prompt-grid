import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StyleDetailClient } from "@/components/styles/style-detail-client";
import {
  getPublishedStyleBySlug,
  listPublishedStyles,
} from "@/lib/catalog/repository";
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

  const summary = (style.note || style.description || "").trim();
  const description = summary
    ? `${summary} Copy-ready prompt for ChatGPT, Gemini, and other AI image editors.`
    : `Copy-ready ${style.title} prompt for ChatGPT, Gemini, and other AI image editors.`;

  const title = `${style.title} Prompt`;
  const url = `/styles/${style.id}`;
  const ogImage = style.result || style.source || undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} · AI Prompt Grid`,
      description,
      url,
      type: "article",
      images: ogImage
        ? [{ url: ogImage, alt: `${style.title} result example` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · AI Prompt Grid`,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function relatedFor(
  styleId: string,
  category: string,
  catalog: Awaited<ReturnType<typeof listPublishedStyles>>,
) {
  return catalog
    .filter((item) => item.id !== styleId && item.category === category)
    .concat(catalog.filter((item) => item.id !== styleId))
    .filter((item, index, arr) => arr.findIndex((s) => s.id === item.id) === index)
    .slice(0, 3);
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

  const relatedStyles = relatedFor(style.id, style.category, catalog);
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
      <StyleDetailClient style={style} relatedStyles={relatedStyles} />
    </>
  );
}
