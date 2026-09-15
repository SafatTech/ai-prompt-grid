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
  const [scrolled, setScrolled] = useState(false);
  const createMenuId = useId();
  const isHome = pathname === "/";
  const solidChrome = !isHome || scrolled || mobileOpen;

  const closeMenus = () => {
    setMobileOpen(false);
    setCreateOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        solidChrome
          ? "border-b border-hairline bg-surface-1/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container
        width="wide"
        className="flex h-[var(--header-height)] items-center justify-between gap-4"
      >
        <Link
          href="/"
          onClick={closeMenus}
          className="font-display text-lg tracking-tight text-accent-contrast sm:text-xl"
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
                "inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white",
                pathname.startsWith("/coming-soon") && "text-white",
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
                className="absolute left-0 top-full z-50 mt-1 min-w-[14rem] rounded-md border border-hairline bg-surface-3 py-1 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]"
              >
                {NAV.create.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className="block px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {item.label}
                    <span className="mt-0.5 block text-xs text-white/40">
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
                  className="inline-flex h-10 items-center rounded-md px-3 text-sm font-medium text-white/65 transition-colors hover:text-white"
                >
                  Admin
                </Link>
              ) : null}
              <Link
                href="/account"
                className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
              >
                Account
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-10 items-center rounded-md px-3 text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline text-accent-contrast md:hidden"
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
          className="border-t border-hairline bg-surface-1 md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            <MobileLink href="/styles" onNavigate={closeMenus}>
              Explore
            </MobileLink>
            <MobileLink href="/categories" onNavigate={closeMenus}>
              Categories
            </MobileLink>
            <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
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
            <div className="mt-3 flex flex-col gap-2 border-t border-hairline pt-4">
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
                    className="rounded-md bg-accent py-2.5 text-center text-sm font-medium text-accent-contrast"
                  >
                    Account
                  </Link>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    className="flex-1 rounded-md border border-hairline py-2.5 text-center text-sm font-medium text-accent-contrast"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenus}
                    className="flex-1 rounded-md bg-accent py-2.5 text-center text-sm font-medium text-accent-contrast"
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
        "inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-white/[0.06] hover:text-white",
        active ? "text-white" : "text-white/65",
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
      className="rounded-md px-3 py-2.5 text-base font-medium text-accent-contrast"
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
