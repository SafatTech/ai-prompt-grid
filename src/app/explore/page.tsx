import type { Metadata } from "next";
import { ExplorePageView } from "@/components/explore/explore-page-view";
import {
  exploreListingDescription,
  exploreListingTitle,
} from "@/lib/catalog/explore-pages";

/**
 * Bare `/explore` stays ISR. Document loads with `?offset=` rewrite to
 * `/explore/faceted`, which reads offset on the server (N-27).
 */
export const revalidate = 60;

export const metadata: Metadata = {
  title: exploreListingTitle(1),
  description: exploreListingDescription(1),
  alternates: { canonical: "/explore" },
  robots: { index: true, follow: true },
};

export default ExplorePageView;
