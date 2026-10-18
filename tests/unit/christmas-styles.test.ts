import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seedChristmasStyles } from "../../src/lib/catalog/seed-christmas-styles";
import { assemblePrompt, defaultsForStyle } from "../../src/lib/catalog/prompts";
import {
  categoryBackgroundPresets,
  categoryMoodPresets,
  labeledOptionsForStyle,
} from "../../src/lib/catalog/prompt-option-presets";
import { backgroundSchema, moodSchema } from "../../src/lib/catalog/schemas";
import { styleSocialTitle } from "../../src/lib/catalog/style-meta";

const TOKEN = /\{\{[a-zA-Z]+\}\}/;

const APP_NAME = /\b(gemini|chatgpt|saad)\b/i;

const TRADEMARK = /\b(grinch|coca|disney|marvel|pixar|frozen|elf on the shelf)\b/i;

describe("Christmas AI photo prompts style pages", () => {
  it("publishes 12 styles numbered 135 through 146 in draft order", () => {
    assert.equal(seedChristmasStyles.length, 12);
    assert.ok(seedChristmasStyles.every((style) => style.status === "published"));
    const numbers = seedChristmasStyles.map(
      (style) => style.source.match(/source-(\d+)\./)?.[1],
    );
    assert.deepEqual(
      numbers,
      Array.from({ length: 12 }, (_, index) => String(135 + index)),
    );
    assert.deepEqual(
      seedChristmasStyles.slice(0, 3).map((style) => style.id),
      [
        "christmas-couple-photo-ai-prompt-decorating-the-tree",
        "christmas-baby-photoshoot-ai-prompt-gift-boxes",
        "christmas-ai-photo-prompts-for-men-fireside-gifts",
      ],
    );
    const pet = seedChristmasStyles.find(
      (style) => style.id === "ai-christmas-pet-photo-prompt-gift-box-surprise",
    );
    assert.ok(pet);
    assert.equal(pet.category, "Pets");
    assert.equal(pet.subject, "Pet");
    assert.ok(
      seedChristmasStyles
        .filter((style) => style !== pet)
        .every((style) => style.category === "Cinematic"),
    );
  });

  it("keeps style titles and document titles within 60 characters, with no app names or trademarks", () => {
    for (const style of seedChristmasStyles) {
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
      assert.equal(TRADEMARK.test(style.promptVariant.template), false, style.id);
      assert.equal(TRADEMARK.test(style.description), false, style.id);
    }
  });

  it("uses schema moods and backgrounds without growing category preset lists", () => {
    assert.equal(categoryMoodPresets.Cinematic.length, 9);
    assert.equal(categoryBackgroundPresets.Cinematic.length, 9);
    for (const style of seedChristmasStyles) {
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
      for (const token of ["subject", "mood", "background", "ratio", "preserve"]) {
        assert.ok(
          style.promptVariant.template.includes(`{{${token}}}`),
          `${style.id} is missing {{${token}}}`,
        );
      }
    }
  });

  it("marks couples 1, 7 and 12 as two-photo merges", () => {
    const merges = seedChristmasStyles.filter(
      (style) => style.promptVariant.inputImageCount === 2,
    );
    assert.deepEqual(
      merges.map((style) => style.id),
      [
        "christmas-couple-photo-ai-prompt-decorating-the-tree",
        "ai-christmas-photo-prompt-for-couples-gift-exchange",
        "christmas-couple-photoshoot-ai-prompt-candy-cane-lane",
      ],
    );
    for (const style of merges) {
      assert.equal(style.requirement, "Two photos");
      assert.deepEqual(style.promptVariant.inputImageRoles, [
        "first photo",
        "second photo",
      ]);
      assert.equal(style.examplePairs.length, 2);
      assert.match(style.examplePairs[1]?.source ?? "", /source-\d+b\./);
      assert.equal(style.examplePairs[0]?.result, style.examplePairs[1]?.result);
    }
    for (const style of seedChristmasStyles) {
      if (style.promptVariant.inputImageCount === 2) continue;
      assert.equal(style.requirement, "One photo", style.id);
      assert.equal(style.examplePairs.length, 1, style.id);
    }
  });

  it("uses 9:16 Story for the giant ornament and 1:1 Square for the pet", () => {
    const ornament = seedChristmasStyles.find(
      (item) => item.id === "viral-christmas-ai-photo-trend-prompt-giant-ornament",
    );
    assert.ok(ornament);
    assert.equal(ornament.promptVariant.defaults.ratio, "9:16 Story");
    assert.ok((ornament.examplePairs[0]?.resultHeight ?? 0) > 1700);

    const pet = seedChristmasStyles.find(
      (item) => item.id === "ai-christmas-pet-photo-prompt-gift-box-surprise",
    );
    assert.ok(pet);
    assert.equal(pet.promptVariant.defaults.ratio, "1:1 Square");
    assert.equal(pet.examplePairs[0]?.resultWidth, 1200);
    assert.equal(pet.examplePairs[0]?.resultHeight, 1200);
  });
});
