# Phase 7 — Launch hardening

**Exit condition:** Privacy/terms are published, CI runs lint/unit/build/e2e on PRs, and smoke Playwright covers legal links, return-to-action (mock), anonymous API denial, and client upload size rejection.

## Delivered

- [x] `/privacy` and `/terms` routes with V0-aligned copy
- [x] Footer links to Privacy and Terms
- [x] GitHub Actions CI (`.github/workflows/ci.yml`)
- [x] Playwright `tests/e2e/launch.spec.ts`
  - Legal footer navigation
  - Guest save → sign-in → mock restore (skips full OAuth when Supabase env is set)
  - Anonymous `POST /api/creations` and `PATCH /api/admin/styles/[id]` denied
  - Oversized file rejected in save modal (mock auth)

## Still open (product / content)

- Licensed film-strip hero + authorised before/after catalog assets
- Style owners / tool-mode verification on the register
- Live OAuth Playwright against a dedicated test project (optional)
- Sentry wiring when `SENTRY_DSN` is set
- Production Vercel + Supabase cutover checklist items in `deployment-plan.md`
