/**
 * Crop focus points for object-fit: cover images (0–100 percent).
 * Default biases upward so tall portraits keep faces in frame.
 */

export type ImageFocus = {
  x: number;
  y: number;
};

/** Used when DB focus is null or detection finds no face. */
export const DEFAULT_IMAGE_FOCUS: ImageFocus = { x: 50, y: 30 };

/** CSS fallback when focus is missing — keep in sync with DEFAULT_IMAGE_FOCUS. */
export const DEFAULT_OBJECT_POSITION = "center 30%";

export type FaceBoxPercent = {
  /** Left edge as % of image width (0–100). */
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
};

export function clampFocusCoord(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_IMAGE_FOCUS.x;
  return Math.min(100, Math.max(0, value));
}

export function normalizeFocus(
  x: number | null | undefined,
  y: number | null | undefined,
): ImageFocus | null {
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    !Number.isFinite(x) ||
    !Number.isFinite(y)
  ) {
    return null;
  }
  return { x: clampFocusCoord(x), y: clampFocusCoord(y) };
}

export function resolveFocus(
  x: number | null | undefined,
  y: number | null | undefined,
): ImageFocus {
  return normalizeFocus(x, y) ?? DEFAULT_IMAGE_FOCUS;
}

/** CSS object-position from stored focus; nullish → default. */
export function focusObjectPosition(
  focus: ImageFocus | null | undefined,
): string {
  if (!focus) return DEFAULT_OBJECT_POSITION;
  const x = clampFocusCoord(focus.x);
  const y = clampFocusCoord(focus.y);
  return `${roundFocus(x)}% ${roundFocus(y)}%`;
}

export function focusObjectPositionFromCoords(
  x: number | null | undefined,
  y: number | null | undefined,
): string {
  return focusObjectPosition(normalizeFocus(x, y));
}

function roundFocus(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Focus from face detection boxes (percent of image).
 * One face → box center. Several → center of the union box.
 * None → default (50, 30).
 */
export function focusFromFaceBoxes(boxes: readonly FaceBoxPercent[]): ImageFocus {
  if (boxes.length === 0) return { ...DEFAULT_IMAGE_FOCUS };

  let xMin = Infinity;
  let yMin = Infinity;
  let xMax = -Infinity;
  let yMax = -Infinity;

  for (const box of boxes) {
    xMin = Math.min(xMin, box.xMin, box.xMax);
    yMin = Math.min(yMin, box.yMin, box.yMax);
    xMax = Math.max(xMax, box.xMin, box.xMax);
    yMax = Math.max(yMax, box.yMin, box.yMax);
  }

  return {
    x: clampFocusCoord((xMin + xMax) / 2),
    y: clampFocusCoord((yMin + yMax) / 2),
  };
}

/** Convert absolute pixel boxes to percent, then focus. */
export function focusFromPixelBoxes(
  boxes: readonly { xMin: number; yMin: number; xMax: number; yMax: number }[],
  width: number,
  height: number,
): ImageFocus {
  if (!(width > 0) || !(height > 0) || boxes.length === 0) {
    return { ...DEFAULT_IMAGE_FOCUS };
  }
  return focusFromFaceBoxes(
    boxes.map((box) => ({
      xMin: (box.xMin / width) * 100,
      yMin: (box.yMin / height) * 100,
      xMax: (box.xMax / width) * 100,
      yMax: (box.yMax / height) * 100,
    })),
  );
}
