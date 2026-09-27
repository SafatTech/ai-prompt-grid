/**
 * Builds the transactional email HTML in supabase/templates.
 * Supabase Auth renders confirmation, magic_link, and recovery with Go templates.
 * The welcome file uses the same layout and is not registered as an Auth email.
 *
 * Run: npm run emails:build
 */
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const templateDir = path.join(root, "supabase", "templates");
const logoPath = path.join(root, "public", "brand", "email-mark.png");

/** Matches [auth.email] otp_expiry = 3600 in supabase/config.toml. */
const EXPIRY_TIME = "1 hour";

const CONFIRMATION_URL = "{{ .ConfirmationURL }}";
const LOGO_SRC = "{{ .SiteURL }}/brand/email-mark.png";
const FONT = "Segoe UI, Roboto, Helvetica, Arial, sans-serif";
/** Same proportions as StoryShiftMark in the site header (viewBox 64×44). */
const LOGO_WIDTH = 47;
const LOGO_HEIGHT = 32;

const SITE_LINK = "https://aipromptgrid.com";
const WELCOME_URL = "https://aipromptgrid.com/explore";

type EmailSpec = {
  fileName: string;
  documentTitle: string;
  preheader: string;
  label: string;
  heading: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaHref: string;
  logoSrc: string;
  expiryNote?: string;
  /** Security emails get the ignore line in the footer. */
  securityFooter: boolean;
  features?: string[];
  variablesNote: string;
};

const emails: EmailSpec[] = [
  {
    fileName: "confirmation.html",
    documentTitle: "Confirm your email address",
    preheader: "Confirm your email to start saving styles on AI Prompt Grid.",
    label: "ACCOUNT SETUP",
    heading: "Confirm your email address",
    paragraphs: [
      "Thanks for joining AI Prompt Grid. Confirm your email address to start saving styles and building your personal collection.",
    ],
    ctaLabel: "Confirm email",
    ctaHref: CONFIRMATION_URL,
    logoSrc: LOGO_SRC,
    expiryNote: `For your security, this link expires in ${EXPIRY_TIME}.`,
    securityFooter: true,
    variablesNote:
      "Supabase confirmation template. Keep {{ .ConfirmationURL }} and {{ .SiteURL }} unchanged.",
  },
  {
    fileName: "magic_link.html",
    documentTitle: "Sign in to AI Prompt Grid",
    preheader: "Use this secure link to sign in. No password needed.",
    label: "SIGN-IN REQUEST",
    heading: "Sign in to AI Prompt Grid",
    paragraphs: [
      "Use the secure link below to sign in to your account. No password needed.",
      "If you did not request this sign-in link, you can safely ignore this email.",
    ],
    ctaLabel: "Sign in securely",
    ctaHref: CONFIRMATION_URL,
    logoSrc: LOGO_SRC,
    expiryNote: `This sign-in link expires in ${EXPIRY_TIME}.`,
    securityFooter: true,
    variablesNote:
      "Supabase magic-link template. Keep {{ .ConfirmationURL }} and {{ .SiteURL }} unchanged.",
  },
  {
    fileName: "recovery.html",
    documentTitle: "Reset your password",
    preheader: "Reset the password for your AI Prompt Grid account.",
    label: "ACCOUNT SECURITY",
    heading: "Reset your password",
    paragraphs: [
      "We received a request to reset the password for your AI Prompt Grid account.",
      "If you did not request a password reset, no action is needed.",
    ],
    ctaLabel: "Reset password",
    ctaHref: CONFIRMATION_URL,
    logoSrc: LOGO_SRC,
    securityFooter: true,
    variablesNote:
      "Supabase recovery template. Keep {{ .ConfirmationURL }} and {{ .SiteURL }} unchanged.",
  },
  {
    fileName: "welcome.html",
    documentTitle: "Your next look starts here",
    preheader: "Discover tested prompts and styles that still feel like you.",
    label: "WELCOME",
    heading: "Your next look starts here",
    paragraphs: [
      "AI Prompt Grid helps you discover tested prompts, see the result first, and create styles that still feel like you.",
    ],
    ctaLabel: "Explore styles",
    ctaHref: WELCOME_URL,
    logoSrc: `${SITE_LINK}/brand/email-mark.png`,
    securityFooter: false,
    features: [
      "Browse curated transformations",
      "Customize prompts around your photo",
      "Save your favorite styles",
    ],
    variablesNote:
      "Welcome email. Not sent by Supabase Auth. Links use https://aipromptgrid.com.",
  },
];

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buttonWidth(label: string): number {
  return Math.max(200, Math.round(label.length * 8.5 + 56));
}

function frameMark(): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="mark-tile" align="center" valign="middle" bgcolor="#F5F3FF" style="background-color:#F5F3FF;border:1px solid #E4DFF5;border-radius:12px;padding:11px 12px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td width="14" height="18" bgcolor="#FFFFFF" style="width:14px;height:18px;background-color:#FFFFFF;border:1px solid #C4B5FD;border-radius:3px;font-size:0;line-height:0;">&nbsp;</td>
                            <td width="4" style="width:4px;font-size:0;line-height:0;">&nbsp;</td>
                            <td width="14" height="18" bgcolor="#8B5CF6" style="width:14px;height:18px;background-color:#8B5CF6;border-radius:3px;font-size:0;line-height:0;">&nbsp;</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>`;
}

function featureRows(features: string[]): string {
  const rows = features
    .map((feature, index) => {
      const spacer =
        index === features.length - 1
          ? ""
          : `<tr><td colspan="3" height="12" style="height:12px;font-size:0;line-height:0;">&nbsp;</td></tr>`;
      return `<tr>
                        <td width="22" valign="middle" style="width:22px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td class="check" width="22" height="22" align="center" valign="middle" bgcolor="#F5F3FF" style="width:22px;height:22px;background-color:#F5F3FF;border-radius:11px;color:#6D28D9;font-family:${FONT};font-size:12px;line-height:22px;font-weight:700;">&#10003;</td>
                            </tr>
                          </table>
                        </td>
                        <td width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
                        <td class="feature-text" valign="middle" style="font-family:${FONT};font-size:15px;line-height:22px;color:#3B3645;">${escapeHtml(feature)}</td>
                      </tr>
                      ${spacer}`;
    })
    .join("\n");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 0;">
                    ${rows}
                  </table>`;
}

function bulletproofButton(label: string, href: string): string {
  const width = buttonWidth(label);
  const safeLabel = escapeHtml(label);
  return `<table role="presentation" class="btn-table" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:28px auto 0;">
                    <tr>
                      <td class="btn-td" align="center" bgcolor="#8B5CF6" style="background-color:#8B5CF6;border-radius:10px;">
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:48px;v-text-anchor:middle;width:${width}px;" arcsize="21%" strokecolor="#8B5CF6" fillcolor="#8B5CF6">
                          <w:anchorlock/>
                          <center style="color:#FFFFFF;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:bold;">${safeLabel}</center>
                        </v:roundrect>
                        <![endif]-->
                        <!--[if !mso]><!-->
                        <a class="btn-link" href="${href}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:16px;line-height:20px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:10px;background-color:#8B5CF6;mso-hide:all;">${safeLabel}</a>
                        <!--<![endif]-->
                      </td>
                    </tr>
                  </table>`;
}

function renderEmail(spec: EmailSpec): string {
  const paragraphs = spec.paragraphs
    .map(
      (paragraph, index) =>
        `<p class="${index === 0 ? "body-copy" : "note"}" style="margin:12px 0 0;font-family:${FONT};font-size:${index === 0 ? "16px" : "14px"};line-height:${index === 0 ? "26px" : "22px"};color:${index === 0 ? "#3B3645" : "#746E80"};">${escapeHtml(paragraph)}</p>`,
    )
    .join("\n                  ");

  const features = spec.features?.length ? featureRows(spec.features) : "";
  const expiry = spec.expiryNote
    ? `<p class="note expiry" style="margin:16px 0 0;font-family:${FONT};font-size:13px;line-height:20px;color:#746E80;">${escapeHtml(spec.expiryNote)}</p>`
    : "";
  const ignore = spec.securityFooter
    ? `<p class="footer footer-ignore" style="margin:8px 0 0;font-family:${FONT};font-size:12px;line-height:18px;color:#746E80;text-align:center;">If you did not request this, you can safely ignore this email.</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${escapeHtml(spec.documentTitle)}</title>
  <!-- ${spec.variablesNote} -->
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style type="text/css">
    body, table, td, a, p, h1 { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
  <style>
    body, table, td, a, p { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a { text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; max-width: 100% !important; }
      .outer-pad { padding: 16px 10px !important; }
      .header-pad { padding: 18px 20px !important; }
      .content-pad { padding: 24px 20px 8px !important; }
      .footer-pad { padding: 8px 20px 24px !important; }
      .heading { font-size: 26px !important; line-height: 32px !important; }
      .btn-table, .btn-td { width: 100% !important; }
      .btn-link { display: block !important; }
    }
    @media (prefers-color-scheme: dark) {
      .page, .page-bg { background-color: #F5F3FF !important; }
      .card { background-color: #FFFFFF !important; }
      .header { background-color: #111018 !important; }
      .brand-name { color: #FFFFFF !important; }
      .brand-line { color: #C4B5FD !important; }
      .label { color: #6D28D9 !important; }
      .heading { color: #111018 !important; }
      .body-copy { color: #3B3645 !important; }
      .note, .footer { color: #746E80 !important; }
      .feature-text { color: #3B3645 !important; }
      .fallback { background-color: #F5F3FF !important; }
      .fallback-url, .fallback-url a { color: #5B21B6 !important; }
      .btn-td, .btn-link { background-color: #8B5CF6 !important; }
      .btn-link { color: #FFFFFF !important; }
    }
  </style>
</head>
<body class="page" bgcolor="#F5F3FF" style="margin:0;padding:0;background-color:#F5F3FF;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#F5F3FF;opacity:0;">
    ${escapeHtml(spec.preheader)}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>
  <table role="presentation" class="page-bg" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F5F3FF" style="background-color:#F5F3FF;border-collapse:collapse;">
    <tr>
      <td class="outer-pad" align="center" valign="top" style="padding:32px 16px;">
        <!--[if mso]>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td>
        <![endif]-->
        <table role="presentation" class="container card" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="width:600px;max-width:600px;background-color:#FFFFFF;border:1px solid #E7E3F4;border-radius:16px;border-collapse:separate;overflow:hidden;box-shadow:0 12px 32px rgba(17,16,24,0.06);">
          <tr>
            <td class="header header-pad" bgcolor="#111018" style="background-color:#111018;background-image:radial-gradient(ellipse at 0% 50%, rgba(139,92,246,0.42), rgba(17,16,24,0) 58%);padding:20px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="${LOGO_WIDTH}" valign="middle" style="width:${LOGO_WIDTH}px;">
                    <img src="${spec.logoSrc}" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" alt="AI Prompt Grid" style="display:block;width:${LOGO_WIDTH}px;height:${LOGO_HEIGHT}px;border:0;outline:none;text-decoration:none;">
                  </td>
                  <td width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
                  <td valign="middle">
                    <p class="brand-name" style="margin:0;font-family:${FONT};font-size:16px;line-height:20px;font-weight:700;letter-spacing:-0.02em;color:#FFFFFF;">AI Prompt Grid</p>
                    <p class="brand-line" style="margin:2px 0 0;font-family:${FONT};font-size:12px;line-height:16px;color:#C4B5FD;">Find a look. Keep your story.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td height="3" bgcolor="#8B5CF6" style="height:3px;background-color:#8B5CF6;background-image:linear-gradient(90deg, #111018 0%, #8B5CF6 32%, #C4B5FD 50%, #8B5CF6 68%, #111018 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td class="content-pad" style="padding:32px 32px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" style="padding:0 10px 0 0;">
                    ${frameMark()}
                  </td>
                  <td class="label" valign="middle" style="font-family:${FONT};font-size:11px;line-height:16px;font-weight:700;letter-spacing:0.14em;color:#6D28D9;">${escapeHtml(spec.label)}</td>
                </tr>
              </table>
              <h1 class="heading" style="margin:12px 0 0;font-family:${FONT};font-size:30px;line-height:36px;font-weight:700;letter-spacing:-0.03em;color:#111018;">${escapeHtml(spec.heading)}</h1>
              ${paragraphs}
              ${features}
              ${bulletproofButton(spec.ctaLabel, spec.ctaHref)}
              <table role="presentation" class="fallback" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F5F3FF" style="margin:24px 0 0;background-color:#F5F3FF;border:1px solid #E4DFF5;border-radius:12px;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p class="fallback-label" style="margin:0;font-family:${FONT};font-size:13px;line-height:20px;color:#746E80;">If the button does not work, copy and paste this link into your browser:</p>
                    <p class="fallback-url" style="margin:8px 0 0;font-family:Consolas, 'Courier New', Courier, monospace;font-size:12px;line-height:18px;color:#5B21B6;word-break:break-all;overflow-wrap:anywhere;">
                      <a href="${spec.ctaHref}" target="_blank" style="color:#5B21B6;text-decoration:underline;font-family:Consolas, 'Courier New', Courier, monospace;">${spec.ctaHref}</a>
                    </p>
                  </td>
                </tr>
              </table>
              ${expiry}
            </td>
          </tr>
          <tr>
            <td class="footer-pad" style="padding:20px 32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td height="1" bgcolor="#E7E3F4" style="height:1px;background-color:#E7E3F4;font-size:0;line-height:1px;">&nbsp;</td>
                </tr>
              </table>
              <p class="footer" style="margin:16px 0 0;font-family:${FONT};font-size:12px;line-height:18px;color:#746E80;text-align:center;">You received this email because of an activity related to your AI Prompt Grid account.</p>
              ${ignore}
              <p class="footer" style="margin:8px 0 0;font-family:${FONT};font-size:12px;line-height:18px;text-align:center;">
                <a class="footer-link" href="${SITE_LINK}" target="_blank" style="color:#746E80;text-decoration:underline;">aipromptgrid.com</a>
              </p>
            </td>
          </tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function writeEmailMark(): Promise<void> {
  // Site header mark from src/components/story-shift-mark.tsx, in the header cream.
  const siteMark = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -3 72 50" fill="none">
    <path d="M27.5 13c0-2.8-1.8-4.8-4.6-5.3L12 5.8a5.2 5.2 0 0 0-6.1 4.2L2.1 31.2a5.2 5.2 0 0 0 4.2 6l15.1 2.7c3.3.6 6.1-1.8 6.1-5.2" stroke="#F5F3EE" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M36.5 13c0-3 2.3-5.2 5.3-5.2h14.5a5.2 5.2 0 0 1 5.2 5.2v21.7a5.2 5.2 0 0 1-5.2 5.2H40.5a5.2 5.2 0 0 1-5.2-5.2" stroke="#F5F3EE" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="31.5" cy="23.5" r="4.4" fill="#F5F3EE"/>
  </svg>`);

  await sharp(siteMark, { density: 400 })
    .resize(LOGO_WIDTH * 4, LOGO_HEIGHT * 4)
    .png()
    .toFile(logoPath);
}

export async function writeTemplates(): Promise<void> {
  await mkdir(templateDir, { recursive: true });
  await Promise.all(
    emails.map((spec) =>
      writeFile(path.join(templateDir, spec.fileName), renderEmail(spec), "utf8"),
    ),
  );
}

async function writePreviews(): Promise<void> {
  const previewDir = path.join(root, "tmp", "email-previews");
  await mkdir(previewDir, { recursive: true });
  await copyFile(logoPath, path.join(previewDir, "email-mark.png"));
  const sampleUrl =
    "https://project-ref.supabase.co/auth/v1/verify?token=preview-token-hash&type=magiclink&redirect_to=https://aipromptgrid.com/auth/callback";

  await Promise.all(
    emails.map(async (spec) => {
      const html = renderEmail({
        ...spec,
        logoSrc: "email-mark.png",
        ctaHref: spec.ctaHref === CONFIRMATION_URL ? sampleUrl : spec.ctaHref,
      });
      await writeFile(path.join(previewDir, spec.fileName), html, "utf8");
    }),
  );
}

async function main(): Promise<void> {
  await writeEmailMark();
  await writeTemplates();
  if (process.argv.includes("--preview")) {
    await writePreviews();
  }
}

const isDirectRun = process.argv[1]?.includes("build-email-templates");

if (isDirectRun) {
  main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
}
