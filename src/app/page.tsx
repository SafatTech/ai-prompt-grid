import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AdSlot } from "@/components/ad-slot";
import { CategoryChipsBar } from "@/components/home/category-chips-bar";
import { ExploreFeed } from "@/components/home/explore-feed";
import { HeroWall } from "@/components/home/hero-wall";
import { SeasonBanner, type SeasonBannerStyle } from "@/components/home/season-banner";
import { StyleRail } from "@/components/home/style-rail";
import {
  countPublishedStyles,
  listExploreFeed,
  listHeroWallImages,
  listNewestStyles,
  listStylesByCategory,
  listStylesBySlugs,
  listStylesMatchingQuery,
  listTrendingStyles,
} from "@/lib/catalog/repository";
import { toStyleCardDataList } from "@/lib/catalog/style-card-data";
import { HOME_MASONRY_PAGE_SIZE } from "@/lib/home/masonry-page-size";
import {
  getHomepageSettings,
  resolveHomepageSeason,
  resolveHomepageSeasonImages,
} from "@/lib/home/curation";
import { HOME_RAILS, NEW_STYLES_RAIL, TRENDING_RAIL } from "@/lib/home/rails";
import { listIndexableGuides } from "@/lib/guides/load";
import { absoluteUrl } from "@/lib/site-url";

const LatestGuides = dynamic(
  () => import("@/components/home/latest-guides").then((mod) => mod.LatestGuides),
  { ssr: true },
);
const RecentShelf = dynamic(
  () => import("@/components/home/recent-shelf").then((mod) => mod.RecentShelf),
  { ssr: true },
);
const TrustStrip = dynamic(
  () => import("@/components/home/trust-strip").then((mod) => mod.TrustStrip),
  { ssr: true },
);
const NewsletterBand = dynamic(
  () => import("@/components/home/newsletter-band").then((mod) => mod.NewsletterBand),
  { ssr: true },
);

/** Hourly safety net; admin saves invalidate catalog/settings immediately. */
export const revalidate = 3600;

const HOME_TITLE =
  "AI Photo Editing Prompts for Festivals & Everyday Looks | AI Prompt Grid";
const HOME_DESCRIPTION =
  "Tested AI photo editing prompts for Diwali, Eid, weddings, LinkedIn, and more. Pick a style, see the result first, keep your real face.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
  },
  twitter: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

function toSeasonBannerStyles(styles: SeasonBannerStyle[]): SeasonBannerStyle[] {
  return styles.map(({ id, title, result }) => ({ id, title, result }));
}

export default async function HomePage() {
  const homepageSettings = await getHomepageSettings();
  const season = resolveHomepageSeason(homepageSettings);
  const heroSlugs =
    homepageSettings.heroSlugs.length > 0
      ? homepageSettings.heroSlugs
      : (season?.styleSlugs ?? []);
  const seasonImages = resolveHomepageSeasonImages(homepageSettings, season);
  const [
    publishedCount,
    trending,
    newest,
    heroImages,
    seasonStyles,
    seasonImageStyles,
    seasonMatched,
    couples,
    family,
    professional,
    trends,
    explorePage1,
    guides,
  ] = await Promise.all([
    countPublishedStyles(),
    listTrendingStyles(TRENDING_RAIL.limit),
    listNewestStyles(NEW_STYLES_RAIL.limit),
    // Six columns × six tiles; curated lists can provide a unique image per slot.
    listHeroWallImages(36, heroSlugs, homepageSettings.heroAutoFill),
    listStylesBySlugs(season?.styleSlugs ?? []),
    listStylesBySlugs(seasonImages.slugs),
    // Cap season matches — banner only needs a short strip (+ count from this page).
    season ? listStylesMatchingQuery(season.ctaCategoryQuery, 16) : Promise.resolve([]),
    listStylesMatchingQuery(HOME_RAILS[0]!.q!, HOME_RAILS[0]!.limit),
    listStylesMatchingQuery(HOME_RAILS[1]!.q!, HOME_RAILS[1]!.limit),
    listStylesByCategory(HOME_RAILS[2]!.category!, HOME_RAILS[2]!.limit),
    listStylesMatchingQuery(HOME_RAILS[3]!.q!, HOME_RAILS[3]!.limit),
    // Multiple of 5-col count so CSS columns fill evenly; +8 rows vs prior 12.
    listExploreFeed({ page: 1, pageSize: HOME_MASONRY_PAGE_SIZE }),
    Promise.resolve(
      [...listIndexableGuides()]
        .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
        .slice(0, 4),
    ),
  ]);

  const seasonStyleCount = seasonMatched.length;
  const seasonBannerStyles = toSeasonBannerStyles(seasonStyles);
  const seasonBannerImageStyles = toSeasonBannerStyles(seasonImageStyles);
  const seasonBannerMatchedStyles = toSeasonBannerStyles(seasonMatched);

  // Slim rail/masonry DTOs — drop note/source/height. Shared blur lives in the
  // media client chunk (not repeated per-card RSC props). Unique blur = LCP only.
  const railOpts = { surface: "rail" as const };
  const trendingCards = toStyleCardDataList(trending, railOpts);
  const newestCards = toStyleCardDataList(newest, railOpts);
  const couplesCards = toStyleCardDataList(couples, railOpts);
  const familyCards = toStyleCardDataList(family, railOpts);
  const professionalCards = toStyleCardDataList(professional, railOpts);
  const trendsCards = toStyleCardDataList(trends, railOpts);
  const exploreCards = toStyleCardDataList(explorePage1.styles, {
    // Shared pending blur is CSS (.is-pending); no unique blur in HTML/RSC.
    surface: "rail",
  });

  // Cap client RecentShelf lookup — full explore+trending catalog was ~60 URLs.
  const recentCatalog = explorePage1.styles
    .concat(trending)
    .slice(0, 24)
    .map((style) => ({ id: style.id, title: style.title, result: style.result }));

  const trendingJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Trending styles this week",
    itemListElement: trending.map((style, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/styles/${style.id}`),
      name: style.title,
    })),
  };

  return (
    <div className="home-page">
      {/* Tiny h1 metrics inline so text LCP is not gated only on the full CSS parse. */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            ".hero-wall-title{margin:22px 0 18px;font-size:76px;line-height:1;letter-spacing:-.04em;font-weight:800}.hero-wall-title em{font-style:normal;background:linear-gradient(90deg,#b9a8ff,#ff9b82);-webkit-background-clip:text;background-clip:text;color:transparent}@media (max-width:699px){.hero-wall-title{font-size:44px}}",
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trendingJsonLd) }}
      />

      <HeroWall images={heroImages} season={season} />

      <div className="home-below">
        {season ? (
          <SeasonBanner
            season={season}
            styles={seasonBannerStyles}
            imageStyles={seasonBannerImageStyles}
            matchedStyles={seasonImages.isCurated ? [] : seasonBannerMatchedStyles}
            seasonStyleCount={seasonStyleCount}
          />
        ) : null}

        <StyleRail
          id={TRENDING_RAIL.id}
          title={TRENDING_RAIL.title}
          subtitle={TRENDING_RAIL.subtitle}
          href={TRENDING_RAIL.href}
          styles={trendingCards}
          ranked
        />

        <StyleRail
          id={NEW_STYLES_RAIL.id}
          title={NEW_STYLES_RAIL.title}
          subtitle={NEW_STYLES_RAIL.subtitle}
          href={NEW_STYLES_RAIL.href}
          styles={newestCards}
        />

        <CategoryChipsBar season={season} />

        <StyleRail
          id={HOME_RAILS[0]!.id}
          title={HOME_RAILS[0]!.title}
          subtitle={HOME_RAILS[0]!.subtitle}
          href={HOME_RAILS[0]!.href}
          styles={couplesCards}
        />

        <StyleRail
          id={HOME_RAILS[1]!.id}
          title={HOME_RAILS[1]!.title}
          subtitle={HOME_RAILS[1]!.subtitle}
          href={HOME_RAILS[1]!.href}
          styles={familyCards}
        />

        <AdSlot
          slot="home-rail"
          envSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_RAIL}
        />

        <StyleRail
          id={HOME_RAILS[2]!.id}
          title={HOME_RAILS[2]!.title}
          subtitle={HOME_RAILS[2]!.subtitle}
          href={HOME_RAILS[2]!.href}
          styles={professionalCards}
        />

        <StyleRail
          id={HOME_RAILS[3]!.id}
          title={HOME_RAILS[3]!.title}
          subtitle={HOME_RAILS[3]!.subtitle}
          href={HOME_RAILS[3]!.href}
          styles={trendsCards}
        />

        <LatestGuides guides={guides} />

        <RecentShelf catalog={recentCatalog} />

        <ExploreFeed
          styles={exploreCards}
          total={explorePage1.total}
          pageSize={explorePage1.pageSize}
        />

        <TrustStrip publishedCount={publishedCount} />
        <NewsletterBand />
      </div>
    </div>
  );
}
