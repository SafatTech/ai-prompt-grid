import { notFound } from "next/navigation";
import { StyleEditorForm } from "@/components/admin/style-editor-form";
import { requireAdminPage } from "@/lib/admin/page-gate";
import { editorPayloadToFormInput, fetchAdminStyleBySlug } from "@/lib/admin/styles-read";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminEditStylePage({ params }: Props) {
  const { slug } = await params;
  const gate = await requireAdminPage();
  if (!gate.ok) return gate.node;

  const style = await fetchAdminStyleBySlug(gate.supabase, slug);
  if (!style) notFound();

  const lockSlug = style.status !== "draft";

  return (
    <section className="container pt-12">
      <StyleEditorForm
        mode="edit"
        styleId={style.id}
        initial={editorPayloadToFormInput(style)}
        lockSlug={lockSlug}
        statusLabel={style.status}
      />
    </section>
  );
}
