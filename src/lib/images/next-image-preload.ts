import { isVercelImageOptEnabled } from "@/lib/images/vercel-image-opt";

/**
 * Build the same `/_next/image` URL Next will request for a remote src.
 * Used with react-dom `preload` so the LCP fetch matches next/image (no raw
 * double-download of the origin URL).
 */
export function nextImagePreloadUrl(
  src: string,
  width: number,
  quality = 75,
): string {
  if (!isVercelImageOptEnabled() || src.startsWith("data:") || src.startsWith("/")) {
    return src;
  }
  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality),
  });
  return `/_next/image?${params.toString()}`;
}

/** `srcset` candidate list matching next/image for the given device widths. */
export function nextImageSrcSet(
  src: string,
  widths: readonly number[],
  quality = 75,
): string {
  return widths
    .map((width) => `${nextImagePreloadUrl(src, width, quality)} ${width}w`)
    .join(", ");
}

/**
 * Style-page hero sizes — must stay identical on CompareSlider / MergeBeforeAfter.
 * At 390 CSS px the detail container is 100% − 24px ≈ 364 px; pick a 384w
 * candidate (deviceSizes) so we do not under-fetch at 320 or overshoot with 750.
 */
export const DETAIL_HERO_SIZES =
  "(max-width:640px) 364px, (max-width:1024px) 90vw, 560px";

/** Widths from next.config `images.deviceSizes` that the hero sizes string can select. */
export const DETAIL_HERO_SRCSET_WIDTHS = [384, 640, 750, 828, 1080, 1200] as const;
