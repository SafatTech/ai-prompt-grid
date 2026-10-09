import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seedEightiesStyles } from "../../src/lib/catalog/seed-80s-styles";
import {
  assemblePrompt,
  defaultsForStyle,
  type PromptOptions,
} from "../../src/lib/catalog/prompts";
import {
  categoryBackgroundPresets,
  categoryMoodPresets,
  labeledOptionsForStyle,
} from "../../src/lib/catalog/prompt-option-presets";
import { backgroundSchema, moodSchema } from "../../src/lib/catalog/schemas";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import {
  styleMetadataTitle,
  stylePageDescription,
  styleSocialTitle,
} from "../../src/lib/catalog/style-meta";

const TOKEN = /\{\{[a-zA-Z]+\}\}/;

describe("1980s style pages", () => {
  it("publishes 12 vintage styles numbered 48 through 59", () => {
    assert.equal(seedEightiesStyles.length, 12);
    assert.ok(seedEightiesStyles.every((style) => style.category === "Vintage"));
    assert.ok(seedEightiesStyles.every((style) => style.status === "published"));
    assert.ok(seedEightiesStyles.every((style) => style.requirement === "One photo"));
    const numbers = seedEightiesStyles.map((style) => {
      const match = style.source.match(/source-(\d+)\./);
      return match?.[1];
    });
    assert.deepEqual(numbers, [
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
    ]);
  });

  it("keeps SEO titles in the look pattern and under 60 characters", () => {
    for (const style of seedEightiesStyles) {
      const social = styleSocialTitle(style);
      assert.ok(social.length <= 60, `${style.id} title is ${social.length}: ${social}`);
      assert.match(social, / AI Photo Prompt/);
      assert.equal(social.split("(").length, 1);
      const description = stylePageDescription(style.note, style.title);
      assert.match(description, /\.$/);
      const metadata = styleMetadataTitle(style);
      if (typeof metadata === "string") {
        assert.equal(`${metadata} · AI Prompt Grid`, social);
      } else {
        assert.equal(metadata.absolute, social);
      }
    }
  });

  it("copies prompts with no leftover tokens for every dropdown value", () => {
    const flags = [
      { keepClothing: false, keepPose: false },
      { keepClothing: true, keepPose: false },
      { keepClothing: false, keepPose: true },
      { keepClothing: true, keepPose: true },
    ];

    for (const style of seedEightiesStyles) {
      const defaults = defaultsForStyle(style);
      assert.equal(defaults.mood, style.promptVariant.defaults.mood);
      assert.equal(defaults.background, style.promptVariant.defaults.background);
      const moods = labeledOptionsForStyle(style, "mood");
      const backgrounds = labeledOptionsForStyle(style, "background");
      assert.ok(moods.length > 1);
      assert.ok(backgrounds.length > 1);
      assert.ok(moods.every((item) => item.label.split(/\s+/).length <= 4));
      assert.ok(backgrounds.every((item) => item.label.split(/\s+/).length <= 4));
      assert.ok(moodSchema.safeParse(defaults.mood).success);
      assert.ok(backgroundSchema.safeParse(defaults.background).success);

      for (const mood of moods) {
        for (const background of backgrounds) {
          for (const flag of flags) {
            const options: PromptOptions = {
              ...defaults,
              mood: mood.value as PromptOptions["mood"],
              background: background.value as PromptOptions["background"],
              ...flag,
            };
            const result = assemblePrompt(style, options);
            assert.equal(
              result.ok,
              true,
              `${style.id} ${mood.label} ${background.label}`,
            );
            if (!result.ok) continue;
            assert.equal(TOKEN.test(result.prompt), false, result.prompt);
            assert.ok(result.prompt.includes(mood.value.toLowerCase()));
            assert.ok(result.prompt.includes(background.value.toLowerCase()));
          }
        }
      }
    }
  });

  it("keeps the two-photo couple prompt and one example pair", () => {
    const style = seedEightiesStyles.find(
      (item) => item.id === "combine-two-photos-80s-couple",
    );
    assert.ok(style);
    assert.equal(style.promptVariant.inputImageCount, 2);
    assert.deepEqual(style.promptVariant.inputImageRoles, ["person A", "person B"]);
    assert.equal(
      style.targetSourcePhoto,
      "Two clear portraits, one of each person, attached in the same message",
    );
    assert.match(style.promptVariant.template, /two photos/);
    assert.equal(
      style.promptVariant.limitations.some((item) => /second upload/i.test(item)),
      false,
    );
    assert.equal(style.examplePairs.length, 1);
    assert.match(style.examplePairs[0]?.altSource ?? "", /^AI-generated/);
    assert.match(style.source, /source-58\.png$/);
    assert.equal(
      seedEightiesStyles.every((item) => item.examplePairs.length === 1),
      true,
    );
  });

  it("keeps the original Vintage dropdowns and only labels the new phrases", () => {
    assert.deepEqual(categoryMoodPresets.Vintage, [
      "Warm nostalgic",
      "Soft nostalgic",
      "Flashy nostalgic",
      "Playful nostalgic",
      "Vintage teal, burnt orange, cream, and faded sepia",
      "Soft sunlit analog warmth with a slightly faded film look",
      "Warm nostalgic cinematic sunlight with soft vintage tones, gentle film grain, creamy highlights, and cozy shadow depth",
      "Soft pastel scrapbook daylight with warm natural skin tones, blush pink, creamy white, muted sky blue, and gentle film softness",
      "Muted espresso, charcoal, and warm amber",
    ]);
    assert.deepEqual(categoryBackgroundPresets.Vintage, [
      "Retro roadside diner at sunset with a classic red car",
      "Cozy retro living-room set with warm ambient lights",
      "Layered handmade scrapbook page with torn paper, tape, mini photos, and doodles",
      "Off-white graph-paper scrapbook page with faint grid lines, torn paper notes, pale-blue tape, small doodles, paper clips, delicate dried flowers, blue botanical accents, and layered photo cutouts",
      "Layered cream scrapbook page with torn paper, tilted Polaroid frames, tape pieces, handwritten doodles, tiny hearts, casual note cards, and soft outdoor greenery inside selected photo frames",
      "Classic mottled studio backdrop",
      "Cozy indoor celebration setting with subtle booth-style atmosphere",
      "Quiet sunlit residential street with warm walls, trees, soft greenery, neighborhood gates, and long late-afternoon shadows",
      "Keep original background",
    ]);

    const posterMood =
      "Rich saturated sunset colors with painted-poster warmth and slight print wear";
    assert.equal(moodSchema.safeParse(posterMood).success, true);
    assert.equal(backgroundSchema.safeParse("Floral wedding-stage backdrop").success, true);

    const existing = getPublishedStyles().filter(
      (style) => style.category === "Vintage" && !seedEightiesStyles.some((item) => item.id === style.id),
    );
    assert.equal(existing.length, 10);
    for (const style of existing) {
      const moods = labeledOptionsForStyle(style, "mood").map((item) => item.value);
      const backgrounds = labeledOptionsForStyle(style, "background").map((item) => item.value);
      assert.equal(moods.includes(posterMood), false);
      assert.equal(backgrounds.includes("Park at golden hour with soft trees"), false);
    }

    const street = seedEightiesStyles.find((item) => item.id === "cassette-player-street-snapshot");
    assert.ok(street);
    const streetText = [
      street.note,
      street.description,
      street.changes.join(" "),
      street.examplePairs[0]?.altResult,
      street.promptVariant.template,
    ].join(" ");
    assert.equal(/walkman/i.test(streetText), false);
    assert.match(streetText, /portable cassette player with foam headphones/);

    const bedroom = seedEightiesStyles.find((item) => item.id === "80s-bedroom-cassette");
    assert.match(
      bedroom?.promptVariant.template ?? "",
      /abstract or illustrated music and movie posters with no real people, readable text or logos/,
    );
    assert.equal(/film stars and bands/.test(bedroom?.promptVariant.template ?? ""), false);

    const poster = seedEightiesStyles.find((item) => item.id === "80s-film-poster-couple");
    assert.equal(/on the left|on the right/.test(poster?.promptVariant.template ?? ""), false);
    assert.match(poster?.promptVariant.template ?? "", /dress the man/);
    assert.match(poster?.promptVariant.template ?? "", /dress the woman/);
  });
});
