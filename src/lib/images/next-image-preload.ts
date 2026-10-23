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
