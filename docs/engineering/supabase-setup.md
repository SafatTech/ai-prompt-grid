# Supabase setup (Phase 3)

Two options. Prefer **A (hosted)** unless you already use Docker locally.

## A. Hosted project (recommended)

### 1. Create the project

1. Open [https://database.new/](https://database.new/) and sign in.
2. Create a project (name e.g. `ai-prompt-grid-dev`).
3. Save the **database password** somewhere safe.
4. Wait until the project status is healthy.

### 2. Copy API keys into `.env.local`

In the dashboard: **Project Settings → API** (or the Connect dialog).

| Dashboard value | `.env.local` key |
|---|---|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| `anon` / `public` key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` key (secret) | `SUPABASE_SERVICE_ROLE_KEY` |

Keep `NEXT_PUBLIC_APP_URL=http://localhost:3000`.

Never commit `.env.local`. Never put the service role key in client code.

### 3. Apply migrations

In the dashboard: **SQL → New query**.

1. Paste the full contents of `supabase/migrations/20260920120000_init_catalog.sql` → **Run**.
2. Paste the full contents of `supabase/migrations/20260920120100_catalog_rls.sql` → **Run**.

Or from this repo (after `npx supabase login` and `npx supabase link --project-ref <ref>`):

```bash
npx supabase db push
```

### 4. Seed the catalog

```bash
npm run db:seed
```

You should see `Seeded …` for each of the 12 styles, then `Done. Seeded 12 styles.`

### 5. Restart the app

```bash
npm run dev
```

Confirm in the terminal that catalog queries no longer warn about seed fallback. In Supabase **Table Editor**, `styles` should show 12 published rows.

---

## B. Local Supabase (Docker)

Requires Docker Desktop running.

```bash
npx supabase start
npx supabase db reset
npm run db:seed
```

`supabase start` prints local URL and keys — put those into `.env.local`, then restart `npm run dev`.

---

## Quick checks

| Check | Expected |
|---|---|
| `.env.local` has all three Supabase values | Non-empty |
| Table Editor → `styles` | 12 rows, `status = published` |
| Storage → Buckets | `catalog-public`, `user-creations` |
| Site without keys | Still works via static seed |

## Troubleshooting

- **Seed fails with missing env** — fill all three keys; service role is required for seed only.
- **RLS / permission errors on seed** — use the **service_role** key, not the anon key.
- **Migration errors on re-run** — migrations are meant to run once; for a clean slate use a new project or `supabase db reset` locally.
- **App still on seed** — restart `npm run dev` after editing `.env.local`.
