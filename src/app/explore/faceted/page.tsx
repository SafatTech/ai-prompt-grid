import type { Metadata } from "next";
import { ExplorePageView } from "@/components/explore/explore-page-view";
import {
  exploreListingDescription,
  exploreListingTitle,
} from "@/lib/catalog/explore-pages";

/**
 * Internal rewrite target for `/explore?*` so meta robots is noindex,follow
 * (matches the x-robots-tag header) without making the bare listing dynamic.
 */
export const revalidate = 60;

export const metadata: Metadata = {
  title: exploreListingTitle(1),
  description: exploreListingDescription(1),
  alternates: { canonical: "/explore" },
  robots: { index: false, follow: true },
};

export default async function FacetedExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ offset?: string | string[] }>;
}) {
  const sp = await searchParams;
  return <ExplorePageView offsetParam={sp.offset} />;
}
