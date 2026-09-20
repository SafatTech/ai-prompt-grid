# Phase 8 — Admin style content editor

**Exit condition:** Editors can create and edit style recipes (metadata + primary prompt variant + evidence URLs) in `/admin`, with optional catalog-public image uploads; guests never see drafts.

## Delivered

- [x] Zod `adminStyleContentSchema` (slug, placeholders, ≥2 examples, defaults)
- [x] `styles-read` / `styles-write` libs
- [x] `POST /api/admin/styles`, `GET|PUT /api/admin/styles/[id]` (PATCH lifecycle kept)
- [x] `POST /api/admin/styles/[id]/assets` — catalog-public upload + provenance
- [x] `/admin/styles/new` and `/admin/styles/[slug]/edit` with live `assemblePrompt` preview
- [x] Admin list: **New style** + **Edit** links
- [x] Unit tests for placeholders / slug rules

## Source of truth

After bootstrap, **Supabase is the source of truth** for catalog content.  
[`src/lib/catalog/seed-styles.ts`](../src/lib/catalog/seed-styles.ts) is bootstrap / offline fallback only.

**Warning:** `npm run db:seed` upserts from seed and **can overwrite** admin edits for matching slugs. Prefer admin for day-to-day content changes after the first seed.

## Still open

- Per-style editable mood/background/ratio option lists
- Multiple prompt variants UI
- Category CRUD UI
