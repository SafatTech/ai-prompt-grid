import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CreationDetailClient } from "@/components/creations/creation-detail-client";
import { isSupabaseConfigured } from "@/lib/env";
import { fetchCreationById } from "@/lib/library/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ id: string }> };

export default async function CreationDetailPage({ params }: Props) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return (
      <div>
        <section className="container pt-10 pb-4">
          <Link
            href="/library"
            className="text-sm font-bold text-[var(--muted)] hover:text-[var(--text)]"
          >
            ← Back to library
          </Link>
        </section>
        <CreationDetailClient creationId={id} />
      </div>
    );
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect("/library");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/sign-in?next=${encodeURIComponent(`/creations/${id}`)}`);
  }

  const creation = await fetchCreationById(supabase, id);
  if (!creation) notFound();

  return (
    <div>
      <section className="container pt-10 pb-4">
        <Link
          href="/library"
          className="text-sm font-bold text-[var(--muted)] hover:text-[var(--text)]"
        >
          ← Back to library
        </Link>
      </section>
      <CreationDetailClient creation={creation} />
    </div>
  );
}
