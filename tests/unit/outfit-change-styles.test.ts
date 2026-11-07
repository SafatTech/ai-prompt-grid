import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  outfitChangeStyleIds,
  seedOutfitChangeStyles,
} from "../../src/lib/catalog/seed-outfit-change-styles";
import { assemblePrompt, defaultsForStyle } from "../../src/lib/catalog/prompts";
import {
  backgroundSchema,
  moodSchema,
  ratioSchema,
} from "../../src/lib/catalog/schemas";
import { STYLE_SEO_OVERRIDES } from "../../src/lib/catalog/style-meta";

const addon = seedOutfitChangeStyles.filter((style) =>
  outfitChangeStyleIds.has(style.id),
);
const token = /\{\{[a-zA-Z]+\}\}/;

describe("Outfit Change guide catalog batch", () => {
  it("publishes all 12 styles in editorial slots 285–296", () => {
    assert.equal(addon.length, 12);
    assert.deepEqual(
      addon.map((style) => style.source.match(/source-(\d+)\.webp$/)?.[1]),
      Array.from({ length: 12 }, (_, index) => String(285 + index)),
    );
    assert.ok(addon.every((style) => style.status === "published"));
    assert.deepEqual(
      addon.map((style) => style.id),
      [
        "modern-saree-drape-outfit-change",
        "black-shalwar-kameez-outfit-change-men",
        "pastel-shalwar-kameez-outfit-change-women",
        "party-lehenga-outfit-change",
        "black-suit-outfit-change-men",
        "blazer-power-suit-outfit-change-women",
        "oversized-hoodie-cargo-streetwear-outfit-change",
        "kurta-waistcoat-eid-outfit-change-men",
        "modest-maxi-abaya-chic-outfit-change",
        "couple-matching-black-outfits-change",
        "couple-eastern-twinning-outfit-change",
        "leather-jacket-street-outfit-change-men",
      ],
    );
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
      assert.ok(style.title.length > 0, style.id);
      assert.ok((style.description || "").length > 40, style.id);
      assert.ok(style.examplePairs[0]?.altSource, style.id);
      assert.ok(style.examplePairs[0]?.altResult, style.id);
    }
  });

  it("keeps Two photos and dual source pairs for couple styles", () => {
    for (const id of [
      "couple-matching-black-outfits-change",
      "couple-eastern-twinning-outfit-change",
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

  it("keeps the black suit outfit-change SEO override distinct from fashion suit pages", () => {
    const override = STYLE_SEO_OVERRIDES["black-suit-outfit-change-men"];
    assert.ok(override);
    assert.match(override.title ?? "", /Outfit Change/i);
    assert.match(override.description ?? "", /outfit.?swap|industrial loft/i);
    assert.doesNotMatch(override.description ?? "", /night-city lobby|lobby luxury shoot/i);
    const style = addon.find((item) => item.id === "black-suit-outfit-change-men");
    assert.ok(style);
    assert.match(style.description || "", /outfit swap/i);
    assert.match(style.note, /outfit swap/i);
  });
});

describe("Outfit Change guide content", () => {
  const guide = fs.readFileSync(
    path.join(process.cwd(), "content/guides/outfit-change-ai-prompts.mdx"),
    "utf8",
  );

  it("links every style and keeps the SEO H2s, meta, FAQ, and cross-links", () => {
    for (const style of addon) {
      assert.match(guide, new RegExp(`/styles/${style.id}(?:\\)|\\b)`), style.id);
    }
    assert.match(
      guide,
      /title: "Outfit Change AI Prompts: Change Your Dress in Any Photo"/,
    );
    assert.match(
      guide,
      /description: "Outfit change AI prompts to change your dress in any photo/,
    );
    assert.match(
      guide,
      /h1: "Outfit Change AI Prompts: Change Your Dress in Any Photo"/,
    );
    assert.match(guide, /primaryKeyword: "outfit change ai prompt"/);
    assert.match(guide, /## Women Eastern Outfit Change Prompts/);
    assert.match(guide, /## Women Western & Modest Outfit Change Prompts/);
    assert.match(guide, /## Men Eastern Outfit Change Prompts/);
    assert.match(guide, /## Men Western Outfit Change Prompts/);
    assert.match(guide, /## Streetwear Outfit Swap Prompt/);
    assert.match(guide, /## Couple Clothes Change AI Prompts/);
    assert.match(guide, /## Optional: Keep Your Hairstyle the Same/);
    assert.match(guide, /## Tips: Change Dress in Photo AI \(Free\)/);
    assert.match(guide, /## FAQ/);
    assert.match(guide, /### Are these outfit change AI prompts free\?/);
    assert.match(
      guide,
      /### Do these dress change AI prompts work in ChatGPT as well as Gemini\?/,
    );
    assert.match(guide, /### How do I change my dress or outfit in a photo with AI\?/);
    assert.match(guide, /### Is there a saree AI prompt I can copy and paste\?/);
    assert.match(
      guide,
      /### Can I use two photos for a couple clothes change AI prompt\?/,
    );
    assert.match(
      guide,
      /### How is the black suit outfit change different from other men suit AI prompts\?/,
    );
    assert.match(guide, /\/styles\/shadowed-saree-noir/);
    assert.match(
      guide,
      /\/styles\/anime-character-ai-photo-prompt-in-saree-or-lehenga/,
    );
    assert.match(guide, /\/styles\/black-suit-city-night-ai-photo-prompt-for-men/);
    assert.match(guide, /\/styles\/black-suit-lobby-luxury-ai-photo-prompt-for-men/);
    assert.match(guide, /\/styles\/men-black-suit-three-quarter-ai-photo-prompt/);
    assert.match(guide, /\/styles\/men-suit-photoshoot-fashion-ai-photo-prompt/);
    assert.match(guide, /\/guides\/stylish-ai-photo-prompts/);
    assert.match(guide, /\/guides\/wedding-dress-ai-photo-prompts/);
    assert.match(guide, /Written by Safat Tech|author: "Safat Tech"/);
    assert.match(guide, /AI-generated, not real people/);
    assert.match(guide, /\bGemini\b/);
    assert.match(guide, /\bChatGPT\b/);
    assert.match(guide, /modest and family-safe|Modest, stylish, family-safe/);
  });
});
