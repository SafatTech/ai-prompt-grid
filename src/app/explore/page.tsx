import { Suspense } from "react";
import { ExploreClient } from "@/components/explore/explore-client";
import { listPublishedStyles } from "@/lib/catalog/repository";

export default async function ExplorePage() {
  const styles = await listPublishedStyles();

  return (
    <Suspense
      fallback={
        <div className="container py-20 text-[var(--muted)]">Loading styles…</div>
      }
    >
      <ExploreClient styles={styles} />
    </Suspense>
  );
}
