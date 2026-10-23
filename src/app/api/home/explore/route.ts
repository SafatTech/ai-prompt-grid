import { NextResponse } from "next/server";
import { EXPLORE_PAGE_SIZE } from "@/lib/catalog/explore-pages";
import {
  filterStyles,
  filtersFromExploreQuery,
  parseExploreSearchParams,
} from "@/lib/catalog/filters";
import { listExploreFeed, listPublishedStyles } from "@/lib/catalog/repository";
import { toStyleCardDataList } from "@/lib/catalog/style-card-data";

/** Default homepage append size (SSR page 1 uses the same via `?pageSize=`). */
const HOME_PAGE_SIZE = 12;

/**
 * Paginated explore feed.
 * - Homepage masonry: `?page=2&pageSize=12` (page 1 is SSR'd on `/`).
 * - /explore Load more / filter changes: `?page=1&pageSize=18` plus optional filter query params.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("page") ?? "2";
  if (!/^[1-9]\d*$/.test(raw)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }
  const page = Number(raw);

  const rawPageSize = searchParams.get("pageSize");
  const hasExploreFacets =
    Boolean(searchParams.get("q")?.trim()) ||
    searchParams.has("sort") ||
    searchParams.has("category") ||
    searchParams.has("subject") ||
    searchParams.has("intent") ||
    searchParams.has("requirement") ||
    searchParams.has("tool") ||
    rawPageSize === String(EXPLORE_PAGE_SIZE);

  if (hasExploreFacets) {
    const pageSize =
      rawPageSize && /^[1-9]\d*$/.test(rawPageSize)
        ? Math.min(Number(rawPageSize), 48)
        : EXPLORE_PAGE_SIZE;
    const query = parseExploreSearchParams(searchParams);
    const styles = await listPublishedStyles();
    const matches = filterStyles(
      styles,
      filtersFromExploreQuery(query),
      query.q,
      query.sort,
    );
    const start = (page - 1) * pageSize;
    return NextResponse.json(
      {
        styles: toStyleCardDataList(matches.slice(start, start + pageSize), {
          sharedBlur: true,
        }),
        page,
        pageSize,
        total: matches.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  }

  if (page < 2) {
    return NextResponse.json(
      { error: "Use SSR page 1 on the homepage or /explore" },
      { status: 400 },
    );
  }

  const homePageSize =
    rawPageSize && /^[1-9]\d*$/.test(rawPageSize)
      ? Math.min(Number(rawPageSize), 48)
      : HOME_PAGE_SIZE;
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
