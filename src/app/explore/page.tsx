import type { Metadata } from "next";
import { ExplorePageView } from "@/components/explore/explore-page-view";
import {
  exploreListingDescription,
  exploreListingTitle,
} from "@/lib/catalog/explore-pages";

/** Default /explore is ISR; filters and pagination are applied on the client. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: exploreListingTitle(1),
  description: exploreListingDescription(1),
  alternates: { canonical: "/explore" },
  robots: { index: true, follow: true },
};

export default ExplorePageView;
