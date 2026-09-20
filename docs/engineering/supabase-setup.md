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


| Dashboard value             | `.env.local` key                |
| --------------------------- | ------------------------------- |
| Project URL                 | `NEXT_PUBLIC_SUPABASE_URL`      |
| `anon` / `public` key       | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` key (secret) | `SUPABASE_SERVICE_ROLE_KEY`     |


Keep `NEXT_PUBLIC_APP_URL=http://localhost:3000`.

Never commit `.env.local`. Never put the service role key in client code.

### 3. Apply migrations

In the dashboard: **SQL → New query**.

1. Paste the full contents of `supabase/migrations/` → **Run**.
2. Paste the full contents of `supabase/migrations/20260920120100_catalo20260920120000_init_catalog.sqlg_rls.sql` → **Run**.

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


| Check                                      | Expected                           |
| ------------------------------------------ | ---------------------------------- |
| `.env.local` has all three Supabase values | Non-empty                          |
| Table Editor → `styles`                    | 12 rows, `status = published`      |
| Storage → Buckets                          | `catalog-public`, `user-creations` |
| Site without keys                          | Still works via static seed        |




## Troubleshooting

- **Seed fails with missing env** — fill all three keys; service role is required for seed only.
- **RLS / permission errors on seed** — use the **service_role** key, not the anon key.
- **Migration errors on re-run** — migrations are meant to run once; for a clean slate use a new project or `supabase db reset` locally.
- **App still on seed** — restart `npm run dev` after editing `.env.local`.

---

## Phase 4: Auth providers

After migrations (including `20260920130000_profile_on_signup.sql`):

1. **Authentication → URL configuration**
   - Site URL: `http://localhost:3000`
   - Additional Redirect URLs: `http://localhost:3000/auth/callback`
2. **Authentication → Providers**
   - Enable **Google** and **Email**
3. Restart `npm run dev`, open Sign in, try Google or magic link.

## Phase 5: Private creations

1. Confirm Storage bucket `user-creations` exists (created by the RLS migration) and is **private**.
2. Sign in, open a style, use **Save your result**, upload a JPEG/PNG/WebP under 10 MB.
3. Check Table Editor → `creations` and Storage → `user-creations/{user_id}/{creation_id}/`.
4. Open `/creations/[id]` for download, source-only delete, and full delete.

Quota: **25** creations per user. Oversized or disguised files are rejected server-side after magic-byte checks and WebP re-encode.

---

## Phase 6: Editorial admin

1. Apply `supabase/migrations/20260920140000_admin_audit_insert.sql`.
2. Promote your account:

```sql
update public.profiles p
set role = 'editor'
from auth.users u
where p.id = u.id and u.email = 'you@example.com';
```

3. Sign in again (or refresh) and open `/admin`.
4. Publish/archive a style and confirm a row in `audit_logs`.
5. **Create / edit recipes** via **New style** or **Edit** (`/admin/styles/...`). Content is stored in Supabase.

Ordinary users who open `/admin` see an access-denied page; `/api/admin/*` returns 403.

### Seed overwrite warning

`npm run db:seed` upserts from `src/lib/catalog/seed-styles.ts`. After you edit styles in admin, **do not re-seed matching slugs** unless you intend to overwrite those rows. Prefer admin for ongoing content; use seed for first bootstrap or empty projects only.

