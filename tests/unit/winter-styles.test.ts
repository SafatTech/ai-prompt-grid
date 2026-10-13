import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seedWinterStyles } from "../../src/lib/catalog/seed-winter-styles";
import {
  assemblePrompt,
  defaultsForStyle,
} from "../../src/lib/catalog/prompts";
import {
  categoryBackgroundPresets,
  categoryMoodPresets,
  labeledOptionsForStyle,
} from "../../src/lib/catalog/prompt-option-presets";
import { backgroundSchema, moodSchema } from "../../src/lib/catalog/schemas";
import { styleSocialTitle } from "../../src/lib/catalog/style-meta";

const TOKEN = /\{\{[a-zA-Z]+\}\}/;

const mergeIds = new Set([
  "snowfall-merge-two-photos-winter-ai-prompt-couple",
  "hunza-style-valley-merge-two-photos-winter-prompt",
]);

describe("winter AI photo style pages", () => {
  it("publishes 12 styles numbered 87 through 98", () => {
    assert.equal(seedWinterStyles.length, 12);
    assert.ok(
      seedWinterStyles.every((style) =>
        ["Travel", "Cinematic"].includes(style.category),
      ),
    );
    assert.ok(seedWinterStyles.every((style) => style.status === "published"));
    const numbers = seedWinterStyles.map(
      (style) => style.source.match(/source-(\d+)\./)?.[1],
    );
    assert.deepEqual(numbers, [
      "87",
      "88",
      "89",
      "90",
      "91",
      "92",
      "93",
      "94",
      "95",
      "96",
      "97",
      "98",
    ]);
  });

  it("keeps style titles and document titles within 60 characters", () => {
    for (const style of seedWinterStyles) {
      assert.ok(
        style.title.length <= 60,
        `${style.id} title is ${style.title.length}: ${style.title}`,
      );
      const social = styleSocialTitle(style);
      assert.ok(social.length <= 60, `${style.id} social title is ${social.length}: ${social}`);
      // Full winter titles already end in "Prompt"; do not append another " Prompt".
      assert.equal(social.endsWith("Prompt Prompt"), false);
      assert.equal(social.includes(style.title.slice(0, 20)), true);
    }
  });

  it("uses schema moods and backgrounds without growing category preset lists", () => {
    for (const category of ["Cinematic", "Travel"] as const) {
      assert.equal(categoryMoodPresets[category].length, 9, category);
      assert.equal(categoryBackgroundPresets[category].length, 9, category);
    }
    for (const style of seedWinterStyles) {
      const defaults = defaultsForStyle(style);
      assert.equal(moodSchema.safeParse(defaults.mood).success, true, style.id);
      assert.equal(
        backgroundSchema.safeParse(defaults.background).success,
        true,
        style.id,
      );
      assert.equal(style.promptVariant.lastVerified, "");
      const moods = labeledOptionsForStyle(style, "mood");
      const backgrounds = labeledOptionsForStyle(style, "background");
      assert.equal(moods[0]?.value, defaults.mood);
      assert.equal(backgrounds[0]?.value, defaults.background);
      assert.ok(moods.every((item) => item.label.split(/\s+/).length <= 4));
      assert.ok(backgrounds.every((item) => item.label.split(/\s+/).length <= 4));
      const result = assemblePrompt(style, defaults);
      assert.equal(result.ok, true, style.id);
      if (!result.ok) continue;
      assert.equal(TOKEN.test(result.prompt), false, style.id);
      assert.equal(/\bApply\s+[a-z]/.test(result.prompt), true, style.id);
      assert.equal(/scene\.Apply/.test(result.prompt), false, style.id);
    }
  });

  it("marks the two merge styles as two-photo inputs with shared results", () => {
    for (const id of mergeIds) {
      const style = seedWinterStyles.find((item) => item.id === id);
      assert.ok(style);
      assert.equal(style.requirement, "Two photos");
      assert.equal(style.promptVariant.inputImageCount, 2);
      assert.deepEqual(style.promptVariant.inputImageRoles, [
        "first photo",
        "second photo",
      ]);
      assert.equal(style.examplePairs.length, 2);
      const n = style.source.match(/source-(\d+)\./)?.[1];
      assert.match(style.examplePairs[1]?.source ?? "", new RegExp(`source-${n}b\\.`));
      assert.equal(style.examplePairs[0]?.result, style.examplePairs[1]?.result);
    }
  });

  it("uses 9:16 Story for the fairy-lights sweater style", () => {
    const style = seedWinterStyles.find(
      (item) => item.id === "fairy-lights-sweater-winter-ai-photo-prompt-girls",
    );
    assert.ok(style);
    assert.equal(style.promptVariant.defaults.ratio, "9:16 Story");
    assert.equal(style.examplePairs[0]?.resultWidth, 941);
    assert.equal(style.examplePairs[0]?.resultHeight, 1672);
  });

  it("keeps Hunza Valley in the friends/siblings merge title", () => {
    const style = seedWinterStyles.find(
      (item) => item.id === "hunza-style-valley-merge-two-photos-winter-prompt",
    );
    assert.ok(style);
    assert.match(style.title, /Hunza Valley/);
    const result = assemblePrompt(style, defaultsForStyle(style));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /friends or siblings/i);
  });
});
