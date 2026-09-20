import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <section className="container py-[88px]">
      <h1 className="m-0 mb-3 text-[clamp(32px,4vw,48px)] tracking-[-0.04em]">
        Sign-in link issue
      </h1>
      <p className="m-0 mb-6 max-w-[520px] text-[var(--muted)]">
        That sign-in link is invalid or expired. Request a new one from the sign-in
        dialog, or try Google again.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a]"
      >
        Back to home
      </Link>
    </section>
  );
}
