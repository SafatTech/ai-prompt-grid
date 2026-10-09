import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seedLinkedinStyles } from "../../src/lib/catalog/seed-linkedin-styles";
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

const keepClothesIds = new Set([
  "modern-office-linkedin-profile-picture-prompt-gemini",
  "outdoor-natural-light-linkedin-profile-picture-prompt-gemini",
  "home-office-linkedin-profile-picture-prompt-gemini",
]);

describe("LinkedIn headshot style pages", () => {
  it("publishes 15 professional portrait styles numbered 60 through 74", () => {
    assert.equal(seedLinkedinStyles.length, 15);
    assert.ok(
      seedLinkedinStyles.every((style) => style.category === "Professional portraits"),
    );
    assert.ok(seedLinkedinStyles.every((style) => style.status === "published"));
    const numbers = seedLinkedinStyles.map((style) => style.source.match(/source-(\d+)\./)?.[1]);
    assert.deepEqual(numbers, [
      "60",
      "61",
      "62",
      "63",
      "64",
      "65",
      "66",
      "67",
      "68",
      "69",
      "70",
      "71",
      "72",
      "73",
      "74",
    ]);
  });

  it("keeps document titles within 60 characters and does not append another Prompt", () => {
    for (const style of seedLinkedinStyles) {
      const social = styleSocialTitle(style);
      assert.ok(social.length <= 60, `${style.id} title is ${social.length}: ${social}`);
      assert.equal(social.endsWith(" Prompt"), false);
    }
  });

  it("uses schema moods and backgrounds without growing the portrait preset lists", () => {
    assert.equal(categoryMoodPresets["Professional portraits"].length, 9);
    assert.equal(categoryBackgroundPresets["Professional portraits"].length, 9);
    for (const style of seedLinkedinStyles) {
      const defaults = defaultsForStyle(style);
      assert.equal(moodSchema.safeParse(defaults.mood).success, true);
      assert.equal(backgroundSchema.safeParse(defaults.background).success, true);
      assert.equal(style.promptVariant.lastVerified, "");
      const backgrounds = labeledOptionsForStyle(style, "background");
      assert.equal(backgrounds[0]?.value, defaults.background);
      assert.ok(backgrounds.every((item) => item.label.split(/\s+/).length <= 4));
      const result = assemblePrompt(style, defaults);
      assert.equal(result.ok, true);
      if (!result.ok) continue;
      assert.equal(TOKEN.test(result.prompt), false);
    }
  });

  it("keeps clothes on the office, outdoor and home prompts and stores the team pair", () => {
    for (const id of keepClothesIds) {
      const style = seedLinkedinStyles.find((item) => item.id === id);
      assert.ok(style);
      assert.equal(style.promptVariant.defaults.keepClothing, true);
      assert.equal(style.examplePairs.length, 1);
      const result = assemblePrompt(style, defaultsForStyle(style));
      assert.equal(result.ok, true);
      if (!result.ok) continue;
      assert.match(result.prompt, /keep their own clothes/i);
    }

    const team = seedLinkedinStyles.find(
      (item) => item.id === "matching-team-headshot-ai-prompt-gemini-company-page",
    );
    assert.ok(team);
    assert.equal(team.promptVariant.inputImageCount, 1);
    assert.equal(team.examplePairs.length, 2);
    assert.match(team.examplePairs[1]?.source ?? "", /source-70b\./);
    assert.match(team.examplePairs[1]?.altResult ?? "", /plaid shirt/);

    const passport = seedLinkedinStyles.find(
      (item) => item.id === "passport-size-photo-ai-prompt-gemini-white-background",
    );
    assert.ok(passport);
    assert.match(passport.description, /check yours/i);
    assert.ok(passport.promptVariant.limitations.some((line) => /check yours/i.test(line)));
  });
});
