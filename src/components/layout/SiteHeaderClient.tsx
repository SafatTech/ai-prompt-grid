"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NAV, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export function SiteHeaderClient({
  isSignedIn,
  isAdmin,
}: {
  isSignedIn: boolean;
  isAdmin: boolean;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const createMenuId = useId();

  const closeMenus = () => {
    setMobileOpen(false);
    setCreateOpen(false);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <Container
        width="wide"
        className="flex h-[var(--header-height)] items-center justify-between gap-4"
      >
        <Link
          href="/"
          onClick={closeMenus}
          className="font-display text-lg tracking-tight text-ink sm:text-xl"
        >
          {SITE.name}
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          <NavLink href="/styles" active={pathname.startsWith("/styles")}>
            Explore
          </NavLink>
          <NavLink
            href="/categories"
            active={pathname.startsWith("/categories")}
          >
            Categories
          </NavLink>

          <div className="relative">
            <button
              type="button"
              className={cn(
                "inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium text-ink-muted transition-colors hover:bg-bg-elevated hover:text-ink",
                pathname.startsWith("/coming-soon") && "text-ink",
              )}
              aria-expanded={createOpen}
              aria-controls={createMenuId}
              onClick={() => setCreateOpen((v) => !v)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                  setCreateOpen(false);
                }
              }}
            >
              Create
              <ChevronDown />
            </button>
            {createOpen ? (
              <div
                id={createMenuId}
                className="absolute left-0 top-full z-50 mt-1 min-w-[14rem] rounded-md border border-border bg-bg-elevated py-1 shadow-soft"
              >
                {NAV.create.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className="block px-4 py-2.5 text-sm text-ink-muted transition-colors hover:bg-bg hover:text-ink"
                  >
                    {item.label}
                    <span className="mt-0.5 block text-xs text-ink-faint">
                      Coming soon
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isSignedIn ? (
            <>
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="inline-flex h-10 items-center rounded-md px-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  Admin
                </Link>
              ) : null}
              <Link
                href="/account"
                className="inline-flex h-10 items-center rounded-md bg-ink px-4 text-sm font-medium text-accent-contrast transition-colors hover:bg-bg-deep"
              >
                Account
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-10 items-center rounded-md px-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="inline-flex h-10 items-center rounded-md bg-ink px-4 text-sm font-medium text-accent-contrast transition-colors hover:bg-bg-deep"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <MenuIcon open={mobileOpen} />
        </button>
      </Container>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-bg md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            <MobileLink href="/styles" onNavigate={closeMenus}>
              Explore
            </MobileLink>
            <MobileLink href="/categories" onNavigate={closeMenus}>
              Categories
            </MobileLink>
            <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
              Create
            </p>
            {NAV.create.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href}
                onNavigate={closeMenus}
              >
                {item.label}
              </MobileLink>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              {isSignedIn ? (
                <>
                  {isAdmin ? (
                    <MobileLink href="/admin" onNavigate={closeMenus}>
                      Admin
                    </MobileLink>
                  ) : null}
                  <Link
                    href="/account"
                    onClick={closeMenus}
                    className="rounded-md bg-ink py-2.5 text-center text-sm font-medium text-accent-contrast"
                  >
                    Account
                  </Link>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    className="flex-1 rounded-md border border-border py-2.5 text-center text-sm font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenus}
                    className="flex-1 rounded-md bg-ink py-2.5 text-center text-sm font-medium text-accent-contrast"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-bg-elevated hover:text-ink",
        active ? "text-ink" : "text-ink-muted",
      )}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="rounded-md px-3 py-2.5 text-base font-medium text-ink"
    >
      {children}
    </Link>
  );
}

function ChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      {open ? (
        <path
          d="M4 4L14 14M14 4L4 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path
            d="M3 5H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 9H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 13H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
