import { LegalPage, legalMetadata } from "@/components/legal/legal-page";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata = legalMetadata(
  "Disclaimer",
  "AI Prompt Grid prompts and example images are for inspiration. Results vary by app and version. Safat Tech is not affiliated with AI app makers.",
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
          aipromptgrid.com (the &quot;Site&quot;), operated by Safat Tech.
        </p>
      }
    >
      <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)] [&_a]:font-bold [&_a]:text-[var(--text)] [&_a]:underline-offset-2 [&_a]:hover:underline">
        <p>
          The content on the Site, including AI prompts, example images, guides,
          and related commentary, is provided for general information and
          inspiration only. Safat Tech makes no guarantee that any prompt will
          produce a specific result for you. AI image outputs vary by app, model
          version, settings, seed behaviour, and the photo you upload. Two people
          using the same prompt can receive different results, and the same prompt
          can behave differently after an app update.
        </p>
        <p>
          Example images on style pages are AI-generated illustrations created to
          show the intended look of a prompt. They are not photographs of every
          visitor, and they are not a promise that your upload will match the
          example exactly. Where a page discusses identity preservation, that
          language describes the intent of the prompt text; actual results still
          depend on the external tool you use.
        </p>
        <p>
          Brand, product, and AI tool names mentioned on the Site belong to their
          respective owners. Safat Tech is not affiliated with, sponsored by, or
          endorsed by those companies unless a page clearly says otherwise.
          Mentions of external apps exist only to help you understand where a
          copy-paste prompt can be used.
        </p>
        <p>
          You are responsible for the photos you upload to third-party AI apps,
          including permission and consent from every person shown. Do not upload
          images of people who have not agreed to that use, and do not use the
          Site&apos;s prompts to create harmful, deceptive, or unlawful imagery.
          You remain responsible for following each AI app&apos;s terms, for
          respecting copyright and personality rights, and for how you share or
          publish any generated image.
        </p>
        <p>
          Privacy of source photos also remains your responsibility once you leave
          this Site. aipromptgrid.com does not run the image generation step; when
          you paste a prompt into an external app, that app&apos;s privacy and
          retention policies apply to your upload. Review those policies before
          you share personal or sensitive photos.
        </p>
        <p>
          The Site may show ads and may include affiliate links. We may earn a
          commission from them at no extra cost to you. We are not responsible for
          third-party websites, ads, or tools. Your use of the Site and of any
          prompt is at your own risk. For questions, email{" "}
          <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
