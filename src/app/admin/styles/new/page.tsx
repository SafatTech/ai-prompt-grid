import { StyleEditorForm } from "@/components/admin/style-editor-form";
import { requireAdminPage } from "@/lib/admin/page-gate";

export default async function AdminNewStylePage() {
  const gate = await requireAdminPage();
  if (!gate.ok) return gate.node;

  return (
    <section className="container pt-12">
      <StyleEditorForm mode="create" />
    </section>
  );
}
