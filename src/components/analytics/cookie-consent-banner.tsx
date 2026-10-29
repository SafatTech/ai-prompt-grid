"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  CONSENT_STORAGE_KEY,
  readStoredConsent,
  updateStoredConsent,
  type ConsentChoice,
} from "@/lib/analytics/consent";

function subscribe(onStoreChange: () => void): () => void {
  function onStorage(event: StorageEvent) {
    if (event.key === CONSENT_STORAGE_KEY || event.key === null) {
      onStoreChange();
    }
  }
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

function getConsentSnapshot(): ConsentChoice | null {
  return readStoredConsent();
}

/** SSR / first paint: hide until the client can read localStorage. */
function getServerConsentSnapshot(): ConsentChoice {
  return "denied";
}

/**
 * Lightweight cookie consent banner (no CMP library). Bottom bar only so it
 * does not cover the LCP hero image. Accept / Reject update Consent Mode v2
 * and persist in localStorage.
 */
export function CookieConsentBanner() {
  const stored = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  // Show only when the client has no saved choice yet.
  const visible = stored === null;

  if (!visible) return null;

  function choose(choice: ConsentChoice) {
    updateStoredConsent(choice);
    // Same-tab localStorage writes do not fire `storage`; force a re-read.
    window.dispatchEvent(
      new StorageEvent("storage", { key: CONSENT_STORAGE_KEY, newValue: choice }),
    );
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] p-4 shadow-[0_-12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-5"
    >
      <div className="mx-auto flex max-w-[var(--max)] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="m-0 text-sm leading-relaxed text-[var(--muted)]">
          We use cookies for analytics and ads (Google AdSense). Choose Accept
          or Reject — you can read more in our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-[var(--text)] underline decoration-[var(--line-strong)] underline-offset-2 hover:text-[var(--violet)]"
          >
            Privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            className="min-h-11 flex-1 sm:flex-none"
            onClick={() => choose("denied")}
          >
            Reject
          </Button>
          <Button
            type="button"
            variant="primary"
            className="min-h-11 flex-1 sm:flex-none"
            onClick={() => choose("granted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
