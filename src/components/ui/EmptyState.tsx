import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
  /** Dark matches catalog/home; light for account/admin until redesigned. */
  tone?: "light" | "dark";
};

export function EmptyState({
  title,
  description,
  action,
  className,
  tone = "dark",
}: EmptyStateProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "rounded-2xl px-6 py-16 text-center",
        isDark
          ? "border border-hairline bg-surface-3"
          : "glass-panel-light",
        className,
      )}
    >
      <h2
        className={cn(
          "font-display text-2xl tracking-tight",
          isDark ? "text-gradient-light" : "text-gradient-ink",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mx-auto mt-3 max-w-md text-sm leading-relaxed",
          isDark ? "text-white/55" : "text-ink-muted",
        )}
      >
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
