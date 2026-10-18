import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AdSlot } from "@/components/ad-slot";
import { CategoryChipsBar } from "@/components/home/category-chips-bar";
import { ExploreFeed } from "@/components/home/explore-feed";
import { HeroWall } from "@/components/home/hero-wall";
import { SeasonBanner } from "@/components/home/season-banner";
import { StyleRail } from "@/components/home/style-rail";
import {
  countPublishedStyles,
  listExploreFeed,
  listHeroWallImages,
  listStylesByCategory,
  listStylesBySlugs,
  listStylesMatchingQuery,
  listTrendingStyles,
} from "@/lib/catalog/repository";
import { toStyleCardDataList } from "@/lib/catalog/style-card-data";
import { HOME_RAILS, TRENDING_RAIL } from "@/lib/home/rails";
import { activeSeason } from "@/lib/home/seasons";
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

/** ISR safety net so homepage trending catches up even without an admin save. */
export const revalidate = 60;

const HOME_TITLE = "AI Photo Editing Prompts for Festivals & Everyday Looks | AI Prompt Grid";
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

export default async function HomePage() {
  const season = activeSeason();
  const [
    publishedCount,
    trending,
    heroImages,
    seasonStyles,
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
    listHeroWallImages(18, season?.styleSlugs ?? []),
    listStylesBySlugs(season?.styleSlugs ?? []),
    season
      ? listStylesMatchingQuery(season.ctaCategoryQuery, 200)
      : Promise.resolve([]),
    listStylesMatchingQuery(HOME_RAILS[0]!.q!, HOME_RAILS[0]!.limit),
    listStylesMatchingQuery(HOME_RAILS[1]!.q!, HOME_RAILS[1]!.limit),
    listStylesByCategory(HOME_RAILS[2]!.category!, HOME_RAILS[2]!.limit),
    listStylesMatchingQuery(HOME_RAILS[3]!.q!, HOME_RAILS[3]!.limit),
    listExploreFeed({ page: 1, pageSize: 24 }),
    Promise.resolve(
      [...listIndexableGuides()]
        .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
        .slice(0, 4),
    ),
  ]);

  const seasonStyleCount = seasonMatched.length;

  // Slim DTOs for client rails: unique blur / embedded copy text only above the fold.
  const trendingCards = toStyleCardDataList(trending, {
    blurCount: 4,
    copyPromptCount: 4,
  });
  const couplesCards = toStyleCardDataList(couples, { sharedBlur: true });
  const familyCards = toStyleCardDataList(family, { sharedBlur: true });
  const professionalCards = toStyleCardDataList(professional, { sharedBlur: true });
  const trendsCards = toStyleCardDataList(trends, { sharedBlur: true });
  const exploreCards = toStyleCardDataList(explorePage1.styles, {
    blurCount: 6,
    sharedBlur: true,
  });

  const recentCatalog = explorePage1.styles
    .concat(trending)
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trendingJsonLd) }}
      />

      <HeroWall images={heroImages} season={season} />

      <div className="home-below">
        {season ? (
          <SeasonBanner
            season={season}
            styles={seasonStyles}
            matchedStyles={seasonMatched}
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
