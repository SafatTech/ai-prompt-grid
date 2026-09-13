# Phase 2 setup — Supabase auth, DB, storage

**Product:** AIPromptGrid  
**Applies:** migrations, RLS, magic link + Google auth, admin role, `style-images` bucket

---

## 1. Create a Supabase project

1. Create a project at [supabase.com](https://supabase.com).  
2. Copy **Project URL** and **anon public** key into `.env.local`:

```bash
cp .env.example .env.local
```

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Restart `npm run dev` after saving env.

---

## 2. Apply the migration

**Option A — SQL Editor (fastest)**  
1. Open Supabase → SQL → New query.  
2. Paste the full contents of  
   [`supabase/migrations/20260912120000_init.sql`](../supabase/migrations/20260912120000_init.sql)  
3. Run. You should see 9 categories and 2 **draft** styles.

**Option B — Supabase CLI**

```bash
npx supabase login
npx supabase link --project-ref YOUR_REF
npx supabase db push
```

---

## 3. Auth providers

### Email magic link

1. Authentication → Providers → Email → enable.  
2. Authentication → URL configuration:  
   - Site URL: `http://localhost:3000`  
   - Redirect URLs:  
     - `http://localhost:3000/auth/callback`  
     - `https://YOUR_PRODUCTION_DOMAIN/auth/callback`

### Google

1. Create OAuth credentials in Google Cloud Console.  
2. Authorized redirect URI:  
   `https://YOUR_PROJECT.supabase.co/auth/v1/callback`  
3. Authentication → Providers → Google → paste Client ID/secret → enable.

---

## 4. Bootstrap your first admin

1. Register on the site (`/register`) with your email (or Google).  
2. In SQL Editor:

```sql
update public.profiles
set role = 'admin'
where id = (
  select id from auth.users where email = 'YOU@EXAMPLE.COM'
);
```

3. Open `/admin` — you should see dashboard counts and the seeded draft styles.

**Note:** Clients cannot self-escalate `role` (DB trigger). Use SQL / service role only.

---

## 5. Verify RLS (smoke)

| Check | Expected |
| --- | --- |
| Signed-out Explore | No draft styles visible |
| `/admin` as non-admin | Redirect home |
| `/admin` as admin | Dashboard + style list with drafts |
| Waitlist submit | Row in `waitlist_entries` (deduped per email+interest) |
| Publish without before/after | DB raises exception (enforced in trigger) |

---

## 6. Storage

Migration creates public bucket `style-images` (5MB, jpeg/png/webp/gif).  
- Public: read  
- Admin: insert/update/delete  

Uploads are wired in **Phase 4** admin CMS.

---

## 7. Local without Supabase

The app still builds and runs. Auth buttons disable with setup hints; categories fall back to seed constants; waitlist shows a local success message.

---

## Phase 2 exit criteria

- [x] Migrations in repo  
- [x] RLS + publish guards + copy RPC  
- [x] Storage bucket policies  
- [x] Magic link + Google server actions  
- [x] Auth callback + Next.js 16 `proxy` session refresh  
- [x] Profiles + admin gate on `/admin`  
- [x] Waitlist writes to DB  
- [ ] Your project: apply SQL + set admin email (manual)
