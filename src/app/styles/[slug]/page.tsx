import { notFound } from "next/navigation";
import { Suspense } from "react";
import { StyleDetailClient } from "@/components/styles/style-detail-client";
import {
  getPublishedStyleBySlug,
  listPublishedStyles,
} from "@/lib/catalog/repository";

export async function generateStaticParams() {
  const styles = await listPublishedStyles();
  return styles.map((style) => ({ slug: style.id }));
}

function relatedFor(styleId: string, category: string, catalog: Awaited<ReturnType<typeof listPublishedStyles>>) {
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

  return (
    <Suspense fallback={<div className="container py-20 text-[var(--muted)]">Loading…</div>}>
      <StyleDetailClient style={style} relatedStyles={relatedStyles} />
    </Suspense>
  );
}
