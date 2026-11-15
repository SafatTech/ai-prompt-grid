import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildExploreCollectionSets,
  stylesForCollection,
} from "../../src/lib/catalog/explore-collections";
import { buildExploreHeroSlides } from "../../src/lib/catalog/explore-hero";
import { getPublishedStyles } from "../../src/lib/catalog/styles";

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

  it("omits hero slides with fewer than 2 styles and avoids dash punctuation in copy", () => {
    const styles = getPublishedStyles();
    const slides = buildExploreHeroSlides(styles);
    assert.ok(slides.length >= 5);
    for (const slide of slides) {
      assert.ok(slide.count >= 2);
      assert.ok(slide.styles.length >= 2);
      assert.equal(/[—–]/.test(slide.lede), false);
      assert.equal(/[—–]/.test(slide.stats), false);
      assert.match(slide.stats, /Free · Works with Gemini & ChatGPT/);
    }
  });
});
