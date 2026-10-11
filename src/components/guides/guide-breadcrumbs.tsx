import Link from "next/link";

export function GuideBreadcrumbs({
  current,
  className = "mb-6",
}: {
  current?: string;
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={["text-sm text-[var(--muted)]", className].filter(Boolean).join(" ")}
    >
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0">
        <li>
          <Link
            href="/"
            className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          {current ? (
            <Link
              href="/guides"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              Guides
            </Link>
          ) : (
            <span className="text-[var(--text)]">Guides</span>
          )}
        </li>
        {current ? (
          <>
            <li aria-hidden="true">/</li>
            <li className="min-w-0 text-[var(--text)]">{current}</li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
