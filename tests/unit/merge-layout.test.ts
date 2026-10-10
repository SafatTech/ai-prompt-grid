import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  mergeInputPhotos,
  usesMergeHero,
  usesMergeStack,
} from "../../src/lib/catalog/merge-inputs";
import { getStyleById } from "../../src/lib/catalog/styles";
import { classifyPairImages } from "../../src/lib/guides/image-pairs";

describe("merge input photos", () => {
  it("reads Photo 2 from the example pair that shares the result", () => {
    const style = getStyleById("riverside-merge-two-photos-prompt-gemini-couple");
    assert.ok(style);
    const photos = mergeInputPhotos(style);
    assert.equal(photos.length, 2);
    assert.match(photos[0]?.src ?? "", /source-75\./);
    assert.match(photos[1]?.src ?? "", /source-75b\./);
    assert.match(photos[1]?.alt ?? "", /black tee/);
    assert.equal(usesMergeHero(style), true);
    assert.equal(usesMergeStack(style), true);
    assert.equal(style.examplePairs[0]?.result, style.examplePairs[1]?.result);
  });

  it("keeps a two-photo style on one before when the second file is not stored", () => {
    const style = getStyleById("combine-two-photos-80s-couple");
    assert.ok(style);
    assert.equal(style.promptVariant.inputImageCount, 2);
    const photos = mergeInputPhotos(style);
    assert.equal(photos.length, 1);
    assert.match(photos[0]?.src ?? "", /source-58\./);
    assert.doesNotMatch(photos[0]?.src ?? "", /source-58b/);
    assert.equal(usesMergeHero(style), true);
    assert.equal(usesMergeStack(style), false);
  });

  it("leaves the matching-team examples as two one-photo results", () => {
    const style = getStyleById("matching-team-headshot-ai-prompt-gemini-company-page");
    assert.ok(style);
    assert.equal(style.promptVariant.inputImageCount, 1);
    assert.match(style.examplePairs[1]?.source ?? "", /source-70b\./);
    assert.notEqual(style.examplePairs[0]?.result, style.examplePairs[1]?.result);
    assert.equal(mergeInputPhotos(style).length, 0);
    assert.equal(usesMergeHero(style), false);
    assert.equal(usesMergeStack(style), false);
  });
});

describe("classify guide image groups", () => {
  it("docks two inputs and one result", () => {
    const classified = classifyPairImages([
      { src: "https://example.com/source-75.webp" },
      { src: "https://example.com/source-75b.webp" },
      { src: "https://example.com/result-75.webp" },
    ]);
    assert.equal(classified.inputs.length, 2);
    assert.match(classified.result?.src ?? "", /result-75\.webp$/);
  });

  it("keeps a single before and after on the old grid", () => {
    const classified = classifyPairImages([
      { src: "/guides/example/portrait-before.webp" },
      { src: "/guides/example/portrait-after.webp" },
    ]);
    assert.deepEqual(classified, { inputs: [], result: null });
  });

  it("keeps two separate results on the old grid", () => {
    const classified = classifyPairImages([
      { src: "https://example.com/source-70.webp" },
      { src: "https://example.com/result-70.webp" },
      { src: "https://example.com/source-70b.webp" },
      { src: "https://example.com/result-70b.webp" },
    ]);
    assert.deepEqual(classified, { inputs: [], result: null });
  });
});
