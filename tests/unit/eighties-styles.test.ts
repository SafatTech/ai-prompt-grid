import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seedEightiesStyles } from "../../src/lib/catalog/seed-80s-styles";
import {
  assemblePrompt,
  defaultsForStyle,
  type PromptOptions,
} from "../../src/lib/catalog/prompts";
import { labeledOptionsForStyle } from "../../src/lib/catalog/prompt-option-presets";
import { backgroundSchema, moodSchema } from "../../src/lib/catalog/schemas";
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

  it("shows one source photo for the two-portrait couple prompt", () => {
    const style = seedEightiesStyles.find(
      (item) => item.id === "combine-two-photos-80s-couple",
    );
    assert.ok(style);
    assert.equal(style.requirement, "One photo");
    assert.equal(style.promptVariant.inputImageCount, 1);
    assert.match(style.targetSourcePhoto, /^One clear portrait/);
    assert.match(style.examplePairs[0]?.altSource ?? "", /^AI-generated/);
    assert.match(style.source, /source-58\.png$/);
  });
});
