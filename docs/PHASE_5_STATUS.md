# Phase 5 — Private creations

**Exit condition:** Signed-in users upload results to private Storage, creations persist under RLS, detail/delete/source-only delete work, and the 25-creation quota is enforced.

## Delivered

- [x] `POST /api/creations` — auth, quota (25), magic-byte MIME check, dimension limits, WebP re-encode (strips metadata), upload to `user-creations/{owner_id}/{creation_id}/…`, immutable `prompt_snapshot`
- [x] `GET|DELETE|PATCH /api/creations/[id]` — owner fetch, signed download redirect, full delete + storage cleanup, source-only removal
- [x] `/creations/[id]` owner detail (prompt snapshot, download, delete, remove source)
- [x] Library list loads remote creations with signed URLs; mock localStorage fallback when Supabase unset
- [x] Analytics: `creation_upload_started`, `creation_upload_completed`, `creation_deleted`
- [x] Unit tests for upload image validation / re-encode

## Local setup

1. Ensure Phase 3–4 migrations are applied (includes `creations` table + `user-creations` bucket RLS).
2. Seed catalog: `npm run db:seed` (style FK required on save).
3. Sign in, open a style → **Save your result** → upload JPEG/PNG/WebP under 10 MB.
4. Confirm row in Table Editor → `creations` and object under Storage → `user-creations`.

## Still open (later)

- Playwright: save → sign-in → return-to-action
- Playwright: two-user authz swap + upload reject cases
- Licensed catalog assets (content)
- ~~Editorial `/admin` (FR09)~~ → see `docs/PHASE_6_STATUS.md`
