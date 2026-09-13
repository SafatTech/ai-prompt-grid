import { ComingSoonTeaser } from "@/components/home/ComingSoonTeaser";
import { ExploreConceptsSection } from "@/components/home/ExploreConceptsSection";
import { FeaturedStylesSection } from "@/components/home/FeaturedStylesSection";
import { HomeHero } from "@/components/home/HomeHero";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedStylesSection />
      <ExploreConceptsSection />
      <ComingSoonTeaser />
    </>
  );
}
