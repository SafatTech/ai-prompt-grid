-- Phase 3: RLS + storage boundaries for public catalog / private user data

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

-- Helper: current profile role
create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- Categories / tags: public read
drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories
  for select using (true);

drop policy if exists tags_public_read on public.tags;
create policy tags_public_read on public.tags
  for select using (true);

-- Styles: published readable by anyone; editors manage all
drop policy if exists styles_public_read_published on public.styles;
create policy styles_public_read_published on public.styles
  for select using (
    status = 'published'
    or public.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists styles_editor_write on public.styles;
create policy styles_editor_write on public.styles
  for all using (public.current_profile_role() in ('editor', 'admin'))
  with check (public.current_profile_role() in ('editor', 'admin'));

-- Prompt variants / assets / style_tags follow parent style visibility
drop policy if exists prompt_variants_public_read on public.prompt_variants;
create policy prompt_variants_public_read on public.prompt_variants
  for select using (
    status = 'published'
    and exists (
      select 1 from public.styles s
      where s.id = prompt_variants.style_id and s.status = 'published'
    )
    or public.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists prompt_variants_editor_write on public.prompt_variants;
create policy prompt_variants_editor_write on public.prompt_variants
  for all using (public.current_profile_role() in ('editor', 'admin'))
  with check (public.current_profile_role() in ('editor', 'admin'));

drop policy if exists style_assets_public_read on public.style_assets;
create policy style_assets_public_read on public.style_assets
  for select using (
    exists (
      select 1 from public.styles s
      where s.id = style_assets.style_id and s.status = 'published'
    )
    or public.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists style_assets_editor_write on public.style_assets;
create policy style_assets_editor_write on public.style_assets
  for all using (public.current_profile_role() in ('editor', 'admin'))
  with check (public.current_profile_role() in ('editor', 'admin'));

drop policy if exists style_tags_public_read on public.style_tags;
create policy style_tags_public_read on public.style_tags
  for select using (
    exists (
      select 1 from public.styles s
      where s.id = style_tags.style_id and s.status = 'published'
    )
    or public.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists style_tags_editor_write on public.style_tags;
create policy style_tags_editor_write on public.style_tags
  for all using (public.current_profile_role() in ('editor', 'admin'))
  with check (public.current_profile_role() in ('editor', 'admin'));

-- Profiles: own row
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (
    id = auth.uid()
    or public.current_profile_role() in ('editor', 'admin')
  );

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid());

-- Saved / collections / creations: owner only
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

-- Reports: authenticated insert; editors triage
drop policy if exists reports_insert_auth on public.reports;
create policy reports_insert_auth on public.reports
  for insert to authenticated
  with check (reporter_id = auth.uid());

drop policy if exists reports_editor on public.reports;
create policy reports_editor on public.reports
  for all using (public.current_profile_role() in ('editor', 'admin'))
  with check (public.current_profile_role() in ('editor', 'admin'));

-- Audit logs: editors read; writes via service role / editor paths
drop policy if exists audit_logs_editor_read on public.audit_logs;
create policy audit_logs_editor_read on public.audit_logs
  for select using (public.current_profile_role() in ('editor', 'admin'));

-- ---------------------------------------------------------------------------
-- Storage buckets (public catalog vs private creations)
-- ---------------------------------------------------------------------------
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
    and public.current_profile_role() in ('editor', 'admin')
  )
  with check (
    bucket_id = 'catalog-public'
    and public.current_profile_role() in ('editor', 'admin')
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
