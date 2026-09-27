import { HowItWorksHero } from "@/components/how-it-works/how-it-works-hero";
import { HowItWorksJourney } from "@/components/how-it-works/how-it-works-journey";
import { ForCreatorsSection } from "@/components/creators/for-creators-section";

export default function HowItWorksPage() {
  return (
    <div>
      <HowItWorksHero />
      <HowItWorksJourney />
      <ForCreatorsSection />
    </div>
  );
}
