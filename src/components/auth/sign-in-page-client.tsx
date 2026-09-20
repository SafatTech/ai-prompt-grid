"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLibrary } from "@/components/providers/library-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";

/** Spec route `/sign-in` — opens the same modal used across the app. */
export function SignInPageClient() {
  const { signedIn } = useLibrary();
  const { openSignIn } = useUiModals();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/library";

  useEffect(() => {
    if (signedIn) {
      router.replace(safeNext);
      return;
    }
    openSignIn();
  }, [signedIn, openSignIn, router, safeNext]);

  return (
    <section className="container py-[88px]">
      <h1 className="m-0 mb-2 text-[clamp(32px,4vw,48px)] tracking-[-0.04em]">Sign in</h1>
      <p className="m-0 text-[var(--muted)]">
        Use the dialog to continue with Google or email a sign-in link.
      </p>
    </section>
  );
}
