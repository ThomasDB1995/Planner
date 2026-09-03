-- Supabase resource catalog schema for the Perceel planner.
-- Run this first in the Supabase SQL Editor.

create table if not exists public.resources (
  id text primary key,
  number text not null unique,
  "group" text,
  name text not null,
  brand text,
  category text not null check (category in ('machine', 'voertuig', 'werktuig', 'aanhanger')),
  type text not null default '',
  is_defective boolean not null default false,
  is_favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.resources is 'Operationele materieelcatalogus voor de planner; geen fleet ERP.';
comment on column public.resources.number is 'Volledige operationele nummercode, bijvoorbeeld 0517-TRL-.';
comment on column public.resources."group" is 'Materieelgroep afgeleid uit de volledige nummercode, bijvoorbeeld TRL.';
comment on column public.resources.name is 'Beschrijving/displaynaam uit de machinelijst.';
comment on column public.resources.brand is 'Merk als optionele zoekmetadata.';
comment on column public.resources.type is 'Raw soort/type uit bronlijst als zoek- en detailmetadata.';

alter table public.resources enable row level security;

grant usage on schema public to authenticated;
grant select on table public.resources to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'resources'
      and policyname = 'Authenticated users can read resources'
  ) then
    execute 'create policy "Authenticated users can read resources"
      on public.resources
      for select
      to authenticated
      using (true)';
  end if;
end $$;
