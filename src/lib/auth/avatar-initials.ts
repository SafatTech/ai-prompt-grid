type AuthUserLike = {
  email?: string | null;
  user_metadata?: Record<string, unknown>;
} | null | undefined;

function firstLetters(parts: string[], count: number): string {
  return parts
    .slice(0, count)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function initialsFromLabel(label: string): string {
  const words = label.split(/[\s._-]+/).filter(Boolean);
  if (words.length >= 2) return firstLetters(words, 2);
  return label.slice(0, 2).toUpperCase();
}

export function identityFromAuthUser(user: AuthUserLike): {
  name: string | null;
  email: string | null;
} {
  if (!user) return { name: null, email: null };
  const meta = user.user_metadata ?? {};
  const candidates = [meta.full_name, meta.name, meta.display_name];
  const name = candidates.find(
    (value): value is string => typeof value === "string" && value.trim().length > 0,
  );
  return {
    name: name?.trim() ?? null,
    email: user.email?.trim() || null,
  };
}

/** Two-letter initials from a display name, falling back to the email local-part. */
export function getAvatarInitials(
  name?: string | null,
  email?: string | null,
): string {
  const trimmedName = name?.trim();
  if (trimmedName) return initialsFromLabel(trimmedName);

  const local = email?.split("@")[0]?.trim();
  if (local) return initialsFromLabel(local);

  return "?";
}
