import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Safat Tech about AI Prompt Grid: prompt issues, corrections, takedown requests, and partnerships at hello@aipromptgrid.com.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <article className="container max-w-[720px] py-10 pb-16 sm:py-16 sm:pb-[100px]">
      <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
        Support
      </p>
      <h1 className="m-0 mb-3 text-[clamp(36px,4.5vw,52px)] tracking-[-0.04em]">
        Contact
      </h1>
      <p className="m-0 mb-10 text-[17px] leading-relaxed text-[var(--muted)]">
        Reach Safat Tech about aipromptgrid.com by email. We read every message
        and usually reply within 2 to 3 business days.
      </p>

      <section className="mb-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
        <h2 className="m-0 mb-2 text-[20px] tracking-[-0.02em]">Email</h2>
        <p className="m-0 mb-4 text-[15px] leading-relaxed text-[var(--muted)]">
          Public contact address:
        </p>
        <a
          href={CONTACT_MAILTO}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-5 text-sm font-bold text-[#100d1a] hover:bg-[#9b82ff]"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="m-0 mt-4 text-[13px] text-[var(--muted)]">
          Business name: Safat Tech. Location: Pakistan. Typical response time:
          within 2 to 3 business days.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">What to contact about</h2>
        <ul className="m-0 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--muted)]">
          <li>
            Prompt issues: a style that stopped working well, unclear wording, or
            a before-and-after example that needs a correction.
          </li>
          <li>
            Corrections: factual mistakes on a guide or style page, broken links,
            or outdated instructions after an AI app update.
          </li>
          <li>
            Takedown and copyright: requests about images, text, or other
            material you believe should be removed.
          </li>
          <li>
            Partnerships: collaboration ideas that fit a free prompt catalog and
            guide audience.
          </li>
          <li>
            Privacy or account help: use the email on your account when relevant,
            and never send passwords.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">What to include</h2>
        <ul className="m-0 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--muted)]">
          <li>The page URL or style name, when the message is about a specific prompt.</li>
          <li>A short description of what went wrong or what you need changed.</li>
          <li>For takedown requests: enough detail to identify the content.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">Other pages</h2>
        <div className="space-y-2 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            <Link
              href="/about"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              About
            </Link>{" "}
            — who runs the site and how prompts are tested.
          </p>
          <p>
            <Link
              href="/privacy-policy"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              Privacy policy
            </Link>{" "}
            — how accounts, private photos, analytics, and ads are handled.
          </p>
          <p>
            <Link
              href="/cookie-policy"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              Cookie policy
            </Link>{" "}
            — essential, analytics, and advertising cookies.
          </p>
          <p>
            <Link
              href="/disclaimer"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              Disclaimer
            </Link>{" "}
            — prompts are for inspiration, and results vary.
          </p>
          <p>
            <Link
              href="/terms-of-service"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              Terms of service
            </Link>{" "}
            — rules for using the catalog and library.
          </p>
        </div>
      </section>
    </article>
  );
}
