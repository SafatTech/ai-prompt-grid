import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  christmas2026StyleIds,
  seedChristmas2026Styles,
} from "../../src/lib/catalog/seed-christmas-2026-styles";
import { assemblePrompt, defaultsForStyle } from "../../src/lib/catalog/prompts";
import {
  backgroundSchema,
  moodSchema,
  ratioSchema,
} from "../../src/lib/catalog/schemas";

const addon = seedChristmas2026Styles.filter((style) =>
  christmas2026StyleIds.has(style.id),
);
const token = /\{\{[a-zA-Z]+\}\}/;

describe("Christmas 2026 guide catalog batch", () => {
  it("publishes all 12 styles in editorial slots 273–284", () => {
    assert.equal(addon.length, 12);
    assert.deepEqual(
      addon.map((style) => style.source.match(/source-(\d+)\.webp$/)?.[1]),
      Array.from({ length: 12 }, (_, index) => String(273 + index)),
    );
    assert.ok(addon.every((style) => style.status === "published"));
    assert.deepEqual(
      addon.map((style) => style.id),
      [
        "cozy-fireplace-sweater-christmas-portrait-women",
        "mens-christmas-knit-sweater-portrait",
        "christmas-tree-lights-bokeh-selfie",
        "red-velvet-holiday-glam-portrait",
        "couple-matching-christmas-pajamas-by-tree",
        "couple-string-lights-doorway-christmas",
        "couple-christmas-market-night-stroll",
        "mens-christmas-photoshoot-dark-suit-gift-boxes",
        "80s-retro-christmas-portrait",
        "womens-studio-christmas-photoshoot-red-backdrop",
        "christmas-snowfall-winter-coat-portrait",
        "couple-snowy-cabin-window-christmas",
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
      "couple-matching-christmas-pajamas-by-tree",
      "couple-string-lights-doorway-christmas",
      "couple-christmas-market-night-stroll",
      "couple-snowy-cabin-window-christmas",
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

describe("Trending Christmas 2026 guide content", () => {
  const guide = fs.readFileSync(
    path.join(
      process.cwd(),
      "content/guides/trending-christmas-ai-photo-editing-prompts-gemini.mdx",
    ),
    "utf8",
  );
  const existing = fs.readFileSync(
    path.join(process.cwd(), "content/guides/christmas-ai-photo-prompts.mdx"),
    "utf8",
  );

  it("links every style and keeps the SEO H2s, meta, and FAQ", () => {
    for (const style of addon) {
      assert.match(guide, new RegExp(`/styles/${style.id}(?:\\)|\\b)`), style.id);
    }
    assert.match(
      guide,
      /title: "Trending Christmas AI Photo Editing Prompts for Gemini \(2026\) – Women, Men & Couples"/,
    );
    assert.match(
      guide,
      /description: "Trending Christmas AI photo editing prompts for Gemini \(2026\)\. Upload your photo, copy a prompt and get a festive edit that keeps your face the same\. Free\."/,
    );
    assert.match(
      guide,
      /h1: "Trending Christmas AI Photo Editing Prompts for Gemini \(2026\)"/,
    );
    assert.match(guide, /primaryKeyword: "christmas ai photo editing prompt"/);
    assert.match(guide, /## Christmas Photo Editing Prompts for Women/);
    assert.match(guide, /## Christmas Photo Prompts for Men/);
    assert.match(guide, /### Retro 80s Christmas Portrait/);
    assert.match(guide, /## Christmas Couple Photo Prompts/);
    assert.match(guide, /## Snow & Winter Christmas Prompts/);
    assert.match(guide, /## Tips: Keep Your Face the Same/);
    assert.match(guide, /## FAQ/);
    assert.match(guide, /### Are these Christmas AI photo editing prompts free\?/);
    assert.match(
      guide,
      /### Do these prompts work in ChatGPT as well as Gemini\?/,
    );
    assert.match(
      guide,
      /### Which is the trending Christmas AI photo for 2026\?/,
    );
    assert.match(
      guide,
      /### How do I keep my face the same in a Gemini Christmas edit\?/,
    );
    assert.match(
      guide,
      /### Can I use two photos for a couple Christmas photo\?/,
    );
    assert.match(
      guide,
      /### Is there a Christmas photoshoot AI prompt template I can reuse\?/,
    );
    assert.match(guide, /more 80s AI photo prompts/);
    assert.match(guide, /\/guides\/80s-ai-photo-prompts-solo-couple/);
    assert.match(guide, /\/guides\/winter-ai-photo-prompts/);
    assert.match(guide, /\/guides\/christmas-ai-photo-prompts/);
    assert.match(guide, /\/guides\/wedding-dress-ai-photo-prompts/);
    assert.match(guide, /\/guides\/stylish-ai-photo-prompts/);
    assert.match(guide, /Written by Safat Tech|author: "Safat Tech"/);
    assert.match(guide, /AI-generated, not real people/);
    assert.match(guide, /\bGemini\b/);
    assert.match(guide, /\bChatGPT\b/);
    assert.doesNotMatch(guide, /^title:.*christmas ai photo prompts/im);
    assert.doesNotMatch(guide, /^h1:.*christmas ai photo prompts/im);
  });

  it("cross-links from the existing Christmas guide without restructuring it", () => {
    assert.match(
      existing,
      /trending Christmas AI photo editing prompts for Gemini/,
    );
    assert.match(
      existing,
      /\/guides\/trending-christmas-ai-photo-editing-prompts-gemini/,
    );
    assert.match(existing, /title: "Christmas AI Photo Prompts: Copy-Paste & Free"/);
    assert.match(existing, /slug: "christmas-ai-photo-prompts"/);
  });
});
