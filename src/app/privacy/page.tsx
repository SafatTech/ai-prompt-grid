import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How AI Prompt Grid handles accounts, private photos, analytics, and third-party tools.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <article className="container max-w-[720px] py-10 pb-16 sm:py-16 sm:pb-[100px]">
      <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
        Legal
      </p>
      <h1 className="m-0 mb-3 text-[clamp(36px,4.5vw,52px)] tracking-[-0.04em]">
        Privacy policy
      </h1>
      <p className="m-0 mb-10 text-[var(--muted)]">
        Last updated: 29 September 2026. This summary explains how AI Prompt Grid
        handles personal data. It is not a substitute for jurisdiction-specific counsel.
      </p>

      <Section title="What the product does">
        <p>
          AI Prompt Grid helps you browse tested photo-transformation styles and copy
          prompts for use in <strong>external</strong> AI image editors. We do not run
          onsite image generation or editing jobs.
        </p>
      </Section>

      <Section title="Accounts">
        <p>
          You may browse and copy prompts without an account. Sign-in (Google OAuth or
          email magic link via Supabase Auth) is required to save styles, collections, or
          creations. We store a profile linked to your auth user id, optional display
          name, and role.
        </p>
      </Section>

      <Section title="Private photos and creations">
        <p>
          Result images (and optional source photos) you upload are private by default.
          They are stored in a private bucket under your account prefix and are not
          shown in the public catalog. You can delete a creation or remove only the
          source photo. We apply size and type checks and re-encode uploads; do not
          upload images you are not allowed to store.
        </p>
      </Section>

      <Section title="Public catalog">
        <p>
          Published styles, example before/after pairs, and prompt recipes are public.
          Historical prompt snapshots on your private creations remain frozen even if a
          public recipe later changes.
        </p>
      </Section>

      <Section title="Analytics and monitoring">
        <p>
          We may record privacy-safe product events (for example style views, prompt
          copies, sign-in started/completed, saves, and upload started/completed). Event
          payloads must not include image bytes, private prompt text, notes, or full
          email addresses. Error monitoring (if enabled) must scrub the same classes of
          data.
        </p>
      </Section>

      <Section title="Third parties">
        <p>
          Auth and storage may be provided by Supabase. Hosting may use Vercel. Google
          may process OAuth if you choose Google sign-in. Transformation of your photos
          happens in the external editor you choose — that tool has its own privacy
          terms.
        </p>
      </Section>

      <Section title="Retention and deletion">
        <p>
          You can delete creations from My library. To request account deletion or a
          data export, email{" "}
          <a href={CONTACT_MAILTO} className="font-bold text-[var(--text)] underline-offset-2 hover:underline">
            {CONTACT_EMAIL}
          </a>
          . We will respond as promptly as reasonably possible.
        </p>
      </Section>

      <Section id="contact" title="Contact">
        <p>
          Privacy questions: email{" "}
          <a href={CONTACT_MAILTO} className="font-bold text-[var(--text)] underline-offset-2 hover:underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or use the{" "}
          <Link href="/contact" className="font-bold text-[var(--text)] underline-offset-2 hover:underline">
            contact page
          </Link>
          .
        </p>
      </Section>

      <p className="mt-12 text-sm text-[var(--muted)]">
        See also <Link href="/terms">Terms of use</Link>.
      </p>
    </article>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mb-8">
      <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)] [&_strong]:text-[var(--text)]">
        {children}
      </div>
    </section>
  );
}
