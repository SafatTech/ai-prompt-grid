# Catalog seed

Populate the Supabase catalog from the TypeScript seed used by the app fallback.

## Prerequisites

1. Apply migrations (`supabase/migrations/*.sql`) to your project.
2. Set in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only; never commit)

## Run

```bash
npm run db:seed
```

Full seed upserts every style, re-uploads local `/catalog` assets, and **deletes** DB styles not in code.

To insert only styles missing from the DB (no deletes, rewrites, or image uploads):

```bash
npm run db:seed:missing -- --dry-run
npm run db:seed:missing
# optional: npm run db:seed:missing -- --slugs=slug-a,slug-b
```

Without Supabase env vars, the Next.js app continues to serve the static seed in `src/lib/catalog/seed-styles.ts`.
