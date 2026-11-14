import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  sareeStyleIds,
  seedSareeStyles,
} from "../../src/lib/catalog/seed-saree-styles";
import { assemblePrompt, defaultsForStyle } from "../../src/lib/catalog/prompts";
import {
  backgroundSchema,
  moodSchema,
  ratioSchema,
} from "../../src/lib/catalog/schemas";
import { STYLE_SEO_OVERRIDES } from "../../src/lib/catalog/style-meta";

const batch = seedSareeStyles.filter((style) => sareeStyleIds.has(style.id));
const token = /\{\{[a-zA-Z]+\}\}/;

const EXPECTED_IDS = [
  "mint-sequin-stripe-saree-marble-hallway",
  "blush-organza-potli-saree-garden-patio",
  "ivory-lace-reception-saree-boutique-mirror",
  "leopard-print-belted-saree-old-city-street",
  "teal-sequin-glam-saree-velvet-curtain",
  "sage-organza-saree-ivy-terrace",
  "red-ruffle-gown-saree-red-carpet",
  "rose-gold-tissue-silk-saree-marble-studio",
  "champagne-pallu-flare-saree-palace-hall",
  "black-gold-border-saree-flower-steps",
  "ombre-saree-over-shoulder-dressing-room",
  "black-banarasi-pallu-saree-vintage-living-room",
  "lavender-zari-saree-mirror-selfie",
  "blush-floral-sequin-saree-luxury-lounge",
  "golden-hour-chiffon-saree-rooftop-pallu-wind",
  "kanjivaram-silk-saree-carved-stone-colonnade",
  "monsoon-chiffon-saree-rainy-balcony",
] as const;

describe("Saree guide catalog batch", () => {
  it("publishes all 17 styles in editorial slots 316–332", () => {
    assert.equal(batch.length, 17);
    assert.deepEqual(
      batch.map((style) => style.source.match(/source-(\d+)\.webp$/)?.[1]),
      Array.from({ length: 17 }, (_, index) => String(316 + index)),
    );
    assert.ok(batch.every((style) => style.status === "published"));
    assert.deepEqual(
      batch.map((style) => style.id),
      [...EXPECTED_IDS],
    );
    assert.ok(batch.every((style) => style.requirement === "One photo"));
    assert.ok(batch.every((style) => style.promptVariant.inputImageCount === 1));
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
        style.promptVariant.limitations.some((item) => item.includes("AI-generated")),
        style.id,
      );
      assert.ok(style.title.length > 0, style.id);
      assert.ok((style.description || "").length > 40, style.id);
      assert.ok(style.examplePairs[0]?.altSource, style.id);
      assert.ok(style.examplePairs[0]?.altResult, style.id);
      assert.equal(style.changes.length, 4, style.id);
    }
  });

  it("ships unique SEO overrides with guide links for every saree style", () => {
    for (const style of batch) {
      const override = STYLE_SEO_OVERRIDES[style.id];
      assert.ok(override, style.id);
      assert.ok((override.title ?? "").length > 0, style.id);
      assert.ok((override.title ?? "").length <= 60, style.id);
      assert.ok((override.h1 ?? "").length > 0, style.id);
      assert.ok((override.description ?? "").length > 40, style.id);
      assert.ok(
        override.guideLinks?.some((link) => link.href === "/guides/saree-ai-photo-prompts"),
        style.id,
      );
      assert.ok((override.relatedStyleIds?.length ?? 0) >= 2, style.id);
      assert.ok(override.intro?.trim(), style.id);
      assert.ok(override.tips && override.tips.length >= 3, style.id);
      assert.ok(override.faqs && override.faqs.length >= 3, style.id);
      assert.ok(override.addonLine?.trim(), style.id);
    }
  });
});

describe("Saree / Sari guide content", () => {
  const guide = fs.readFileSync(
    path.join(process.cwd(), "content/guides/saree-ai-photo-prompts.mdx"),
    "utf8",
  );

  it("links every style and keeps Analyst SEO H2s, meta, FAQ, and keywords", () => {
    for (const style of batch) {
      assert.match(guide, new RegExp(`/styles/${style.id}(?:\\)|\\b)`), style.id);
    }
    assert.match(guide, /title: "Sari AI Photo Prompts: Copy-Paste Looks for Women"/);
    assert.match(guide, /description: "Copy-paste saree AI photo prompts for adult women/);
    assert.match(guide, /h1: "Sari AI Photo Prompts"/);
    assert.match(guide, /slug: "saree-ai-photo-prompts"/);
    assert.match(guide, /primaryKeyword: "saree ai prompt"/);
    assert.match(guide, /# Sari AI Photo Prompts/);
    assert.match(guide, /## Copy-paste saree AI prompts for women/);
    assert.match(guide, /## Party sequin, organza and net saree looks/);
    assert.match(guide, /## Black, red and colour saree photo prompts/);
    assert.match(guide, /## Banarasi and Kanjivaram weave styles/);
    assert.match(guide, /## Retro and vintage Bollywood saree looks/);
    assert.match(guide, /## Mirror selfie and casual saree edits/);
    assert.match(guide, /## FAQ: saree vs sari prompts, face keep, and outfit change/);
    assert.match(guide, /### Saree or sari — which spelling should I use in a prompt\?/);
    assert.match(guide, /gemini saree prompt/i);
    assert.match(guide, /chatgpt saree prompt/i);
    assert.equal((guide.match(/gemini saree prompt/gi) ?? []).length, 1);
    assert.equal((guide.match(/chatgpt saree prompt/gi) ?? []).length, 1);
    assert.doesNotMatch(guide, /title: ".*[Gg]emini/);
    assert.doesNotMatch(guide, /title: ".*[Cc]hatGPT/);
    assert.match(guide, /party wear saree/i);
    assert.match(guide, /black saree AI prompt/i);
    assert.match(guide, /Banarasi/);
    assert.match(guide, /retro saree AI prompt|Retro and vintage Bollywood/i);
    assert.match(guide, /\/guides\/outfit-change-ai-prompts/);
    assert.match(guide, /\/guides\/wedding-dress-ai-photo-prompts/);
    assert.match(guide, /\/styles\/modern-saree-drape-outfit-change/);
    assert.match(guide, /author: "Safat Tech"/);
    assert.match(guide, /AI-generated, not real people/);
    assert.match(guide, /solo adult women/);
    assert.match(guide, /modest and family-safe/);
  });
});
