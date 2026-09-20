# Access control

**Principle:** database rules and storage rules must agree. Changing an ID in a request must never allow a user to read, edit, download, or delete another user’s content.

Implement with Supabase Auth + Postgres RLS + Storage policies. Service role keys stay server-only.

## Role matrix

| Resource | Guest | Signed-in user | Editor / Admin |
|---|---|---|---|
| Published styles and catalog images | Read | Read | Read and manage |
| Draft or archived styles | Denied | Denied | Manage according to role |
| Saved styles and collections | Denied | Own records only | No routine access |
| Creations, source files, result files | Denied | Own records/files only | Only via a documented support process (not in V0 default) |
| Editorial audit records | Denied | Denied | Read/manage according to role |
| Reports | Create (optional) | Create | Triage / resolve |
| `/admin` routes and mutations | Denied | Denied | Allowed by role |

## Auth providers

- Google OAuth  
- Email magic link  

Rules:

- Use provider-verified identity linking only  
- Never merge accounts from client-supplied email values alone  
- After sign-in, restore the pending return action (save style, save result, library)  
- Document redirect URLs per environment before enabling providers  

## RLS intent (per table)

### profiles

- Users can `select`/`update` their own row  
- Editors may `select` limited fields needed for admin UX  
- Inserts via trigger on `auth.users` creation  

### categories, tags

- Public `select` for everyone  
- Write: editor/admin only  

### styles, style_tags, prompt_variants, style_assets

- Public `select` where `styles.status = 'published'` (and related published assets/variants)  
- Draft/archived: editor/admin only  
- Writes: editor/admin only  
- Publishing/archiving writes an `audit_logs` row  

### saved_styles, collections, collection_items

- All operations: `auth.uid() = owner/user_id`  
- No cross-user reads  

### creations

- All operations: `auth.uid() = owner_id`  
- Authorization tests must deliberately swap creation IDs across two users and expect denial  

### reports

- Authenticated insert with own `reporter_id`  
- Resolve: editor/admin  

### audit_logs

- Insert from trusted server/editor paths only  
- Read: editor/admin  
- No updates/deletes in normal operation  

## Storage policies

| Bucket | Guest | Owner | Editor |
|---|---|---|---|
| `catalog-public` | Read published objects | Read | Manage catalog objects |
| `user-creations` | Denied | CRUD only under own prefix | Denied by default |

Private downloads use short-lived signed URLs. Never expose service-role credentials to the browser.

## Application-layer checks

Even with RLS enabled:

1. Validate IDs with Zod on every mutation  
2. Re-check ownership in server actions / route handlers before signed URL issuance  
3. Deny admin UI and admin APIs for `role = user`  
4. Rate-limit auth and upload endpoints  

## Support access (explicit non-goal for default V0)

Staff access to private user photos is **not** enabled by default. If ever added, it requires a written support process, time-bounded access, and audit logging. Until then, editors have no routine access to creations.
