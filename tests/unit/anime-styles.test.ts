import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seedAnimeStyles } from "../../src/lib/catalog/seed-anime-styles";
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

const TRADEMARK =
  /\b(ghibli|studio\s+ghibli|naruto|one\s+piece|demon\s+slayer|dragon\s+ball|pokemon|pokémon)\b/i;

describe("anime AI photo style pages", () => {
  it("publishes 12 styles numbered 99 through 110 in interleaved order", () => {
    assert.equal(seedAnimeStyles.length, 12);
    assert.ok(seedAnimeStyles.every((style) => style.category === "Anime"));
    assert.ok(seedAnimeStyles.every((style) => style.status === "published"));
    const numbers = seedAnimeStyles.map(
      (style) => style.source.match(/source-(\d+)\./)?.[1],
    );
    assert.deepEqual(numbers, [
      "99",
      "100",
      "101",
      "102",
      "103",
      "104",
      "105",
      "106",
      "107",
      "108",
      "109",
      "110",
    ]);
    assert.deepEqual(
      seedAnimeStyles.slice(0, 3).map((style) => style.id),
      [
        "anime-girl-ai-photo-prompt-gemini-meadow",
        "anime-boy-ai-photo-prompt-gemini-power-aura",
        "rooftop-sunset-anime-friends-ai-photo-prompt",
      ],
    );
  });

  it("keeps style titles and document titles within 60 characters", () => {
    for (const style of seedAnimeStyles) {
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
    }
  });

  it("uses schema moods and backgrounds without growing Anime preset lists", () => {
    assert.equal(categoryMoodPresets.Anime.length, 9);
    assert.equal(categoryBackgroundPresets.Anime.length, 9);
    for (const style of seedAnimeStyles) {
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
      assert.equal(TRADEMARK.test(result.prompt), false, style.id);
      assert.equal(TRADEMARK.test(style.title), false, style.id);
      assert.equal(TRADEMARK.test(style.description), false, style.id);
    }
  });

  it("marks the cherry-blossom couple style as a two-photo merge", () => {
    const style = seedAnimeStyles.find(
      (item) => item.id === "cherry-blossom-anime-couple-prompt-gemini",
    );
    assert.ok(style);
    assert.equal(style.requirement, "Two photos");
    assert.equal(style.promptVariant.inputImageCount, 2);
    assert.deepEqual(style.promptVariant.inputImageRoles, [
      "first photo",
      "second photo",
    ]);
    assert.equal(style.examplePairs.length, 2);
    assert.match(style.examplePairs[1]?.source ?? "", /source-104b\./);
    assert.equal(style.examplePairs[0]?.result, style.examplePairs[1]?.result);
  });

  it("uses 9:16 Story for the rainy night street style", () => {
    const style = seedAnimeStyles.find(
      (item) => item.id === "rainy-night-street-anime-boy-ai-photo-prompt",
    );
    assert.ok(style);
    assert.equal(style.promptVariant.defaults.ratio, "9:16 Story");
    assert.equal(style.examplePairs[0]?.resultWidth, 941);
    assert.equal(style.examplePairs[0]?.resultHeight, 1672);
  });

  it("uses 1:1 Square for both chibi sticker styles", () => {
    for (const id of [
      "cute-chibi-ai-photo-prompt-girls-sticker",
      "viral-chibi-friends-ai-prompt-sticker-sheet",
    ]) {
      const style = seedAnimeStyles.find((item) => item.id === id);
      assert.ok(style, id);
      assert.equal(style.promptVariant.defaults.ratio, "1:1 Square");
      assert.equal(style.examplePairs[0]?.resultWidth, 1200);
      assert.equal(style.examplePairs[0]?.resultHeight, 1200);
    }
  });
});
