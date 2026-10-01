import type { Metadata } from "next";
import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { ExploreClient } from "@/components/explore/explore-client";
import {
  explorePageCount,
  explorePageHref,
  isExplicitFirstExplorePage,
  parseExplorePage,
} from "@/lib/catalog/explore-pages";
import {
  filterStyles,
  filtersFromExploreQuery,
  parseExploreSearchParams,
} from "@/lib/catalog/filters";
import { listPublishedStyles } from "@/lib/catalog/repository";
import type { ExploreQuery } from "@/lib/catalog/schemas";

const getCatalog = cache(listPublishedStyles);

const description =
  "Browse tested AI photo-transformation styles for portraits, pets, places, products, and more. Copy prompts for ChatGPT, Gemini, and other editors.";

function searchParamsToURLSearchParams(
  raw: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (entry) params.append(key, entry);
      }
    } else if (value) {
      params.append(key, value);
    }
  }
  return params;
}

async function resolveExploreListing(
  raw: Record<string, string | string[] | undefined>,
): Promise<{
  params: URLSearchParams;
  query: ExploreQuery;
  page: number | null;
  matchCount: number;
}> {
  const params = searchParamsToURLSearchParams(raw);
  const query = parseExploreSearchParams(params);
  const page = parseExplorePage(params);
  if (page === null) {
    return { params, query, page, matchCount: 0 };
  }
  const styles = await getCatalog();
  const matches = filterStyles(
    styles,
    filtersFromExploreQuery(query),
    query.q,
    query.sort,
  );
  return { params, query, page, matchCount: matches.length };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const listing = await resolveExploreListing(await searchParams);
  const page = listing.page ?? 1;
  const pageCount = explorePageCount(listing.matchCount);
  const outOfRange = listing.page === null || listing.page > pageCount;
  const canonical = explorePageHref(listing.query, outOfRange ? 1 : page);
  const title =
    !outOfRange && page > 1 ? `Explore styles, page ${page}` : "Explore styles";

  return {
    title,
    description,
    alternates: { canonical },
    robots:
      listing.query.q.trim() || outOfRange
        ? { index: false, follow: true }
        : { index: true, follow: true },
  };
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const listing = await resolveExploreListing(raw);
  if (listing.page === null) notFound();
  if (isExplicitFirstExplorePage(listing.params)) {
    permanentRedirect(explorePageHref(listing.query, 1));
  }

  const pageCount = explorePageCount(listing.matchCount);
  if (listing.page > pageCount) notFound();

  const styles = await getCatalog();

  return (
    <ExploreClient
      styles={styles}
      initialQuery={listing.query}
      initialPage={listing.page}
      initialQueryString={listing.params.toString()}
    />
  );
}
