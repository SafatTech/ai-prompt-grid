import type { Metadata } from "next";
import { cache } from "react";
import { ExploreClient } from "@/components/explore/explore-client";
import {
  EXPLORE_PAGE_SIZE,
  exploreListingDescription,
  exploreListingHeading,
  exploreListingTitle,
  explorePageSlice,
} from "@/lib/catalog/explore-pages";
import { filterStyles, createEmptyFilters } from "@/lib/catalog/filters";
import { listPublishedStyles } from "@/lib/catalog/repository";
import { toStyleCardDataList } from "@/lib/catalog/style-card-data";

/** Default /explore is ISR; filters and pagination are applied on the client. */
export const revalidate = 60;

const getCatalog = cache(listPublishedStyles);

export const metadata: Metadata = {
  title: exploreListingTitle(1),
  description: exploreListingDescription(1),
  alternates: { canonical: "/explore" },
  robots: { index: true, follow: true },
};

export default async function ExplorePage() {
  const styles = await getCatalog();
  const matches = filterStyles(styles, createEmptyFilters(), "", "Trending");
  const pageStyles = toStyleCardDataList(explorePageSlice(matches, 1), {
    blurCount: 3,
    sharedBlur: true,
  });

  return (
    <ExploreClient
      styles={pageStyles}
      matchCount={matches.length}
      catalogCount={styles.length}
      pageSize={EXPLORE_PAGE_SIZE}
      initialQuery={{
        q: "",
        sort: "Trending",
        category: [],
        subject: [],
        intent: [],
        requirement: [],
        tool: [],
      }}
      initialPage={1}
      initialQueryString=""
      heading={exploreListingHeading(1)}
    />
  );
}
