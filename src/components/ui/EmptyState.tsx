import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-dashed border-border bg-bg-elevated/60 px-6 py-14 text-center",
        className,
      )}
    >
      <h2 className="font-display text-2xl tracking-tight text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
