"use client";

import type { FormEvent } from "react";
import { useToast } from "@/components/providers/toast-provider";

export function NewsletterBand() {
  const { toast } = useToast();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast("Email alerts are not open yet. Check Guides for the latest prompts.");
  }

  return (
    <section className="home-section home-newsletter" aria-labelledby="home-newsletter-heading">
      <div>
        <h2 id="home-newsletter-heading">New AI photo prompts, straight to your inbox</h2>
        <p className="home-newsletter-sub" id="home-newsletter-desc">
          A short email when we add new prompts and styles. Unsubscribe anytime.
        </p>
      </div>
      <form className="home-newsletter-form" onSubmit={onSubmit} noValidate>
        <label className="sr-only" htmlFor="home-newsletter-email">
          Email address
        </label>
        <input
          id="home-newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          autoComplete="email"
          aria-describedby="home-newsletter-desc"
        />
        <button type="submit">Get new prompts</button>
      </form>
    </section>
  );
}
