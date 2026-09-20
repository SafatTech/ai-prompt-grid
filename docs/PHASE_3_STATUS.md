# Phase 3 — Supabase catalog integration

**Exit condition:** Public catalog can load from Supabase when configured, with static seed fallback when it is not.

## Delivered

- [x] Schema migration: profiles, categories, tags, styles, style_tags, prompt_variants, style_assets, private user tables
- [x] RLS + storage buckets (`catalog-public`, `user-creations`)
- [x] SSR / browser / admin Supabase clients (`src/lib/supabase/*`)
- [x] Env helpers (`isSupabaseConfigured`, public + service-role readers)
- [x] Catalog repository with DB → `CatalogStyle` mapper and seed fallback
- [x] Seed script: `npm run db:seed` (service role)
- [x] Home / Explore / Library / Style detail pages load catalog asynchronously

## Local setup

See **`docs/engineering/supabase-setup.md`** for the full walkthrough.

1. Create a Supabase project (or use local CLI).
2. Apply `supabase/migrations/*.sql`.
3. Copy `.env.example` → `.env.local` and fill URL, anon key, service role key.
4. Run `npm run db:seed`.
5. Restart `npm run dev` — catalog reads from the database.

Without env vars, the app keeps serving `src/lib/catalog/seed-styles.ts` (no breakage for Phase 1–2 flows).

## Still open (Phase 4+)

- Auth sign-in (replace localStorage library mock)
- Persist saved styles / collections / creations to private tables
- Upload pipeline into `user-creations` with signed URLs
- Replace Picsum placeholders with licensed catalog assets in Storage
