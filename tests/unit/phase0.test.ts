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
import {
  assertPresetValuesInSchema,
  labeledOptionsForStyle,
} from "../../src/lib/catalog/prompt-option-presets";
import { promptOptionsSchema } from "../../src/lib/catalog/schemas";
import { eightiesStyleIds } from "../../src/lib/catalog/seed-80s-styles";
import { linkedinStyleIds } from "../../src/lib/catalog/seed-linkedin-styles";
import { getPublishedStyles, getStyleById } from "../../src/lib/catalog/styles";
import { cn } from "../../src/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    assert.equal(cn("px-2", "px-4"), "px-4");
  });
});

describe("published catalog seed", () => {
  it("exposes 125 published styles with recipe fields", () => {
    const published = getPublishedStyles();
    assert.equal(published.length, 125);
    for (const style of published) {
      assert.equal(style.status, "published");
      assert.ok(style.promptVariant.template.includes("{{mood}}"));
      assert.ok(style.promptVariant.mode.length > 0);
      const singlePair =
        eightiesStyleIds.has(style.id) || linkedinStyleIds.has(style.id);
      assert.ok(style.examplePairs.length >= (singlePair ? 1 : 2));
      assert.ok(style.promptVariant.limitations.length >= 1);
    }
  });
});

describe("assemblePrompt", () => {
  it("builds an editorial prompt with selected options", () => {
    const style = getStyleById("south-asian-fashion-editorial");
    assert.ok(style);
    const result = assemblePrompt(style, {
      ...defaultsForStyle(style),
      mood: "Deep blue",
      keepClothing: false,
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /South Asian fashion editorial/i);
    assert.match(result.prompt, /deep blue/i);
    assert.doesNotMatch(result.prompt, /\{\{/);
  });

  it("builds a prompt for a later editorial style", () => {
    const style = getStyleById("meadow-reverie");
    assert.ok(style);
    const result = assemblePrompt(style, defaultsForStyle(style));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /moody outdoor editorial/i);
    assert.match(result.prompt, /person/i);
  });

  it("builds a product preserve list from product toggles", () => {
    const style = getStyleById("pure-white-packshot");
    assert.ok(style);
    const result = assemblePrompt(style, defaultsForStyle(style));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /product details & genuine packaging/i);
    assert.doesNotMatch(result.prompt, /camera angle & framing/i);
    assert.doesNotMatch(result.prompt, /\{\{/);
  });

  it("builds a group preserve list from group toggles", () => {
    const style = getStyleById("after-hours-polaroid");
    assert.ok(style);
    const result = assemblePrompt(style, defaultsForStyle(style));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /identities and facial features/i);
    assert.match(result.prompt, /group arrangement and pose/i);
  });

  it("builds a place preserve list from place toggles", () => {
    const style = getStyleById("cozy-dream-room");
    assert.ok(style);
    const result = assemblePrompt(style, defaultsForStyle(style));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /structural layout/i);
    assert.match(result.prompt, /camera perspective/i);
  });

  it("builds a pet preserve list from pet toggles", () => {
    const style = getStyleById("cute-3d-toon-pet");
    assert.ok(style);
    const result = assemblePrompt(style, defaultsForStyle(style));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /pet identity and distinctive markings/i);
    assert.match(result.prompt, /original pose and composition/i);
  });

  it("rejects invalid prompt options", () => {
    const style = getStyleById("south-asian-fashion-editorial");
    assert.ok(style);
    const result = assemblePrompt(style, {
      ...defaultsForStyle(style),
      // @ts-expect-error intentional invalid mood for validation test
      mood: "Not a real mood",
    });
    assert.equal(result.ok, false);
    assert.equal(
      previewPrompt(style, {
        ...defaultsForStyle(style),
        // @ts-expect-error intentional invalid mood
        mood: "Nope",
      }),
      "",
    );
  });
});

describe("explore filters", () => {
  it("parses and filters by category query params", () => {
    const query = parseExploreSearchParams(
      new URLSearchParams("category=Travel&sort=Most%20saved"),
    );
    assert.deepEqual(query.category, ["Travel"]);
    assert.equal(query.sort, "Most saved");
    const filters = createEmptyFilters();
    filters.category.add("Travel");
    const results = filterStyles(getPublishedStyles(), filters, "", "Most saved");
    assert.ok(results.length >= 1);
    assert.ok(results.every((style) => style.category === "Travel"));
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

describe("labeledOptionsForStyle", () => {
  it("keeps preset values inside schema enums", () => {
    assert.doesNotThrow(() => assertPresetValuesInSchema());
  });

  it("returns at most 10 options with the style default first", () => {
    const style = getStyleById("south-asian-fashion-editorial");
    assert.ok(style);
    const defaults = defaultsForStyle(style);
    const moods = labeledOptionsForStyle(style, "mood");
    const backgrounds = labeledOptionsForStyle(style, "background");

    assert.ok(moods.length <= 10);
    assert.ok(backgrounds.length <= 10);
    assert.equal(moods[0]?.value, defaults.mood);
    assert.equal(backgrounds[0]?.value, defaults.background);
    assert.ok(moods.every((item) => item.label.split(/\s+/).length <= 4));
    assert.ok(backgrounds.every((item) => item.label.split(/\s+/).length <= 4));
  });

  it("assembles prompts with the full selected background sentence", () => {
    const style = getStyleById("pure-white-packshot");
    assert.ok(style);
    const backgrounds = labeledOptionsForStyle(style, "background");
    const selected = backgrounds.find(
      (item) => item.value !== defaultsForStyle(style).background,
    );
    assert.ok(selected);
    assert.notEqual(selected.label, selected.value);

    const result = assemblePrompt(style, {
      ...defaultsForStyle(style),
      background: selected.value as ReturnType<typeof defaultsForStyle>["background"],
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.ok(result.prompt.toLowerCase().includes(selected.value.toLowerCase()));
  });
});
