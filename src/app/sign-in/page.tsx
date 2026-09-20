import { Suspense } from "react";
import { SignInPageClient } from "@/components/auth/sign-in-page-client";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <section className="container py-[88px]">
          <h1 className="m-0 mb-2 text-[clamp(32px,4vw,48px)] tracking-[-0.04em]">
            Sign in
          </h1>
          <p className="m-0 text-[var(--muted)]">Loading…</p>
        </section>
      }
    >
      <SignInPageClient />
    </Suspense>
  );
}
