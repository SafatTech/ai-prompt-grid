import { NextResponse } from "next/server";
import {
  EXPLORE_PAGE_SIZE,
  parseExploreExclude,
  parseExploreOffset,
  parseExplorePage,
} from "@/lib/catalog/explore-pages";
import {
  filterStyles,
  filtersFromExploreQuery,
  parseExploreSearchParams,
} from "@/lib/catalog/filters";
import { listExploreFeed, listPublishedStyles } from "@/lib/catalog/repository";
import { toStyleCardDataList } from "@/lib/catalog/style-card-data";
import { HOME_MASONRY_PAGE_SIZE } from "@/lib/home/masonry-page-size";

/**
 * Paginated explore feed.
 * - Homepage masonry: `?page=2&pageSize=50` (page 1 is SSR'd on `/`).
 * - /explore Load more: prefer `?exclude=id1,id2&pageSize=18` (top-up batch, N-26)
 *   or `?offset=N&pageSize=18` (stable continue from home, N-27).
 * - /explore filter changes: `?page=1&pageSize=18` plus optional filter query params.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const exclude = parseExploreExclude(searchParams);
  const offsetParam = parseExploreOffset(searchParams);
  const pageParam = parseExplorePage(searchParams);
  if (pageParam === null && offsetParam === null && exclude.length === 0) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  const rawPageSize = searchParams.get("pageSize");
  const hasExploreFacets =
    Boolean(searchParams.get("q")?.trim()) ||
    searchParams.has("sort") ||
    searchParams.has("category") ||
    searchParams.has("subject") ||
    searchParams.has("intent") ||
    searchParams.has("requirement") ||
    searchParams.has("tool") ||
    searchParams.has("exclude") ||
    searchParams.has("offset") ||
    rawPageSize === String(EXPLORE_PAGE_SIZE);

  if (hasExploreFacets) {
    const pageSize =
      rawPageSize && /^[1-9]\d*$/.test(rawPageSize)
        ? Math.min(Number(rawPageSize), 48)
        : EXPLORE_PAGE_SIZE;
    const query = parseExploreSearchParams(searchParams);
    const styles = await listPublishedStyles();
    let matches = filterStyles(
      styles,
      filtersFromExploreQuery(query),
      query.q,
      query.sort,
    );
    const total = matches.length;

    if (exclude.length > 0) {
      const excluded = new Set(exclude);
      matches = matches.filter((style) => !excluded.has(style.id));
      // Top up to a full batch of unseen styles (N-26).
      const batch = matches.slice(0, pageSize);
      return NextResponse.json(
        {
          styles: toStyleCardDataList(batch, { sharedBlur: true }),
          page: 1,
          pageSize,
          offset: exclude.length,
          total,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        },
      );
    }

    const offset = offsetParam ?? Math.max(0, ((pageParam ?? 1) - 1) * pageSize);
    const page = pageParam ?? Math.floor(offset / pageSize) + 1;
    return NextResponse.json(
      {
        styles: toStyleCardDataList(matches.slice(offset, offset + pageSize), {
          sharedBlur: true,
        }),
        page,
        pageSize,
        offset,
        total,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  }

  const page = pageParam ?? 2;
  if (page < 2) {
    return NextResponse.json(
      { error: "Use SSR page 1 on the homepage or /explore" },
      { status: 400 },
    );
  }

  const homePageSize =
    rawPageSize && /^[1-9]\d*$/.test(rawPageSize)
      ? Math.min(Number(rawPageSize), 60)
      : HOME_MASONRY_PAGE_SIZE;
  const feed = await listExploreFeed({ page, pageSize: homePageSize });
  return NextResponse.json(
    {
      styles: toStyleCardDataList(feed.styles, {
        sharedBlur: true,
        surface: "rail",
      }),
      page: feed.page,
      pageSize: feed.pageSize,
      total: feed.total,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
