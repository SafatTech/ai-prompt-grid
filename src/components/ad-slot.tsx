import Script from "next/script";

type Props = {
  slot: string;
  /** Override env slot id (e.g. NEXT_PUBLIC_ADSENSE_SLOT_HOME_RAIL). */
  envSlot?: string;
  className?: string;
};

/**
 * AdSense slot. Renders nothing visible until client + slot env vars are set
 * (no empty placeholder boxes while AdSense is unapproved).
 */
export function AdSlot({ slot, envSlot, className }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  const adSlot =
    envSlot?.trim() || process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES?.trim();

  if (!client || !adSlot) {
    return null;
  }

  return (
    <aside
      className={["guides-ad", className].filter(Boolean).join(" ")}
      aria-label="Advertisement"
      data-ad-slot={slot}
    >
      <h2 className="sr-only">Advertisement</h2>
      <span className="guides-ad-label">Advertisement</span>
      <div className="guides-ad-box">
        <Script
          id={`adsense-loader-${slot}`}
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: 250 }}
          data-ad-client={client}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
