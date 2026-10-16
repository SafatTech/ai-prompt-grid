import sharp from "sharp";

/** Tiny ambient-blur WebP data URI for merge hero panels (~0.5 KB). */
export async function buildResultBlurDataUrl(input: Buffer): Promise<string> {
  const webp = await sharp(input)
    .rotate()
    .resize(32, 40, { fit: "cover" })
    .webp({ quality: 60 })
    .toBuffer();
  return `data:image/webp;base64,${webp.toString("base64")}`;
}

/**
 * Best-effort blur from a public result URL. Returns null when the fetch or
 * encode fails so callers can keep a null column and fall back in the UI.
 */
export async function buildResultBlurDataUrlFromUrl(
  url: string,
): Promise<string | null> {
  if (!url || !/^https?:\/\//i.test(url)) return null;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length === 0) return null;
    return await buildResultBlurDataUrl(bytes);
  } catch {
    return null;
  }
}
