import { LibraryClient } from "@/components/library/library-client";
import { listPublishedStyles } from "@/lib/catalog/repository";
import { toStyleCardDataList } from "@/lib/catalog/style-card-data";

export default async function LibraryPage() {
  const styles = toStyleCardDataList(await listPublishedStyles(), { sharedBlur: true });
  return <LibraryClient styles={styles} />;
}
