import Link from "next/link";
import { StyleCard } from "@/components/style-card";
import type { CatalogStyle } from "@/lib/catalog/types";

type Props = {
  styles: CatalogStyle[];
  category: string;
};

/** Server-rendered related styles and category listing link. */
export function RelatedStyles({ styles, category }: Props) {
  const categoryHref = `/explore?category=${encodeURIComponent(category)}`;

  return (
    <section
      className="container py-12 sm:py-16 lg:py-[88px]"
      data-testid="related-styles"
    >
      <div className="mb-7 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
        <h2 className="m-0 text-[clamp(28px,3vw,42px)] tracking-[-0.035em]">
          Related styles
        </h2>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href={categoryHref} className="font-bold text-[#bbaeff]">
            More {category} styles →
          </Link>
          <Link href="/explore" className="font-bold text-[#bbaeff]">
            Explore all →
          </Link>
        </div>
      </div>
      {styles.length ? (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {styles.map((item) => (
            <StyleCard key={item.id} style={item} compact />
          ))}
        </div>
      ) : null}
    </section>
  );
}
