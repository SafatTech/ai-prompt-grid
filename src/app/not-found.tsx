import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist. Browse styles or return home.",
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 75% 60% at 18% 12%, rgba(139,108,255,0.16) 0%, rgba(139,108,255,0.05) 40%, transparent 72%), radial-gradient(ellipse 65% 50% at 88% 78%, rgba(255,155,130,0.08) 0%, transparent 70%)",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container flex min-h-[min(720px,calc(100dvh-var(--header)-120px))] flex-col justify-center py-12 sm:py-16 lg:py-20">
        <p className="m-0 mb-4 text-[11px] font-extrabold tracking-[0.14em] text-[#c1b4ff] uppercase">
          404 · Missing page
        </p>

        <p
          className="m-0 mb-2 font-bold tracking-[-0.08em] text-[rgba(245,243,238,0.08)] select-none"
          style={{ fontSize: "clamp(96px, 28vw, 220px)", lineHeight: 0.85 }}
          aria-hidden
        >
          404
        </p>

        <h1 className="m-0 max-w-[16ch] text-[clamp(36px,8vw,64px)] leading-[0.95] font-bold tracking-[-0.05em]">
          This look never made it into the frame.
        </h1>

        <p className="mt-5 mb-0 max-w-[38ch] text-[15px] text-[var(--muted)] sm:text-[17px] sm:leading-relaxed">
          The page you asked for is gone, renamed, or never existed. Try the catalog
          instead — or head back home.
        </p>

        <div className="mt-8 grid w-full max-w-[420px] gap-3 sm:flex sm:max-w-none sm:flex-wrap">
          <Link
            href="/explore"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--violet)] px-5 text-sm font-bold text-[#100d1a] hover:bg-[#9b82ff]"
          >
            Explore styles
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-5 text-sm font-bold text-[var(--text)] hover:border-[var(--line-strong)] hover:bg-[#272636]"
          >
            Back to home
          </Link>
        </div>

        <ul className="m-0 mt-10 flex list-none flex-wrap gap-x-5 gap-y-3 p-0 text-sm">
          <li>
            <Link
              href="/how-it-works"
              className="font-bold text-[#bbaeff] underline-offset-4 hover:text-[var(--text)] hover:underline"
            >
              How it works
            </Link>
          </li>
          <li>
            <Link
              href="/library"
              className="font-bold text-[#bbaeff] underline-offset-4 hover:text-[var(--text)] hover:underline"
            >
              My library
            </Link>
          </li>
          <li>
            <Link
              href="/sign-in"
              className="font-bold text-[#bbaeff] underline-offset-4 hover:text-[var(--text)] hover:underline"
            >
              Sign in
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
