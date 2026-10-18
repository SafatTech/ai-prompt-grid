import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  GuidesIndex,
  GUIDES_INDEX_DESCRIPTION,
  GUIDES_INDEX_TITLE,
  listGuidesPageNumbers,
} from "@/components/guides/guides-index";
import { listIndexableGuides } from "@/lib/guides/load";
import {
  defaultOgImage,
  documentTitle,
} from "@/lib/guides/prepare";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 60;

type Props = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  return listGuidesPageNumbers()
    .filter((page) => page > 1)
    .map((page) => ({ page: String(page) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const raw = (await params).page;
  const page = Number.parseInt(raw, 10);
  if (!Number.isFinite(page) || page < 2) {
    return { title: GUIDES_INDEX_TITLE, robots: { index: false, follow: true } };
  }
  const canonical = absoluteUrl(`/guides?page=${page}`);
  return {
    title: GUIDES_INDEX_TITLE,
    description: GUIDES_INDEX_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title: documentTitle(GUIDES_INDEX_TITLE),
      description: GUIDES_INDEX_DESCRIPTION,
      url: canonical,
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle(GUIDES_INDEX_TITLE),
      description: GUIDES_INDEX_DESCRIPTION,
      images: [defaultOgImage],
    },
    robots: listIndexableGuides().length > 0 ? undefined : { index: false, follow: true },
  };
}

export default async function GuidesPagedIndex({ params }: Props) {
  const raw = (await params).page;
  if (!/^[1-9]\d*$/.test(raw)) notFound();
  const page = Number(raw);
  if (page < 2) notFound();
  const valid = listGuidesPageNumbers();
  if (!valid.includes(page)) notFound();
  return <GuidesIndex page={page} />;
}
