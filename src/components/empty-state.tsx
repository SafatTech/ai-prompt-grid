import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ icon = "⌕", title, description, action, className }: Props) {
  return (
    <div
      className={cn(
        "grid min-h-[350px] place-items-center rounded-[var(--radius)] border border-dashed border-[var(--line-strong)] p-10 text-center",
        className,
      )}
    >
      <div>
        <div className="mx-auto mb-5 grid h-[62px] w-[62px] place-items-center rounded-[17px] bg-[rgba(139,108,255,0.11)] text-[25px] text-[#c5b9ff]">
          {icon}
        </div>
        <h3 className="m-0 mb-2 text-[22px]">{title}</h3>
        <p className="mx-auto mb-5 max-w-[430px] text-[var(--muted)]">{description}</p>
        {action}
      </div>
    </div>
  );
}
