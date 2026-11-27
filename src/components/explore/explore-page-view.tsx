import { cache } from "react";
import "@/app/explore.css";
import { ExploreClient } from "@/components/explore/explore-client";
import {
  buildExploreCollectionSets,
  styleIsHot,
  styleIsNew,
} from "@/lib/catalog/explore-collections";
import {
  buildExploreHeroSlides,
  buildExplorePromoBanners,
} from "@/lib/catalog/explore-hero";
import {
  EXPLORE_PAGE_SIZE,
  exploreListingHeading,
  explorePageSlice,
} from "@/lib/catalog/explore-pages";
import { parseExploreOffset } from "@/lib/catalog/explore-paging";
import { filterStyles, createEmptyFilters } from "@/lib/catalog/filters";
import { listIndexablePublishedStyles } from "@/lib/catalog/repository";
import { toStyleCardDataList } from "@/lib/catalog/style-card-data";
import type { ExploreWallCardData } from "@/components/explore/explore-wall-card";

const getCatalog = cache(listIndexablePublishedStyles);

type Props = {
  /** Optional raw `?offset=` from the URL (home Load more N-27). */
  offsetParam?: string | string[] | undefined;
};

/** Shared ISR shell for `/explore` and the faceted rewrite target. */
export async function ExplorePageView({ offsetParam }: Props = {}) {
  const styles = await getCatalog();
  const matches = filterStyles(styles, createEmptyFilters(), "", "A-Z");
  const sets = buildExploreCollectionSets(styles);
  const heroSlides = buildExploreHeroSlides(styles);
  const banners = buildExplorePromoBanners(styles);

  const params = new URLSearchParams();
  const raw = Array.isArray(offsetParam) ? offsetParam[0] : offsetParam;
  if (raw != null && raw !== "") params.set("offset", raw);
  const offset = parseExploreOffset(params) ?? 0;

  const pageSlice =
    offset > 0
      ? matches.slice(offset, offset + EXPLORE_PAGE_SIZE)
      : explorePageSlice(matches, 1);

  const pageStyles: ExploreWallCardData[] = toStyleCardDataList(pageSlice, {
    blurCount: 3,
    sharedBlur: true,
    includePromptPreview: true,
  }).map((card, index) => {
    const source = pageSlice[index];
    return {
      ...card,
      isHot: source ? styleIsHot(source, sets) : false,
      isNew: source ? styleIsNew(source, sets) : false,
    };
  });

  const hotIds = [...sets.trendingIds];
  const newIds = [...sets.newIds];
  const categories = [...new Set(styles.map((style) => style.category))].sort();

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
        sort: "A-Z",
        category: [],
        subject: [],
        intent: [],
        requirement: [],
        tool: [],
      }}
      initialPage={initialPage}
      initialQueryString={offset > 0 ? `offset=${offset}` : ""}
      heading={exploreListingHeading()}
      heroSlides={heroSlides}
      banners={banners}
      hotIds={hotIds}
      newIds={newIds}
      categories={categories}
    />
  );
}
