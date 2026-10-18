import type { Metadata } from "next";
import {
  GuidesIndex,
  GUIDES_INDEX_DESCRIPTION,
  GUIDES_INDEX_TITLE,
} from "@/components/guides/guides-index";
import { listIndexableGuides } from "@/lib/guides/load";
import {
  canonicalGuideUrl,
  defaultOgImage,
  documentTitle,
} from "@/lib/guides/prepare";

/** Default listing is ISR; `?page=N` is rewritten to /guides/p/N in middleware. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: GUIDES_INDEX_TITLE,
  description: GUIDES_INDEX_DESCRIPTION,
  alternates: { canonical: canonicalGuideUrl() },
  openGraph: {
    title: documentTitle(GUIDES_INDEX_TITLE),
    description: GUIDES_INDEX_DESCRIPTION,
    url: canonicalGuideUrl(),
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

export default function GuidesIndexPage() {
  return <GuidesIndex page={1} />;
}
