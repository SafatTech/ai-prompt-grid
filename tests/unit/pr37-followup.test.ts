import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function readSrc(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

describe("PR37 follow-up: home scroll CLS reserve (N-19)", () => {
  it("pre-reserves soft-cap masonry height from real card metrics", () => {
    const loadMore = readSrc("src/components/home/explore-load-more.tsx");
    assert.ok(loadMore.includes("reserveMasonryHeight"));
    assert.ok(loadMore.includes("extraSlots"));

    const reserve = readSrc("src/lib/home/masonry-reserve.ts");
    assert.ok(reserve.includes("sampleMasonryCardHeights"));
    assert.ok(reserve.includes("estimateMasonryColumns"));

    const css = readSrc("src/app/globals.css");
    const trust = css.slice(css.indexOf(".home-trust {"), css.indexOf(".home-trust-grid"));
    assert.ok(trust.includes("overflow-anchor: none"));
  });
});

describe("PR37 follow-up: robots generateMetadata (N-23)", () => {
  it("drives explore robots from searchParams without client DOM sync", () => {
    const page = readSrc("src/app/explore/page.tsx");
    assert.ok(page.includes("generateMetadata"));
    assert.ok(page.includes("exploreRobots"));
    assert.ok(!page.includes("export const metadata"));

    const sync = readSrc("src/components/explore/explore-url-sync.tsx");
    assert.ok(!sync.includes('meta[name="robots"]'));
    assert.ok(!sync.includes("MutationObserver"));
  });
});

describe("PR37 follow-up: explore LCP priority", () => {
  it("limits fetchPriority high to card 1 and keeps cards 2–4 eager", () => {
    const explore = readSrc("src/components/explore/explore-client.tsx");
    assert.ok(explore.includes("index === 0"));
    assert.ok(explore.includes("eager={listing.page === 1 && index > 0 && index < 4}"));
  });
});

describe("PR37 follow-up: GA internal opt-out", () => {
  it("gates gtag behind apg:internal localStorage", () => {
    const ga = readSrc("src/lib/analytics/ga4.ts");
    assert.ok(ga.includes("apg:internal"));
    assert.ok(ga.includes("apg_internal"));
    assert.ok(ga.includes("GA_INTERNAL_STORAGE_KEY"));
  });
});
