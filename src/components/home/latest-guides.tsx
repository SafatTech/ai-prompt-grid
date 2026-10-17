import Link from "next/link";
import { GuideCard } from "@/components/guides/guide-card";
import type { Guide } from "@/lib/guides/load";

type Props = {
  guides: Guide[];
};

export function LatestGuides({ guides }: Props) {
  if (guides.length === 0) return null;

  return (
    <section className="home-section" aria-labelledby="home-guides-heading">
      <div className="home-section-header">
        <div>
          <h2 id="home-guides-heading">Latest guides</h2>
          <p>Step-by-step prompt guides with before and after examples.</p>
        </div>
        <Link href="/guides" className="home-see-all">
          All guides →
        </Link>
      </div>
      <div className="home-guides-grid">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </section>
  );
}
