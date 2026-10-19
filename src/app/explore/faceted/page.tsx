import type { Metadata } from "next";
import { ExplorePageView } from "@/components/explore/explore-page-view";
import {
  exploreListingDescription,
  exploreListingTitle,
} from "@/lib/catalog/explore-pages";

/**
 * Legacy internal target kept for any stale rewrite/cache hits.
 * Soft-nav robots now come from `/explore` generateMetadata (searchParams).
 * Faceted public URLs are served by `/explore` + `x-robots-tag` in middleware.
 */
export const revalidate = 60;

export const metadata: Metadata = {
  title: exploreListingTitle(1),
  description: exploreListingDescription(1),
  alternates: { canonical: "/explore" },
  robots: { index: false, follow: true },
};

export default ExplorePageView;
