import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isVercelImageOptEnabled } from "../../src/lib/images/vercel-image-opt";
import { nextImagePreloadUrl } from "../../src/lib/images/next-image-preload";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function readSrc(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

describe("Vercel image optimization toggle", () => {
  it("defaults on; kill switch is NEXT_PUBLIC_VERCEL_IMAGE_OPT=0", () => {
    const prev = process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT;
    try {
      delete process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT;
      assert.equal(isVercelImageOptEnabled(), true);
      process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT = "1";
      assert.equal(isVercelImageOptEnabled(), true);
      process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT = "0";
      assert.equal(isVercelImageOptEnabled(), false);
      process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT = "false";
      assert.equal(isVercelImageOptEnabled(), false);
    } finally {
      if (prev === undefined) delete process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT;
      else process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT = prev;
    }
  });

  it("wires /_next/image as the only path (no custom variant loader)", () => {
    const config = readSrc("next.config.ts");
    assert.ok(config.includes("isVercelImageOptEnabled"));
    assert.ok(config.includes("unoptimized: !isVercelImageOptEnabled()"));
    assert.ok(config.includes("minimumCacheTTL: 31_536_000"));
    assert.ok(config.includes('formats: ["image/avif", "image/webp"]'));
    assert.ok(config.includes("deviceSizes: [640, 750, 828, 1080, 1200]"));
    assert.ok(config.includes("catalog-public/**"));
    assert.ok(!config.includes("loader: \"custom\""));
    assert.ok(!config.includes("supabase-image-loader"));
    assert.ok(!config.includes("variant-manifest"));
  });

  it("documents the kill switch in .env.example", () => {
    const env = readSrc(".env.example");
    assert.ok(env.includes("NEXT_PUBLIC_VERCEL_IMAGE_OPT"));
    assert.ok(env.includes("Kill switch"));
  });

  it("builds optimized preload URLs matching next/image widths", () => {
    const prev = process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT;
    try {
      delete process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT;
      const url = nextImagePreloadUrl(
        "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/public/catalog-public/x.webp",
        640,
        75,
      );
      assert.ok(url.startsWith("/_next/image?"));
      assert.ok(url.includes("w=640"));
      assert.ok(url.includes("q=75"));
    } finally {
      if (prev === undefined) delete process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT;
      else process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT = prev;
    }
  });

  it("keeps click-driven pending rail, LCP priority, and avoids eager rails", () => {
    const home = readSrc("src/components/home/explore-load-more.tsx");
    assert.ok(!home.includes('rootMargin: "2400px 0px"'));
    assert.ok(home.includes("measureMasonryContentHeight"));
    assert.ok(home.includes("remainingSlots"));
    assert.ok(home.includes("home-masonry-pending"));
    assert.ok(
      home.includes("!expansionRequested || expansionDone || !pending"),
    );
    assert.ok(home.includes("HOME_MASONRY_SOFT_CAP = 100"));
    assert.ok(home.includes("home-masonry-extra-wrap"));
    assert.ok(home.includes("PENDING_GUARD_MS"));
    assert.ok(home.includes("setPending(true)"));
    assert.ok(home.includes("setPending(false)"));

    const feed = readSrc("src/components/home/explore-feed.tsx");
    assert.ok(feed.includes("priority={index === 0}"));
    assert.ok(feed.includes("eager={index > 0 && index < HOME_MASONRY_FIRST_ROW}"));

    const media = readSrc("src/components/style-card-masonry-media.tsx");
    assert.ok(media.includes("layoutAware"));
    assert.ok(media.includes("IntersectionObserver"));
    // #43 regression: mediaReady must not force eager on every rail card.
    assert.ok(!media.includes("mediaReady || eager"));
    assert.ok(media.includes('eager ? "eager" : "lazy"'));

    const railCard = readSrc("src/components/style-card-rail.tsx");
    assert.ok(!railCard.includes('"use client"'));
    assert.ok(railCard.includes("StyleCardSaveButton"));
    assert.ok(railCard.includes("CopyPromptButton"));

    const rail = readSrc("src/components/home/style-rail.tsx");
    assert.ok(rail.includes("StyleCardRail"));
    assert.ok(!rail.includes("priority="));
    assert.ok(!rail.includes("eager="));

    const explore = readSrc("src/components/explore/explore-client.tsx");
    assert.ok(explore.includes("priority={listing.page === 1 && index === 0}"));
    assert.ok(explore.includes("eager={listing.page === 1 && index > 0 && index < 4}"));
    assert.ok(explore.includes('params.set("exclude"'));

    const skeleton = readSrc("src/components/style-card-skeleton.tsx");
    assert.ok(skeleton.includes("SHARED_STYLE_BLUR"));
    assert.ok(skeleton.includes("backgroundImage"));

    // inlineCss regressed style-page TBT (~300ms) and home HTML size — keep off.
    assert.ok(!readSrc("next.config.ts").includes("inlineCss: true"));
    // Guide LCP: next/image priority alone — no manual preload (double-fetch).
    assert.ok(!readSrc("src/components/guides/guide-hero.tsx").includes("preload("));
    assert.ok(!readSrc("src/components/guides/guide-hero.tsx").includes("nextImagePreloadUrl"));
    assert.ok(!readSrc("package.json").includes("db:generate-image-variants"));

    const compare = readSrc("src/components/compare-slider.tsx");
    assert.ok(compare.includes("DETAIL_HERO_SIZES"));
    assert.ok(compare.includes("priority && !large"));

    const stylePage = readSrc("src/app/styles/[slug]/page.tsx");
    // Prefer Image priority + fetchPriority over react-dom preload (CSS race).
    assert.ok(!stylePage.includes("preload("));
    assert.ok(!stylePage.includes("nextImagePreloadUrl"));

    const detail = readSrc("src/components/styles/style-detail-client.tsx");
    assert.ok(detail.includes("priority"));

    const merge = readSrc("src/components/merge-before-after.tsx");
    assert.ok(merge.includes("DETAIL_HERO_SIZES"));

    const related = readSrc("src/components/styles/related-styles-lazy.tsx");
    assert.ok(related.includes('"2800px 0px"'));
    assert.ok(related.includes('"600px 0px"'));
    assert.ok(related.includes("max-width: 767px"));

    const heroSizes = readSrc("src/lib/images/next-image-preload.ts");
    assert.ok(heroSizes.includes("364px"));

    const page = readSrc("src/app/page.tsx");
    assert.ok(page.includes("HOME_MASONRY_PAGE_SIZE"));
    assert.ok(page.includes('surface: "rail"'));
    const masonrySize = readSrc("src/lib/home/masonry-page-size.ts");
    assert.ok(masonrySize.includes("HOME_MASONRY_PAGE_SIZE = 25"));
    assert.ok(masonrySize.includes("HOME_MASONRY_COLUMN_COUNT = 5"));
  });
});
