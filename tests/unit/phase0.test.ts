import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  activeFilterEntries,
  createEmptyFilters,
  filterStyles,
  parseExploreSearchParams,
} from "../../src/lib/catalog/filters";
import {
  assemblePrompt,
  defaultsForStyle,
  previewPrompt,
} from "../../src/lib/catalog/prompts";
import { promptOptionsSchema } from "../../src/lib/catalog/schemas";
import { getPublishedStyles, getStyleById } from "../../src/lib/catalog/styles";
import { cn } from "../../src/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    assert.equal(cn("px-2", "px-4"), "px-4");
  });
});

describe("published catalog seed", () => {
  it("exposes 42 published styles with recipe fields", () => {
    const published = getPublishedStyles();
    assert.equal(published.length, 42);
    for (const style of published) {
      assert.equal(style.status, "published");
      assert.ok(style.promptVariant.template.includes("{{mood}}"));
      assert.ok(style.promptVariant.mode.length > 0);
      assert.ok(style.examplePairs.length >= 2);
      assert.ok(style.promptVariant.limitations.length >= 1);
    }
  });
});

describe("assemblePrompt", () => {
  it("builds a cinematic-window prompt with selected options", () => {
    const style = getStyleById("cinematic-window");
    assert.ok(style);
    const result = assemblePrompt(style, {
      ...defaultsForStyle(style),
      mood: "Deep blue",
      keepClothing: false,
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /cinematic photograph/i);
    assert.match(result.prompt, /deep blue/i);
    assert.doesNotMatch(result.prompt, /clothing/);
    assert.doesNotMatch(result.prompt, /\{\{/);
  });

  it("builds a generic prompt for pet styles", () => {
    const pet = getStyleById("painted-pet");
    assert.ok(pet);
    const result = assemblePrompt(pet, defaultsForStyle(pet));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /Painted Pet Portrait/);
    assert.match(result.prompt, /pet photo/i);
  });

  it("rejects invalid prompt options", () => {
    const style = getStyleById("cinematic-window");
    assert.ok(style);
    const result = assemblePrompt(style, {
      ...defaultsForStyle(style),
      // @ts-expect-error intentional invalid mood for validation test
      mood: "Not a real mood",
    });
    assert.equal(result.ok, false);
    assert.equal(previewPrompt(style, {
      ...defaultsForStyle(style),
      // @ts-expect-error intentional invalid mood
      mood: "Nope",
    }), "");
  });
});

describe("explore filters", () => {
  it("parses and filters by category query params", () => {
    const query = parseExploreSearchParams(
      new URLSearchParams("category=Pets&sort=Most%20saved"),
    );
    assert.deepEqual(query.category, ["Pets"]);
    assert.equal(query.sort, "Most saved");
    const filters = createEmptyFilters();
    filters.category.add("Pets");
    const results = filterStyles(getPublishedStyles(), filters, "", "Most saved");
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "painted-pet");
    assert.equal(activeFilterEntries(filters).length, 1);
  });
});

describe("promptOptionsSchema", () => {
  it("accepts defaults", () => {
    const parsed = promptOptionsSchema.safeParse({
      mood: "Warm neutral",
      background: "Softly blurred interior",
      ratio: "4:5 Portrait",
      keepClothing: true,
      keepPose: true,
    });
    assert.equal(parsed.success, true);
  });
});
