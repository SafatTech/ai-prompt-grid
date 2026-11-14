import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  STYLE_SEO_OVERRIDES,
  styleDisplayTitle,
  styleHasUniqueContentSections,
  styleMetadataTitle,
  stylePageDescription,
  styleSeoDescription,
  styleSeoOverride,
  styleSocialTitle,
} from "../../src/lib/catalog/style-meta";
import { STYLE_UNIQUENESS_ENTRIES } from "../../src/lib/catalog/style-uniqueness-data";
import { getPublishedStyles } from "../../src/lib/catalog/styles";

const SECOND = "Copy-ready prompt for ChatGPT, Gemini, and other AI image editors.";

const GSC_THIN_STYLE_IDS = [
  "soft-daylight-lifestyle",
  "golden-twirl-storyboard",
  "cute-3d-toon-pet",
  "dark-crowd-editorial",
  "pure-white-packshot",
  "editorial-flat-lay",
  "crimson-bloom-shadows",
  "joyful-outdoor-lifestyle",
  "travel-fashion-bouquet",
  "urban-street-fashion-editorial",
  "neon-street-fashion-ai-photo-prompt",
  "iceberg-runway-fashion-ai-photo-prompt",
  "purple-smoke-portrait-ai-photo-prompt",
  "photographer-red-t-shirt-studio-portrait-ai-prompt",
  "cyberpunk-hacker-ai-photo-prompt",
  "cyberpunk-street-market-ai-photo-prompt",
  "action-heroine-neon-street-fight-ai-photo-prompt",
  "cybernetic-warrior-gothic-cathedral-ai-photo-prompt",
  "couple-action-figure-two-pack-ai-prompt",
  "ai-action-figure-prompt-premium-collectible",
  "clay-stop-motion-group-ai-photo-prompt",
  "main-character-game-menu-ai-photo-prompt",
  "hand-painted-anime-picnic-couple-ai-photo-prompt",
] as const;

describe("style page meta description", () => {
  it("adds a sentence break when the summary has no ending punctuation", () => {
    assert.equal(
      stylePageDescription("Warm autumn portrait among pumpkins", "Cozy Pumpkin Patch Portrait"),
      `Warm autumn portrait among pumpkins. ${SECOND}`,
    );
  });

  it("does not add a second period when the summary already ends with one", () => {
    assert.equal(
      stylePageDescription(
        "Turn a portrait into a cozy autumn scene.",
        "Cozy Pumpkin Patch Portrait",
      ),
      `Turn a portrait into a cozy autumn scene. ${SECOND}`,
    );
  });

  it("keeps other sentence-ending punctuation", () => {
    assert.equal(
      stylePageDescription("Keep it spooky!", "Recognizable Zombie Portrait"),
      `Keep it spooky! ${SECOND}`,
    );
    assert.equal(
      stylePageDescription('A candlelit library?"', "Elegant Gothic Vampire Portrait"),
      `A candlelit library?" ${SECOND}`,
    );
  });

  it("falls back to the style title when the summary is empty", () => {
    assert.equal(
      stylePageDescription("  ", "Midnight Glove Noir"),
      "Copy-ready Midnight Glove Noir prompt for ChatGPT, Gemini, and other AI image editors.",
    );
  });
});

describe("style SEO overrides", () => {
  const passportId = "passport-size-photo-ai-prompt-gemini-white-background";
  const cvId = "cv-photo-ai-prompt-plain-background-resume-headshot";

  it("replaces title and meta for passport and CV style slugs without boilerplate", () => {
    const passport = STYLE_SEO_OVERRIDES[passportId];
    const cv = STYLE_SEO_OVERRIDES[cvId];
    assert.ok(passport);
    assert.ok(cv);
    assert.equal(passport.title, "Passport Size Photo Prompt: Gemini & ChatGPT, White BG");
    assert.equal(cv.title, "CV Photo AI Prompt for Resume Pictures (Gemini/ChatGPT)");

    for (const id of [passportId, cvId]) {
      const override = STYLE_SEO_OVERRIDES[id];
      assert.ok(override);
      assert.ok(override.title);
      assert.ok(override.title.length <= 60, `${id} title is ${override.title.length}`);
      const overrideTitle = override.title;

      const metadata = styleMetadataTitle({
        id,
        title: "Catalog title that should be ignored for SEO",
      });
      assert.equal(typeof metadata, "object");
      if (typeof metadata === "string") return;
      assert.equal(metadata.absolute, overrideTitle);
      assert.equal(metadata.absolute.includes(" · AI Prompt Grid"), false);

      const social = styleSocialTitle({
        id,
        title: "Catalog title that should be ignored for SEO",
      });
      assert.equal(social, overrideTitle);
      assert.equal(social.endsWith(" · AI Prompt Grid"), false);

      const description = styleSeoDescription({
        id,
        title: "Catalog title",
        description: "Catalog summary that would normally get a boilerplate sentence",
      });
      assert.equal(description, override.description);
      assert.equal(description.includes(SECOND), false);
    }
  });

  it("keeps the boilerplate path for styles without an override", () => {
    assert.equal(
      styleSeoDescription({
        id: "navy-blazer-linkedin-profile-picture-prompt-gemini",
        title: "Navy Blazer LinkedIn Profile Picture Prompt (Gemini Free)",
        description: "Navy blazer, white shirt, light-grey studio",
      }),
      `Navy blazer, white shirt, light-grey studio. ${SECOND}`,
    );
  });
});

describe("GSC thin-style SEO overrides", () => {
  it("gives every listed slug a keyword title, H1, intro, tips, and guide links", () => {
    for (const id of GSC_THIN_STYLE_IDS) {
      const override = styleSeoOverride(id);
      assert.ok(override, id);
      assert.ok(override.title?.trim().length, `${id} title`);
      assert.ok((override.description?.trim().length ?? 0) > 40, `${id} meta`);
      const h1 = styleDisplayTitle({ id, title: "Catalog title" });
      assert.equal(h1, override.h1 || override.title);
      assert.notEqual(h1, "Catalog title");
      assert.ok(override.intro, `${id} intro`);
      const words = override.intro.trim().split(/\s+/).filter(Boolean).length;
      if (styleHasUniqueContentSections(override)) {
        // Batch-1 uniqueness replaces the long GSC body with short intro + FAQs.
        assert.ok(words >= 15 && words <= 60, `${id} uniqueness intro has ${words} words`);
        assert.ok(override.faqs && override.faqs.length >= 3, `${id} faqs`);
      } else {
        assert.ok(words >= 150, `${id} intro has ${words} words`);
      }
      assert.ok(override.tips && override.tips.length >= 2, `${id} tips`);
      assert.ok(override.guideLinks && override.guideLinks.length >= 1, `${id} guides`);
    }
  });

  it("keeps cyberpunk hacker and street market on distinct indoor vs outdoor angles", () => {
    const hacker = STYLE_SEO_OVERRIDES["cyberpunk-hacker-ai-photo-prompt"];
    const market = STYLE_SEO_OVERRIDES["cyberpunk-street-market-ai-photo-prompt"];
    assert.ok(hacker?.intro && market?.intro);
    assert.match(hacker.intro, /monitors|hologram|hacker|desk|terminal/i);
    assert.match(market.intro, /market|outdoor|rainy|stall|neon|vendor/i);
    assert.ok(hacker.title !== market.title);
    assert.ok(
      hacker.relatedStyleIds?.includes("cyberpunk-street-market-ai-photo-prompt"),
    );
    assert.ok(
      market.relatedStyleIds?.includes("cyberpunk-hacker-ai-photo-prompt"),
    );
  });

  it("keeps action-figure and 3D siblings on distinct toy vs UI vs clay angles", () => {
    const solo = STYLE_SEO_OVERRIDES["ai-action-figure-prompt-premium-collectible"];
    const couple = STYLE_SEO_OVERRIDES["couple-action-figure-two-pack-ai-prompt"];
    const clay = STYLE_SEO_OVERRIDES["clay-stop-motion-group-ai-photo-prompt"];
    const menu = STYLE_SEO_OVERRIDES["main-character-game-menu-ai-photo-prompt"];
    assert.match(solo?.intro ?? "", /solo|collectible|window box|1\/7|desk/i);
    assert.match(couple?.intro ?? "", /two-pack|two people|person A|two action figures|both faces/i);
    assert.match(clay?.intro ?? "", /clay|stop-motion/i);
    assert.match(menu?.intro ?? "", /character-select|menu|UI|game/i);
    assert.ok(solo?.title !== couple?.title);
  });
});

const BATCH1_ACTIVATED_DRAFT_IDS = [
  "diwali-couple-poses-diya-doorway",
  "birthday-ai-photo-prompt-boy-black-gold",
  "anime-squad",
  "separate-photos-couple",
] as const;

describe("AdSense uniqueness style sections", () => {
  it("ships uniqueness copy for every published seed style", () => {
    const ids = Object.keys(STYLE_UNIQUENESS_ENTRIES);
    assert.ok(ids.length >= 347, `expected ~355 uniqueness entries, got ${ids.length}`);
    for (const id of ids) {
      const override = styleSeoOverride(id);
      assert.ok(override, id);
      assert.ok(override.intro?.trim(), `${id} intro`);
      assert.ok(override.tips && override.tips.length >= 3, `${id} tips`);
      assert.ok(override.faqs && override.faqs.length >= 3, `${id} faqs`);
      assert.ok(override.addonLine?.trim(), `${id} addon`);
      assert.equal(styleHasUniqueContentSections(override), true, id);
    }

    const missing = getPublishedStyles()
      .map((style) => style.id)
      .filter((id) => !STYLE_UNIQUENESS_ENTRIES[id]);
    assert.deepEqual(missing, [], `published styles missing uniqueness: ${missing.join(", ")}`);
  });

  it("activates crimson-bangle-reverie and the four former drafts", () => {
    const id = "crimson-bangle-reverie";
    const override = styleSeoOverride(id);
    assert.ok(override, id);
    assert.equal(override.title, undefined);
    assert.equal(override.description, undefined);
    assert.ok(override.intro?.trim());
    const introWords = (override.intro ?? "").trim().split(/\s+/).filter(Boolean).length;
    assert.ok(introWords <= 45, `crimson intro should stay short (${introWords} words)`);
    assert.ok(override.tips && override.tips.length >= 3);
    assert.ok(override.faqs && override.faqs.length >= 3);
    assert.ok(override.addonLine?.trim());
    assert.equal(styleHasUniqueContentSections(override), true);

    for (const draftId of BATCH1_ACTIVATED_DRAFT_IDS) {
      const draft = styleSeoOverride(draftId);
      assert.ok(draft, `${draftId} must be live`);
      assert.ok(STYLE_UNIQUENESS_ENTRIES[draftId], `${draftId} in uniqueness data`);
      assert.equal(styleHasUniqueContentSections(draft), true, draftId);
    }
  });

  it("gates uniqueness layout on faqs, not intro alone", () => {
    assert.equal(
      styleHasUniqueContentSections({
        intro: "A long intro without FAQs should keep the legacy layout.",
        tips: ["One tip"],
      }),
      false,
    );
    assert.equal(
      styleHasUniqueContentSections({
        intro: "Short intro",
        tips: ["One tip"],
        faqs: [{ question: "Q?", answer: "A." }],
      }),
      true,
    );
  });
});

describe("document title word boundary", () => {
  const eightiesId = "1985-studio-portrait";

  it("drops a partial last word when the cut lands inside a word", () => {
    const metadata = styleMetadataTitle({
      id: eightiesId,
      title: "Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota",
    });
    assert.equal(typeof metadata, "object");
    if (typeof metadata === "string") return;
    assert.equal(
      metadata.absolute,
      "Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota AI Photo",
    );
    assert.ok(metadata.absolute.length <= 60);
    assert.equal(metadata.absolute.endsWith("Promp"), false);
  });

  it("keeps the last complete word when the cut already ends on a boundary", () => {
    const metadata = styleMetadataTitle({
      id: eightiesId,
      title: `${"Word ".repeat(12)}Extra`,
    });
    assert.equal(typeof metadata, "object");
    if (typeof metadata === "string") return;
    assert.equal(metadata.absolute, "Word ".repeat(12).trimEnd());
    assert.equal(metadata.absolute.split(" ").length, 12);
  });

  it("does not append Prompt again when the catalog title already includes it", () => {
    const title = "Pumpkin Patch Halloween AI Photo Prompt (Girls)";
    const metadata = styleMetadataTitle({
      id: "cozy-pumpkin-patch-portrait",
      title,
    });
    assert.equal(typeof metadata, "object");
    if (typeof metadata === "string") return;
    assert.equal(metadata.absolute, title);
    assert.equal(metadata.absolute.includes("Prompt Prompt"), false);
  });
});
