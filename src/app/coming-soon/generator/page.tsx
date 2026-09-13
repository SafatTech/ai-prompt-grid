import type { Metadata } from "next";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

export const metadata: Metadata = {
  title: "Image generator — coming soon",
  description: "Join the waitlist for the AIPromptGrid in-app image generator.",
};

export default function GeneratorWaitlistPage() {
  return (
    <WaitlistForm
      eyebrow="Create · Coming soon"
      title="In-app image generator"
      description="Generate looks without leaving AIPromptGrid. Join the waitlist for early access. Until then, explore free copyable prompts."
      interest="generator"
    />
  );
}
