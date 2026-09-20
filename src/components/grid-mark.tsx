import { cn } from "@/lib/utils";

export function GridMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid h-[25px] w-[25px] grid-cols-3 gap-0.5 rounded-[7px] border border-[rgba(139,108,255,0.45)] bg-[rgba(139,108,255,0.12)] p-[3px]",
        className,
      )}
      aria-hidden
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <i
          key={index}
          className={cn(
            "rounded-[1.5px] bg-[var(--text)] opacity-80",
            [1, 4, 8].includes(index) && "bg-[var(--violet)]",
          )}
        />
      ))}
    </span>
  );
}
