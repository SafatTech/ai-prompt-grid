import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTION_SITE_URL } from "@/lib/site-url";

const RELATED = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/cookie-policy", label: "Cookie policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/terms-of-service", label: "Terms of service" },
] as const;

export function legalMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${PRODUCTION_SITE_URL}${path}`,
    },
  };
}

export function LegalPage({
  title,
  lede,
  currentPath,
  children,
}: {
  title: string;
  lede: ReactNode;
  currentPath: string;
  children: ReactNode;
}) {
  return (
    <article className="container max-w-[720px] py-10 pb-16 sm:py-16 sm:pb-[100px]">
      <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
        Legal
      </p>
      <h1 className="m-0 mb-3 text-[clamp(36px,4.5vw,52px)] tracking-[-0.04em]">
        {title}
      </h1>
      <div className="m-0 mb-10 text-[var(--muted)]">{lede}</div>
      {children}
      <p className="mt-12 text-sm text-[var(--muted)]">
        See also{" "}
        {RELATED.filter((item) => item.href !== currentPath).map((item, index, items) => (
          <span key={item.href}>
            <Link
              href={item.href}
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              {item.label}
            </Link>
            {index < items.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
    </article>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mb-8">
      <h2 className="mt-0 mb-3 text-[22px] tracking-[-0.02em]">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-[var(--muted)] [&_a]:font-bold [&_a]:text-[var(--text)] [&_a]:underline-offset-2 [&_a]:hover:underline [&_strong]:text-[var(--text)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
