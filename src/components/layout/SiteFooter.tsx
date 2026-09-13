import Link from "next/link";
import { NAV, SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-bg-deep text-accent-contrast">
      <Container width="wide" className="section-pad py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-tight">{SITE.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
              {SITE.tagline}
            </p>
          </div>

          <FooterCol title="Product">
            <FooterLink href="/styles">Explore styles</FooterLink>
            <FooterLink href="/categories">Categories</FooterLink>
            {NAV.create.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Account">
            <FooterLink href="/login">Sign in</FooterLink>
            <FooterLink href="/register">Register</FooterLink>
            <FooterLink href="/account">Favorites</FooterLink>
          </FooterCol>

          <FooterCol title="Legal">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>Browse styles. Copy prompts. Create.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/75 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
