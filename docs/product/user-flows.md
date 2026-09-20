# User flows — AI Prompt Grid V0

## 1. Guest discovery and copy

```text
Home → Explore (optional filters/search) → Style detail
  → Customize prompt options
  → Copy prompt
  → (External AI editor — outside product)
```

**Acceptance:** Guest can complete browse → customize → copy without signing in. Clipboard failure offers manual select/copy.

## 2. Guest attempts a protected action

```text
Save style / Save result / Open Library
  → Sign-in modal (or /sign-in)
  → Google OAuth or magic link
  → Return to pending action
```

**Acceptance:** Pending action is restored after successful auth. Guest can dismiss and continue browsing.

## 3. Save a style

```text
Signed-in user on card or detail → Save
  → Style appears under Library → Saved styles
  → Optional: add to a named collection
```

**Acceptance:** Unique `(user_id, style_id)`. Unsaving removes from saved list and collections but never deletes creations.

## 4. Create and use a collection

```text
Library → Collections → New collection
  → Name collection
  → Move saved styles into it
```

**Acceptance:** Collections are private and owner-only.

## 5. Save a creation (external result)

```text
Style detail → Save your result
  → (Sign in if needed)
  → Upload AI result (required)
  → Optional source photo + notes
  → Saved under Library → My creations
  → Linked style + prompt snapshot + tool
```

**Acceptance:** Files stored in private bucket. Prompt snapshot frozen even if public recipe later changes. Owner can download/delete.

## 6. Delete creation or source

```text
My creations → Delete creation
  → Removes result, optional source, thumbnails

OR delete source only → result remains
```

## 7. How it works (education)

```text
Nav / Home CTA → How it works section (or /how-it-works)
  → Clarifies external-tool transformation
```

**Acceptance:** No homepage upload that implies onsite generation.

## 8. Editorial (editors only — later phases)

```text
/admin → Draft / review / publish / archive styles and prompt variants
  → Audit log on publish/archive
```

Ordinary users are denied admin routes and mutations.
