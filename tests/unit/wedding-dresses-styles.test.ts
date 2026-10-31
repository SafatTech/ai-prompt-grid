import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  seedWeddingDressStyles,
  weddingDressStyleIds,
} from "../../src/lib/catalog/seed-wedding-dresses-styles";
import { assemblePrompt, defaultsForStyle } from "../../src/lib/catalog/prompts";
import {
  backgroundSchema,
  moodSchema,
  ratioSchema,
} from "../../src/lib/catalog/schemas";

const addon = seedWeddingDressStyles.filter((style) =>
  weddingDressStyleIds.has(style.id),
);
const token = /\{\{[a-zA-Z]+\}\}/;

describe("Wedding Dress guide catalog batch", () => {
  it("publishes all 14 styles in editorial slots 259–272", () => {
    assert.equal(addon.length, 14);
    assert.deepEqual(
      addon.map((style) => style.source.match(/source-(\d+)\.webp$/)?.[1]),
      Array.from({ length: 14 }, (_, index) => String(259 + index)),
    );
    assert.ok(addon.every((style) => style.status === "published"));
    assert.deepEqual(
      addon.map((style) => style.id),
      [
        "red-bridal-lehenga",
        "pastel-bridal-lehenga",
        "bridal-sharara",
        "nikkah-dress",
        "walima-maxi",
        "mehndi-outfit",
        "white-wedding-gown",
        "ivory-sherwani",
        "black-sherwani",
        "groom-prince-coat",
        "couple-wedding-outfits",
        "dulha-dulhan-outfits",
        "mehndi-groom-kurta",
        "walima-groom-suit",
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
    for (const id of ["couple-wedding-outfits", "dulha-dulhan-outfits"]) {
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

describe("Wedding Dress guide content", () => {
  const guide = fs.readFileSync(
    path.join(process.cwd(), "content/guides/wedding-dress-ai-photo-prompts.mdx"),
    "utf8",
  );

  it("links every style and keeps the SEO H2s, meta, and FAQ", () => {
    for (const style of addon) {
      assert.match(guide, new RegExp(`/styles/${style.id}(?:\\)|\\b)`), style.id);
    }
    assert.match(guide, /title: "Wedding Dress AI Prompts: Bridal Lehenga, Sherwani & Dulhan Looks"/);
    assert.match(
      guide,
      /description: "Copy-paste wedding dress AI prompts and Gemini bridal look prompts for lehenga, dulhan, dulha and sherwani\. Get a shaadi-ready edit from your photo\."/,
    );
    assert.match(guide, /h1: "Wedding Dress AI Photo Prompts"/);
    assert.match(guide, /## Bridal Lehenga AI Prompts \(Dulhan Looks\)/);
    assert.match(guide, /## Groom Sherwani AI Prompts \(Dulha Looks\)/);
    assert.match(guide, /## Bride and Groom & Couple Wedding Poses Prompts/);
    assert.match(guide, /## Haldi, Mehndi, Nikah & Walima Outfit Prompts/);
    assert.match(guide, /## White Wedding Gown AI Prompts/);
    assert.match(guide, /## 2026 Bridal Dress Trends \(Pakistani & Indian Looks\)/);
    assert.match(
      guide,
      /## Tips for a Realistic Bridal Look \(makeup, jewellery, same face\)/,
    );
    assert.match(guide, /## FAQ/);
    assert.match(guide, /### Are these prompts free\?/);
    assert.match(guide, /### Which AI works best\?/);
    assert.match(guide, /### What's the best Gemini bridal look prompt\?/);
    assert.match(guide, /### Can AI edit my wedding photo\?/);
    assert.match(guide, /### Can AI change my dress to a lehenga\?/);
    assert.match(guide, /gemini wedding prompt copy paste/);
    assert.match(guide, /Written by Safat Tech|author: "Safat Tech"/);
    assert.match(guide, /AI-generated, not real people/);
    assert.equal(guide.toLowerCase().includes("nikkah "), false);
    assert.match(guide, /nikah/i);
  });
});
