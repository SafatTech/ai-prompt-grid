/**
 * Vercel Image Optimization (/_next/image).
 * Default ON (Pro). Kill switch: set NEXT_PUBLIC_VERCEL_IMAGE_OPT=0 and redeploy
 * to serve originals unoptimized (no /_next/image transforms).
 */
export function isVercelImageOptEnabled(): boolean {
  const value = process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT;
  if (value === "0" || value === "false") return false;
  return true;
}
