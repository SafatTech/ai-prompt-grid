"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { StoryShiftMark } from "@/components/story-shift-mark";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/components/providers/library-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";
import { useToast } from "@/components/providers/toast-provider";
import { getAvatarInitials } from "@/lib/auth/avatar-initials";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { signedIn, signOut, setPendingAction, isEditor, userName, userEmail } =
    useLibrary();
  const avatarInitials = getAvatarInitials(userName, userEmail);
  const { openSignIn } = useUiModals();
  const { toast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuPath, setMenuPath] = useState(pathname);

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setMobileOpen(false);
    setProfileOpen(false);
  }

  const exploreActive = pathname.startsWith("/explore") || pathname.startsWith("/styles");

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const q = search.trim();
    router.push(q ? `/explore?q=${encodeURIComponent(q)}` : "/explore");
  }

  function goLibrary() {
    if (!signedIn) {
      setPendingAction({ type: "open-library" });
      openSignIn();
      return;
    }
    router.push("/library");
  }

  return (
    <header className="sticky top-0 z-30 h-[var(--header)] border-b border-[var(--line)] bg-[rgba(11,11,16,0.88)] backdrop-blur-[18px]">
      <div className="container flex h-full items-center gap-6">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-[11px] text-[17px] font-bold tracking-[-0.02em]"
          aria-label="AI Prompt Grid home"
        >
          <StoryShiftMark />
          <span>AI Prompt Grid</span>
        </Link>

        <nav className="ml-5 hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <NavLink href="/explore" active={exploreActive}>
            Explore styles
          </NavLink>
          <NavLink href="/explore">Categories</NavLink>
          <NavLink href="/how-it-works">How it works</NavLink>
          {isEditor ? (
            <NavLink href="/admin" active={pathname.startsWith("/admin")}>
              Admin
            </NavLink>
          ) : null}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <form
            onSubmit={onSearch}
            className="relative hidden w-[230px] items-center lg:flex"
          >
            <label className="sr-only" htmlFor="quickSearch">
              Search styles
            </label>
            <input
              id="quickSearch"
              type="search"
              placeholder="Search styles"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pr-[38px] pl-3.5 text-[var(--text)] placeholder:text-[#858391]"
            />
            <button
              type="submit"
              className="absolute right-1.5 grid h-[31px] w-[31px] place-items-center rounded-lg border-0 bg-transparent text-[var(--muted)]"
              aria-label="Search"
            >
              ⌕
            </button>
          </form>

          {signedIn ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border-2 border-[rgba(139,108,255,0.6)] bg-[linear-gradient(135deg,#6d52de,#c18cff)] p-0.5 text-sm font-extrabold text-[#100d1a]"
                aria-label={
                  userName || userEmail
                    ? `Open profile menu for ${userName || userEmail}`
                    : "Open profile menu"
                }
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((v) => !v)}
              >
                {avatarInitials}
              </button>
              {profileOpen ? (
                <div
                  className="absolute top-[50px] right-0 w-[210px] rounded-[14px] border border-[var(--line-strong)] bg-[#1a1924] p-2 shadow-[var(--shadow)]"
                  role="menu"
                >
                  <p className="mx-2.5 mt-1.5 mb-2.5 text-xs text-[var(--muted)]">
                    Signed in (local beta)
                  </p>
                  <button
                    type="button"
                    role="menuitem"
                    className="w-full cursor-pointer rounded-[9px] border-0 bg-transparent px-2.5 py-2.5 text-left text-[var(--text)] hover:bg-[rgba(255,255,255,0.06)]"
                    onClick={goLibrary}
                  >
                    My library
                  </button>
                  {isEditor ? (
                    <button
                      type="button"
                      role="menuitem"
                      className="w-full cursor-pointer rounded-[9px] border-0 bg-transparent px-2.5 py-2.5 text-left text-[var(--text)] hover:bg-[rgba(255,255,255,0.06)]"
                      onClick={() => {
                        setProfileOpen(false);
                        router.push("/admin");
                      }}
                    >
                      Editorial admin
                    </button>
                  ) : null}
                  <button
                    type="button"
                    role="menuitem"
                    className="w-full cursor-pointer rounded-[9px] border-0 bg-transparent px-2.5 py-2.5 text-left text-[var(--text)] hover:bg-[rgba(255,255,255,0.06)]"
                    onClick={() => {
                      signOut();
                      setProfileOpen(false);
                      toast("Signed out.");
                      router.push("/");
                    }}
                  >
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Button
              variant="ghost"
              className="hidden sm:inline-flex"
              data-testid="header-sign-in"
              onClick={openSignIn}
            >
              Sign in
            </Button>
          )}

          <button
            type="button"
            className="grid h-[42px] w-[42px] cursor-pointer place-items-center rounded-xl border border-[var(--line)] bg-[rgba(21,21,30,0.92)] text-[19px] md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-x-0 top-[var(--header)] z-55 border-b border-[var(--line)] bg-[#111118] px-[18px] py-3.5 shadow-[var(--shadow)] md:hidden">
          <Link className="mt-1.5 block rounded-xl px-3 py-3 text-[var(--muted)]" href="/explore">
            Explore styles
          </Link>
          <Link className="mt-1.5 block rounded-xl px-3 py-3 text-[var(--muted)]" href="/explore">
            Categories
          </Link>
          <Link
            className="mt-1.5 block rounded-xl px-3 py-3 text-[var(--muted)]"
            href="/how-it-works"
          >
            How it works
          </Link>
          {signedIn ? (
            <>
              <button
                type="button"
                className="mt-1.5 w-full rounded-xl px-3 py-3 text-left text-[var(--muted)]"
                onClick={goLibrary}
              >
                My library
              </button>
              {isEditor ? (
                <Link
                  className="mt-1.5 block rounded-xl px-3 py-3 text-[var(--muted)]"
                  href="/admin"
                >
                  Editorial admin
                </Link>
              ) : null}
            </>
          ) : (
            <Button className="mt-2 w-full" onClick={openSignIn}>
              Sign in
            </Button>
          )}
        </div>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-[10px] px-3 py-2 text-sm whitespace-nowrap text-[var(--muted)] hover:bg-[rgba(255,255,255,0.055)] hover:text-[var(--text)]",
        active && "bg-[rgba(255,255,255,0.055)] text-[var(--text)]",
      )}
    >
      {children}
    </Link>
  );
}
