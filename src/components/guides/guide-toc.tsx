import type { GuideTocItem } from "@/lib/guides/prepare";

export function GuideTocMobile({ items }: { items: readonly GuideTocItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-8 lg:hidden">
      <details className="rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-[var(--text)]">
          On this page
        </summary>
        <nav aria-label="On this page">
          <TocList items={items} />
        </nav>
      </details>
    </div>
  );
}

export function GuideTocDesktop({ items }: { items: readonly GuideTocItem[] }) {
  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-4 rounded-3xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] p-6 backdrop-blur">
        <p className="m-0 text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
          On this page
        </p>
        <nav aria-label="On this page">
          <TocList items={items} />
        </nav>
      </div>
    </aside>
  );
}

function TocList({ items }: { items: readonly GuideTocItem[] }) {
  return (
    <ol className="m-0 list-none space-y-1 p-0 pb-2 text-sm lg:pb-0">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={[
              "block rounded-lg px-3 py-2 text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-[var(--text)]",
              item.level === 3 ? "pl-5 text-[13px]" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
