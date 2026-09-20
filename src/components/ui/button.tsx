"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "border-transparent bg-[var(--violet)] text-[#100d1a] hover:bg-[#9b82ff]",
  secondary:
    "border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)] hover:border-[var(--line-strong)] hover:bg-[#272636]",
  ghost:
    "border-[var(--line)] bg-transparent text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--text)]",
  danger:
    "border-[rgba(255,124,142,0.25)] bg-[rgba(255,124,142,0.12)] text-[#ffb4be]",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border px-[18px] text-sm font-bold whitespace-nowrap transition-[transform,background,border-color,color] duration-200 active:scale-[0.98]",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
