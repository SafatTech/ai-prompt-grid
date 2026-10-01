import Link from "next/link";
import { LegalPage, LegalSection, legalMetadata } from "@/components/legal/legal-page";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata = legalMetadata(
  "Terms of service",
  "Terms for using the free AI Prompt Grid prompt gallery, including acceptable use, AI-generated output, intellectual property, ads, and liability.",
  "/terms-of-service",
);

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of service"
      currentPath="/terms-of-service"
      lede={
        <p className="m-0">
          Effective date: October 1, 2026. These terms are an agreement between you and
          Safat Tech for your use of aipromptgrid.com (the &quot;Site&quot;). The Site is
          a free gallery of photo-editing prompts published as AI Prompt Grid.
        </p>
      }
    >
      <LegalSection title="The service">
        <p>
          You can browse the catalog and copy prompts without an account. Image generation
          and editing happen in an external AI tool you choose. We do not run those jobs
          on the Site, and we do not guarantee that any tool will produce a particular
          result.
        </p>
        <p>
          Signing in is optional. An account (Google or an email magic link) is required
          only to save styles, collections, or private creations. You must be able to form
          a binding contract where you live and follow applicable law. Do not rely on the
          Site as your only copy of important photos.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the Site for anything unlawful, or to store or share content that violates
            the law or the rules of the external AI tools you use.
          </li>
          <li>
            Upload photos, notes, or other material you do not have the right to use,
            including images of other people without a proper basis to do so.
          </li>
          <li>
            Try to access someone else&apos;s private creations, bypass access controls,
            probe the service, or overload it.
          </li>
          <li>
            Scrape the catalog, copy it in bulk, or republish our example images or
            prompts as your own product.
          </li>
          <li>Interfere with ads, analytics, or the security of the Site.</li>
        </ul>
        <p>
          We may remove content or suspend an account that breaks these terms or abuses
          the service.
        </p>
      </LegalSection>

      <LegalSection title="AI-generated output">
        <p>
          Prompts and examples are for inspiration. You are responsible for the prompts
          you copy, the images you create with them, and what you do with that output.
          Check the result before you publish, sell, or share it. That includes copyright,
          trademarks, privacy, and the rights of any person shown.
        </p>
        <p>
          Results vary with the AI tool, model version, and settings. A prompt can fail,
          change a face or background in a way you did not want, or produce something you
          cannot use. That is your responsibility, not ours. Follow each tool&apos;s terms
          when you use it.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The Site, the catalog text, prompt recipes, example images, and the AI Prompt
          Grid name and logo are owned by Safat Tech or its licensors. You may copy a
          prompt for your own use in an external AI tool. You may not present the catalog
          or our examples as your own, or resell them.
        </p>
        <p>
          Names of AI tools, brands, and products on the Site belong to their owners. We
          are not affiliated with or endorsed by them unless we say so.
        </p>
        <p>
          You keep ownership of photos and notes you upload. You give us a limited license
          to host and display them privately to you so library features work. You can
          delete a creation from your library. Public catalog examples are not your
          uploads.
        </p>
      </LegalSection>

      <LegalSection title="Accounts and your uploads">
        <p>
          You are responsible for activity under your signed-in account. Keep access to
          your email and Google account secure. Uploaded result images and optional source
          photos are private by default and are not part of the public catalog. A saved
          creation also keeps a copy of the prompt, which stays as you saved it even if we
          later change the public recipe.
        </p>
      </LegalSection>

      <LegalSection title="Advertising">
        <p>
          The Site is free and shows ads, including through Google AdSense and its
          partners. Ads may be personalized where that is allowed, including after you
          accept cookies if you are in the EEA, the UK, or Switzerland. We may earn money
          from those ads, and we may add affiliate links. Affiliate links would not add a
          charge for you. We do not control third-party ads or the sites they open. See
          the <Link href="/privacy-policy">Privacy policy</Link> and{" "}
          <Link href="/cookie-policy">Cookie policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimers">
        <p>
          The Site is provided as-is and as available. To the fullest extent permitted by
          law, we disclaim warranties of uninterrupted availability, fitness for a
          particular purpose, accuracy of prompts, and non-infringement. External AI
          editors, ad networks, and hosting providers are separate services with their own
          terms.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Safat Tech is not liable for indirect,
          incidental, special, or consequential damages arising from your use of the Site.
          That includes lost photos, failed or unwanted AI results, decisions you make
          based on a prompt, or issues with third-party tools and ads. Our total liability
          for claims relating to the Site is limited to the amount you paid us for the
          Site in the three months before the claim, or zero if the Site was free for you
          during that period.
        </p>
        <p>
          Some places do not allow these limits. In those places, they apply only as far
          as the law allows.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these terms. When we do, we will post the new version on this page
          and change the effective date. If you keep using the Site after that date, you
          accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms: email <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>{" "}
          or visit the <Link href="/contact">contact page</Link>. Safat Tech,{" "}
          {CONTACT_EMAIL}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
