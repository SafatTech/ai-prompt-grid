import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Prompt Grid is run by Saad Masood under Safat Tech in Pakistan. Free copy-paste AI photo prompts with real before-and-after examples.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <article className="container max-w-[720px] py-10 pb-16 sm:py-16 sm:pb-[100px]">
      <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
        Company
      </p>
      <h1 className="m-0 mb-3 text-[clamp(36px,4.5vw,52px)] tracking-[-0.04em]">
        About AI Prompt Grid
      </h1>
      <p className="m-0 mb-10 text-[17px] leading-relaxed text-[var(--muted)]">
        aipromptgrid.com is a free catalog of copy-paste AI photo prompts with
        real before-and-after examples, run by Saad Masood under Safat Tech in
        Pakistan.
      </p>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">Who runs this site</h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            AI Prompt Grid is operated by{" "}
            <strong className="text-[var(--text)]">Saad Masood</strong> under{" "}
            <strong className="text-[var(--text)]">Safat Tech</strong>, based in
            Pakistan. There is no large editorial team behind the catalog. Saad
            builds the site, writes and revises the prompts, prepares the example
            images, and publishes seasonal guides when festivals and trends call
            for them.
          </p>
          <p>
            The goal is simple: help people in Pakistan, India, South Asia, and
            worldwide turn everyday photos into clearer festive, professional, or
            creative looks without guessing at prompt wording.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">What the site is</h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            Each style page pairs a{" "}
            <strong className="text-[var(--text)]">
              free, copy-ready prompt
            </strong>{" "}
            with a before-and-after example so you can see the intended look
            before you paste anything into an external AI image app. You browse
            here, copy the prompt, then create the result in the editor you
            already use. Image generation does not run on this website.
          </p>
          <p>
            The catalog covers festivals, weddings, professional headshots,
            couple and family merges, outfit changes, winter and seasonal looks,
            and other everyday photo edits. Guides collect related prompts with
            short how-to notes so you can move from one look to another without
            starting from a blank chat.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">
          How prompts are tested
        </h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            Saad tests each published prompt himself in popular AI image apps.
            He starts from a realistic source photo, runs the prompt, compares
            the before and after, and rewrites lines that break identity,
            clothing, lighting, or composition. The process repeats until the
            result is reliable enough to publish with a clear example.
          </p>
          <p>
            Identity-preserving instructions stay in the prompt on purpose: face
            shape, skin tone, hair or head covering, glasses, and other defining
            details should remain the person in your upload. When major apps
            change how they follow instructions, prompts are re-checked and
            updated rather than left stale.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">Editorial policy</h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            Prompts published here are original editorial work for this site.
            Religious festival guides avoid depicting deities; they focus on
            people, clothing, home settings, and respectful festive atmosphere.
            Example images on style pages are AI-generated illustrations used to
            show the intended edit, and pages label that context where it
            matters for understanding the catalog.
          </p>
          <p>
            We do not invent awards, traffic figures, or third-party endorsements.
            We do not claim affiliation with AI app makers. Results always depend
            on the app, model version, and photo you upload, so the site does not
            promise identical output for every user.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">Update schedule</h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            New seasonal and trending guides appear regularly around festivals
            and popular looks. Existing prompts are re-tested when apps change
            behaviour, and wording is revised when identity lock or scene detail
            drifts. Older thin or near-duplicate style pages may stay reachable
            by direct link while they remain noindex during quality cleanup.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">Who it is for</h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            The audience is broad: families preparing festival photos, couples
            and parents, freelancers who need a cleaner headshot, small sellers,
            and anyone who wants a stronger photo without becoming a prompt
            engineer. Many visitors come from Pakistan and India for Diwali,
            Republic Day, wedding, and winter looks; others arrive from elsewhere
            for LinkedIn headshots, anime restyles, or everyday portraits.
          </p>
          <p>
            Browse freely. Sign in only if you want to save styles or keep
            private results in your library. The public catalog and guides stay
            available without an account.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">
          What you will not find here
        </h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            This is not an on-site image generator, a paid prompt marketplace, or
            a review site that ranks AI apps. It is a practical catalog: see the
            look, copy the prompt, create elsewhere. If a page is thin or
            overlapping during cleanup, it may stay noindex until it is improved
            or retired from discovery.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">Contact</h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            For prompt issues, corrections, copyright or takedown requests, and
            partnerships, email{" "}
            <a
              href={CONTACT_MAILTO}
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or use the{" "}
            <Link
              href="/contact"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              contact page
            </Link>
            . Typical replies arrive within 2 to 3 business days.
          </p>
        </div>
      </section>

      <p className="mt-12 text-sm text-[var(--muted)]">
        Learn more in{" "}
        <Link
          href="/how-it-works"
          className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
        >
          How it works
        </Link>{" "}
        or{" "}
        <Link
          href="/explore"
          className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
        >
          explore styles
        </Link>
        .
      </p>
    </article>
  );
}
