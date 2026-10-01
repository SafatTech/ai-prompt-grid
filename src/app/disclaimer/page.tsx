import { LegalPage, legalMetadata } from "@/components/legal/legal-page";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata = legalMetadata(
  "Disclaimer",
  "AI Prompt Grid prompts, example images, and guides are for inspiration. Safat Tech does not guarantee results from external AI tools.",
  "/disclaimer",
);

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      currentPath="/disclaimer"
      lede={
        <p className="m-0">
          Effective date: October 1, 2026. This disclaimer applies to your use of
          aipromptgrid.com.
        </p>
      }
    >
      <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)] [&_a]:font-bold [&_a]:text-[var(--text)] [&_a]:underline-offset-2 [&_a]:hover:underline">
        <p>
          The content on aipromptgrid.com, including AI prompts, example images, and
          guides, is provided for general information and inspiration only. Safat Tech
          makes no guarantees about the accuracy, completeness, or results of any prompt.
          Results vary depending on the AI tool, model version, and settings you use.
        </p>
        <p>
          Brand, product, and AI tool names mentioned on the Site belong to their
          respective owners. We aren&apos;t affiliated with or endorsed by them unless we
          say so. You&apos;re responsible for how you use AI-generated content, including
          following each tool&apos;s terms and respecting copyright, privacy, and the
          rights of any person shown in an image.
        </p>
        <p>
          The Site contains ads and may include affiliate links, and we may earn a
          commission from them at no extra cost to you. We aren&apos;t responsible for
          third-party websites or ads. Your use of the Site is at your own risk. Contact:{" "}
          <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
