# Deployment plan

## Environments

| Environment | App host | Supabase | Purpose |
|---|---|---|---|
| Local | `http://localhost:3000` | Dev project | Feature work |
| Preview | Vercel preview URLs | Dev (or isolated preview) project | PR review |
| Production | Vercel production | Production project | Private beta |

Never test with production user photos in development.

## Required configuration

See `.env.example`:

```dotenv
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SENTRY_DSN=
```

Rules:

- `SUPABASE_SERVICE_ROLE_KEY` is **server-only** — never expose to the browser or `NEXT_PUBLIC_*`  
- Commit `.env.example` only; real secrets stay in Vercel / local `.env.local`  
- Separate storage buckets and data per environment  

## Auth redirect URLs

Configure these in Supabase **Authentication → URL configuration** (and Google Cloud OAuth if using Google).

| Purpose | Local | Preview | Production |
|---|---|---|---|
| Site URL | `http://localhost:3000` | Preview origin | Production origin |
| Redirect allow list | `http://localhost:3000/auth/callback` | `https://*.vercel.app/auth/callback` | `https://YOUR_DOMAIN/auth/callback` |
| Post-auth app return | `/auth/callback?next=/` | same | same |

Enable providers under **Authentication → Providers**: Google and Email (magic link / OTP).

Also plan privacy-policy and terms pages before public beta invites.

**Status:** `/privacy` and `/terms` shipped in Phase 7.

## Release path

1. Phase 1–2: Vercel preview from feature branches; mock or seeded public data  
2. Phase 3: apply migrations to **dev** Supabase first; verify RLS  
3. Phase 4–5: enable OAuth/magic link on non-prod; then production with restricted beta access  
4. Promote migrations to production only after backup + restore verification  

## Operational checklist

- [x] Privacy policy and terms pages planned (`/privacy`, `/terms`)
- [x] CI workflow for lint, unit, build, Playwright smoke
- [ ] Dev + prod Supabase projects created  
- [ ] Dev + prod Vercel projects/env vars set  
- [ ] `catalog-public` and `user-creations` buckets configured per env  
- [ ] Auth providers configured with correct redirect allow-lists  
- [ ] Error monitoring DSN set (no PII/image payloads)  
- [ ] Backup / restore drill documented for Postgres + storage  

## Out of scope for Phase 0

No production cutover, no live OAuth credentials in the repo, no CI secrets committed.
