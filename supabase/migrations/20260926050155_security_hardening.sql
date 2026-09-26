-- Repair databases that were provisioned before the security advisors were applied.
-- Safe to re-run: policies are dropped and recreated, grants are revoked explicitly.

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.styles enable row level security;
alter table public.style_tags enable row level security;
alter table public.prompt_variants enable row level security;
alter table public.style_assets enable row level security;
alter table public.saved_styles enable row level security;
alter table public.collections enable row level security;
alter table public.collection_items enable row level security;
alter table public.creations enable row level security;
alter table public.reports enable row level security;
alter table public.audit_logs enable row level security;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated, service_role;

create or replace function private.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

revoke all on function private.current_profile_role() from public;
grant execute on function private.current_profile_role() to anon, authenticated, service_role;

drop function if exists public.current_profile_role();

drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories
  for select using (true);

drop policy if exists tags_public_read on public.tags;
create policy tags_public_read on public.tags
  for select using (true);

drop policy if exists styles_public_read_published on public.styles;
create policy styles_public_read_published on public.styles
  for select using (
    status = 'published'
    or private.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists styles_editor_write on public.styles;
create policy styles_editor_write on public.styles
  for all using (private.current_profile_role() in ('editor', 'admin'))
  with check (private.current_profile_role() in ('editor', 'admin'));

drop policy if exists prompt_variants_public_read on public.prompt_variants;
create policy prompt_variants_public_read on public.prompt_variants
  for select using (
    status = 'published'
    and exists (
      select 1 from public.styles s
      where s.id = prompt_variants.style_id and s.status = 'published'
    )
    or private.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists prompt_variants_editor_write on public.prompt_variants;
create policy prompt_variants_editor_write on public.prompt_variants
  for all using (private.current_profile_role() in ('editor', 'admin'))
  with check (private.current_profile_role() in ('editor', 'admin'));

drop policy if exists style_assets_public_read on public.style_assets;
create policy style_assets_public_read on public.style_assets
  for select using (
    exists (
      select 1 from public.styles s
      where s.id = style_assets.style_id and s.status = 'published'
    )
    or private.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists style_assets_editor_write on public.style_assets;
create policy style_assets_editor_write on public.style_assets
  for all using (private.current_profile_role() in ('editor', 'admin'))
  with check (private.current_profile_role() in ('editor', 'admin'));

drop policy if exists style_tags_public_read on public.style_tags;
create policy style_tags_public_read on public.style_tags
  for select using (
    exists (
      select 1 from public.styles s
      where s.id = style_tags.style_id and s.status = 'published'
    )
    or private.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists style_tags_editor_write on public.style_tags;
create policy style_tags_editor_write on public.style_tags
  for all using (private.current_profile_role() in ('editor', 'admin'))
  with check (private.current_profile_role() in ('editor', 'admin'));

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (
    id = auth.uid()
    or private.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert to authenticated
  with check (id = auth.uid());

drop policy if exists saved_styles_owner on public.saved_styles;
create policy saved_styles_owner on public.saved_styles
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists collections_owner on public.collections;
create policy collections_owner on public.collections
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists collection_items_owner on public.collection_items;
create policy collection_items_owner on public.collection_items
  for all using (
    exists (
      select 1 from public.collections c
      where c.id = collection_items.collection_id and c.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.collections c
      where c.id = collection_items.collection_id and c.owner_id = auth.uid()
    )
  );

drop policy if exists creations_owner on public.creations;
create policy creations_owner on public.creations
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists reports_insert_auth on public.reports;
create policy reports_insert_auth on public.reports
  for insert to authenticated
  with check (reporter_id = auth.uid());

drop policy if exists reports_editor on public.reports;
create policy reports_editor on public.reports
  for all using (private.current_profile_role() in ('editor', 'admin'))
  with check (private.current_profile_role() in ('editor', 'admin'));

drop policy if exists audit_logs_editor_read on public.audit_logs;
create policy audit_logs_editor_read on public.audit_logs
  for select using (private.current_profile_role() in ('editor', 'admin'));

drop policy if exists audit_logs_editor_insert on public.audit_logs;
create policy audit_logs_editor_insert on public.audit_logs
  for insert to authenticated
  with check (
    actor_id = auth.uid()
    and private.current_profile_role() in ('editor', 'admin')
  );

insert into storage.buckets (id, name, public)
values
  ('catalog-public', 'catalog-public', true),
  ('user-creations', 'user-creations', false)
on conflict (id) do nothing;

drop policy if exists catalog_public_read on storage.objects;
create policy catalog_public_read on storage.objects
  for select using (bucket_id = 'catalog-public');

drop policy if exists catalog_public_editor_write on storage.objects;
create policy catalog_public_editor_write on storage.objects
  for all using (
    bucket_id = 'catalog-public'
    and private.current_profile_role() in ('editor', 'admin')
  )
  with check (
    bucket_id = 'catalog-public'
    and private.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists user_creations_owner on storage.objects;
create policy user_creations_owner on storage.objects
  for all using (
    bucket_id = 'user-creations'
    and auth.uid()::text = (storage.foldername(name))[1]
  )
  with check (
    bucket_id = 'user-creations'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

revoke update on table public.profiles from anon, authenticated;
grant update (display_name, preferences) on table public.profiles to authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

revoke all on function public.handle_new_user() from public, anon, authenticated;
grant execute on function public.handle_new_user() to supabase_auth_admin;
