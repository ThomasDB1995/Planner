-- Shared planner planningitems.
-- Planning blijft operationele plannerdata: geen werkbon, nacalculatie of workflow.

create table if not exists public.planning_items (
  id text primary key,
  date date not null,
  employee_id text not null,
  task_name text not null check (length(trim(task_name)) > 0),
  resource_id text,
  resource_ids text[] not null default '{}'::text[],
  status text not null default 'voorlopig' check (status in ('voorlopig', 'bevestigd', 'uitgevoerd')),
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.planning_items is 'Gedeelde planningitems voor de planner; zichtbaar voor alle aangemelde gebruikers.';
comment on column public.planning_items.employee_id is 'Planner employee id. Bewust geen harde FK zolang lokale week/employee flows nog in-memory kunnen zijn.';
comment on column public.planning_items.resource_id is 'Compatibel primair resource-id.';
comment on column public.planning_items.resource_ids is 'Additieve multi-resource ids voor planning en conflictvalidatie.';

create index if not exists planning_items_date_idx
  on public.planning_items (date);

create index if not exists planning_items_employee_date_idx
  on public.planning_items (employee_id, date);

create index if not exists planning_items_resource_id_idx
  on public.planning_items (resource_id);

create index if not exists planning_items_resource_ids_gin_idx
  on public.planning_items using gin (resource_ids);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'planning_items_set_updated_at'
      and tgrelid = 'public.planning_items'::regclass
  ) then
    execute 'create trigger planning_items_set_updated_at
      before update on public.planning_items
      for each row
      execute function public.set_updated_at()';
  end if;
end $$;

alter table public.planning_items enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.planning_items to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'planning_items'
      and policyname = 'Authenticated users can read shared planningitems'
  ) then
    execute 'create policy "Authenticated users can read shared planningitems"
      on public.planning_items
      for select
      to authenticated
      using (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'planning_items'
      and policyname = 'Authenticated users can create shared planningitems'
  ) then
    execute 'create policy "Authenticated users can create shared planningitems"
      on public.planning_items
      for insert
      to authenticated
      with check (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'planning_items'
      and policyname = 'Authenticated users can update shared planningitems'
  ) then
    execute 'create policy "Authenticated users can update shared planningitems"
      on public.planning_items
      for update
      to authenticated
      using (true)
      with check (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'planning_items'
      and policyname = 'Authenticated users can delete shared planningitems'
  ) then
    execute 'create policy "Authenticated users can delete shared planningitems"
      on public.planning_items
      for delete
      to authenticated
      using (true)';
  end if;
end $$;
