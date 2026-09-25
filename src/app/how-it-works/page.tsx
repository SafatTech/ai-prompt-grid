import Link from "next/link";
import { HowItWorksSection } from "@/components/how-it-works-section";

export default function HowItWorksPage() {
  return (
    <div>
      <section className="container pt-16 pb-4">
        <h1 className="m-0 mb-3 text-[clamp(42px,5vw,70px)] leading-none tracking-[-0.055em]">
          How it works
        </h1>
        <p className="m-0 max-w-[640px] text-[17px] text-[var(--muted)]">
          AI Prompt Grid is a style and prompt library. You transform your photo in an
          external AI editor, then you can save the result here privately.
        </p>
      </section>
      <HowItWorksSection />
      <section id="for-creators" className="container max-w-[760px] py-16">
        <h2 className="m-0 mb-3 text-[clamp(32px,4vw,48px)] tracking-[-0.04em]">
          For creators
        </h2>
        <p className="m-0 text-[var(--muted)]">
          AI Prompt Grid lists tested transformation prompts. Version 0 does not generate
          images on this site. A style is a source photo, an AI result, and a prompt
          someone can copy into an external editor.
        </p>
        <h3 id="testing-standard" className="mt-10 mb-2 text-[22px]">
          Prompt testing standard
        </h3>
        <p className="m-0 text-[var(--muted)]">
          Each published style keeps the original photo beside the result and records
          which external editor was used. The prompt should preserve identity unless the
          style says otherwise.
        </p>
        <h3 id="creator-guidelines" className="mt-10 mb-2 text-[22px]">
          Creator guidelines
        </h3>
        <p className="m-0 text-[var(--muted)]">
          Describe the look in plain language. Do not claim the site transforms the photo
          itself. Visitors copy the prompt and finish the image in their own editor.
        </p>
        <h3 id="request-a-style" className="mt-10 mb-2 text-[22px]">
          Request a style
        </h3>
        <p className="m-0 text-[var(--muted)]">
          During the private beta, style ideas go through the contact channel on your
          invite. Include the subject, the look you want, and a note about which editor
          you used.
        </p>
      </section>
      <section className="container pb-[100px]">
        <Link
          href="/explore"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a] hover:bg-[#9b82ff]"
        >
          Browse the catalog
        </Link>
      </section>
    </div>
  );
}
