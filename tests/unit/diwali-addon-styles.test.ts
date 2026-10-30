import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  diwaliAddonStyleIds,
  seedDiwaliStyles,
} from "../../src/lib/catalog/seed-diwali-styles";
import { assemblePrompt, defaultsForStyle } from "../../src/lib/catalog/prompts";
import {
  backgroundSchema,
  moodSchema,
  ratioSchema,
} from "../../src/lib/catalog/schemas";

const addon = seedDiwaliStyles.filter((style) => diwaliAddonStyleIds.has(style.id));
const token = /\{\{[a-zA-Z]+\}\}/;

describe("Diwali guide add-on catalog batch", () => {
  it("publishes all 9 styles in editorial slots 250–258", () => {
    assert.equal(addon.length, 9);
    assert.deepEqual(
      addon.map((style) => style.source.match(/source-(\d+)\.webp$/)?.[1]),
      Array.from({ length: 9 }, (_, index) => String(250 + index)),
    );
    assert.ok(addon.every((style) => style.status === "published"));
    assert.ok(seedDiwaliStyles.some((style) => style.id === "family-lakshmi-puja-photo"));
  });

  it("registers every default and resolves every template token", () => {
    for (const style of addon) {
      const defaults = defaultsForStyle(style);
      assert.equal(moodSchema.safeParse(defaults.mood).success, true, style.id);
      assert.equal(
        backgroundSchema.safeParse(defaults.background).success,
        true,
        style.id,
      );
      assert.equal(ratioSchema.safeParse(defaults.ratio).success, true, style.id);
      assert.notEqual(defaults.ratio, "3:2 Landscape", style.id);
      assert.deepEqual(
        new Set(style.promptVariant.template.match(/\{\{[a-zA-Z]+\}\}/g)),
        new Set([
          "{{subject}}",
          "{{preserve}}",
          "{{mood}}",
          "{{background}}",
          "{{ratio}}",
        ]),
        style.id,
      );
      const result = assemblePrompt(style, defaults);
      assert.equal(result.ok, true, style.id);
      if (result.ok) assert.equal(token.test(result.prompt), false, style.id);
      assert.ok(
        style.promptVariant.limitations.some((item) => item.includes("AI-generated")),
        style.id,
      );
    }
  });

  it("keeps 9:16 Story for the boy reel cover and Two photos for couples", () => {
    const boy = addon.find((style) => style.id === "diwali-boy-instagram-portrait");
    assert.ok(boy);
    assert.equal(boy.promptVariant.defaults.ratio, "9:16 Story");

    const dinner = addon.find((style) => style.id === "diwali-family-dinner-table");
    assert.ok(dinner);
    assert.equal(dinner.promptVariant.defaults.ratio, "4:5 Portrait");

    for (const id of [
      "diwali-couple-poses-diya-doorway",
      "diwali-couple-instagram-fireworks",
    ]) {
      const couple = addon.find((style) => style.id === id);
      assert.ok(couple, id);
      assert.equal(couple.requirement, "Two photos");
      assert.equal(couple.promptVariant.inputImageCount, 2);
      assert.deepEqual(couple.promptVariant.inputImageRoles, ["person A", "person B"]);
      assert.equal(couple.examplePairs.length, 2);
      const n = couple.source.match(/source-(\d+)\.webp$/)?.[1];
      assert.match(couple.examplePairs[1]?.source ?? "", new RegExp(`source-${n}b\\.webp$`));
    }
  });
});

describe("Diwali guide add-on content", () => {
  const guide = fs.readFileSync(
    path.join(process.cwd(), "content/guides/diwali-couple-ai-photo-editing-prompts.mdx"),
    "utf8",
  );

  it("links every add-on style and keeps the new H2s and meta", () => {
    for (const style of addon) {
      assert.match(guide, new RegExp(`/styles/${style.id}(?:\\)|\\b)`), style.id);
    }
    assert.match(guide, /## Diwali couple poses prompts/);
    assert.match(guide, /## Diwali photo prompts for men and women/);
    assert.match(
      guide,
      /Copy-paste Diwali couple AI photo editing prompts for Instagram — couple poses, husband-wife, girl, boy and family looks that keep your real faces\. Diwali 2026\./,
    );
    assert.equal(guide.includes("family-lakshmi-puja-photo"), false);
    assert.equal(guide.includes("husband-wife-mithai"), false);
  });
});
