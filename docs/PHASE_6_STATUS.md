# Phase 6 — Editorial admin

**Exit condition:** Editors/admins can list all styles, move them through draft → review → publish → archive, ordinary users are denied, and publish/archive writes `audit_logs`.

## Delivered

- [x] Migration: `audit_logs` insert policy for editor/admin (`20260920140000_admin_audit_insert.sql`)
- [x] `/admin` style lifecycle UI with status filters and allowed transitions
- [x] `GET /api/admin/styles` + `PATCH /api/admin/styles/[id]` with role checks
- [x] Middleware gate for `/api/admin` (401/403); page shows access-denied for non-editors
- [x] Header **Admin** link only when `profiles.role` is `editor` or `admin`
- [x] Publish/archive write audit log; primary prompt variant status stays aligned
- [x] Unit tests for role + transition helpers

## Promote an editor (one-time SQL)

In Supabase SQL editor, after the user has signed in once (so a profile row exists):

```sql
update public.profiles
set role = 'editor'
where id = '<auth-user-uuid>';
```

Or by email:

```sql
update public.profiles p
set role = 'editor'
from auth.users u
where p.id = u.id and u.email = 'you@example.com';
```

Apply the new migration SQL as well.

## Still open (launch / content)

- ~~Playwright: ordinary user denied admin API; editor publish path~~ → anonymous admin API denial in Phase 7; editor path still manual
- ~~Privacy/terms pages, CI~~ → see `docs/PHASE_7_STATUS.md`
- Licensed catalog assets + style owners
- Sentry when DSN is set
- Production cutover checklist
