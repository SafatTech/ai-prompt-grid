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
