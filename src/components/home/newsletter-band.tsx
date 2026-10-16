"use client";

import type { FormEvent } from "react";
import { useToast } from "@/components/providers/toast-provider";

export function NewsletterBand() {
  const { toast } = useToast();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast("Festival email alerts are not open yet. Check Guides for the latest prompts.");
  }

  return (
    <section className="home-section home-newsletter" aria-labelledby="home-newsletter-heading">
      <div>
        <h2 id="home-newsletter-heading">Festival prompts before every Eid &amp; Diwali</h2>
        <p>One email before each festival and wedding season. No spam.</p>
      </div>
      <form onSubmit={onSubmit} noValidate>
        <label className="sr-only" htmlFor="home-newsletter-email">
          Email
        </label>
        <input
          id="home-newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          autoComplete="email"
        />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
}
