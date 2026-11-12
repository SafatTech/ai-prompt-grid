import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  STYLE_CHANGE_CATEGORIES,
  STYLE_CHANGE_CATEGORY_IDS,
  inferStyleChangeCategory,
} from "../../src/lib/catalog/style-change-categories";
import { STYLE_CHANGE_DETAILS } from "../../src/lib/catalog/style-change-details";
import { resolveStyleChangeDetails } from "../../src/lib/catalog/style-change-resolve";
import { getPublishedStyles } from "../../src/lib/catalog/styles";

const SHORT_MAX = 95;

describe("style change details (Glass Icon Bento)", () => {
  it("defines the twelve categories with accents", () => {
    assert.equal(STYLE_CHANGE_CATEGORY_IDS.length, 12);
    for (const id of STYLE_CHANGE_CATEGORY_IDS) {
      assert.ok(STYLE_CHANGE_CATEGORIES[id]);
      assert.ok(STYLE_CHANGE_CATEGORIES[id].accent.name);
      assert.ok(STYLE_CHANGE_CATEGORIES[id].defaultChip.length > 0);
    }
  });

  it("covers every published style label with matching entries", () => {
    const published = getPublishedStyles();
    assert.ok(published.length >= 300);

    for (const style of published) {
      const entries = STYLE_CHANGE_DETAILS[style.id];
      assert.ok(entries, `missing STYLE_CHANGE_DETAILS for ${style.id}`);
      assert.equal(
        entries.length,
        style.changes.length,
        `length mismatch for ${style.id}`,
      );
      for (let i = 0; i < style.changes.length; i++) {
        assert.equal(
          entries[i]!.label,
          style.changes[i],
          `label mismatch for ${style.id} at ${i}`,
        );
        assert.ok(
          STYLE_CHANGE_CATEGORY_IDS.includes(entries[i]!.category),
          `bad category for ${style.id}/${entries[i]!.label}`,
        );
        assert.ok(entries[i]!.summary.trim().length > 40);
        assert.ok(entries[i]!.trigger.trim().length > 0);
        assert.ok(entries[i]!.beforeLabel.trim().length > 0);
        assert.ok(entries[i]!.afterLabel.trim().length > 0);
        assert.ok(entries[i]!.chip.trim().length > 0);
        assert.ok(
          entries[i]!.shortDescription.length <= SHORT_MAX,
          `shortDescription too long for ${style.id}/${entries[i]!.label}`,
        );
      }
    }
  });

  it("keeps every shortDescription unique across the catalog", () => {
    const shorts = Object.values(STYLE_CHANGE_DETAILS).flatMap((items) =>
      items.map((item) => item.shortDescription.toLowerCase()),
    );
    assert.ok(shorts.length >= 1000);
    assert.equal(new Set(shorts).size, shorts.length);
  });

  it("falls back for unknown styles without throwing", () => {
    const resolved = resolveStyleChangeDetails({
      styleId: "brand-new-unpublished-style",
      styleTitle: "Brand New Neon Alley Portrait",
      labels: ["Background", "Rim light", "Cel-shaded anime style"],
    });
    assert.equal(resolved.length, 3);
    assert.equal(resolved[0]!.category, "BACKDROP");
    assert.equal(resolved[1]!.category, "LIGHTING");
    assert.equal(resolved[2]!.category, "ART STYLE");
    assert.ok(resolved.every((item) => item.shortDescription.length <= SHORT_MAX));
  });

  it("infers pose over hair when both appear in a label", () => {
    assert.equal(
      inferStyleChangeCategory("Wind-swept hair pose"),
      "POSE & FRAMING",
    );
  });
});
