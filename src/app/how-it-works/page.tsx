import type { Metadata } from "next";
import { HowItWorksHero } from "@/components/how-it-works/how-it-works-hero";
import { HowItWorksJourney } from "@/components/how-it-works/how-it-works-journey";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Choose a tested style, personalize the prompt, then create the look in ChatGPT, Gemini, or another AI image editor you trust.",
  alternates: {
    canonical: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <div>
      <HowItWorksHero />
      <HowItWorksJourney />
    </div>
  );
}
