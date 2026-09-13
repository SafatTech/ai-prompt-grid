import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main";
  width?: "default" | "narrow" | "wide";
};

const widths = {
  default: "max-w-6xl",
  narrow: "max-w-2xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  children,
  className,
  as: Tag = "div",
  width = "default",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        widths[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
