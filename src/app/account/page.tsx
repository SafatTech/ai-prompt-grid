import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { requireUser, getProfile } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Account",
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await requireUser("/account");
  const profile = await getProfile();

  let favoriteCount = 0;
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { count } = await supabase
      .from("favorites")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);
    favoriteCount = count ?? 0;
  }

  return (
    <div className="section-pad">
      <Container width="wide">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            tone="light"
            eyebrow="Account"
            title="Your favorites"
            description={
              profile?.display_name
                ? `Signed in as ${profile.display_name}${user.email ? ` · ${user.email}` : ""}`
                : user.email
                  ? `Signed in as ${user.email}`
                  : "Your saved styles will appear here."
            }
          />
          <SignOutButton />
        </div>

        {favoriteCount > 0 ? (
          <p className="mt-8 text-sm text-ink-muted">
            You have {favoriteCount} favorite{favoriteCount === 1 ? "" : "s"}.
            Full favorite cards wire up in Phase 3 with published styles.
          </p>
        ) : (
          <EmptyState
            tone="light"
            className="mt-10"
            title="No favorites yet"
            description="Browse Explore, open a style you like, and tap favorite. Favorites require a published style."
            action={
              <Button href="/styles">Explore styles</Button>
            }
          />
        )}
      </Container>
    </div>
  );
}
