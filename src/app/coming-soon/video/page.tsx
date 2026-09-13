import type { Metadata } from "next";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

export const metadata: Metadata = {
  title: "Video prompts — coming soon",
  description: "Join the waitlist for AIPromptGrid video prompts.",
};

export default function VideoWaitlistPage() {
  return (
    <WaitlistForm
      eyebrow="Create · Coming soon"
      title="Video prompts"
      description="A curated library of video-style prompts is next. Leave your email and we’ll notify you when it’s ready — no blurred fake catalog."
      interest="video"
    />
  );
}
