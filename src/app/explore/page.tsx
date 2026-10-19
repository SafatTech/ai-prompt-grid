import type { Metadata } from "next";
import { ExplorePageView } from "@/components/explore/explore-page-view";
import {
  exploreListingDescription,
  exploreListingTitle,
} from "@/lib/catalog/explore-pages";
import { exploreRobots } from "@/lib/seo/explore-robots";

/**
 * Bare `/explore` stays ISR. Faceted URLs (`?q`, `?category`, `?page`, …) use
 * the same page so soft navigation can re-run generateMetadata and refresh
 * robots (N-23). Middleware still sets `x-robots-tag` for those URLs.
 */
export const revalidate = 60;

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  return {
    title: exploreListingTitle(1),
    description: exploreListingDescription(1),
    alternates: { canonical: "/explore" },
    robots: exploreRobots(params),
  };
}

export default ExplorePageView;
