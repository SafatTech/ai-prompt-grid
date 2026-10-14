import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seedBirthdayStyles } from "../../src/lib/catalog/seed-birthday-styles";
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

const APP_NAME = /\b(gemini|chatgpt|saad)\b/i;

describe("birthday AI photo style pages", () => {
  it("publishes 12 styles numbered 111 through 122 in mixed draft order", () => {
    assert.equal(seedBirthdayStyles.length, 12);
    assert.ok(seedBirthdayStyles.every((style) => style.status === "published"));
    const numbers = seedBirthdayStyles.map(
      (style) => style.source.match(/source-(\d+)\./)?.[1],
    );
    assert.deepEqual(numbers, [
      "111",
      "112",
      "113",
      "114",
      "115",
      "116",
      "117",
      "118",
      "119",
      "120",
      "121",
      "122",
    ]);
    assert.deepEqual(
      seedBirthdayStyles.slice(0, 3).map((style) => style.id),
      [
        "birthday-ai-photo-prompt-girl-pastel-cake",
        "birthday-ai-photo-prompt-boy-black-gold",
        "baby-boy-birthday-photo-ai-prompt-number-balloon",
      ],
    );
    assert.deepEqual(
      seedBirthdayStyles.map((style) => style.category),
      [
        "Cinematic",
        "Cinematic",
        "Cinematic",
        "Cinematic",
        "Cinematic",
        "Cinematic",
        "Cinematic",
        "Cinematic",
        "Cinematic",
        "Painting",
        "3D avatars",
        "Vintage",
      ],
    );
  });

  it("keeps style titles and document titles within 60 characters", () => {
    for (const style of seedBirthdayStyles) {
      assert.ok(
        style.title.length <= 60,
        `${style.id} title is ${style.title.length}: ${style.title}`,
      );
      const social = styleSocialTitle(style);
      assert.ok(
        social.length <= 60,
        `${style.id} social title is ${social.length}: ${social}`,
      );
      assert.equal(social.endsWith("Prompt Prompt"), false);
      assert.equal(social.includes(style.title.slice(0, 20)), true);
      assert.equal(APP_NAME.test(style.title), false, style.id);
      assert.equal(APP_NAME.test(style.id), false, style.id);
    }
  });

  it("uses schema moods and backgrounds without growing category preset lists", () => {
    assert.equal(categoryMoodPresets.Cinematic.length, 9);
    assert.equal(categoryBackgroundPresets.Cinematic.length, 9);
    assert.equal(categoryMoodPresets.Painting.length, 9);
    assert.equal(categoryBackgroundPresets.Painting.length, 9);
    assert.equal(categoryMoodPresets.Vintage.length, 9);
    assert.equal(categoryBackgroundPresets.Vintage.length, 9);
    assert.equal(categoryMoodPresets["3D avatars"].length, 9);
    assert.equal(categoryBackgroundPresets["3D avatars"].length, 9);
    for (const style of seedBirthdayStyles) {
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
      assert.ok(
        backgrounds.every((item) => item.label.split(/\s+/).length <= 4),
      );
      const result = assemblePrompt(style, defaults);
      assert.equal(result.ok, true, style.id);
      if (!result.ok) continue;
      assert.equal(TOKEN.test(result.prompt), false, style.id);
      assert.equal(/\bApply\s+[a-z]/.test(result.prompt), true, style.id);
      assert.equal(
        /\{\{(subject|mood|background|ratio|preserve)\}\}/.test(
          style.promptVariant.template,
        ),
        true,
        style.id,
      );
    }
  });

  it("marks the friends-or-partner collage as a two-photo merge", () => {
    const style = seedBirthdayStyles.find(
      (item) => item.id === "ai-birthday-photo-collage-prompt-friends-or-partner",
    );
    assert.ok(style);
    assert.equal(style.requirement, "Two photos");
    assert.equal(style.promptVariant.inputImageCount, 2);
    assert.deepEqual(style.promptVariant.inputImageRoles, [
      "first photo",
      "second photo",
    ]);
    assert.equal(style.examplePairs.length, 2);
    assert.match(style.examplePairs[1]?.source ?? "", /source-122b\./);
    assert.equal(style.examplePairs[0]?.result, style.examplePairs[1]?.result);
  });

  it("uses 9:16 Story for mirror selfie and 3D poster styles", () => {
    for (const id of [
      "birthday-photo-ai-prompt-instagram-mirror-selfie",
      "birthday-wishes-ai-photo-prompt-3d-text-poster",
    ]) {
      const style = seedBirthdayStyles.find((item) => item.id === id);
      assert.ok(style, id);
      assert.equal(style.promptVariant.defaults.ratio, "9:16 Story");
      assert.equal(style.examplePairs[0]?.resultWidth, 941);
      assert.equal(style.examplePairs[0]?.resultHeight, 1672);
    }
  });

  it("uses 1:1 Square for the collage style", () => {
    const style = seedBirthdayStyles.find(
      (item) => item.id === "ai-birthday-photo-collage-prompt-friends-or-partner",
    );
    assert.ok(style);
    assert.equal(style.promptVariant.defaults.ratio, "1:1 Square");
    assert.equal(style.examplePairs[0]?.resultWidth, 1200);
    assert.equal(style.examplePairs[0]?.resultHeight, 1200);
  });
});
