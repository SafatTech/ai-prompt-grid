import { HomepageCurationClient } from "@/components/admin/homepage-curation-client";
import { getHomepageAdminData } from "@/lib/admin/homepage";
import { requireAdminPage } from "@/lib/admin/page-gate";
import { SEASONS } from "@/lib/home/seasons";

export default async function AdminHomepagePage() {
  const gate = await requireAdminPage();
  if (!gate.ok) return gate.node;
  const data = await getHomepageAdminData(gate.supabase);
  return (
    <HomepageCurationClient
      initialData={data}
      seasons={SEASONS.map((season) => ({
        id: season.id,
        label: season.title,
      }))}
    />
  );
}
