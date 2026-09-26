# Singapore migration status (rbmirzmppbytorbhncxj)

## Applied via MCP `execute_sql`

- Styles: chunks `02`–`07` — OK (40 rows)
- `prompt_variants`: chunk `08` only (5/40) — apply `09`–`15` next
- `style_tags`: wrapped insert from `style_tags.json` — OK (119 rows)
- Storage: 80/80 via `copy-storage.mjs`; temp migration policies dropped

## Fix applied

- `node tmp/sin1-migrate/fix-jsonb-quotes.mjs` — repairs invalid `"[\"source photo\"]"::jsonb` in exports

## Finish SQL (no MCP token in shell)

```powershell
$env:SUPABASE_ACCESS_TOKEN = "<dashboard PAT>"
node tmp/sin1-migrate/apply-chunks-api.mjs 9 41
```

Or MCP `execute_sql` per `tmp/sin1-migrate/mcp-payloads-out/*.json` (chunks 09–41).

## Ready to apply (no truncation)

Each file is `{ project_id, query }` for MCP:

- `tmp/sin1-migrate/mcp-invoke/batch-00.json` … `batch-05.json` (merged batches)
- `tmp/sin1-migrate/mcp-invoke/02.json` … `42-style_tags.json` (per-chunk; skip `01.json` if already applied)

Apply order: `batch-00` … `batch-05` **or** chunks `02`–`42-style_tags` after `01`.

## Storage

1. Create temp policies on Singapore (if not present):

```sql
create policy catalog_public_migration_write on storage.objects for insert to anon with check (bucket_id = 'catalog-public');
create policy catalog_public_migration_update on storage.objects for update to anon using (bucket_id = 'catalog-public') with check (bucket_id = 'catalog-public');
```

2. `node tmp/sin1-migrate/copy-storage.mjs`
3. Drop policies:

```sql
drop policy if exists catalog_public_migration_write on storage.objects;
drop policy if exists catalog_public_migration_update on storage.objects;
```

## Verify

```sql
select (select count(*) from public.styles) as styles,
       (select count(*) from public.prompt_variants) as prompt_variants,
       (select count(*) from public.style_assets) as style_assets,
       (select count(*) from public.style_tags) as style_tags,
       (select count(*) from storage.objects where bucket_id = 'catalog-public') as storage_objects,
       (select count(*) from public.profiles) as profiles;
```

Expected: ~40 / 40 / 120 / 120 / 80 / 3.
