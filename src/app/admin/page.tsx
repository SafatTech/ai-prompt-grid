import { AdminStylesClient } from "@/components/admin/admin-styles-client";
import { listAdminStyles } from "@/lib/admin/access";
import { requireAdminPage } from "@/lib/admin/page-gate";

export default async function AdminPage() {
  const gate = await requireAdminPage();
  if (!gate.ok) return gate.node;

  const styles = await listAdminStyles(gate.supabase);

  return (
    <AdminStylesClient
      initialStyles={styles}
      role={gate.profile.role}
      displayName={gate.profile.displayName}
    />
  );
}
