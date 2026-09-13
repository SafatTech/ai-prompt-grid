"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  joinWaitlist,
  type WaitlistResult,
} from "@/lib/waitlist/actions";

type WaitlistFormProps = {
  eyebrow: string;
  title: string;
  description: string;
  interest: "video" | "generator";
};

const initial: WaitlistResult | null = null;

export function WaitlistForm({
  eyebrow,
  title,
  description,
  interest,
}: WaitlistFormProps) {
  const [state, formAction, pending] = useActionState(joinWaitlist, initial);

  return (
    <div className="section-pad">
      <Container width="narrow">
        <PageHeader eyebrow={eyebrow} title={title} description={description} />

        {state?.ok ? (
          <p
            className="mt-10 rounded-md border border-accent/30 bg-accent-soft px-5 py-4 text-sm text-ink"
            role="status"
          >
            {state.message}
          </p>
        ) : (
          <form action={formAction} className="mt-10 space-y-4">
            <input type="hidden" name="interest" value={interest} />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
                disabled={pending}
                className="h-12 w-full rounded-md border border-border bg-bg-elevated px-4 text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent disabled:opacity-60"
              />
            </label>
            {state && !state.ok ? (
              <p className="text-sm text-red-700" role="alert">
                {state.message}
              </p>
            ) : null}
            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
              {pending ? "Joining…" : "Join waitlist"}
            </Button>
          </form>
        )}

        <p className="mt-8">
          <Button href="/styles" variant="ghost">
            ← Back to Explore
          </Button>
        </p>
      </Container>
    </div>
  );
}
