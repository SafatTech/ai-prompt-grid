import sharp from "sharp";
import {
  ALLOWED_UPLOAD_MIME,
  MAX_IMAGE_EDGE,
  MAX_IMAGE_PIXELS,
  MAX_UPLOAD_BYTES,
  type AllowedUploadMime,
} from "@/lib/creations/constants";

export type ProcessedImage = {
  buffer: Buffer;
  contentType: "image/webp";
  ext: "webp";
  width: number;
  height: number;
};

function sniffMime(bytes: Buffer): AllowedUploadMime | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  const riff = bytes.subarray(0, 4).toString("ascii");
  const webp = bytes.subarray(8, 12).toString("ascii");
  if (riff === "RIFF" && webp === "WEBP") return "image/webp";
  return null;
}

/**
 * Validate magic bytes, declared MIME, size, and dimensions; re-encode to WebP
 * (strips EXIF / metadata).
 */
export async function processUploadImage(
  input: Buffer,
  declaredMime: string | undefined,
): Promise<{ ok: true; image: ProcessedImage } | { ok: false; error: string }> {
  if (input.length === 0) {
    return { ok: false, error: "Empty file." };
  }
  if (input.length > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "Choose an image under 10 MB." };
  }

  const sniffed = sniffMime(input);
  if (!sniffed) {
    return {
      ok: false,
      error: "Only JPEG, PNG, or WebP images are allowed.",
    };
  }

  if (
    declaredMime &&
    declaredMime !== "application/octet-stream" &&
    !ALLOWED_UPLOAD_MIME.includes(declaredMime as AllowedUploadMime)
  ) {
    return {
      ok: false,
      error: "Only JPEG, PNG, or WebP images are allowed.",
    };
  }

  if (
    declaredMime &&
    ALLOWED_UPLOAD_MIME.includes(declaredMime as AllowedUploadMime) &&
    declaredMime !== sniffed
  ) {
    return {
      ok: false,
      error: "File type does not match its contents.",
    };
  }

  let meta: Awaited<ReturnType<ReturnType<typeof sharp>["metadata"]>>;
  try {
    meta = await sharp(input, { failOn: "error" }).metadata();
  } catch {
    return { ok: false, error: "That image could not be read." };
  }

  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) {
    return { ok: false, error: "That image has invalid dimensions." };
  }
  if (width > MAX_IMAGE_EDGE || height > MAX_IMAGE_EDGE) {
    return {
      ok: false,
      error: `Images must be at most ${MAX_IMAGE_EDGE}px on each side.`,
    };
  }
  if (width * height > MAX_IMAGE_PIXELS) {
    return { ok: false, error: "Image resolution is too large." };
  }

  let buffer: Buffer;
  try {
    buffer = await sharp(input)
      .rotate()
      .webp({ quality: 85, effort: 4 })
      .toBuffer();
  } catch {
    return { ok: false, error: "That image could not be processed." };
  }

  if (buffer.length > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "Processed image exceeds the 10 MB limit." };
  }

  return {
    ok: true,
    image: {
      buffer,
      contentType: "image/webp",
      ext: "webp",
      width,
      height,
    },
  };
}
