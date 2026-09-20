import { LibraryClient } from "@/components/library/library-client";
import { listPublishedStyles } from "@/lib/catalog/repository";

export default async function LibraryPage() {
  const styles = await listPublishedStyles();
  return <LibraryClient styles={styles} />;
}
