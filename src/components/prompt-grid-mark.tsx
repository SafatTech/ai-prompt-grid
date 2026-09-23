import Image from "next/image";
import { cn } from "@/lib/utils";

export function PromptGridMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/prompt-grid-mark.svg"
      alt=""
      width={40}
      height={40}
      className={cn("h-8 w-8 shrink-0", className)}
      aria-hidden
      unoptimized
    />
  );
}
