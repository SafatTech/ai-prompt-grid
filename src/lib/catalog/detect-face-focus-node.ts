/**
 * Server / script face-focus detection (BlazeFace via TensorFlow.js).
 * Keep imports dynamic so Next page bundles never pull tfjs into the client.
 */

import {
  DEFAULT_IMAGE_FOCUS,
  focusFromPixelBoxes,
  type ImageFocus,
} from "./image-focus";

type BlazeFaceModel = {
  estimateFaces: (
    input: unknown,
    returnTensors: boolean,
  ) => Promise<
    Array<{
      topLeft: [number, number] | Float32Array;
      bottomRight: [number, number] | Float32Array;
    }>
  >;
};

let modelPromise: Promise<BlazeFaceModel | null> | null = null;

async function loadModel(): Promise<BlazeFaceModel | null> {
  if (!modelPromise) {
    modelPromise = (async () => {
      try {
        const tf = await import("@tensorflow/tfjs");
        await tf.setBackend("cpu");
        await tf.ready();
        const blazeface = await import("@tensorflow-models/blazeface");
        return (await blazeface.load({ maxFaces: 10 })) as BlazeFaceModel;
      } catch (error) {
        console.warn("[face-focus] model load failed", error);
        return null;
      }
    })();
  }
  return modelPromise;
}

function asPair(value: [number, number] | Float32Array): [number, number] {
  return [Number(value[0]), Number(value[1])];
}

/**
 * Detect cover-crop focus from an image buffer (JPEG/PNG/WebP).
 * No face → { x: 50, y: 30 }. Failures also return the default.
 */
export async function detectFaceFocusFromBuffer(
  buffer: Buffer,
): Promise<ImageFocus> {
  try {
    const sharp = (await import("sharp")).default;
    const { data, info } = await sharp(buffer)
      .rotate()
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    if (!(width > 0) || !(height > 0)) return { ...DEFAULT_IMAGE_FOCUS };

    const model = await loadModel();
    if (!model) return { ...DEFAULT_IMAGE_FOCUS };

    const tf = await import("@tensorflow/tfjs");
    const focus = tf.tidy(() => {
      const rgba = tf.tensor3d(new Uint8Array(data), [height, width, 4]);
      const rgb = rgba.slice([0, 0, 0], [-1, -1, 3]);
      return rgb;
    });

    try {
      const predictions = await model.estimateFaces(focus, false);
      const boxes = predictions.map((pred) => {
        const [x1, y1] = asPair(pred.topLeft);
        const [x2, y2] = asPair(pred.bottomRight);
        return { xMin: x1, yMin: y1, xMax: x2, yMax: y2 };
      });
      return focusFromPixelBoxes(boxes, width, height);
    } finally {
      focus.dispose();
    }
  } catch (error) {
    console.warn("[face-focus] detection failed", error);
    return { ...DEFAULT_IMAGE_FOCUS };
  }
}

/** Download once and detect. Used by the backfill script. */
export async function detectFaceFocusFromUrl(url: string): Promise<ImageFocus> {
  if (!url) return { ...DEFAULT_IMAGE_FOCUS };
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`[face-focus] fetch ${response.status} for ${url}`);
      return { ...DEFAULT_IMAGE_FOCUS };
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    return detectFaceFocusFromBuffer(buffer);
  } catch (error) {
    console.warn("[face-focus] download failed", error);
    return { ...DEFAULT_IMAGE_FOCUS };
  }
}
