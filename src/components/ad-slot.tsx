import Script from "next/script";

type Props = {
  slot: string;
  className?: string;
};

/**
 * Reserved-height AdSense slot. Keeps layout stable when no ad fills.
 * Loads the AdSense script afterInteractive only when
 * NEXT_PUBLIC_ADSENSE_CLIENT is set (Google CMP handles consent).
 */
export function AdSlot({ slot, className }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES?.trim();

  return (
    <aside
      className={["guides-ad", className].filter(Boolean).join(" ")}
      aria-label="Advertisement"
      data-ad-slot={slot}
    >
      <span className="guides-ad-label">Advertisement</span>
      <div className="guides-ad-box">
        {client && adSlot ? (
          <>
            <Script
              id="adsense-loader"
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
          </>
        ) : null}
      </div>
    </aside>
  );
}
