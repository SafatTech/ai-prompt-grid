import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Prompt Grid is a catalog of tested photo-transformation prompts you can copy into ChatGPT, Gemini, and other AI image editors.",
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
        We help people transform photos they already love — without guessing at
        prompts or losing the story in the frame.
      </p>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">What we do</h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            AI Prompt Grid is a public catalog of photo-transformation styles.
            Each style pairs a clear before-and-after example with a{" "}
            <strong className="text-[var(--text)]">tested, copy-ready prompt</strong>{" "}
            you paste into an external AI image editor such as ChatGPT, Gemini,
            or similar tools.
          </p>
          <p>
            We do not run image generation on this site. You choose the look
            here, then create the result in the editor you already trust.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">
          How prompts are tested
        </h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            Every published style follows a simple standard: a realistic source
            photo, a verified result, and a prompt recipe checked for identity
            preservation, lighting, and composition. When a recipe changes, we
            re-check it before it stays in the catalog.
          </p>
          <p>
            The goal is predictable transformations — cinematic portraits,
            editorial looks, product shots, places, pets, and more — while
            keeping what matters about your original photo.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">Who it is for</h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            Creators, freelancers, real-estate sellers, product sellers, and
            anyone who wants a stronger photo without becoming a prompt engineer.
            Browse freely; sign in only if you want to save styles or keep
            private results in your library.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">Get in touch</h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)]">
          <p>
            Questions, partnership ideas, or style requests: email{" "}
            <a
              href={CONTACT_MAILTO}
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or visit the{" "}
            <Link
              href="/contact"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </div>
      </section>

      <p className="mt-12 text-sm text-[var(--muted)]">
        Learn more in{" "}
        <Link href="/how-it-works" className="font-bold text-[var(--text)] underline-offset-2 hover:underline">
          How it works
        </Link>{" "}
        or{" "}
        <Link href="/explore" className="font-bold text-[var(--text)] underline-offset-2 hover:underline">
          explore styles
        </Link>
        .
      </p>
    </article>
  );
}
