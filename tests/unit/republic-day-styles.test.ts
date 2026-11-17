import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  republicDayStyleIds,
  seedRepublicDayStyles,
} from "../../src/lib/catalog/seed-republic-day-styles";
import { assemblePrompt, defaultsForStyle } from "../../src/lib/catalog/prompts";
import {
  backgroundSchema,
  moodSchema,
  ratioSchema,
} from "../../src/lib/catalog/schemas";
import { STYLE_SEO_OVERRIDES } from "../../src/lib/catalog/style-meta";

const batch = seedRepublicDayStyles.filter((style) =>
  republicDayStyleIds.has(style.id),
);
const token = /\{\{[a-zA-Z]+\}\}/;

const EXPECTED_IDS = [
  "sunrise-terrace-salute-women",
  "office-ethnic-day-kurta-men",
  "couple-tricolour-rangoli-courtyard",
  "family-parade-on-tv-living-room",
  "rooftop-tricolour-kites-women",
  "park-tiranga-balloons-men",
  "office-ethnic-day-saree-women",
  "couple-terrace-tiranga-balloons",
  "community-flag-hoist-salute-men",
  "courtyard-tricolour-flowers-women",
  "couple-balcony-parade-viewing",
  "community-hall-tricolour-bunting-women",
  "kartavya-path-parade-boulevard-couple",
  "india-gate-dusk-portrait-men",
  "parent-child-school-function-hall",
  "parent-child-terrace-kites",
  "parent-child-balcony-parade",
] as const;

const TWO_PERSON_IDS = new Set([
  "couple-tricolour-rangoli-courtyard",
  "family-parade-on-tv-living-room",
  "couple-terrace-tiranga-balloons",
  "couple-balcony-parade-viewing",
  "kartavya-path-parade-boulevard-couple",
  "parent-child-school-function-hall",
  "parent-child-terrace-kites",
  "parent-child-balcony-parade",
]);

const EXPECTED_NUMBERS = [
  "347",
  "348",
  "349",
  "350",
  "351",
  "352",
  "353",
  "354",
  "355",
  "356",
  "357",
  "358",
  "359",
  "360",
  "361",
  "362",
  "363",
];

describe("Republic Day guide catalog batch", () => {
  it("publishes all 17 styles in editorial slots 347-363 with style #15 dropped", () => {
    assert.equal(batch.length, 17);
    assert.deepEqual(
      batch.map((style) => style.source.match(/source-(\d+)\.webp$/)?.[1]),
      EXPECTED_NUMBERS,
    );
    assert.ok(batch.every((style) => style.status === "published"));
    assert.deepEqual(
      batch.map((style) => style.id),
      [...EXPECTED_IDS],
    );
    assert.ok(
      batch.every((style) => !style.id.includes("dusk-window-tricolour-light")),
    );
    assert.equal(
      batch.filter((style) => style.id === "dusk-window-tricolour-light-women")
        .length,
      0,
    );
  });

  it("wires one-photo and two-photo inputs, including source-b pairs", () => {
    for (const style of batch) {
      const two = TWO_PERSON_IDS.has(style.id);
      assert.equal(style.requirement, two ? "Two photos" : "One photo", style.id);
      assert.equal(style.promptVariant.inputImageCount, two ? 2 : 1, style.id);
      assert.ok(style.examplePairs[0]?.source.includes(`source-`), style.id);
      assert.ok(style.examplePairs[0]?.result.includes(`result-`), style.id);
      if (two) {
        assert.equal(style.examplePairs.length, 2, style.id);
        assert.ok(
          style.examplePairs[1]?.source.includes("source-") &&
            style.examplePairs[1]?.source.includes("b.webp"),
          style.id,
        );
      } else {
        assert.equal(style.examplePairs.length, 1, style.id);
      }
      assert.ok(style.publishedAt, style.id);
    }
  });

  it("registers every default and resolves every template token", () => {
    for (const style of batch) {
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
        style.promptVariant.limitations.some((item) =>
          item.includes("AI-generated"),
        ),
        style.id,
      );
      assert.ok(style.title.length > 0, style.id);
      assert.ok((style.description || "").length > 40, style.id);
      assert.ok(style.examplePairs[0]?.altSource, style.id);
      assert.ok(style.examplePairs[0]?.altResult, style.id);
      assert.equal(style.changes.length, 4, style.id);
      assert.doesNotMatch(style.title, /[\u2013\u2014]/);
      assert.doesNotMatch(style.description || "", /[\u2013\u2014]/);
      if (result.ok) {
        assert.match(
          result.prompt,
          /Never show the Indian national flag worn as clothing/i,
          style.id,
        );
      }
    }
  });

  it("ships unique SEO overrides with guide links for every Republic Day style", () => {
    for (const style of batch) {
      const override = STYLE_SEO_OVERRIDES[style.id];
      assert.ok(override, style.id);
      assert.ok((override.title ?? "").length > 0, style.id);
      assert.ok((override.title ?? "").length <= 60, style.id);
      assert.ok((override.h1 ?? "").length > 0, style.id);
      assert.ok((override.description ?? "").length > 40, style.id);
      assert.ok(
        override.guideLinks?.some(
          (link) => link.href === "/guides/republic-day-ai-photo-prompts",
        ),
        style.id,
      );
      assert.ok(
        override.guideLinks?.some(
          (link) => link.href === "/guides/how-to-keep-face-same-in-gemini-ai",
        ),
        style.id,
      );
      assert.ok((override.relatedStyleIds?.length ?? 0) >= 2, style.id);
      assert.ok(override.intro?.trim(), style.id);
      assert.ok(override.tips && override.tips.length >= 3, style.id);
      assert.ok(override.faqs && override.faqs.length >= 3, style.id);
      assert.ok(override.addonLine?.trim(), style.id);
      assert.ok(
        override.faqs?.some((faq) => /face/i.test(faq.question)),
        style.id,
      );
      assert.doesNotMatch(override.title || "", /[\u2013\u2014]/);
      assert.doesNotMatch(override.description || "", /[\u2013\u2014]/);
      assert.doesNotMatch(override.intro || "", /[\u2013\u2014]/);
    }
  });
});

describe("Republic Day guide content", () => {
  const guide = fs.readFileSync(
    path.join(process.cwd(), "content/guides/republic-day-ai-photo-prompts.mdx"),
    "utf8",
  );

  it("links every style and keeps Analyst SEO H2s, meta, FAQ, and keywords", () => {
    for (const style of batch) {
      assert.match(guide, new RegExp(`/styles/${style.id}(?:\\)|\\b)`), style.id);
    }
    assert.match(
      guide,
      /title: "Republic Day AI Photo Prompts: 26 January Looks"/,
    );
    assert.match(
      guide,
      /description: "Copy-paste Republic Day AI photo prompts for 26 January: tiranga-colour looks for women, men and couples. Keep your face. Respectful, never wear the flag."/,
    );
    assert.match(guide, /h1: "Republic Day AI Photo Prompts"/);
    assert.match(guide, /slug: "republic-day-ai-photo-prompts"/);
    assert.match(guide, /primaryKeyword: "republic day ai photo prompt"/);
    assert.match(guide, /# Republic Day AI Photo Prompts/);
    assert.match(guide, /## Copy-paste Republic Day AI photo prompts/);
    assert.match(guide, /## 26 January photo editing prompts/);
    assert.match(guide, /## Prompts for women and for men/);
    assert.match(guide, /## Couple and family Republic Day looks/);
    assert.match(guide, /## Tiranga colours, kites and balloons \(respectful use\)/);
    assert.match(
      guide,
      /## Parade viewing, rangoli, office ethnic day and sunrise looks/,
    );
    assert.match(
      guide,
      /## FAQ: 26 January wording, Independence Day, and flag respect/,
    );
    assert.match(
      guide,
      /### Can I use Gantantra Diwas in the prompt instead of Republic Day\?/,
    );
    assert.match(guide, /Independence Day \(15 August\)/);
    assert.match(guide, /AI-generated, not real people/);
    assert.match(guide, /never wear the Indian flag/i);
    assert.doesNotMatch(guide, /dusk-window-tricolour-light-women/);
    assert.match(guide, /\/guides\/diwali-couple-ai-photo-editing-prompts/);
    assert.match(guide, /\/guides\/saree-ai-photo-prompts/);
    assert.match(guide, /\/guides\/outfit-change-ai-prompts/);
    assert.match(guide, /\/guides\/how-to-keep-face-same-in-gemini-ai/);
    assert.match(guide, /author: "Safat Tech"/);
    assert.doesNotMatch(guide, /[\u2013\u2014]/);
    assert.doesNotMatch(guide, /title: ".*[Gg]emini/);
    assert.doesNotMatch(guide, /title: ".*[Cc]hatGPT/);
  });
});
