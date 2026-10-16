import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { ExploreLoadMore } from "@/components/home/explore-load-more";
import { StyleCard } from "@/components/style-card";
import type { CatalogStyle } from "@/lib/catalog/types";

type Props = {
  styles: CatalogStyle[];
  total: number;
  pageSize: number;
  extraPages: CatalogStyle[][];
};

export function ExploreFeed({ styles, total, pageSize, extraPages }: Props) {
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
        extraPages={extraPages}
      />
    </section>
  );
}
