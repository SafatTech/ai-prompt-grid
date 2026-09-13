# Tech & Environment Checklist — AIPromptGrid v1

**Status:** Draft for approval (Phase 0)  
**Product:** AIPromptGrid  
**Stack (locked):** Next.js (App Router) + TypeScript + Tailwind + Supabase + Vercel  
**Last updated:** 2026-09-12  
**Related:** [prd-v1.md](./prd-v1.md) · [content-model.md](./content-model.md) · [ia-sitemap.md](./ia-sitemap.md)

---

## 1. Accounts & projects to create

| Service | Purpose | Done |
| --- | --- | --- |
| GitHub (or Git) repo | Source | [ ] |
| Vercel project | Hosting / previews | [ ] |
| Supabase project | Auth, Postgres, Storage | [ ] |
| Google Cloud OAuth client | Google sign-in | [ ] |
| Domain (optional at start) | `aipromptgrid.com` later | [ ] |

---

## 2. Environment variables (template)

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # server-only; admin/waitlist as needed

# Auth redirects (Supabase dashboard must allow)
# http://localhost:3000/auth/callback
# https://<prod>/auth/callback
```

Never commit real secrets. Ship `.env.example` only.

---

## 3. Supabase setup checklist

| Item | Notes | Done |
| --- | --- | --- |
| Enable Email magic link | Auth → Providers | [ ] *(your project)* |
| Enable Google provider | Client ID/secret | [ ] *(your project)* |
| Redirect URLs | Local + Vercel preview + prod | [ ] *(your project)* |
| Tables per content model | [`supabase/migrations/20260912120000_init.sql`](../supabase/migrations/20260912120000_init.sql) | [x] |
| RLS policies | Per content-model §11 + publish trigger | [x] |
| Storage bucket `style-images` | Public read; admin write | [x] |
| First admin profile | SQL bootstrap — see [phase-2-setup.md](./phase-2-setup.md) | [ ] *(your project)* |
| App auth + proxy session | Magic link, Google, `/auth/callback`, `src/proxy.ts` | [x] |
| Admin route gate | `requireAdmin()` on `/admin/*` | [x] |

Full walkthrough: [phase-2-setup.md](./phase-2-setup.md).

---

## 4. App bootstrap checklist (Phase 1)

| Item | Done |
| --- | --- |
| `create-next-app` App Router + TS + Tailwind + ESLint | [x] |
| Path aliases, base layout, fonts from design direction | [x] |
| Design tokens as CSS variables (Graphite Gallery) | [x] |
| Site header/footer + Create/Explore nav (Proxima IA) | [x] |
| Route stubs for public + admin sitemap | [x] |
| Supabase browser + server clients + `.env.example` | [x] |
| Deploy empty shell to Vercel | [ ] *(run when ready)* |

---

## 5. Phase mapping (build order)

| Phase | Focus |
| --- | --- |
| 0 | Docs (this set) |
| 1 | Scaffold + design tokens + shell deploy |
| 2 | Migrations, RLS, auth, storage |
| 3 | Public UI (home, explore, detail, favorites, waitlists) |
| 4 | Admin CMS |
| 5 | Content (24 styles), SEO, legal pages, polish |
| 6 | Ops cadence + copy metrics |

---

## 6. Admin bootstrap process

1. Sign up via normal auth once app exists.  
2. In Supabase SQL: update `profiles` set `role = 'admin'` where email = `...`.  
3. Confirm `/admin` loads.  
4. Create categories seed → first draft style → upload proof → publish.

---

## 7. Quality gates before “v1 done”

| Gate | Criteria |
| --- | --- |
| Auth | Magic link + Google work on prod URL |
| RLS | Anon cannot read drafts; cannot write styles |
| Publish | Cannot publish without before+after |
| Copy | Clipboard + counter/event works |
| Waitlist | Both interests store uniquely |
| Content | ≥20 published styles |
| Legal | `/privacy` + `/terms` live |
| Perf | Home + style detail acceptable LCP on mobile |

---

## 8. Explicitly deferred tooling

- Paddle / Lemon Squeezy  
- Image generation APIs  
- Error tracking optional (Sentry later)  
- Heavy analytics suite (start with copy_count + simple events)

---

## 9. Approval checklist

- [ ] Stack confirmed  
- [ ] Env var list complete enough to start Phase 1  
- [ ] Admin bootstrap understood  
- [ ] **Phase 0 complete** → begin Phase 1 when you say go  
