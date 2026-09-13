import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Admin · Edit style",
  robots: { index: false, follow: false },
};

export default async function AdminEditStylePage({ params }: Props) {
  const { id } = await params;

  let style: {
    title: string;
    slug: string;
    status: string;
    prompt: string;
    model_slugs: string[];
  } | null = null;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("styles")
      .select("title, slug, status, prompt, model_slugs")
      .eq("id", id)
      .maybeSingle();
    style = data;
  }

  if (isSupabaseConfigured() && !style) {
    notFound();
  }

  return (
    <div className="py-10">
      <Container width="narrow">
        <h1 className="font-display text-3xl tracking-tight">
          {style ? `Edit · ${style.title}` : "Edit style"}
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Editing <code className="text-ink">{id}</code>
          {style ? ` · ${style.status}` : ""}. Full form CRUD ships in Phase 4.
        </p>
        {style ? (
          <div className="mt-8 space-y-4 rounded-md border border-border bg-bg-elevated p-6 text-sm">
            <p>
              <span className="text-ink-faint">Slug</span>
              <br />
              <span className="text-ink">{style.slug}</span>
            </p>
            <p>
              <span className="text-ink-faint">Models</span>
              <br />
              <span className="text-ink">{style.model_slugs.join(", ")}</span>
            </p>
            <p>
              <span className="text-ink-faint">Prompt</span>
              <br />
              <span className="whitespace-pre-wrap text-ink-muted">{style.prompt}</span>
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-md border border-dashed border-border bg-bg-elevated p-6 text-sm text-ink-muted">
            Connect Supabase to load this style.
          </div>
        )}
        <div className="mt-6">
          <Button href="/admin/styles" variant="secondary">
            Back to list
          </Button>
        </div>
      </Container>
    </div>
  );
}
