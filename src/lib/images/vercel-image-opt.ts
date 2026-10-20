/**
 * Vercel Hobby caps optimized image transforms (/_next/image) at 5,000/month.
 * Default off: next.config uses a custom loader that points at pre-generated
 * `.w{width}.webp` variants on Supabase Storage / local public (see
 * scripts/generate-image-variants.ts). Set NEXT_PUBLIC_VERCEL_IMAGE_OPT=1 and
 * redeploy after upgrading to Pro to use Vercel’s optimizer instead.
 */
export function isVercelImageOptEnabled(): boolean {
  return process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT === "1";
}
