import { HowItWorksSection } from "@/components/how-it-works-section";
import { ForCreatorsSection } from "@/components/creators/for-creators-section";

export default function HowItWorksPage() {
  return (
    <div>
      <section className="container pt-10 pb-4 sm:pt-16">
        <h1 className="m-0 mb-3 text-[clamp(36px,8vw,70px)] leading-none tracking-[-0.055em]">
          How it works
        </h1>
        <p className="m-0 max-w-[640px] text-[15px] text-[var(--muted)] sm:text-[17px]">
          AI Prompt Grid is a style and prompt library. You transform your photo in an
          external AI editor, then you can save the result here privately.
        </p>
      </section>
      <HowItWorksSection />
      <ForCreatorsSection />
    </div>
  );
}
