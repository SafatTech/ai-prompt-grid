-- Phase 6: allow editors/admins to write audit_logs for publish/archive

drop policy if exists audit_logs_editor_insert on public.audit_logs;
create policy audit_logs_editor_insert on public.audit_logs
  for insert to authenticated
  with check (
    actor_id = auth.uid()
    and public.current_profile_role() in ('editor', 'admin')
  );
