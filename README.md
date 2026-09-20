# AI Prompt Grid

Private beta product for discovering tested **photo-transformation** prompts, copying them into external AI editors, and saving results privately.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Auth, Postgres, Storage) — catalog wired in Phase 3 (seed fallback when unset)
- Zod, Vercel, Playwright

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local Next.js server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |
| `npm run test:unit` | Node unit tests |
| `npm run test:e2e` | Playwright e2e |
| `npm run db:seed` | Upsert catalog seed into Supabase (needs service role) |

## Repository layout

```text
src/app/                 App Router pages
src/components/          UI components (Phase 1+)
src/lib/                 Shared utilities, env, catalog, Supabase clients
public/catalog/          Public catalog assets
public/brand/            Brand assets
docs/product/            Spec, UI handoff, flows
docs/engineering/        Data model, access, quality, analytics, deploy
docs/content/            Style register
prototype/               Approved HTML prototype (reference only)
supabase/migrations/     SQL migrations
supabase/seed/           Seed docs (script: npm run db:seed)
tests/e2e/               Playwright
tests/unit/              Unit tests
```

## Documentation

| Doc | Path |
|---|---|
| Phase 0 guide | `docs/AI_Prompt_Grid_Phase_0_Implementation.md` |
| V0 spec (summary) | `docs/product/v0-product-specification.md` |
| UI handoff | `docs/product/ui-handoff.md` |
| User flows | `docs/product/user-flows.md` |
| Style register | `docs/content/style-register.md` |
| Data model | `docs/engineering/data-model.md` |
| Access control | `docs/engineering/access-control.md` |
| Quality plan | `docs/engineering/quality-plan.md` |
| Analytics | `docs/engineering/analytics-events.md` |
| Deployment | `docs/engineering/deployment-plan.md` |
| Supabase setup | `docs/engineering/supabase-setup.md` |
| Phase 5 status | `docs/PHASE_5_STATUS.md` |
| Phase 6 status | `docs/PHASE_6_STATUS.md` |
| Phase 7 status | `docs/PHASE_7_STATUS.md` |
| Phase 8 status | `docs/PHASE_8_STATUS.md` |

## Phase status

**Phase 0 (foundation)** — complete enough to build; content ownership still open (see `docs/PHASE_0_STATUS.md`).

**Phase 2 (public catalog)** — complete for static seed (see `docs/PHASE_2_STATUS.md`).

**Phase 4 (Auth + library)** — complete for accounts + saves (see `docs/PHASE_4_STATUS.md`):

- [x] Google OAuth + magic link, `/auth/callback`, session middleware
- [x] Saved styles and collections in Supabase (RLS)
- [x] Pending-action restore after sign-in

**Phase 5 (Private creations)** — complete for cloud uploads (see `docs/PHASE_5_STATUS.md`):

- [x] Upload to `user-creations` with validation + WebP re-encode
- [x] `/creations/[id]`, delete, source-only delete, 25-creation quota

**Phase 6 (Editorial admin)** — complete for lifecycle (see `docs/PHASE_6_STATUS.md`):

- [x] `/admin` draft → review → publish → archive
- [x] Role denial for ordinary users; audit log on publish/archive

**Phase 7 (Launch hardening)** — complete for legal + CI smoke (see `docs/PHASE_7_STATUS.md`):

- [x] Privacy / terms pages
- [x] GitHub Actions CI
- [x] Extra Playwright coverage for auth gate and upload size

**Phase 8 (Admin content editor)** — create/edit style recipes in `/admin` (see `docs/PHASE_8_STATUS.md`).

**Still open for full V0:** licensed catalog assets, style owners, optional live-OAuth e2e, Sentry, production cutover.

## Secrets

Never commit `.env.local` or service-role keys. Only `.env.example` is tracked.
