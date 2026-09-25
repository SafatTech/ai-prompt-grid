"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { PromptGridMark } from "@/components/prompt-grid-mark";
import {
  categoryGroups,
  creatorLinks,
  featuredStyle,
  mobileCategoryGroupIds,
  mobileMoodOmit,
  mobileTransformationOmit,
  type NavGroup,
  type NavItem,
} from "@/components/nav/menu-data";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/components/providers/library-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";
import { useToast } from "@/components/providers/toast-provider";
import { getAvatarInitials } from "@/lib/auth/avatar-initials";
import { cn } from "@/lib/utils";

type Panel = "categories" | "creators" | "account" | "search";

const groupIcons: Record<string, ReactNode> = {
  subject: <IconUser />,
  transformation: <IconSpark />,
  "visual-style": <IconFrame />,
  mood: <IconSun />,
  everyday: <IconCamera />,
  creators: <IconPen />,
  tools: <IconLayers />,
};

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { signedIn, signOut, isEditor, userName, userEmail } = useLibrary();
  const avatarInitials = getAvatarInitials(userName, userEmail);
  const { openSignIn } = useUiModals();
  const { toast } = useToast();
  const categoriesId = useId();
  const creatorsId = useId();
  const accountId = useId();
  const searchId = useId();
  const drawerId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(categoryGroups[0].id);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [creatorsOpen, setCreatorsOpen] = useState(false);
  const focusMobileSearch = useRef(false);
  const [search, setSearch] = useState("");
  const [routeKey, setRouteKey] = useState(pathname);

  if (pathname !== routeKey) {
    setRouteKey(pathname);
    setPanel(null);
    setMobileOpen(false);
    setCreatorsOpen(false);
    setCategoriesOpen(false);
    setMobileGroup(null);
  }

  const exploreActive = pathname.startsWith("/explore") || pathname.startsWith("/styles");
  const howActive = pathname.startsWith("/how-it-works");
  const selectedGroup =
    categoryGroups.find((group) => group.id === activeGroup) ?? categoryGroups[0];

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setPanel(null);
      }
    }
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setPanel(null);
        setMobileOpen(false);
        setCreatorsOpen(false);
        setCategoriesOpen(false);
        setMobileGroup(null);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", mobileOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [mobileOpen]);

  useEffect(() => {
    if (panel === "search") searchRef.current?.focus();
  }, [panel]);

  useEffect(() => {
    if (mobileOpen && focusMobileSearch.current) {
      mobileSearchRef.current?.focus();
      focusMobileSearch.current = false;
    }
  }, [mobileOpen]);

  function clearHover() {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }

  function openPanel(next: Panel) {
    clearHover();
    setPanel(next);
  }

  function previewPanel(next: Panel) {
    clearHover();
    if (panel) {
      setPanel(next);
      return;
    }
    hoverTimer.current = window.setTimeout(() => setPanel(next), 120);
  }

  function closePanels() {
    clearHover();
    setPanel(null);
  }

  function togglePanel(next: Panel) {
    clearHover();
    setPanel((current) => (current === next ? null : next));
  }

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const q = search.trim();
    setPanel(null);
    setMobileOpen(false);
    router.push(q ? `/explore?q=${encodeURIComponent(q)}` : "/explore?focus=search");
  }

  function signOutAndLeave() {
    signOut();
    setPanel(null);
    setMobileOpen(false);
    toast("Signed out.");
    router.push("/");
  }

  return (
    <header
      ref={rootRef}
      className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.10)] bg-[rgba(11,11,16,0.94)] backdrop-blur-[8px]"
    >
      <div className="mx-auto flex h-[var(--header)] w-full max-w-[1440px] items-center gap-3 px-6 max-[899px]:px-4">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-2.5 text-[16px] font-bold tracking-[-0.03em] text-[#F5F3EE]"
          aria-label="AI Prompt Grid home"
          onMouseEnter={closePanels}
        >
          <PromptGridMark className="h-8 w-8" />
          <span className="max-[389px]:hidden">AI Prompt Grid</span>
          <span className="hidden max-[389px]:inline">Prompt Grid</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 min-[900px]:flex" aria-label="Main navigation">
          <NavLink href="/explore" active={exploreActive} onMouseEnter={closePanels}>
            Explore styles
          </NavLink>
          <MenuButton
            label="Categories"
            controls={categoriesId}
            expanded={panel === "categories"}
            onClick={() => togglePanel("categories")}
            onMouseEnter={() => previewPanel("categories")}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                openPanel("categories");
              }
            }}
          />
          <NavLink href="/how-it-works" active={howActive} onMouseEnter={closePanels}>
            How it works
          </NavLink>
          <div className="relative flex self-stretch items-center">
            <MenuButton
              label="For creators"
              controls={creatorsId}
              expanded={panel === "creators"}
              onClick={() => togglePanel("creators")}
              onMouseEnter={() => previewPanel("creators")}
            />
            {panel === "creators" ? (
              <ul
                id={creatorsId}
                className="nav-panel-in absolute top-[calc(100%+8px)] left-0 z-40 m-0 w-[280px] list-none rounded-[18px] border border-[rgba(255,255,255,0.10)] bg-[#15151E] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.38)]"
              >
                {creatorLinks.map((item) => (
                  <li key={item.href + item.label}>
                    <MenuLink item={item} onNavigate={closePanels} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {panel === "search" ? (
            <form onSubmit={onSearch} className="hidden min-[900px]:block">
              <label className="sr-only" htmlFor={searchId}>
                Search styles
              </label>
              <input
                ref={searchRef}
                id={searchId}
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search cinematic, anime, watercolor..."
                className="h-10 w-[240px] rounded-xl border border-[rgba(255,255,255,0.10)] bg-[#15151E] px-3 text-sm text-[#F5F3EE] placeholder:text-[#A6A4B2]"
              />
            </form>
          ) : (
            <button
              type="button"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-[rgba(255,255,255,0.10)] text-[#A6A4B2] hover:text-[#F5F3EE] max-[899px]:hidden"
              aria-label="Search styles"
              aria-expanded={false}
              aria-controls={searchId}
              onClick={() => togglePanel("search")}
            >
              <IconSearch />
            </button>
          )}

          <button
            type="button"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-[rgba(255,255,255,0.10)] text-[#F5F3EE] min-[900px]:hidden"
            aria-label="Search styles"
            onClick={() => {
              focusMobileSearch.current = true;
              setMobileOpen(true);
            }}
          >
            <IconSearch />
          </button>

          {signedIn ? (
            <div className="relative hidden min-[900px]:block">
              <button
                type="button"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[rgba(139,108,255,0.55)] bg-[linear-gradient(135deg,#8B6CFF,#FF9B82)] text-sm font-extrabold text-[#1a1020]"
                aria-label={
                  userName || userEmail
                    ? `Open account menu for ${userName || userEmail}`
                    : "Open account menu"
                }
                aria-expanded={panel === "account"}
                aria-controls={accountId}
                onClick={() => togglePanel("account")}
              >
                {avatarInitials}
              </button>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="hidden min-[900px]:inline-flex"
              data-testid="header-sign-in"
              onClick={() => {
                closePanels();
                openSignIn();
              }}
              onMouseEnter={closePanels}
            >
              Sign in
            </Button>
          )}

          <Link
            href="/explore"
            className="hidden h-11 items-center rounded-[14px] bg-[linear-gradient(135deg,#8B6CFF,#FF9B82)] px-4 text-sm font-bold text-[#1a1020] min-[900px]:inline-flex"
            onMouseEnter={closePanels}
          >
            Explore styles
          </Link>

          <button
            type="button"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-[rgba(255,255,255,0.10)] text-[#F5F3EE] min-[900px]:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={drawerId}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {panel === "categories" ? (
        <div className="absolute top-full left-1/2 z-40 hidden w-[min(1120px,calc(100%-48px))] -translate-x-1/2 pt-2 min-[900px]:block">
          <div
            id={categoriesId}
            className="nav-panel-in grid grid-cols-[29%_43%_28%] overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.10)] bg-[#15151E] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.38)]"
          >
            <ul className="m-0 flex list-none flex-col gap-1 border-r border-[rgba(255,255,255,0.10)] p-0 pr-3">
              {categoryGroups.map((group) => {
                const selected = group.id === selectedGroup.id;
                return (
                  <li key={group.id}>
                    <button
                      type="button"
                      className={cn(
                        "flex min-h-11 w-full cursor-pointer items-center gap-2.5 rounded-[12px] border border-transparent px-3 text-left text-sm text-[#A6A4B2]",
                        selected &&
                          "border-[rgba(139,108,255,0.45)] bg-[#2A1A31] text-[#F5F3EE] shadow-[0_0_0_1px_rgba(139,108,255,0.18)]",
                      )}
                      aria-current={selected ? "true" : undefined}
                      onMouseEnter={() => setActiveGroup(group.id)}
                      onFocus={() => setActiveGroup(group.id)}
                      onClick={() => setActiveGroup(group.id)}
                    >
                      <span className="text-[#C4B6FF]">{groupIcons[group.id]}</span>
                      <span className="flex-1">{group.label}</span>
                      <IconChevron className="h-3.5 w-3.5 -rotate-90" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <ul className="m-0 list-none border-r border-[rgba(255,255,255,0.10)] p-0 px-3">
              {selectedGroup.items.map((item) => (
                <li key={item.href + item.label}>
                  <MenuLink item={item} onNavigate={closePanels} />
                </li>
              ))}
            </ul>
            <FeaturedStyle onNavigate={closePanels} />
          </div>
        </div>
      ) : null}

      {panel === "account" && signedIn ? (
        <div
          id={accountId}
          className="nav-panel-in absolute top-[calc(100%+8px)] right-6 z-40 hidden w-[230px] rounded-[18px] border border-[rgba(255,255,255,0.10)] bg-[#15151E] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.38)] min-[900px]:block"
          role="menu"
        >
          <p className="px-3 py-2 text-xs text-[#A6A4B2]">{userName || userEmail || "Signed in"}</p>
          <AccountLink href="/library" onClick={closePanels}>
            My library
          </AccountLink>
          <AccountLink href="/library#saved" onClick={closePanels}>
            Saved styles
          </AccountLink>
          <AccountLink href="/library#creations" onClick={closePanels}>
            My creations
          </AccountLink>
          {isEditor ? (
            <AccountLink href="/admin" onClick={closePanels}>
              Editorial admin
            </AccountLink>
          ) : null}
          <button
            type="button"
            role="menuitem"
            className="min-h-11 w-full cursor-pointer rounded-[12px] border-0 bg-transparent px-3 text-left text-sm text-[#F5F3EE] hover:bg-[#2A1A31]"
            onClick={signOutAndLeave}
          >
            Sign out
          </button>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 min-[900px]:hidden">
          <button
            type="button"
            className="absolute inset-0 cursor-pointer border-0 bg-black/55"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id={drawerId}
            className="nav-panel-in absolute top-0 right-0 flex h-full w-[min(92vw,420px)] flex-col bg-[#15151E] shadow-[-16px_0_40px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-end px-4 pt-4">
              <button
                type="button"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-[rgba(255,255,255,0.10)] text-[#F5F3EE]"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <IconClose />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <Link
                href="/explore"
                className="mt-2 flex h-12 items-center justify-center rounded-[16px] bg-[linear-gradient(135deg,#8B6CFF,#FF9B82)] text-sm font-bold text-[#1a1020]"
                onClick={() => setMobileOpen(false)}
              >
                Explore styles
              </Link>
              <form onSubmit={onSearch} className="mt-3">
                <label className="sr-only" htmlFor={`${searchId}-mobile`}>
                  Search styles
                </label>
                <input
                  ref={mobileSearchRef}
                  id={`${searchId}-mobile`}
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search cinematic, anime, watercolor..."
                  className="h-12 w-full rounded-[16px] border border-[rgba(255,255,255,0.10)] bg-[#0B0B10] px-3.5 text-base text-[#F5F3EE] placeholder:text-[#A6A4B2]"
                />
              </form>
              <ul className="m-0 mt-4 list-none p-0">
                <li>
                  <Link
                    href="/explore"
                    className={cn(
                      "flex min-h-11 items-center rounded-[12px] px-3 text-[#A6A4B2]",
                      exploreActive && "bg-[#2A1A31] text-[#F5F3EE]",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    Explore styles
                  </Link>
                </li>
                <li>
                  <Accordion
                    label="Categories"
                    open={categoriesOpen}
                    onToggle={() => {
                      setCategoriesOpen((open) => !open);
                      setCreatorsOpen(false);
                    }}
                  >
                    {categoryGroups
                      .filter((group) =>
                        (mobileCategoryGroupIds as readonly string[]).includes(group.id),
                      )
                      .map((group) => (
                        <MobileGroup
                          key={group.id}
                          group={filterMobileGroup(group)}
                          open={mobileGroup === group.id}
                          onToggle={() =>
                            setMobileGroup((current) => (current === group.id ? null : group.id))
                          }
                          onNavigate={() => setMobileOpen(false)}
                        />
                      ))}
                  </Accordion>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className={cn(
                      "flex min-h-11 items-center rounded-[12px] px-3 text-[#A6A4B2]",
                      howActive && "bg-[#2A1A31] text-[#F5F3EE]",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Accordion
                    label="For creators"
                    open={creatorsOpen}
                    onToggle={() => {
                      setCreatorsOpen((open) => !open);
                      setCategoriesOpen(false);
                    }}
                  >
                    {creatorLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex min-h-11 items-center rounded-[12px] px-3 text-sm text-[#A6A4B2] hover:text-[#F5F3EE]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </Accordion>
                </li>
              </ul>
            </div>
            <div className="border-t border-[rgba(255,255,255,0.10)] px-4 py-4">
              {signedIn ? (
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#8B6CFF,#FF9B82)] text-sm font-extrabold text-[#1a1020]">
                    {avatarInitials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 truncate text-sm font-bold text-[#F5F3EE]">
                      {userName || userEmail || "Your account"}
                    </p>
                    <Link
                      href="/library"
                      className="text-sm text-[#A6A4B2] underline-offset-2 hover:underline"
                      onClick={() => setMobileOpen(false)}
                    >
                      My library
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="min-h-11 cursor-pointer rounded-xl border border-[rgba(255,255,255,0.10)] bg-transparent px-3 text-sm text-[#F5F3EE]"
                    onClick={signOutAndLeave}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <Button
                    className="w-full"
                    variant="ghost"
                    onClick={() => {
                      setMobileOpen(false);
                      openSignIn();
                    }}
                  >
                    Sign in
                  </Button>
                  <p className="m-0 mt-2 text-center text-xs text-[#A6A4B2]">
                    Save styles and results to your private library.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function filterMobileGroup(group: NavGroup): NavGroup {
  if (group.id === "transformation") {
    return {
      ...group,
      items: group.items.filter((item) => !mobileTransformationOmit.has(item.label)),
    };
  }
  if (group.id === "mood") {
    return {
      ...group,
      items: group.items.filter((item) => !mobileMoodOmit.has(item.label)),
    };
  }
  return group;
}

function NavLink({
  href,
  active,
  onMouseEnter,
  children,
}: {
  href: string;
  active?: boolean;
  onMouseEnter?: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      className={cn(
        "rounded-[10px] px-3 py-2 text-sm whitespace-nowrap text-[#A6A4B2] hover:text-[#F5F3EE]",
        active && "text-[#F5F3EE]",
      )}
    >
      {children}
    </Link>
  );
}

function MenuButton({
  label,
  controls,
  expanded,
  onClick,
  onMouseEnter,
  onKeyDown,
}: {
  label: string;
  controls: string;
  expanded: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-10 cursor-pointer items-center gap-1 rounded-[10px] border-0 bg-transparent px-3 py-2 text-sm text-[#A6A4B2] hover:text-[#F5F3EE]",
        expanded && "text-[#F5F3EE]",
      )}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onKeyDown={onKeyDown}
    >
      {label}
      <IconChevron className={cn("transition-transform duration-150", expanded && "rotate-180")} />
    </button>
  );
}

function MenuLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group block rounded-[12px] px-3 py-2.5 hover:bg-[#2A1A31]"
    >
      <span className="block text-sm text-[#F5F3EE]">{item.label}</span>
      <span className="mt-0.5 hidden text-xs text-[#A6A4B2] group-hover:block group-focus-visible:block">
        {item.description}
      </span>
    </Link>
  );
}

function FeaturedStyle({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="pl-4">
      <p className="m-0 text-xs font-bold tracking-[0.04em] text-[#C4B6FF] uppercase">
        Featured transformation
      </p>
      <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.10)]">
        <figure className="relative m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featuredStyle.source}
            alt=""
            className="h-[108px] w-full object-cover"
          />
          <figcaption className="absolute bottom-1.5 left-1.5 rounded-md bg-[#0B0B10]/80 px-1.5 py-0.5 text-[10px] font-bold text-[#F5F3EE]">
            Source
          </figcaption>
        </figure>
        <figure className="relative m-0 border-l border-[rgba(255,255,255,0.10)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featuredStyle.result}
            alt=""
            className="h-[108px] w-full object-cover"
          />
          <figcaption className="absolute right-1.5 bottom-1.5 rounded-md bg-[#0B0B10]/80 px-1.5 py-0.5 text-[10px] font-bold text-[#F5F3EE]">
            AI result
          </figcaption>
        </figure>
      </div>
      <p className="mt-3 mb-0 text-xs text-[#A6A4B2]">{featuredStyle.title}</p>
      <p className="mt-1 mb-0 text-[15px] leading-snug font-bold tracking-[-0.02em] text-[#F5F3EE]">
        Transform photos with a tested prompt
      </p>
      <p className="mt-1.5 mb-0 text-xs leading-relaxed text-[#A6A4B2]">
        See the source image, adjust the prompt, then use it in your preferred AI editor.
      </p>
      <Link
        href={featuredStyle.href}
        onClick={onNavigate}
        className="mt-3 inline-flex min-h-10 items-center text-sm font-bold text-[#C4B6FF] hover:text-[#F5F3EE]"
      >
        View featured style →
      </Link>
    </div>
  );
}

function AccountLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="flex min-h-11 items-center rounded-[12px] px-3 text-sm text-[#F5F3EE] hover:bg-[#2A1A31]"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function Accordion({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const panelId = useId();
  return (
    <div>
      <button
        type="button"
        className="flex min-h-11 w-full cursor-pointer items-center rounded-[12px] border-0 bg-transparent px-3 text-left text-[#A6A4B2]"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="flex-1">{label}</span>
        <IconChevron className={cn("transition-transform duration-150", open && "rotate-180")} />
      </button>
      {open ? (
        <div id={panelId} className="pb-1 pl-2">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function MobileGroup({
  group,
  open,
  onToggle,
  onNavigate,
}: {
  group: NavGroup;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = useId();
  return (
    <div>
      <button
        type="button"
        className="flex min-h-11 w-full cursor-pointer items-center rounded-[12px] border-0 bg-transparent px-3 text-left text-sm text-[#F5F3EE]"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="flex-1">{group.label}</span>
        <IconChevron className={cn("transition-transform duration-150", open && "rotate-180")} />
      </button>
      {open ? (
        <ul id={panelId} className="m-0 list-none p-0 pl-3">
          {group.items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex min-h-11 items-center rounded-[12px] px-3 text-sm text-[#A6A4B2] hover:bg-[#2A1A31] hover:text-[#F5F3EE]"
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function IconChevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("h-4 w-4", className)} aria-hidden fill="none">
      <path d="M4 6.5 8 10.5 12 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" aria-hidden fill="none">
      <circle cx="9" cy="9" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.2 13.2 16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" aria-hidden fill="none">
      <path d="M3.5 5.5h13M3.5 10h13M3.5 14.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" aria-hidden fill="none">
      <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden fill="none">
      <circle cx="10" cy="7" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 16.2c1.2-2.3 3.1-3.4 5.5-3.4s4.3 1.1 5.5 3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden fill="none">
      <path d="M10 2.5 11.4 8 17 9.4 11.4 11 10 16.5 8.6 11 3 9.4 8.6 8 10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconFrame() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden fill="none">
      <rect x="3.5" y="3.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 13.5 8 9l3 3 2-2 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden fill="none">
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 3v1.5M10 15.5V17M3 10h1.5M15.5 10H17M5 5l1 1M14 14l1 1M15 5l-1 1M6 14l-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden fill="none">
      <path d="M3.5 7.5h2l1.2-2h6.6l1.2 2h2a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="11.5" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconPen() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden fill="none">
      <path d="M12 4.5 15.5 8 8 15.5H4.5V12L12 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden fill="none">
      <path d="M10 3.5 16.5 7 10 10.5 3.5 7 10 3.5ZM3.5 10 10 13.5 16.5 10M3.5 13 10 16.5 16.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
