-- Repair Data API privileges for homepage curation writes.
-- RLS remains responsible for limiting writes to editors and admins.
grant select, insert, update, delete
  on table public.homepage_settings
  to authenticated;

grant select (updated_by)
  on table public.homepage_settings
  to authenticated;

grant all
  on table public.homepage_settings
  to service_role;
