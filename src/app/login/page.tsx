import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSessionUser } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign in",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const next = params.next?.startsWith("/") ? params.next : "/account";
  const user = await getSessionUser();
  if (user) redirect(next);

  return (
    <div className="section-pad">
      <Container width="narrow">
        <PageHeader
          tone="light"
          eyebrow="Account"
          title="Sign in"
          description="Magic link or Google. Browse and copy stay open without an account."
        />
        <div className="mt-10">
          <AuthForm
            mode="login"
            next={next}
            configured={isSupabaseConfigured()}
            errorFromQuery={params.error}
          />
        </div>
      </Container>
    </div>
  );
}
