import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  characterPublishRows,
  seedCharacterStyles,
} from "../../src/lib/catalog/seed-character-styles";
import { assemblePrompt, defaultsForStyle } from "../../src/lib/catalog/prompts";
import { labeledOptionsForStyle } from "../../src/lib/catalog/prompt-option-presets";
import { backgroundSchema, moodSchema } from "../../src/lib/catalog/schemas";
import { styleSocialTitle } from "../../src/lib/catalog/style-meta";

const TOKEN = /\{\{[a-zA-Z]+\}\}/;

const APP_NAME = /\b(gemini|chatgpt|midjourney|saad)\b/i;

const FRANCHISE =
  /\b(marvel|disney|pixar|ghibli|iron ?man|spider-?man|batman|thor|mandalorian|lego|minecraft|street fighter|demon slayer|naruto|dragon ?ball|goku|gta|fortnite|overwatch|valorant|peaky blinders|star wars|tatooine|harry potter|hogwarts|polaroid|yeezy|tamiya|claymation|plasticine|minifigure)\b/i;

const TWO_PHOTO_IDS: string[] = [
  "hand-painted-anime-picnic-couple-ai-photo-prompt",
  "chibi-3d-couple-ai-photo-prompt",
  "anime-couple-cherry-blossoms-ai-photo-prompt",
  "sunset-city-game-loading-screen-ai-prompt",
  "fighting-game-versus-screen-ai-photo-prompt",
  "royal-mughal-prince-princess-ai-photo-prompt",
  "retro-hand-painted-film-poster-ai-prompt",
  "secret-agent-tuxedo-couple-ai-photo-prompt",
  "regency-ballroom-couple-ai-photo-prompt",
  "moonlit-vampire-romance-couple-ai-photo-prompt",
  "couple-action-figure-two-pack-ai-prompt",
  "crochet-amigurumi-couple-ai-photo-prompt",
];

/** 147–222 minus removed #151 Streetwear and #167 Superhero Couple. */
const EXPECTED_NUMBERS = Array.from({ length: 76 }, (_, index) => String(147 + index)).filter(
  (n) => n !== "151" && n !== "167",
);

describe("character action style pages", () => {
  it("publishes 74 standalone styles numbered 147 through 222 (minus 151 and 167)", () => {
    assert.equal(EXPECTED_NUMBERS.length, 74);
    assert.equal(seedCharacterStyles.length, 74);
    assert.ok(seedCharacterStyles.every((style) => style.status === "published"));
    assert.ok(seedCharacterStyles.every((style) => style.tool === "Gemini"));
    const numbers = seedCharacterStyles.map(
      (style) => style.source.match(/source-(\d+)\./)?.[1],
    );
    assert.deepEqual(numbers, EXPECTED_NUMBERS);
    assert.equal(new Set(seedCharacterStyles.map((style) => style.id)).size, 74);
    assert.equal(
      seedCharacterStyles.some((style) => style.id === "streetwear-photoshoot-ai-photo-prompt"),
      false,
    );
    assert.equal(
      seedCharacterStyles.some((style) => style.id === "superhero-couple-ai-photo-prompt"),
      false,
    );
  });

  it("keeps titles short, with no app or franchise names in any copy", () => {
    for (const style of seedCharacterStyles) {
      assert.ok(style.title.length <= 60, style.id);
      const social = styleSocialTitle(style);
      assert.ok(
        social.length <= 60,
        `${style.id} social title is ${social.length}: ${social}`,
      );
      assert.equal(social.endsWith("Prompt Prompt"), false, style.id);
      assert.equal(APP_NAME.test(style.title), false, style.id);
      assert.equal(APP_NAME.test(style.id), false, style.id);
      const copy = [
        style.title,
        style.id,
        style.note,
        style.description,
        style.targetSourcePhoto,
        ...style.changes,
        ...style.stays,
        style.promptVariant.template,
        ...style.examplePairs.flatMap((pair) => [pair.altSource, pair.altResult]),
      ];
      for (const text of copy) {
        assert.equal(FRANCHISE.test(text), false, `${style.id}: ${text}`);
      }
    }
  });

  it("uses schema moods and backgrounds and keeps every placeholder", () => {
    for (const style of seedCharacterStyles) {
      const defaults = defaultsForStyle(style);
      assert.equal(moodSchema.safeParse(defaults.mood).success, true, style.id);
      assert.equal(
        backgroundSchema.safeParse(defaults.background).success,
        true,
        style.id,
      );
      const moods = labeledOptionsForStyle(style, "mood");
      const backgrounds = labeledOptionsForStyle(style, "background");
      assert.equal(moods[0]?.value, defaults.mood);
      assert.equal(backgrounds[0]?.value, defaults.background);
      assert.ok(moods.every((item) => item.label.split(/\s+/).length <= 4));
      assert.ok(backgrounds.every((item) => item.label.split(/\s+/).length <= 4));
      for (const token of ["subject", "mood", "background", "ratio", "preserve"]) {
        assert.ok(
          style.promptVariant.template.includes(`{{${token}}}`),
          `${style.id} is missing {{${token}}}`,
        );
      }
      const result = assemblePrompt(style, defaults);
      assert.equal(result.ok, true, style.id);
      if (!result.ok) continue;
      assert.equal(TOKEN.test(result.prompt), false, style.id);
      assert.ok(
        style.promptVariant.limitations.some((item) => /AI-generated/.test(item)),
        style.id,
      );
    }
  });

  it("marks the 12 couple styles as two-photo merges sharing one result", () => {
    const merges = seedCharacterStyles.filter(
      (style) => style.promptVariant.inputImageCount === 2,
    );
    assert.deepEqual(
      merges.map((style) => style.id),
      TWO_PHOTO_IDS,
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
    for (const style of seedCharacterStyles) {
      if (style.promptVariant.inputImageCount === 2) continue;
      assert.equal(style.requirement, "One photo", style.id);
      assert.equal(style.examplePairs.length, 1, style.id);
    }
  });

  it("matches the data embedded in the standalone publish script", () => {
    const script = fs.readFileSync(
      path.join(process.cwd(), "scripts/publish-character-standalone.mjs"),
      "utf8",
    );
    const match = script.match(/^const DATA = (.*);$/m);
    assert.ok(match);
    const data = JSON.parse(match[1]) as { styles: unknown[] };
    assert.deepEqual(data.styles, JSON.parse(JSON.stringify(characterPublishRows)));
  });

  it("keeps #190 battle expression and omits expression from preserve", () => {
    const knight = seedCharacterStyles.find(
      (style) => style.id === "dark-fantasy-armored-knight-ai-photo-prompt",
    );
    assert.ok(knight);
    assert.ok(
      knight.promptVariant.template.includes(
        "Give the face a strong, clearly visible battle expression",
      ),
    );
    const result = assemblePrompt(knight, defaultsForStyle(knight));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.match(result.prompt, /battle cry/);
    assert.equal(/\bexpression\b/.test(result.prompt.replace(/battle expression[\s\S]*?neutral\./, "")), false);
  });

  it("publishes #198 as desert warrior prince with renamed slug and assets", () => {
    const prince = seedCharacterStyles.find(
      (style) => style.id === "desert-warrior-prince-ai-photo-prompt",
    );
    assert.ok(prince);
    assert.equal(prince.title, "Desert Kingdom Warrior Prince");
    assert.equal(
      styleSocialTitle(prince).startsWith("Desert Kingdom Warrior Prince AI Photo Prompt"),
      true,
    );
    assert.ok(prince.promptVariant.template.includes("warrior prince"));
    assert.ok(
      prince.promptVariant.template.includes(
        "dress him in original desert royal armor with gold details over long flowing robes, a sash and a wrapped head scarf trailing in the wind",
      ),
    );
    assert.ok(prince.promptVariant.template.includes("show him mid-spin on a dune crest"));
    const publishRow = characterPublishRows.find(
      (row) => row.id === "desert-warrior-prince-ai-photo-prompt",
    );
    assert.ok(publishRow);
    assert.equal(
      publishRow.beforeFile,
      "desert-warrior-prince-ai-photo-prompt-before.webp",
    );
    assert.equal(
      publishRow.afterFile,
      "desert-warrior-prince-ai-photo-prompt-after.webp",
    );
    assert.equal(
      seedCharacterStyles.some(
        (style) => style.id === "desert-warrior-princess-ai-photo-prompt",
      ),
      false,
    );
  });
});
