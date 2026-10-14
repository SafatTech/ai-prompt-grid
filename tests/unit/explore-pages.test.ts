import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  EXPLORE_PAGE_SIZE,
  exploreCanonicalHref,
  exploreListingDescription,
  exploreListingHeading,
  exploreListingTitle,
  explorePageCount,
  explorePageHref,
  explorePageSlice,
  exploreQueryHasFacets,
  isExplicitFirstExplorePage,
  parseExplorePage,
} from "../../src/lib/catalog/explore-pages";
import { relatedStylesFor } from "../../src/lib/catalog/related-styles";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import { isRetiredStyleSlug } from "../../src/lib/http/retired-style-redirects";
import {
  dedupedStylePaths,
  explorePaginationPaths,
} from "../../src/lib/seo/public-paths";

const emptyQuery = {
  q: "",
  sort: "Trending" as const,
  category: [] as string[],
  subject: [] as string[],
  intent: [] as string[],
  requirement: [] as string[],
  tool: [] as string[],
};

describe("explore pagination", () => {
  it("parses page and builds self-referencing paths", () => {
    assert.equal(parseExplorePage(new URLSearchParams()), 1);
    assert.equal(parseExplorePage(new URLSearchParams("page=2")), 2);
    assert.equal(parseExplorePage(new URLSearchParams("page=0")), null);
    assert.equal(parseExplorePage(new URLSearchParams("page=abc")), null);
    assert.equal(isExplicitFirstExplorePage(new URLSearchParams("page=1")), true);
    assert.equal(explorePageHref(emptyQuery, 1), "/explore");
    assert.equal(explorePageHref(emptyQuery, 2), "/explore?page=2");
    assert.equal(
      explorePageHref({ ...emptyQuery, category: ["Cinematic"] }, 2),
      "/explore?category=Cinematic&page=2",
    );
  });

  it("uses Page N copy and noindex-friendly canonicals for faceted URLs", () => {
    assert.equal(exploreListingTitle(1), "Explore styles");
    assert.equal(exploreListingTitle(2), "Explore styles, Page 2");
    assert.match(exploreListingDescription(3), /Page 3\./);
    assert.equal(exploreListingHeading(1), "Find a style for your photo");
    assert.equal(
      exploreListingHeading(4),
      "Find a style for your photo, Page 4",
    );
    assert.equal(exploreQueryHasFacets(emptyQuery), false);
    assert.equal(
      exploreQueryHasFacets({ ...emptyQuery, category: ["Cinematic"] }),
      true,
    );
    assert.equal(exploreCanonicalHref(emptyQuery, 2), "/explore?page=2");
    assert.equal(
      exploreCanonicalHref({ ...emptyQuery, category: ["Cinematic"] }, 1),
      "/explore",
    );
    assert.equal(
      exploreCanonicalHref({ ...emptyQuery, category: ["Cinematic"] }, 2),
      "/explore",
    );
  });

  it("covers every published style across server pages and the sitemap", () => {
    const styles = getPublishedStyles();
    assert.equal(styles.length, 159);
    assert.equal(EXPLORE_PAGE_SIZE, 18);

    const seen = new Set<string>();
    const pages = explorePageCount(styles.length);
    assert.equal(pages, 9);
    for (let page = 1; page <= pages; page += 1) {
      const slice = explorePageSlice(styles, page);
      assert.ok(slice.length > 0);
      assert.ok(slice.length <= EXPLORE_PAGE_SIZE);
      for (const style of slice) seen.add(style.id);
    }
    assert.equal(seen.size, 159);

    const stylePaths = dedupedStylePaths(styles.map((style) => style.id));
    assert.equal(stylePaths.length, 159);
    assert.ok(stylePaths.includes("/styles/meadow-reverie"));
    for (const style of styles) {
      assert.equal(isRetiredStyleSlug(style.id), false, style.id);
    }
    assert.deepEqual(explorePaginationPaths(styles.length), [
      "/explore?page=2",
      "/explore?page=3",
      "/explore?page=4",
      "/explore?page=5",
      "/explore?page=6",
      "/explore?page=7",
      "/explore?page=8",
      "/explore?page=9",
    ]);
  });

  it("links each style to other styles, preferring the same category", () => {
    const styles = getPublishedStyles();
    for (const style of styles) {
      const related = relatedStylesFor(style.id, style.category, styles);
      assert.ok(related.length >= 1);
      assert.ok(related.length <= 6);
      assert.equal(
        related.some((item) => item.id === style.id),
        false,
      );
      const same = styles.filter(
        (item) => item.id !== style.id && item.category === style.category,
      );
      if (same.length > 0) {
        assert.equal(related[0]?.category, style.category);
      }
    }
  });
});
