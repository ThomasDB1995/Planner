-- Supabase employee catalog schema for the Perceel planner.
-- Lightweight planner employees, geen HR-module.

create table if not exists public.employees (
  id text primary key,
  first_name text not null default '',
  last_name text not null default '',
  name text not null,
  category text not null check (category in ('Werknemer', 'Zelfstandige', 'Werknemer, bureau', 'Flexi-job', 'Vakantiejob')),
  sort_order numeric not null default 0,
  is_default_visible boolean not null default true,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.employees is 'Lightweight planner-werknemerslijst; geen HR, payroll of contractstatus.';
comment on column public.employees.category is 'Lichte planner-categorie, geen HR-status.';
comment on column public.employees.is_default_visible is 'Bepaalt kernploeg/default zichtbaarheid in de planner.';
comment on column public.employees.is_hidden is 'Operationele tijdelijke verbergstatus; geen hard delete of HR-status.';

alter table public.employees enable row level security;

grant usage on schema public to authenticated;
grant select on table public.employees to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employees'
      and policyname = 'Authenticated users can read employees'
  ) then
    execute 'create policy "Authenticated users can read employees"
      on public.employees
      for select
      to authenticated
      using (true)';
  end if;
end $$;
