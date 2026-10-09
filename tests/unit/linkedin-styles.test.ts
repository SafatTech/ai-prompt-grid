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
  "cv-photo-ai-prompt-plain-background-resume-headshot",
  "modern-office-linkedin-profile-picture-prompt-gemini",
  "outdoor-natural-light-linkedin-profile-picture-prompt-gemini",
  "home-office-linkedin-profile-picture-prompt-gemini",
]);

const passportNote =
  "Official passport, visa and ID photos have strict rules, and many authorities reject AI-edited or digitally altered photos. Check your issuing authority's requirements; this prompt does not produce a compliant ID photo.";

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

  it("keeps style titles and document titles within 60 characters", () => {
    for (const style of seedLinkedinStyles) {
      assert.ok(
        style.title.length <= 60,
        `${style.id} title is ${style.title.length}: ${style.title}`,
      );
      const social = styleSocialTitle(style);
      assert.ok(social.length <= 60, `${style.id} social title is ${social.length}: ${social}`);
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
      assert.doesNotMatch(result.prompt, /smart formal/i);
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
    assert.equal(passport.description, passportNote);
    assert.ok(passport.promptVariant.limitations.includes(passportNote));

    const cv = seedLinkedinStyles.find(
      (item) => item.id === "cv-photo-ai-prompt-plain-background-resume-headshot",
    );
    assert.ok(cv);
    assert.equal(
      cv.examplePairs[0]?.altResult,
      "Woman with glasses in the same lavender knit sweater, plain cream wall.",
    );
    assert.doesNotMatch(cv.description, /formal/i);
    assert.doesNotMatch(cv.note, /formal/i);
  });
});
