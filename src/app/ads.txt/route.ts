import { NextResponse } from "next/server";
import { getAdSensePublisherId } from "@/lib/adsense/client";

/**
 * AdSense ads.txt. Publisher id comes from NEXT_PUBLIC_ADSENSE_CLIENT
 * (`ca-pub-…` or `pub-…`), falling back to the known publisher so the route
 * works when the Vercel env var is unset.
 */
export function GET() {
  const publisherId = getAdSensePublisherId();
  if (!publisherId) {
    return new NextResponse(null, { status: 404 });
  }

  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;
  return new NextResponse(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
