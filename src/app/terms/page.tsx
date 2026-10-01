import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "Terms for using the AI Prompt Grid catalog and private library.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <article className="container max-w-[720px] py-10 pb-16 sm:py-16 sm:pb-[100px]">
      <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
        Legal
      </p>
      <h1 className="m-0 mb-3 text-[clamp(36px,4.5vw,52px)] tracking-[-0.04em]">
        Terms of use
      </h1>
      <p className="m-0 mb-10 text-[var(--muted)]">
        Last updated: 29 September 2026. These terms apply to your use of AI Prompt
        Grid. We may update them; the date above will change when we do.
      </p>

      <Section title="The service">
        <p>
          AI Prompt Grid provides a catalog of tested prompts and a private library for
          saved styles and uploaded results. Image transformation is performed in
          external AI tools you choose. We do not guarantee that any external tool will
          produce a particular result.
        </p>
      </Section>

      <Section title="Eligibility">
        <p>
          You must be able to form a binding contract where you live and comply with
          applicable law. The product is provided as-is and may change as we improve
          features. Do not rely on it as your only archive of important photos.
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
          The service is provided without warranties of uninterrupted availability,
          fitness for a particular purpose, or non-infringement to the fullest extent
          permitted by law. External AI editors are separate products under their own
          terms.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, the operator is not liable for indirect
          or consequential damages arising from use of the service, including lost photos
          or failed external transformations. Aggregate liability for claims relating to
          the service is limited to the amount you paid us for the service in the prior
          three months (or zero if the service was free for you during that period).
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update these terms. Material changes will be noted on this page with a
          new “last updated” date. Continued use after that date means you accept the
          updated terms.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these terms: email{" "}
          <a href={CONTACT_MAILTO} className="font-bold text-[var(--text)] underline-offset-2 hover:underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or visit{" "}
          <Link href="/contact" className="font-bold text-[var(--text)] underline-offset-2 hover:underline">
            Contact
          </Link>
          .
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
