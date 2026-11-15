import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildExploreCollectionSets,
  selectNewCollection,
  styleIsNew,
  stylesForCollection,
} from "../../src/lib/catalog/explore-collections";
import {
  buildExploreHeroSlides,
  buildExplorePromoBanners,
  buildNewHeroContent,
} from "../../src/lib/catalog/explore-hero";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import type { CatalogStyle } from "../../src/lib/catalog/types";

function withPub(
  style: CatalogStyle,
  publishedAt: string,
  overrides: Partial<CatalogStyle> = {},
): CatalogStyle {
  return { ...style, publishedAt, pinNewRank: null, hideFromNew: false, ...overrides };
}

describe("explore collections + hero", () => {
  it("builds Trending/New/Sari/Diwali/Winter/Birthday from the live catalog", () => {
    const styles = getPublishedStyles();
    for (const key of [
      "Trending",
      "New",
      "Sari",
      "Diwali",
      "Winter",
      "Birthday",
    ] as const) {
      const list = stylesForCollection(styles, key);
      assert.ok(list.length >= 2, `${key} should have at least 2 styles`);
    }
    const sets = buildExploreCollectionSets(styles);
    assert.ok(sets.trendingIds.size >= 2);
    assert.ok(sets.newIds.size >= 2);
  });

  it("orders New by publishedAt desc and ignores older pinNewRank overrides", () => {
    const base = getPublishedStyles()[0]!;
    const styles = [
      withPub(base, "2025-01-01T00:00:00.000Z", {
        id: "old-pinned",
        title: "Old pinned Diwali",
        category: "Fantasy",
        pinNewRank: 1,
      }),
      withPub(base, "2026-11-01T00:00:00.000Z", {
        id: "mint-sequin-stripe-saree-marble-hallway",
        title: "Mint Sequin Stripe Saree",
        category: "Cinematic",
      }),
      withPub(base, "2026-10-15T00:00:00.000Z", {
        id: "mid-winter",
        title: "Winter fog look",
        category: "Cinematic",
      }),
      withPub(base, "2026-11-02T00:00:00.000Z", {
        id: "newer-saree",
        title: "Kanjivaram Silk Saree",
        category: "Cinematic",
      }),
    ];
    const newest = selectNewCollection(styles, 3);
    assert.deepEqual(
      newest.map((style) => style.id),
      ["newer-saree", "mint-sequin-stripe-saree-marble-hallway", "mid-winter"],
    );
    const sets = {
      trendingIds: new Set<string>(),
      newIds: new Set(newest.map((style) => style.id)),
    };
    assert.equal(styleIsNew(styles[0]!, sets), false);
    assert.equal(styleIsNew(styles[3]!, sets), true);
  });

  it("surfaces Sari first for seed New when publishedAt is absent", () => {
    const newest = selectNewCollection(getPublishedStyles(), 8);
    assert.ok(newest.length >= 2);
    assert.ok(
      newest
        .slice(0, 5)
        .every((style) => /saree|sari/i.test(`${style.id} ${style.title}`)),
      "seed fallback should prefer the latest Saree pack",
    );
  });

  it("derives New hero copy from newest style themes without dash punctuation", () => {
    const newest = selectNewCollection(getPublishedStyles(), 24);
    const content = buildNewHeroContent(newest);
    assert.match(content.lede, /Sari/i);
    assert.equal(/[—–]/.test(content.lede), false);
    assert.equal(/[—–]/.test(content.blurb), false);
    assert.ok(content.tags.every((tag) => !tag.label.startsWith("#")));
    assert.ok(
      content.tags.filter((tag) => tag.band !== "bottom").length <= 3,
    );
    assert.ok(
      content.tags.filter((tag) => tag.band === "bottom").length <= 3,
    );
  });

  it("omits hero slides with fewer than 2 styles and keeps New tags aligned to data", () => {
    const styles = getPublishedStyles();
    const slides = buildExploreHeroSlides(styles);
    assert.ok(slides.length >= 5);
    for (const slide of slides) {
      assert.ok(slide.count >= 2);
      assert.ok(slide.styles.length >= 2);
      assert.equal(/[—–]/.test(slide.lede), false);
      assert.equal(/[—–]/.test(slide.stats), false);
      assert.match(slide.stats, /Free · Works with Gemini & ChatGPT/);
      assert.ok(
        slide.tags.filter((tag) => tag.band !== "bottom").length <= 3,
      );
      assert.ok(
        slide.tags.filter((tag) => tag.band === "bottom").length <= 3,
      );
      assert.ok(slide.tags.every((tag) => !("#" in tag) && !tag.label.includes("#")));
    }
    const neu = slides.find((slide) => slide.key === "New");
    assert.ok(neu);
    assert.match(neu!.lede, /Sari/i);
    assert.ok(neu!.tags.some((tag) => /Sari/i.test(tag.label)));
    assert.ok(!/Winter|Diwali|Snowflake/i.test(neu!.lede));

    const banners = buildExplorePromoBanners(styles);
    const newBanner = banners.find((banner) => banner.key === "New");
    assert.ok(newBanner);
    assert.match(newBanner!.blurb, /Sari/i);
    assert.equal(/[—–]/.test(newBanner!.blurb), false);
  });
});
