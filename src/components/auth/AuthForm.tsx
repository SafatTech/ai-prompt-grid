"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  signInWithGoogleAction,
  signInWithMagicLink,
  type AuthActionResult,
} from "@/lib/auth/actions";
import { Button } from "@/components/ui/Button";

const initial: AuthActionResult | null = null;

type AuthFormProps = {
  mode: "login" | "register";
  next?: string;
  configured: boolean;
  errorFromQuery?: string | null;
};

export function AuthForm({
  mode,
  next = "/account",
  configured,
  errorFromQuery,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(
    signInWithMagicLink,
    initial,
  );

  const title = mode === "login" ? "Sign in" : "Register";
  const alternate =
    mode === "login" ? (
      <>
        No account?{" "}
        <Link
          href={`/register?next=${encodeURIComponent(next)}`}
          className="font-medium text-accent hover:text-accent-hover"
        >
          Register
        </Link>
      </>
    ) : (
      <>
        Already have an account?{" "}
        <Link
          href={`/login?next=${encodeURIComponent(next)}`}
          className="font-medium text-accent hover:text-accent-hover"
        >
          Sign in
        </Link>
      </>
    );

  return (
    <div className="space-y-6 rounded-md border border-border bg-bg-elevated p-6">
      {errorFromQuery ? (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {decodeError(errorFromQuery)}
        </p>
      ) : null}

      {!configured ? (
        <p className="rounded-md border border-border bg-bg px-4 py-3 text-sm text-ink-muted">
          Add <code className="text-ink">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-ink">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
          <code className="text-ink">.env.local</code>, then apply the Phase 2
          migration. See <code className="text-ink">docs/phase-2-setup.md</code>
          .
        </p>
      ) : null}

      <form action={signInWithGoogleAction}>
        <input type="hidden" name="next" value={next} />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!configured || pending}
        >
          Continue with Google
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-ink-faint">
        <span className="h-px flex-1 bg-border" />
        or email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <input type="hidden" name="mode" value={mode} />
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            disabled={!configured || pending}
            placeholder="you@example.com"
            className="h-12 w-full rounded-md border border-border bg-bg px-4 text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent disabled:opacity-60"
          />
        </label>
        <Button
          type="submit"
          size="lg"
          variant="secondary"
          className="w-full"
          disabled={!configured || pending}
        >
          {pending ? "Sending link…" : `${title} with magic link`}
        </Button>
      </form>

      {state ? (
        <p
          className={`text-sm ${state.ok ? "text-accent" : "text-red-700"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <p className="text-center text-sm text-ink-muted">{alternate}</p>
      <p className="text-center text-xs text-ink-faint">
        Browse and copy stay free — accounts unlock favorites.
      </p>
    </div>
  );
}

function decodeError(code: string) {
  if (code === "supabase_not_configured") {
    return "Supabase is not configured on this environment.";
  }
  if (code === "admin_required") {
    return "That area is for admins only.";
  }
  try {
    return decodeURIComponent(code);
  } catch {
    return code;
  }
}
