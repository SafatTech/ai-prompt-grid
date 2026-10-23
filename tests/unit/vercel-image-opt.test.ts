import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isVercelImageOptEnabled } from "../../src/lib/images/vercel-image-opt";

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

  it("keeps LCP priority, early home fetch, blur skeletons, and N-24", () => {
    const home = readSrc("src/components/home/explore-load-more.tsx");
    assert.ok(home.includes('rootMargin: "2400px 0px"'));
    assert.ok(home.includes("measureMasonryContentHeight"));
    assert.ok(home.includes("remainingSlots"));
    // N-25: in-flight skeletons only, outside the multi-column grid.
    assert.ok(home.includes("home-masonry-pending"));
    assert.ok(home.includes("autoDone || !loading ? 0"));
    assert.ok(home.includes("home-masonry-extra-wrap"));

    const feed = readSrc("src/components/home/explore-feed.tsx");
    assert.ok(feed.includes("priority={index === 0}"));
    // First desktop row eager; rest use layout-aware IO (CSS columns break lazy).
    assert.ok(feed.includes("eager={index > 0 && index < 5}"));
    assert.ok(!feed.includes("eager={index > 0 && index < 2}"));

    const card = readSrc("src/components/style-card.tsx");
    assert.ok(card.includes("layoutAware"));
    assert.ok(card.includes("IntersectionObserver"));

    const explore = readSrc("src/components/explore/explore-client.tsx");
    assert.ok(explore.includes("priority={listing.page === 1 && index === 0}"));
    assert.ok(explore.includes("eager={listing.page === 1 && index > 0 && index < 4}"));

    const skeleton = readSrc("src/components/style-card-skeleton.tsx");
    assert.ok(skeleton.includes("SHARED_STYLE_BLUR"));
    assert.ok(skeleton.includes("backgroundImage"));

    assert.ok(readSrc("next.config.ts").includes("inlineCss: true"));
    assert.ok(!readSrc("src/components/guides/guide-hero.tsx").includes("preload("));
    assert.ok(!readSrc("package.json").includes("db:generate-image-variants"));
  });
});
