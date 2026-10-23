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
 * Style-page hero sizes — must stay identical on CompareSlider, MergeBeforeAfter,
 * and the react-dom preload so mobile reuses w=640 (320 CSS px @2×).
 */
export const DETAIL_HERO_SIZES =
  "(max-width:640px) 320px, (max-width:1024px) 90vw, 560px";

/** Widths from next.config `images.deviceSizes` that the hero sizes string can select. */
export const DETAIL_HERO_SRCSET_WIDTHS = [640, 750, 828, 1080, 1200] as const;
