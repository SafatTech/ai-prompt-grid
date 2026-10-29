import { getAdSenseClient } from "@/lib/adsense/client";

type Props = {
  slot: string;
  /** Override env slot id (e.g. NEXT_PUBLIC_ADSENSE_SLOT_HOME_RAIL). */
  envSlot?: string;
  className?: string;
};

/**
 * AdSense slot. Renders nothing until a slot env var is set (no empty boxes
 * while AdSense is unapproved). The site-wide adsbygoogle.js tag lives in the
 * root layout — this component only renders the unit markup.
 */
export function AdSlot({ slot, envSlot, className }: Props) {
  const adSlot =
    envSlot?.trim() || process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES?.trim();

  if (!adSlot) {
    return null;
  }

  const client = getAdSenseClient();

  return (
    <aside
      className={["guides-ad", className].filter(Boolean).join(" ")}
      aria-label="Advertisement"
      data-ad-slot={slot}
    >
      <h2 className="sr-only">Advertisement</h2>
      <span className="guides-ad-label">Advertisement</span>
      <div className="guides-ad-box">
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
