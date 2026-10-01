import type { Metadata } from "next";
import { ExploreClient } from "@/components/explore/explore-client";
import { parseExploreSearchParams } from "@/lib/catalog/filters";
import { listPublishedStyles } from "@/lib/catalog/repository";

export const metadata: Metadata = {
  title: "Explore styles",
  description:
    "Browse tested AI photo-transformation styles for portraits, pets, places, products, and more. Copy prompts for ChatGPT, Gemini, and other editors.",
  alternates: {
    canonical: "/explore",
  },
};

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

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [styles, rawParams] = await Promise.all([
    listPublishedStyles(),
    searchParams,
  ]);
  const initialQuery = parseExploreSearchParams(
    searchParamsToURLSearchParams(rawParams),
  );

  return <ExploreClient styles={styles} initialQuery={initialQuery} />;
}
