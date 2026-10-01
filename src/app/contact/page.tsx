import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AI Prompt Grid for support, style requests, partnerships, or privacy questions.",
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
        We read every message. Use email for the fastest reply on product
        questions, style ideas, and account requests.
      </p>

      <section className="mb-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
        <h2 className="m-0 mb-2 text-[20px] tracking-[-0.02em]">Email</h2>
        <p className="m-0 mb-4 text-[15px] leading-relaxed text-[var(--muted)]">
          Reach the AI Prompt Grid team at:
        </p>
        <a
          href={CONTACT_MAILTO}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-5 text-sm font-bold text-[#100d1a] hover:bg-[#9b82ff]"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="m-0 mt-4 text-[13px] text-[var(--muted)]">
          Typical topics: catalog feedback, style requests, privacy or account
          deletion, partnerships, and press.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">
          What to include
        </h2>
        <ul className="m-0 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--muted)]">
          <li>For a style request: subject (person, pet, place, product), the look you want, and which AI editor you use.</li>
          <li>For account help: the email on your account (do not send passwords).</li>
          <li>For privacy requests: a clear description of what you need removed or exported.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">Other pages</h2>
        <div className="space-y-2 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            <Link href="/about" className="font-bold text-[var(--text)] underline-offset-2 hover:underline">
              About
            </Link>{" "}
            — who we are and how prompts are tested.
          </p>
          <p>
            <Link href="/privacy" className="font-bold text-[var(--text)] underline-offset-2 hover:underline">
              Privacy policy
            </Link>{" "}
            — how accounts and private photos are handled.
          </p>
          <p>
            <Link href="/terms" className="font-bold text-[var(--text)] underline-offset-2 hover:underline">
              Terms of use
            </Link>{" "}
            — rules for using the catalog and library.
          </p>
        </div>
      </section>
    </article>
  );
}
