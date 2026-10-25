import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { seedLuxuryLifestyleStyles } from "../../src/lib/catalog/seed-luxury-lifestyle-styles";
import { seedStylishStyles } from "../../src/lib/catalog/seed-stylish-styles";
import { assemblePrompt, defaultsForStyle } from "../../src/lib/catalog/prompts";
import { backgroundSchema, moodSchema } from "../../src/lib/catalog/schemas";

const batches = [...seedStylishStyles, ...seedLuxuryLifestyleStyles];
const token = /\{\{[a-zA-Z]+\}\}/;

describe("Stylish and Luxury Lifestyle catalog batches", () => {
  it("publishes all 27 styles in editorial slots 223–249", () => {
    assert.equal(seedStylishStyles.length, 14);
    assert.equal(seedLuxuryLifestyleStyles.length, 13);
    assert.deepEqual(
      batches.map((style) => style.source.match(/source-(\d+)\.webp$/)?.[1]),
      Array.from({ length: 27 }, (_, index) => String(223 + index)),
    );
    assert.ok(batches.every((style) => style.status === "published"));
  });

  it("registers every default and resolves every template token", () => {
    for (const style of batches) {
      const defaults = defaultsForStyle(style);
      assert.equal(moodSchema.safeParse(defaults.mood).success, true, style.id);
      assert.equal(
        backgroundSchema.safeParse(defaults.background).success,
        true,
        style.id,
      );
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

  it("uses both approved inputs for the luxury couple", () => {
    const couple = seedLuxuryLifestyleStyles.find(
      (style) => style.id === "quiet-luxury-couple-evening-walk-ai-photo-prompt",
    );
    assert.ok(couple);
    assert.equal(couple.requirement, "Two photos");
    assert.equal(couple.promptVariant.inputImageCount, 2);
    assert.deepEqual(couple.promptVariant.inputImageRoles, ["person A", "person B"]);
    assert.equal(couple.examplePairs.length, 2);
    assert.match(couple.examplePairs[1]?.source ?? "", /source-246b\.webp$/);
  });
});

describe("Stylish and Luxury Lifestyle guides", () => {
  const stylish = fs.readFileSync(
    path.join(process.cwd(), "content/guides/stylish-ai-photo-prompts.mdx"),
    "utf8",
  );
  const luxury = fs.readFileSync(
    path.join(process.cwd(), "content/guides/luxury-lifestyle-ai-photo-prompts.mdx"),
    "utf8",
  );

  it("links every catalog style and includes the disclosure", () => {
    for (const style of batches) {
      const guide = seedStylishStyles.includes(style) ? stylish : luxury;
      assert.match(guide, new RegExp(`/styles/${style.id}(?:\\)|\\b)`), style.id);
    }
    for (const guide of [stylish, luxury]) {
      assert.match(
        guide,
        /The people in the "before" photos are AI-generated, not real people\./,
      );
    }
  });

  it("keeps app names in each FAQ only once", () => {
    for (const guide of [stylish, luxury]) {
      assert.equal(guide.match(/\bGemini\b/g)?.length, 1);
      assert.equal(guide.match(/\bChatGPT\b/g)?.length, 1);
    }
    assert.match(stylish, /## Stylish AI Photo Prompts for Girls and Women/);
    assert.doesNotMatch(
      luxury.match(/^title:.*$|^h1:.*$/gm)?.join("\n") ?? "",
      /upscale/i,
    );
  });
});
