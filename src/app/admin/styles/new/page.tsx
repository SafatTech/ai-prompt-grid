import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Admin · New style",
  robots: { index: false, follow: false },
};

export default function AdminNewStylePage() {
  return (
    <div className="py-10">
      <Container width="narrow">
        <h1 className="font-display text-3xl tracking-tight">New style</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Form fields match the content model. Saving lands in Phase 4.
        </p>
        <div className="mt-8 space-y-4 rounded-md border border-border bg-bg-elevated p-6">
          <Field label="Title" />
          <Field label="Slug" />
          <Field label="Prompt" multiline />
          <Field label="Category" />
          <Field label="Models" />
          <div className="flex gap-3 pt-2">
            <Button type="button" disabled>
              Save draft
            </Button>
            <Button href="/admin/styles" variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Field({
  label,
  multiline,
}: {
  label: string;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {multiline ? (
        <textarea
          disabled
          rows={5}
          className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-ink-muted"
          placeholder="Coming in Phase 4"
        />
      ) : (
        <input
          disabled
          className="h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-ink-muted"
          placeholder="Coming in Phase 4"
        />
      )}
    </label>
  );
}
