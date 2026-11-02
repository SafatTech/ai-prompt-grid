import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  STYLE_SEO_OVERRIDES,
  styleMetadataTitle,
  stylePageDescription,
  styleSeoDescription,
  styleSocialTitle,
} from "../../src/lib/catalog/style-meta";

const SECOND = "Copy-ready prompt for ChatGPT, Gemini, and other AI image editors.";

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
      assert.ok(override.title.length <= 60, `${id} title is ${override.title.length}`);

      const metadata = styleMetadataTitle({
        id,
        title: "Catalog title that should be ignored for SEO",
      });
      assert.equal(typeof metadata, "object");
      if (typeof metadata === "string") return;
      assert.equal(metadata.absolute, override.title);
      assert.equal(metadata.absolute.includes(" · AI Prompt Grid"), false);

      const social = styleSocialTitle({
        id,
        title: "Catalog title that should be ignored for SEO",
      });
      assert.equal(social, override.title);
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
