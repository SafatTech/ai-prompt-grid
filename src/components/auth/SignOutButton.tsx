"use client";

import { signOut } from "@/lib/auth/actions";
import { Button } from "@/components/ui/Button";

export function SignOutButton({
  variant = "secondary",
  className,
}: {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  return (
    <form action={signOut}>
      <Button type="submit" variant={variant} className={className}>
        Sign out
      </Button>
    </form>
  );
}
