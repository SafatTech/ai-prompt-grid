import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSessionUser } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Register",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function RegisterPage({ searchParams }: Props) {
  const params = await searchParams;
  const next = params.next?.startsWith("/") ? params.next : "/account";
  const user = await getSessionUser();
  if (user) redirect(next);

  return (
    <div className="section-pad">
      <Container width="narrow">
        <PageHeader
          eyebrow="Account"
          title="Register"
          description="Create an account to save favorites. Exploring and copying prompts never requires signup."
        />
        <div className="mt-10">
          <AuthForm
            mode="register"
            next={next}
            configured={isSupabaseConfigured()}
            errorFromQuery={params.error}
          />
        </div>
      </Container>
    </div>
  );
}
