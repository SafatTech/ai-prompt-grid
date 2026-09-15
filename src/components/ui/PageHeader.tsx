import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** Dark matches catalog/home; light for auth/legal until those pages are redesigned. */
  tone?: "light" | "dark";
};

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  tone = "dark",
}: PageHeaderProps) {
  const isDark = tone === "dark";

  return (
    <header className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "accent-rule mb-4 text-xs font-semibold uppercase tracking-[0.2em]",
            isDark ? "text-accent-soft" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={cn(
          "font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl",
          isDark ? "text-gradient-light" : "text-gradient-ink",
        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            isDark ? "text-white/60" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
