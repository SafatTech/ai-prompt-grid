import type { Metadata } from "next";
import { AdSlot } from "@/components/ad-slot";
import { CategoryChipsBar } from "@/components/home/category-chips-bar";
import { ExploreFeed } from "@/components/home/explore-feed";
import { HeroWall } from "@/components/home/hero-wall";
import { LatestGuides } from "@/components/home/latest-guides";
import { NewsletterBand } from "@/components/home/newsletter-band";
import { RecentShelf } from "@/components/home/recent-shelf";
import { SeasonBanner } from "@/components/home/season-banner";
import { StyleRail } from "@/components/home/style-rail";
import { TrustStrip } from "@/components/home/trust-strip";
import {
  countPublishedStyles,
  listExploreFeed,
  listHeroWallImages,
  listStylesByCategory,
  listStylesBySlugs,
  listStylesMatchingQuery,
  listTrendingStyles,
} from "@/lib/catalog/repository";
import { HOME_RAILS, TRENDING_RAIL } from "@/lib/home/rails";
import { activeSeason } from "@/lib/home/seasons";
import { listVisibleGuides } from "@/lib/guides/load";
import { absoluteUrl } from "@/lib/site-url";

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
    explorePage2,
    explorePage3,
    guides,
  ] = await Promise.all([
    countPublishedStyles(),
    listTrendingStyles(TRENDING_RAIL.limit),
    listHeroWallImages(30, season?.styleSlugs ?? []),
    listStylesBySlugs(season?.styleSlugs ?? []),
    season
      ? listStylesMatchingQuery(season.ctaCategoryQuery, 200)
      : Promise.resolve([]),
    listStylesMatchingQuery(HOME_RAILS[0]!.q!, HOME_RAILS[0]!.limit),
    listStylesMatchingQuery(HOME_RAILS[1]!.q!, HOME_RAILS[1]!.limit),
    listStylesByCategory(HOME_RAILS[2]!.category!, HOME_RAILS[2]!.limit),
    listStylesMatchingQuery(HOME_RAILS[3]!.q!, HOME_RAILS[3]!.limit),
    listExploreFeed({ page: 1, pageSize: 24 }),
    listExploreFeed({ page: 2, pageSize: 24 }),
    listExploreFeed({ page: 3, pageSize: 24 }),
    Promise.resolve(
      [...listVisibleGuides()]
        .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
        .slice(0, 4),
    ),
  ]);

  const seasonStyleCount = seasonMatched.length;

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

      <HeroWall
        images={heroImages}
        season={season}
        publishedCount={publishedCount}
      />

      <div className="home-below">
        {season ? (
          <SeasonBanner
            season={season}
            styles={seasonStyles}
            seasonStyleCount={seasonStyleCount}
          />
        ) : null}

        <StyleRail
          id={TRENDING_RAIL.id}
          title={TRENDING_RAIL.title}
          subtitle={TRENDING_RAIL.subtitle}
          href={TRENDING_RAIL.href}
          styles={trending}
          ranked
        />

        <CategoryChipsBar season={season} />

        <StyleRail
          id={HOME_RAILS[0]!.id}
          title={HOME_RAILS[0]!.title}
          subtitle={HOME_RAILS[0]!.subtitle}
          href={HOME_RAILS[0]!.href}
          styles={couples}
        />

        <StyleRail
          id={HOME_RAILS[1]!.id}
          title={HOME_RAILS[1]!.title}
          subtitle={HOME_RAILS[1]!.subtitle}
          href={HOME_RAILS[1]!.href}
          styles={family}
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
          styles={professional}
        />

        <StyleRail
          id={HOME_RAILS[3]!.id}
          title={HOME_RAILS[3]!.title}
          subtitle={HOME_RAILS[3]!.subtitle}
          href={HOME_RAILS[3]!.href}
          styles={trends}
        />

        <LatestGuides guides={guides} />

        <RecentShelf catalog={recentCatalog} />

        <ExploreFeed
          styles={explorePage1.styles}
          total={explorePage1.total}
          pageSize={explorePage1.pageSize}
          extraPages={[explorePage2.styles, explorePage3.styles]}
        />

        <TrustStrip publishedCount={publishedCount} />
        <NewsletterBand />
      </div>
    </div>
  );
}
