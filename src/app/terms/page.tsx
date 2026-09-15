import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="section-pad">
      <Container width="narrow">
        <PageHeader
          tone="light"
          eyebrow="Legal"
          title="Terms of Service"
          description="Working outline. Final Terms ship with Phase 5 polish."
        />
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-ink-muted">
          <p>
            {SITE.name} provides curated prompts and example imagery for personal
            and creative use. When you paste prompts into third-party AI tools,
            those providers’ terms apply.
          </p>
          <p>
            Do not use the service to create non-consensual deepfakes, illegal
            content, or anything that violates model-provider policies.
          </p>
          <p>
            Site UI, brand, and our generated proof images remain our property.
            Prompt text may be copied for generation use as presented on the
            site.
          </p>
        </div>
      </Container>
    </div>
  );
}
