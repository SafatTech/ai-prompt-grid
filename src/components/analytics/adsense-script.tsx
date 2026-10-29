import { getAdSenseClient } from "@/lib/adsense/client";

/**
 * Site-wide AdSense verification tag (adsbygoogle.js). No ad units — just the
 * client script Google uses to verify the site.
 *
 * Plain async script tag so AdSense does not warn about `data-nscript`.
 * `async` keeps it off the critical path for LCP.
 */
export function AdSenseScript() {
  const client = getAdSenseClient();
  const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;

  return (
    <script
      id="adsense-site-tag"
      async
      src={src}
      crossOrigin="anonymous"
    />
  );
}
