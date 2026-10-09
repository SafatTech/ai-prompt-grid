import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seedMergeStyles } from "../../src/lib/catalog/seed-merge-styles";
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

const keepPoseIds = new Set([
  "side-by-side-keepsake-frame-merge-two-photos-prompt-gemini-couple",
  "add-missing-person-to-group-photo-merge-two-photos-prompt-gemini-family",
]);

describe("merge two photos style pages", () => {
  it("publishes 12 two-photo styles numbered 75 through 86", () => {
    assert.equal(seedMergeStyles.length, 12);
    assert.ok(
      seedMergeStyles.every((style) =>
        ["Cinematic", "Vintage", "Travel", "Pets"].includes(style.category),
      ),
    );
    assert.ok(seedMergeStyles.every((style) => style.status === "published"));
    assert.ok(seedMergeStyles.every((style) => style.requirement === "Two photos"));
    const numbers = seedMergeStyles.map((style) => style.source.match(/source-(\d+)\./)?.[1]);
    assert.deepEqual(numbers, [
      "75",
      "76",
      "77",
      "78",
      "79",
      "80",
      "81",
      "82",
      "83",
      "84",
      "85",
      "86",
    ]);
    for (const style of seedMergeStyles) {
      assert.equal(style.promptVariant.inputImageCount, 2);
      assert.deepEqual(style.promptVariant.inputImageRoles, ["first photo", "second photo"]);
      assert.equal(style.examplePairs.length, 2);
      const n = style.source.match(/source-(\d+)\./)?.[1];
      assert.match(style.examplePairs[1]?.source ?? "", new RegExp(`source-${n}b\\.`));
      assert.equal(style.examplePairs[0]?.result, style.examplePairs[1]?.result);
      assert.match(style.examplePairs[0]?.result ?? "", new RegExp(`result-${n}\\.`));
      assert.equal(style.promptVariant.lastVerified, "");
    }
  });

  it("keeps style titles and document titles within 60 characters", () => {
    for (const style of seedMergeStyles) {
      assert.ok(
        style.title.length <= 60,
        `${style.id} title is ${style.title.length}: ${style.title}`,
      );
      const social = styleSocialTitle(style);
      assert.ok(social.length <= 60, `${style.id} social title is ${social.length}: ${social}`);
      assert.equal(social.endsWith(" Prompt"), false);
    }
  });

  it("uses schema moods and backgrounds without growing category preset lists", () => {
    for (const category of ["Cinematic", "Vintage", "Travel", "Pets"] as const) {
      assert.equal(categoryMoodPresets[category].length, 9, category);
      assert.equal(categoryBackgroundPresets[category].length, 9, category);
    }
    for (const style of seedMergeStyles) {
      const defaults = defaultsForStyle(style);
      assert.equal(moodSchema.safeParse(defaults.mood).success, true, style.id);
      assert.equal(backgroundSchema.safeParse(defaults.background).success, true, style.id);
      const moods = labeledOptionsForStyle(style, "mood");
      const backgrounds = labeledOptionsForStyle(style, "background");
      assert.equal(moods[0]?.value, defaults.mood);
      assert.equal(backgrounds[0]?.value, defaults.background);
      assert.ok(moods.every((item) => item.label.split(/\s+/).length <= 4));
      assert.ok(backgrounds.every((item) => item.label.split(/\s+/).length <= 4));
      const result = assemblePrompt(style, defaults);
      assert.equal(result.ok, true);
      if (!result.ok) continue;
      assert.equal(TOKEN.test(result.prompt), false, style.id);
      assert.equal(style.promptVariant.defaults.keepPose, keepPoseIds.has(style.id));
      assert.equal(style.promptVariant.defaults.keepClothing, true);
    }
  });

  it("treats the sofa style as a pet merge with both sources", () => {
    const pet = seedMergeStyles.find(
      (style) => style.id === "sofa-cuddle-with-your-pet-merge-two-photos-prompt-gemini-person-and-pet",
    );
    assert.ok(pet);
    assert.equal(pet.subject, "Pet");
    assert.equal(pet.category, "Pets");
    const result = assemblePrompt(pet, defaultsForStyle(pet));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /pet identity and distinctive markings/i);
  });
});
