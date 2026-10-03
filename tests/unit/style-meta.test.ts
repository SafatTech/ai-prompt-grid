import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { stylePageDescription } from "../../src/lib/catalog/style-meta";

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
