import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DEFAULT_IMAGE_FOCUS,
  DEFAULT_OBJECT_POSITION,
  focusFromFaceBoxes,
  focusFromPixelBoxes,
  focusObjectPosition,
  focusObjectPositionFromCoords,
  normalizeFocus,
  resolveFocus,
} from "../../src/lib/catalog/image-focus";

describe("image-focus", () => {
  it("defaults to center 30% when focus is missing", () => {
    assert.deepEqual(resolveFocus(null, null), DEFAULT_IMAGE_FOCUS);
    assert.equal(focusObjectPosition(null), DEFAULT_OBJECT_POSITION);
    assert.equal(focusObjectPositionFromCoords(undefined, undefined), "center 30%");
  });

  it("normalizes and clamps coordinates", () => {
    assert.deepEqual(normalizeFocus(12.34, 56.7), { x: 12.34, y: 56.7 });
    assert.deepEqual(normalizeFocus(-10, 150), { x: 0, y: 100 });
    assert.equal(normalizeFocus(NaN, 20), null);
    assert.equal(focusObjectPosition({ x: 40, y: 25 }), "40% 25%");
  });

  it("uses the face box center for a single detection", () => {
    assert.deepEqual(
      focusFromFaceBoxes([{ xMin: 20, yMin: 10, xMax: 40, yMax: 30 }]),
      { x: 30, y: 20 },
    );
  });

  it("uses the union box center for several faces", () => {
    assert.deepEqual(
      focusFromFaceBoxes([
        { xMin: 10, yMin: 10, xMax: 20, yMax: 20 },
        { xMin: 60, yMin: 40, xMax: 80, yMax: 60 },
      ]),
      { x: 45, y: 35 },
    );
  });

  it("falls back when there are no faces", () => {
    assert.deepEqual(focusFromFaceBoxes([]), DEFAULT_IMAGE_FOCUS);
    assert.deepEqual(focusFromPixelBoxes([], 800, 1000), DEFAULT_IMAGE_FOCUS);
  });

  it("converts pixel boxes using image dimensions", () => {
    assert.deepEqual(
      focusFromPixelBoxes([{ xMin: 100, yMin: 50, xMax: 300, yMax: 250 }], 400, 500),
      { x: 50, y: 30 },
    );
  });
});
