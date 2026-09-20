# Phase 4 — Auth + private library

**Exit condition:** Guests can sign in (Google or magic link), pending save actions resume after auth, and saved styles / collections persist in Supabase under RLS.

## Delivered

- [x] Profile auto-create trigger on `auth.users` (`20260920130000_profile_on_signup.sql`)
- [x] Session middleware (`src/middleware.ts`)
- [x] `/auth/callback` code exchange + `/auth/error` recovery
- [x] `/sign-in` route (opens shared modal)
- [x] Real Google OAuth + email magic link in `SignInModal` (mock fallback if env unset)
- [x] Pending-action persistence across OAuth redirects (`sessionStorage`)
- [x] Saved styles + collections read/write via Supabase (`src/lib/library/client.ts`)
- [x] `LibraryProvider` session-aware; creations remain browser-local until Phase 5

## Dashboard setup (required once)

1. Apply the new migration SQL in the Supabase SQL editor (or `npx supabase db push`).
2. **Authentication → URL configuration**
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`
3. **Authentication → Providers**
   - Enable **Google** (client id/secret from Google Cloud)
   - Enable **Email** (magic link / OTP)
4. Confirm catalog was seeded (`npm run db:seed`) so `styles` FK lookups succeed when saving.

## Still open (Phase 5)

- ~~Upload creations to `user-creations` with signed URLs~~ → see `docs/PHASE_5_STATUS.md`
- ~~`/creations/[id]` detail route~~
- ~~Delete + storage cleanup~~
- Playwright: save → sign-in → return-to-action
