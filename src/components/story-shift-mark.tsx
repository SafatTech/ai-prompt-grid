import { cn } from "@/lib/utils";

export function StoryShiftMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 44"
      className={cn("h-7 w-10 shrink-0", className)}
      aria-hidden
      fill="none"
    >
      <path
        d="M27.5 13c0-2.8-1.8-4.8-4.6-5.3L12 5.8a5.2 5.2 0 0 0-6.1 4.2L2.1 31.2a5.2 5.2 0 0 0 4.2 6l15.1 2.7c3.3.6 6.1-1.8 6.1-5.2"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.5 13c0-3 2.3-5.2 5.3-5.2h14.5a5.2 5.2 0 0 1 5.2 5.2v21.7a5.2 5.2 0 0 1-5.2 5.2H40.5a5.2 5.2 0 0 1-5.2-5.2"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31.5" cy="23.5" r="4.4" fill="currentColor" />
    </svg>
  );
}
