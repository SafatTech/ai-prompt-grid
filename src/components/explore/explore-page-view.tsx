import { cache } from "react";
import { ExploreClient } from "@/components/explore/explore-client";
import {
  EXPLORE_PAGE_SIZE,
  exploreListingHeading,
  explorePageSlice,
} from "@/lib/catalog/explore-pages";
import { parseExploreOffset } from "@/lib/catalog/explore-paging";
import { filterStyles, createEmptyFilters } from "@/lib/catalog/filters";
import { listPublishedStyles } from "@/lib/catalog/repository";
import { toStyleCardDataList } from "@/lib/catalog/style-card-data";

const getCatalog = cache(listPublishedStyles);

type Props = {
  /** Optional raw `?offset=` from the URL (home Load more N-27). */
  offsetParam?: string | string[] | undefined;
};

/** Shared ISR shell for `/explore` and the faceted rewrite target. */
export async function ExplorePageView({ offsetParam }: Props = {}) {
  const styles = await getCatalog();
  const matches = filterStyles(styles, createEmptyFilters(), "", "Trending");

  const params = new URLSearchParams();
  const raw = Array.isArray(offsetParam) ? offsetParam[0] : offsetParam;
  if (raw != null && raw !== "") params.set("offset", raw);
  const offset = parseExploreOffset(params) ?? 0;

  const pageStyles = toStyleCardDataList(
    offset > 0
      ? matches.slice(offset, offset + EXPLORE_PAGE_SIZE)
      : explorePageSlice(matches, 1),
    {
      blurCount: 3,
      sharedBlur: true,
    },
  );
  const initialPage =
    offset > 0 ? Math.floor(offset / EXPLORE_PAGE_SIZE) + 1 : 1;

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
      initialPage={initialPage}
      initialQueryString={offset > 0 ? `offset=${offset}` : ""}
      heading={exploreListingHeading()}
    />
  );
}
