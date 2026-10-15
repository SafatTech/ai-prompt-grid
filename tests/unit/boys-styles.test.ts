import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seedBoysStyles } from "../../src/lib/catalog/seed-boys-styles";
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

describe("trending AI photo prompts for boys style pages", () => {
  it("publishes 12 styles numbered 123 through 134 in draft order", () => {
    assert.equal(seedBoysStyles.length, 12);
    assert.ok(seedBoysStyles.every((style) => style.status === "published"));
    assert.ok(seedBoysStyles.every((style) => style.category === "Cinematic"));
    const numbers = seedBoysStyles.map(
      (style) => style.source.match(/source-(\d+)\./)?.[1],
    );
    assert.deepEqual(numbers, [
      "123",
      "124",
      "125",
      "126",
      "127",
      "128",
      "129",
      "130",
      "131",
      "132",
      "133",
      "134",
    ]);
    assert.deepEqual(
      seedBoysStyles.slice(0, 3).map((style) => style.id),
      [
        "trending-ai-photo-prompt-for-boys-with-car-night",
        "trending-ai-photo-prompt-for-boys-with-rose-red-shirt",
        "ai-photo-prompt-for-boy-and-girl-standing-together-rooftop",
      ],
    );
  });

  it("keeps style titles and document titles within 60 characters", () => {
    for (const style of seedBoysStyles) {
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
    for (const style of seedBoysStyles) {
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

  it("marks couples 3, 7 and 11 as two-photo merges", () => {
    for (const id of [
      "ai-photo-prompt-for-boy-and-girl-standing-together-rooftop",
      "aesthetic-ai-photo-editing-prompt-for-boy-and-girl-beach",
      "ai-photo-prompt-for-boy-and-girl-together-monsoon-umbrella",
    ]) {
      const style = seedBoysStyles.find((item) => item.id === id);
      assert.ok(style, id);
      assert.equal(style.requirement, "Two photos");
      assert.equal(style.promptVariant.inputImageCount, 2);
      assert.deepEqual(style.promptVariant.inputImageRoles, [
        "first photo",
        "second photo",
      ]);
      assert.equal(style.examplePairs.length, 2);
      assert.match(style.examplePairs[1]?.source ?? "", /source-\d+b\./);
      assert.equal(style.examplePairs[0]?.result, style.examplePairs[1]?.result);
    }
  });

  it("uses 9:16 Story for the attitude style and 1:1 Square for the DP style", () => {
    const attitude = seedBoysStyles.find(
      (item) => item.id === "attitude-ai-photo-prompt-for-boys-black-outfit",
    );
    assert.ok(attitude);
    assert.equal(attitude.promptVariant.defaults.ratio, "9:16 Story");
    assert.equal(attitude.examplePairs[0]?.resultWidth, 941);
    assert.equal(attitude.examplePairs[0]?.resultHeight, 1672);

    const dp = seedBoysStyles.find(
      (item) => item.id === "dp-ai-photo-prompt-for-boys-neon-rim-light",
    );
    assert.ok(dp);
    assert.equal(dp.promptVariant.defaults.ratio, "1:1 Square");
    assert.equal(dp.examplePairs[0]?.resultWidth, 1200);
    assert.equal(dp.examplePairs[0]?.resultHeight, 1200);
  });
});
