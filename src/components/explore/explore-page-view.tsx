import { cache } from "react";
import { ExploreClient } from "@/components/explore/explore-client";
import {
  EXPLORE_PAGE_SIZE,
  exploreListingHeading,
  explorePageSlice,
} from "@/lib/catalog/explore-pages";
import { filterStyles, createEmptyFilters } from "@/lib/catalog/filters";
import { listPublishedStyles } from "@/lib/catalog/repository";
import { toStyleCardDataList } from "@/lib/catalog/style-card-data";

const getCatalog = cache(listPublishedStyles);

/** Shared ISR shell for `/explore` and the faceted rewrite target. */
export async function ExplorePageView() {
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
      heading={exploreListingHeading()}
    />
  );
}
