import Script from "next/script";
import { getAdSenseClient } from "@/lib/adsense/client";

/**
 * Site-wide AdSense verification tag (adsbygoogle.js). No ad units — just the
 * client script Google uses to verify the site. Loaded afterInteractive so it
 * does not compete with LCP.
 */
export function AdSenseScript() {
  const client = getAdSenseClient();

  return (
    <Script
      id="adsense-site-tag"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
