import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  RELATED_STYLE_LIMIT,
  relatedStylesFor,
} from "../../src/lib/catalog/related-styles";
import {
  buildStyleBestFor,
  formatBestForLine,
  worksWithForStyle,
} from "../../src/lib/catalog/style-best-for";
import { STYLE_BEST_FOR_DATA } from "../../src/lib/catalog/style-best-for-data";
import { styleBestForEntry } from "../../src/lib/catalog/style-best-for-lookup";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import {
  featuredGuidesForStyle,
  styleIdsSharingGuide,
} from "../../src/lib/guides/style-featured-guides";
import { extractStyleIdsFromGuideBody } from "../../src/lib/guides/style-guide-index";
import {
  STYLE_GUIDE_CARDS,
  STYLE_GUIDE_MEMBERSHIP,
} from "../../src/lib/guides/style-guide-index.generated";

describe("style guide membership index", () => {
  it("extracts unique style ids from guide markdown links", () => {
    const ids = extractStyleIdsFromGuideBody(`
[Customize](/styles/diya-lit-balcony)
[Again](/styles/diya-lit-balcony)
[Other](/styles/pure-white-packshot)
`);
    assert.deepEqual(ids, ["diya-lit-balcony", "pure-white-packshot"]);
  });

  it("indexes published guides and style membership without drafts", () => {
    assert.ok(Object.keys(STYLE_GUIDE_CARDS).length >= 14);
    assert.equal("how-to-keep-face-same-in-gemini-ai" in STYLE_GUIDE_CARDS, false);
    assert.ok((STYLE_GUIDE_MEMBERSHIP["diya-lit-balcony"] ?? []).includes(
      "diwali-couple-ai-photo-editing-prompts",
    ));
  });

  it("returns featured guides for members and fallbacks for orphans", () => {
    const featured = featuredGuidesForStyle({
      styleId: "diya-lit-balcony",
      styleTitle: "Diya Balcony Couple",
      styleCategory: "Cinematic",
    });
    assert.equal(featured.featured, true);
    assert.equal(featured.heading, "Featured in these guides");
    assert.ok(featured.guides.length >= 1);

    const orphanId = getPublishedStyles().find(
      (style) => !STYLE_GUIDE_MEMBERSHIP[style.id],
    )?.id;
    assert.ok(orphanId);
    const fallback = featuredGuidesForStyle({
      styleId: orphanId,
      styleTitle: "Some Orphan Style",
      styleCategory: "Cinematic",
    });
    assert.equal(fallback.featured, false);
    assert.equal(fallback.heading, "You may also like these guides");
    assert.ok(fallback.guides.length >= 1);
    assert.ok(fallback.guides.length <= 2);
  });
});

describe("related styles ranking", () => {
  it("returns eight published styles and prefers shared-guide peers", () => {
    assert.equal(RELATED_STYLE_LIMIT, 8);
    const catalog = getPublishedStyles();
    const related = relatedStylesFor(
      "separate-photos-couple",
      "Couple",
      catalog,
    );
    assert.equal(related.length, 8);
    assert.ok(related.every((style) => style.status === "published"));
    const peers = styleIdsSharingGuide("separate-photos-couple");
    assert.ok(peers.size > 0);
    assert.ok(related.some((style) => peers.has(style.id)));
  });

  it("keeps preferredIds first", () => {
    const catalog = getPublishedStyles();
    const preferred = catalog
      .filter((style) => style.id !== "diya-lit-balcony")
      .slice(0, 2)
      .map((style) => style.id);
    const related = relatedStylesFor(
      "diya-lit-balcony",
      "Cinematic",
      catalog,
      preferred,
    );
    assert.equal(related[0]?.id, preferred[0]);
    assert.equal(related[1]?.id, preferred[1]);
    assert.equal(related.length, 8);
  });
});

describe("best for lines", () => {
  it("has a hand-authored entry for every published seed style", () => {
    const styles = getPublishedStyles();
    assert.equal(Object.keys(STYLE_BEST_FOR_DATA).length, styles.length);
    for (const style of styles) {
      const entry = STYLE_BEST_FOR_DATA[style.id];
      assert.ok(entry, `missing STYLE_BEST_FOR_DATA entry for ${style.id}`);
      assert.ok(entry.occasions.length > 0, style.id);
      assert.ok(entry.worksWith.length > 0, style.id);
      assert.equal(styleBestForEntry(style.id)?.occasions, entry.occasions);
      assert.match(formatBestForLine(entry), /^Best for: .+ · Works with: .+$/);
    }
  });

  it("keeps every occasions string unique across the catalog", () => {
    const styles = getPublishedStyles();
    const seen = new Map<string, string>();
    for (const style of styles) {
      const occasions = STYLE_BEST_FOR_DATA[style.id]?.occasions;
      assert.ok(occasions, style.id);
      const key = occasions.toLowerCase().replace(/\s+/g, " ").trim();
      const prior = seen.get(key);
      assert.equal(
        prior,
        undefined,
        `duplicate occasions "${occasions}" on ${style.id} and ${prior}`,
      );
      seen.set(key, style.id);
    }
    assert.equal(seen.size, styles.length);
  });

  it("does not put festive occasions on non-festive styles", () => {
    for (const style of getPublishedStyles()) {
      const entry = STYLE_BEST_FOR_DATA[style.id];
      assert.ok(entry);
      const hay = [
        style.id,
        style.title,
        style.note,
        style.description,
        style.targetSourcePhoto,
      ]
        .join(" ")
        .toLowerCase();
      const festive =
        /\b(diwali|christmas|xmas|halloween|festive|holiday|eid|diya|rangoli|zombie|vampire|ornament)\b/.test(
          hay,
        );
      if (festive) continue;
      assert.equal(
        /\b(Diwali|Christmas|Halloween|Eid|festive|holiday cards|costume)\b/i.test(
          entry.occasions,
        ),
        false,
        style.id,
      );
    }
  });

  it("uses two-photo works-with for merge styles only", () => {
    const merge = getPublishedStyles().find(
      (style) => style.id === "combine-two-photos-80s-couple",
    );
    assert.ok(merge);
    assert.match(worksWithForStyle(merge), /two separate portraits/i);

    const solo = getPublishedStyles().find(
      (style) => style.id === "intimate-cinematic-portrait",
    );
    assert.ok(solo);
    assert.doesNotMatch(worksWithForStyle(solo), /couple|family merge/i);

    const rebuilt = buildStyleBestFor(merge, {
      guideSlugs: STYLE_GUIDE_MEMBERSHIP[merge.id] ?? [],
    });
    assert.match(rebuilt.worksWith, /two separate portraits/i);
  });
});
