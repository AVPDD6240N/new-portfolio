-- Run in a NEW Supabase project via SQL Editor (or through Supabase migrations).
-- A signed-in account is NOT automatically an administrator. Only public.portfolio_admins can edit.
create extension if not exists pgcrypto;
create schema if not exists private;

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  added_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb check (jsonb_typeof(value) = 'object'),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_entries (
  id uuid primary key default gen_random_uuid(),
  collection text not null check (collection in ('projects', 'designWorks', 'certificates', 'volunteering', 'posts', 'skills')),
  slug text not null check (length(slug) between 1 and 130),
  data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object'),
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(collection, slug)
);
create index if not exists portfolio_entries_public_idx on public.portfolio_entries(collection, status, sort_order);

create or replace function private.is_portfolio_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.portfolio_admins where user_id = (select auth.uid()));
$$;
revoke all on function private.is_portfolio_admin() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_portfolio_admin() to authenticated;

create or replace function private.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at := now(); return new; end;
$$;
drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch before update on public.site_settings for each row execute function private.touch_updated_at();
drop trigger if exists portfolio_entries_touch on public.portfolio_entries;
create trigger portfolio_entries_touch before update on public.portfolio_entries for each row execute function private.touch_updated_at();

alter table public.portfolio_admins enable row level security;
alter table public.site_settings enable row level security;
alter table public.portfolio_entries enable row level security;
revoke all on public.portfolio_admins, public.site_settings, public.portfolio_entries from anon, authenticated;
grant select on public.portfolio_admins to authenticated;
grant select on public.site_settings, public.portfolio_entries to anon, authenticated;
grant insert, update, delete on public.site_settings, public.portfolio_entries to authenticated;

create policy "admin only self membership lookup" on public.portfolio_admins for select to authenticated
  using (user_id = (select auth.uid()));

create policy "public approved settings" on public.site_settings for select to anon
  using (key in ('profile','page_copy'));
create policy "authenticated public settings or admin" on public.site_settings for select to authenticated
  using (key in ('profile','page_copy') or (select private.is_portfolio_admin()));
create policy "admin insert settings" on public.site_settings for insert to authenticated
  with check ((select private.is_portfolio_admin()));
create policy "admin update settings" on public.site_settings for update to authenticated
  using ((select private.is_portfolio_admin())) with check ((select private.is_portfolio_admin()));
create policy "admin delete settings" on public.site_settings for delete to authenticated
  using ((select private.is_portfolio_admin()));

create policy "public published entries" on public.portfolio_entries for select to anon
  using (status = 'published');
create policy "authenticated published entries or admin" on public.portfolio_entries for select to authenticated
  using (status = 'published' or (select private.is_portfolio_admin()));
create policy "admin insert entries" on public.portfolio_entries for insert to authenticated
  with check ((select private.is_portfolio_admin()));
create policy "admin update entries" on public.portfolio_entries for update to authenticated
  using ((select private.is_portfolio_admin())) with check ((select private.is_portfolio_admin()));
create policy "admin delete entries" on public.portfolio_entries for delete to authenticated
  using ((select private.is_portfolio_admin()));

-- Images may be public, but only an approved admin can upload, replace, or delete.
insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media','portfolio-media',true,10485760,array['image/jpeg','image/png','image/webp','image/gif','application/pdf'])
on conflict (id) do nothing;
create policy "public read portfolio media" on storage.objects for select to anon, authenticated
  using (bucket_id = 'portfolio-media');
create policy "admin upload portfolio media" on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio-media' and (select private.is_portfolio_admin()));
create policy "admin update portfolio media" on storage.objects for update to authenticated
  using (bucket_id = 'portfolio-media' and (select private.is_portfolio_admin()))
  with check (bucket_id = 'portfolio-media' and (select private.is_portfolio_admin()));
create policy "admin delete portfolio media" on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio-media' and (select private.is_portfolio_admin()));

-- IMPORTANT: NEVER add an automatic admin-on-signup trigger.
-- After creating your own user in Auth > Users, insert its UID manually:
-- insert into public.portfolio_admins(user_id) values ('YOUR-AUTH-USER-UUID');
