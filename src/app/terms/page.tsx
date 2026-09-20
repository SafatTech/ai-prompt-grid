import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of use · AI Prompt Grid",
  description:
    "Terms for using the AI Prompt Grid private beta catalog and private library.",
};

export default function TermsPage() {
  return (
    <article className="container max-w-[720px] py-16 pb-[100px]">
      <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
        Legal
      </p>
      <h1 className="m-0 mb-3 text-[clamp(36px,4.5vw,52px)] tracking-[-0.04em]">
        Terms of use
      </h1>
      <p className="m-0 mb-10 text-[var(--muted)]">
        Last updated: 20 September 2026. These terms apply to the AI Prompt Grid private
        beta. They may be updated before a wider release.
      </p>

      <Section title="The service">
        <p>
          AI Prompt Grid provides a catalog of tested prompts and a private library for
          saved styles and uploaded results. Image transformation is performed in
          external AI tools you choose. We do not guarantee that any external tool will
          produce a particular result.
        </p>
      </Section>

      <Section title="Eligibility and beta access">
        <p>
          Access may be limited to invited testers. The product is provided as-is during
          beta and may change, break, or be withdrawn. Do not rely on it as your only
          archive of important photos.
        </p>
      </Section>

      <Section title="Your content">
        <p>
          You must only upload photos and notes you have the right to use. You retain
          ownership of your uploads. You grant us a limited license to store and display
          them privately to you so the library features work. Public catalog examples are
          owned or licensed by the operator — do not scrape or redistribute them as your
          own assets.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>
          Do not attempt to access another user’s private creations, bypass access
          controls, overload the service, or use the product for unlawful content. Do not
          use the service to generate or store content that violates applicable law or
          the policies of the external AI tools you use.
        </p>
      </Section>

      <Section title="Accounts">
        <p>
          You are responsible for activity under your signed-in account. Keep access to
          your email and Google account secure. We may suspend accounts that abuse the
          service or violate these terms.
        </p>
      </Section>

      <Section title="Disclaimers">
        <p>
          The beta is provided without warranties of uninterrupted availability, fitness
          for a particular purpose, or non-infringement to the fullest extent permitted
          by law. External AI editors are separate products under their own terms.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, the operator is not liable for indirect
          or consequential damages arising from use of the beta, including lost photos or
          failed external transformations. Aggregate liability for claims relating to the
          beta is limited to the amount you paid us for the service in the prior three
          months (which is zero while the private beta is free).
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update these terms. Material changes for beta testers will be noted with
          the invite channel or on this page with a new “last updated” date.
        </p>
      </Section>

      <p className="mt-12 text-sm text-[var(--muted)]">
        See also <Link href="/privacy">Privacy policy</Link>.
      </p>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
        {children}
      </div>
    </section>
  );
}
