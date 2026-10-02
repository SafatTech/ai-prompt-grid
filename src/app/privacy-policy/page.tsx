import Link from "next/link";
import { LegalPage, LegalSection, legalMetadata } from "@/components/legal/legal-page";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export const metadata = legalMetadata(
  "Privacy policy",
  "How Safat Tech collects, uses, and shares information on aipromptgrid.com, including accounts, private photos, Google Analytics 4, and Google AdSense.",
  "/privacy-policy",
);

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      currentPath="/privacy-policy"
      lede={
        <p className="m-0">
          Effective date: October 1, 2026. Safat Tech (&quot;we&quot;, &quot;us&quot;)
          runs aipromptgrid.com (the &quot;Site&quot;). This policy explains what
          information we collect, how we use it, and the choices you have.
        </p>
      }
    >
      <LegalSection title="Information we collect">
        <ul>
          <li>
            <strong>Information you give us.</strong> If you email us, we receive your
            email address and whatever you include in the message, such as your name.
            There is no newsletter and no contact form.
          </li>
          <li>
            <strong>Information collected automatically.</strong> Your IP address, browser
            type, device information, pages you visit, referring URLs, and the time and
            date of your visits, through server logs, cookies, and similar technologies.
          </li>
          <li>
            <strong>Account details.</strong> You can browse and copy prompts without an
            account. If you sign in, we use Supabase Auth (Google or an email magic link).
            We store a profile linked to that account: an id, the email address from your
            sign-in, an optional display name, and a role.
          </li>
          <li>
            <strong>Saved prompts and uploads.</strong> An account is required to save
            styles, collections, or creations. A saved creation can include a result
            image, an optional source photo, your notes, the external tool you used, and a
            copy of the prompt. Saved styles and collections record which catalog items
            you kept. Uploaded images are private by default. They are stored under your
            account, re-encoded, and stripped of embedded metadata such as location. They
            are not shown in the public catalog. You can delete a creation from your
            library.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use information">
        <p>
          We use it to run and improve the Site, provide optional accounts and private
          saves, understand how the Site is used, show ads, respond to your messages,
          prevent abuse and fraud, and meet our legal obligations.
        </p>
      </LegalSection>

      <LegalSection title="Advertising and Google AdSense">
        <p>We use Google AdSense to show ads on the Site.</p>
        <ul>
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on your
            previous visits to this Site and other websites.
          </li>
          <li>
            Google&apos;s use of advertising cookies lets Google and its partners serve
            ads to you based on your visits to this Site and other sites on the internet.
          </li>
          <li>
            Other third-party ad vendors or ad networks may also use cookies or web
            beacons to serve and measure ads on the Site.
          </li>
          <li>
            You can turn off personalized advertising in{" "}
            <a href="https://myadcenter.google.com/">Google&apos;s My Ad Center</a>. You
            can also opt out of some third-party vendors&apos; cookies at{" "}
            <a href="https://www.aboutads.info/choices/">aboutads.info</a> or, in Europe,
            at <a href="https://www.youronlinechoices.eu/">Your Online Choices</a>.
          </li>
          <li>
            To learn how Google uses data, see{" "}
            <a href="https://policies.google.com/technologies/partner-sites">
              How Google uses information from sites that use its services
            </a>
            .
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Analytics">
        <p>
          We use Google Analytics 4 (GA4) to understand how visitors use the Site, such as
          which pages are viewed. GA4 uses cookies. Advertising and analytics cookies stay
          off for visitors in the EEA, the UK, and Switzerland. Analytics cookies stay off
          until you accept them. When we show ads, a Google-certified consent message will
          let you accept or reject them and change your choice later. You can opt out of
          Google Analytics with the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">
            Google Analytics opt-out add-on
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          See our <Link href="/cookie-policy">Cookie policy</Link> for details on the
          cookies we use and how to control them.
        </p>
      </LegalSection>

      <LegalSection title="Sharing">
        <p>
          We don&apos;t sell your personal information for money. We share information
          only with service providers that help us run the Site, when the law requires it,
          or to protect our rights and users. Those providers include Vercel (hosting),
          Supabase (accounts and private storage), and Google (AdSense, Google Analytics
          4, and Google sign-in if you choose it). Photo editing happens in the external
          AI tool you choose, under that tool&apos;s own terms.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Depending on where you live, you may have the right to access, correct, delete,
          or move your personal data, to object to or limit how we process it, and to
          withdraw consent. If you&apos;re in the EEA, the UK, or Switzerland, we rely on
          your consent for advertising and analytics cookies. Advertising and analytics
          cookies stay off for visitors in the EEA, the UK, and Switzerland. When we show
          ads, a Google-certified consent message will let you accept or reject them and
          change your choice later. If you&apos;re a California resident, you can ask what
          we&apos;ve collected and opt out of the &quot;sale&quot; or &quot;sharing&quot;
          of your personal information for targeted ads. To make a request, email{" "}
          <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Data retention">
        <p>
          We keep personal information only as long as we need it for the purposes above
          or as the law requires. You can delete creations from your library. To ask us to
          delete your account or export your data, email{" "}
          <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          The Site isn&apos;t directed at children under 13 (or under 16 in the EEA), and
          we don&apos;t knowingly collect their personal information. If you think a child
          has given us information, contact us and we&apos;ll delete it.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We use reasonable measures to protect your information, but no method of sending
          or storing data online is completely secure.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update this policy from time to time. When we do, we&apos;ll post the new
          version here and update the effective date.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="Contact">
        <p>
          Safat Tech, <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
