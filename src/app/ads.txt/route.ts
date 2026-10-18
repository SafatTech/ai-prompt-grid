import { NextResponse } from "next/server";

/**
 * AdSense ads.txt. Publisher id comes from NEXT_PUBLIC_ADSENSE_CLIENT
 * (`ca-pub-…` or `pub-…`). Returns 404 when unset so the route stays inert
 * until AdSense is configured.
 */
export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  if (!client) {
    return new NextResponse(null, { status: 404 });
  }

  const publisherId = client.startsWith("ca-") ? client.slice(3) : client;
  if (!publisherId.startsWith("pub-")) {
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
