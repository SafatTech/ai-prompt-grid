import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="section-pad">
      <Container width="narrow">
        <PageHeader
          tone="light"
          eyebrow="Legal"
          title="Privacy Policy"
          description="Plain-language draft for launch polish. Full policy ships before public marketing push."
        />
        <div className="prose-legal mt-10 space-y-4 text-sm leading-relaxed text-ink-muted">
          <p>
            {SITE.name} will collect account emails (and Google profile basics if
            you use OAuth), favorites, waitlist emails, and basic product
            analytics such as prompt copy counts.
          </p>
          <p>
            Data is processed via our hosting and database providers (planned:
            Vercel and Supabase). We will not sell waitlist emails.
          </p>
          <p>
            Contact for privacy requests will be published here before launch.
            This page is a foundation stub, not final counsel-reviewed text.
          </p>
        </div>
      </Container>
    </div>
  );
}
