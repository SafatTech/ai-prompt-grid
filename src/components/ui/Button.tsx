import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-contrast hover:bg-accent-hover shadow-[0_10px_30px_rgba(12,107,107,0.22)]",
  secondary:
    "border border-hairline bg-surface-3 text-accent-contrast hover:border-hairline-strong hover:bg-white/[0.06]",
  ghost:
    "bg-transparent text-white/70 hover:bg-white/[0.06] hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  ...props
}: BaseProps &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  )) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight transition-colors duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
