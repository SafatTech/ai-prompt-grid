import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger direct children instead of the wrapper itself. */
  stagger?: boolean;
};

/**
 * Scroll-linked entrance wrapper. Animation is driven purely by CSS
 * (`animation-timeline: view()`), so content stays visible and readable in
 * browsers without support and never depends on hydration.
 */
export function Reveal({ children, className, stagger = false }: RevealProps) {
  return (
    <div className={cn(stagger ? "reveal-stagger" : "reveal", className)}>
      {children}
    </div>
  );
}
