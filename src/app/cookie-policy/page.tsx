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
          Analytics 4 (GA4) for that. These cookies stay off by default until you Accept
          them in our cookie banner (or remain off if you Reject).
        </p>
      </LegalSection>

      <LegalSection title="Advertising cookies">
        <p>
          Advertising cookies are set by Google AdSense and its partners to show and
          measure ads, including personalized ads based on your browsing. These cookies
          stay off by default until you Accept them in our cookie banner (or remain off if
          you Reject). You can also opt out of personalized Google ads in{" "}
          <a href="https://myadcenter.google.com/">My Ad Center</a>, or of some third-party
          ad cookies at{" "}
          <a href="https://www.aboutads.info/choices/">aboutads.info</a> /{" "}
          <a href="https://www.youronlinechoices.eu/">Your Online Choices</a>.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          Our cookie banner lets you Accept or Reject advertising and analytics cookies.
          Your choice is stored in your browser (localStorage) and sent to Google via
          Consent Mode. Clear this site&apos;s data to see the banner again. You can also
          block or delete cookies in your browser settings. If you block cookies, some
          parts of the Site may not work properly, including staying signed in. Questions?
          Email <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
