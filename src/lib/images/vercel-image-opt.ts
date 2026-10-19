/**
 * Vercel Hobby caps optimized image transforms (/_next/image) at 5,000/month.
 * Default off: next.config sets `images.unoptimized` so next/image serves the
 * Supabase (or local) public URL as-is. Set NEXT_PUBLIC_VERCEL_IMAGE_OPT=1 and
 * redeploy after upgrading to Pro to re-enable Vercel optimization.
 */
export function isVercelImageOptEnabled(): boolean {
  return process.env.NEXT_PUBLIC_VERCEL_IMAGE_OPT === "1";
}
