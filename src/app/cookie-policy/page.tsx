import { LegalPage, LegalSection, legalMetadata } from "@/components/legal/legal-page";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata = legalMetadata(
  "Cookie policy",
  "Cookies on aipromptgrid.com: essential session cookies, Google Analytics 4, and Google AdSense advertising cookies, and how to change your choices.",
  "/cookie-policy",
);

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie policy"
      currentPath="/cookie-policy"
      lede={
        <p className="m-0">
          Effective date: October 1, 2026. aipromptgrid.com uses cookies (small text files
          stored on your device) and similar technologies.
        </p>
      }
    >
      <LegalSection title="Essential cookies">
        <p>
          Essential cookies keep the Site working and secure, for example security checks
          by our hosting provider (Vercel). If you sign in, Supabase Auth sets session
          cookies so you stay signed in. These cookies are not used for ads.
        </p>
      </LegalSection>

      <LegalSection title="Analytics cookies">
        <p>
          Analytics cookies help us understand how visitors use the Site. We use Google
          Analytics 4 (GA4) for that. In the EEA, the UK, and Switzerland, these cookies
          stay off until you accept them.
        </p>
      </LegalSection>

      <LegalSection title="Advertising cookies">
        <p>
          Advertising cookies are set by Google AdSense and its partners to show and
          measure ads, including personalized ads based on your browsing. In the EEA, the
          UK, and Switzerland, these cookies stay off until you accept them.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          If you are in the EEA, the UK, or Switzerland, you can accept or reject
          advertising and analytics cookies in the consent message Google shows on the
          Site, and you can change that choice later in the same message. You can also
          block or delete cookies in your browser settings, or turn off personalized
          Google ads in <a href="https://myadcenter.google.com/">My Ad Center</a>. If you
          block cookies, some parts of the Site may not work properly, including staying
          signed in. Questions? Email <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
