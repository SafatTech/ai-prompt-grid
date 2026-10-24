import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seedAnimeStyles } from "../../src/lib/catalog/seed-anime-styles";
import { seedStyles } from "../../src/lib/catalog/seed-styles";
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

const TRADEMARK =
  /\b(ghibli|studio\s+ghibli|naruto|one\s+piece|demon\s+slayer|dragon\s+ball|pokemon|pokémon)\b/i;

/**
 * LinkedIn guide styles keep app names in titles by product choice.
 * Slugs with "linkedin", plus the passport and matching-team headshot styles.
 */
const ALLOWED_APP_NAME_TITLE_IDS = new Set([
  "navy-blazer-linkedin-profile-picture-prompt-gemini",
  "charcoal-suit-corporate-linkedin-profile-picture-prompt-gemini-men",
  "black-blazer-linkedin-profile-picture-prompt-gemini-women",
  "hijab-office-linkedin-profile-picture-prompt-gemini-women",
  "shalwar-kameez-linkedin-profile-picture-prompt-gemini-men",
  "modern-office-linkedin-profile-picture-prompt-gemini",
  "outdoor-natural-light-linkedin-profile-picture-prompt-gemini",
  "linkedin-photo-clean-up-ai-prompt-gemini-keep-outfit",
  "matching-team-headshot-ai-prompt-gemini-company-page",
  "passport-size-photo-ai-prompt-gemini-white-background",
  "executive-corporate-linkedin-profile-picture-prompt-gemini",
  "home-office-linkedin-profile-picture-prompt-gemini",
]);

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

  it("keeps style titles and document titles within 60 characters, with no app names", () => {
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
      assert.equal(APP_NAME.test(style.title), false, style.id);
    }
  });

  it("keeps every catalog style title free of app names except known leftovers", () => {
    const companion = seedStyles.find((style) => style.id === "anime-companion");
    const squad = seedStyles.find((style) => style.id === "anime-squad");
    assert.ok(companion);
    assert.ok(squad);
    assert.equal(companion.title, "Anime Pet AI Photo Prompt (Copy-Paste)");
    assert.equal(squad.title, "Anime Group AI Photo Prompt (Friends Squad)");
    assert.equal(APP_NAME.test(companion.title), false);
    assert.equal(APP_NAME.test(squad.title), false);

    const unexpected: string[] = [];
    const staleAllow: string[] = [];
    for (const style of seedStyles) {
      const hasAppName = APP_NAME.test(style.title);
      if (hasAppName && !ALLOWED_APP_NAME_TITLE_IDS.has(style.id)) {
        unexpected.push(`${style.id}: ${style.title}`);
      }
      if (!hasAppName && ALLOWED_APP_NAME_TITLE_IDS.has(style.id)) {
        staleAllow.push(style.id);
      }
    }
    assert.deepEqual(
      unexpected,
      [],
      `unexpected app-name titles:\n${unexpected.join("\n")}`,
    );
    assert.deepEqual(
      staleAllow,
      [],
      `allowlist entries no longer match titles (remove them):\n${staleAllow.join("\n")}`,
    );
    assert.equal(ALLOWED_APP_NAME_TITLE_IDS.has("anime-companion"), false);
    assert.equal(ALLOWED_APP_NAME_TITLE_IDS.has("anime-squad"), false);
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
