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

const SHORT_MIN = 60;
const SHORT_MAX = 95;

function summarySentences(summary: string): string[] {
  return summary
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

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
    let total = 0;

    for (const style of published) {
      const entries = STYLE_CHANGE_DETAILS[style.id];
      assert.ok(entries, `missing STYLE_CHANGE_DETAILS for ${style.id}`);
      assert.equal(
        entries.length,
        style.changes.length,
        `length mismatch for ${style.id}`,
      );
      total += entries.length;
      for (let i = 0; i < style.changes.length; i++) {
        const entry = entries[i]!;
        assert.equal(
          entry.label,
          style.changes[i],
          `label mismatch for ${style.id} at ${i}`,
        );
        assert.ok(
          STYLE_CHANGE_CATEGORY_IDS.includes(entry.category),
          `bad category for ${style.id}/${entry.label}`,
        );
        assert.ok(entry.trigger.trim().length > 0);
        assert.ok(entry.chip.trim().length > 0);
        assert.ok(
          entry.shortDescription.length >= SHORT_MIN,
          `shortDescription too short for ${style.id}/${entry.label}: ${entry.shortDescription.length}`,
        );
        assert.ok(
          entry.shortDescription.length <= SHORT_MAX,
          `shortDescription too long for ${style.id}/${entry.label}: ${entry.shortDescription.length}`,
        );
        assert.equal(
          /…|\.\.\./.test(entry.shortDescription),
          false,
          `ellipsis in shortDescription for ${style.id}/${entry.label}`,
        );
        assert.equal(
          /…|\.\.\./.test(entry.summary),
          false,
          `ellipsis in summary for ${style.id}/${entry.label}`,
        );
        assert.equal(
          /…|\.\.\./.test(entry.beforeLabel) || /…|\.\.\./.test(entry.afterLabel),
          false,
          `ellipsis in before/after for ${style.id}/${entry.label}`,
        );
        assert.equal(
          /matching the .+ brief/i.test(entry.summary),
          false,
          `title-brief paste in summary for ${style.id}/${entry.label}`,
        );
        const beforeWords = wordCount(entry.beforeLabel);
        const afterWords = wordCount(entry.afterLabel);
        assert.ok(
          beforeWords >= 2 && beforeWords <= 6,
          `beforeLabel word count for ${style.id}/${entry.label}: ${beforeWords}`,
        );
        assert.ok(
          afterWords >= 2 && afterWords <= 6,
          `afterLabel word count for ${style.id}/${entry.label}: ${afterWords}`,
        );
        assert.ok(
          summarySentences(entry.summary).length >= 2,
          `summary needs 2 sentences for ${style.id}/${entry.label}`,
        );
      }
    }

    assert.equal(total, published.reduce((n, style) => n + style.changes.length, 0));
    assert.ok(total >= 1300);
  });

  it("keeps every shortDescription unique across the catalog", () => {
    const shorts = Object.values(STYLE_CHANGE_DETAILS).flatMap((items) =>
      items.map((item) => item.shortDescription.toLowerCase()),
    );
    assert.ok(shorts.length >= 1000);
    assert.equal(new Set(shorts).size, shorts.length);
  });

  it("keeps summary sentences from being reused more than three times", () => {
    const counts = new Map<string, number>();
    for (const items of Object.values(STYLE_CHANGE_DETAILS)) {
      for (const item of items) {
        for (const sentence of summarySentences(item.summary)) {
          const key = sentence.toLowerCase().replace(/\s+/g, " ").trim();
          counts.set(key, (counts.get(key) ?? 0) + 1);
        }
      }
    }
    const overused = [...counts.entries()].filter(([, count]) => count > 3);
    assert.deepEqual(
      overused.map(([sentence, count]) => ({ sentence, count })),
      [],
      "no summary sentence should appear more than 3 times",
    );
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
