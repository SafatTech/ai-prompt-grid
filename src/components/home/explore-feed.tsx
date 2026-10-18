import dynamic from "next/dynamic";
import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { StyleCard } from "@/components/style-card";
import type { StyleCardData } from "@/lib/catalog/style-card-data";

const ExploreLoadMore = dynamic(
  () =>
    import("@/components/home/explore-load-more").then((mod) => mod.ExploreLoadMore),
  { ssr: true },
);

type Props = {
  styles: StyleCardData[];
  total: number;
  pageSize: number;
};

export function ExploreFeed({ styles, total, pageSize }: Props) {
  return (
    <section className="home-section" aria-labelledby="home-explore-heading">
      <div className="home-section-header">
        <div>
          <h2 id="home-explore-heading">Explore everything</h2>
          <p>Every tested style in the catalog.</p>
        </div>
        <Link href="/explore" className="home-see-all">
          Open full gallery →
        </Link>
      </div>
      <div className="home-masonry">
        {styles.map((style) => (
          <StyleCard key={style.id} style={style} variant="masonry" />
        ))}
      </div>
      <AdSlot
        slot="home-feed"
        envSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_FEED}
        className="home-feed-ad"
      />
      <ExploreLoadMore
        initialCount={styles.length}
        total={total}
        pageSize={pageSize}
      />
    </section>
  );
}
