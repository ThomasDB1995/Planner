-- Shared planner state beyond the base catalog tables.
-- Keeps planner data shared for authenticated users without introducing HR/workflow semantics.

alter table public.planning_items
  add column if not exists updated_by uuid,
  add column if not exists created_by_email text,
  add column if not exists updated_by_email text;

comment on column public.planning_items.created_by is 'Auth user id that created the planning item.';
comment on column public.planning_items.updated_by is 'Auth user id that last updated the planning item.';
comment on column public.planning_items.created_by_email is 'Email snapshot for lightweight planner audit display.';
comment on column public.planning_items.updated_by_email is 'Email snapshot for lightweight planner audit display.';

create table if not exists public.employee_availability (
  employee_id text not null,
  date date not null,
  type text not null check (type in ('unavailable', 'recovery', 'vacation', 'weather_leave', 'sick_leave')),
  created_by uuid default auth.uid(),
  updated_by uuid default auth.uid(),
  created_by_email text,
  updated_by_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (employee_id, date)
);

comment on table public.employee_availability is 'Gedeelde availability-context voor de planner per employeeId + date; geen HR-workflow.';
comment on column public.employee_availability.type is 'Availability type als operationele plannercontext.';

create index if not exists employee_availability_date_idx
  on public.employee_availability (date);

create table if not exists public.weekly_employee_additions (
  week_key text not null,
  employee_id text not null,
  created_by uuid default auth.uid(),
  created_by_email text,
  created_at timestamptz not null default now(),
  primary key (week_key, employee_id)
);

comment on table public.weekly_employee_additions is 'Weekgebonden tijdelijke werknemers in de planner; geen kernploegbeheer of HR-status.';
comment on column public.weekly_employee_additions.week_key is 'ISO week key, bijvoorbeeld 2026-W36.';

create index if not exists weekly_employee_additions_week_key_idx
  on public.weekly_employee_additions (week_key);

create table if not exists public.resource_favorites (
  resource_id text primary key,
  created_by uuid default auth.uid(),
  created_by_email text,
  created_at timestamptz not null default now()
);

comment on table public.resource_favorites is 'Gedeelde operationele resourcefavorieten voor snellere selectie.';

do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'employee_availability_set_updated_at'
      and tgrelid = 'public.employee_availability'::regclass
  ) then
    execute 'create trigger employee_availability_set_updated_at
      before update on public.employee_availability
      for each row
      execute function public.set_updated_at()';
  end if;
end $$;

alter table public.employee_availability enable row level security;
alter table public.weekly_employee_additions enable row level security;
alter table public.resource_favorites enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.employee_availability to authenticated;
grant select, insert, delete on table public.weekly_employee_additions to authenticated;
grant select, insert, delete on table public.resource_favorites to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employee_availability'
      and policyname = 'Authenticated users can read employee availability'
  ) then
    execute 'create policy "Authenticated users can read employee availability"
      on public.employee_availability
      for select
      to authenticated
      using (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employee_availability'
      and policyname = 'Authenticated users can upsert employee availability'
  ) then
    execute 'create policy "Authenticated users can upsert employee availability"
      on public.employee_availability
      for insert
      to authenticated
      with check (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employee_availability'
      and policyname = 'Authenticated users can update employee availability'
  ) then
    execute 'create policy "Authenticated users can update employee availability"
      on public.employee_availability
      for update
      to authenticated
      using (true)
      with check (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employee_availability'
      and policyname = 'Authenticated users can delete employee availability'
  ) then
    execute 'create policy "Authenticated users can delete employee availability"
      on public.employee_availability
      for delete
      to authenticated
      using (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'weekly_employee_additions'
      and policyname = 'Authenticated users can read weekly employee additions'
  ) then
    execute 'create policy "Authenticated users can read weekly employee additions"
      on public.weekly_employee_additions
      for select
      to authenticated
      using (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'weekly_employee_additions'
      and policyname = 'Authenticated users can create weekly employee additions'
  ) then
    execute 'create policy "Authenticated users can create weekly employee additions"
      on public.weekly_employee_additions
      for insert
      to authenticated
      with check (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'weekly_employee_additions'
      and policyname = 'Authenticated users can delete weekly employee additions'
  ) then
    execute 'create policy "Authenticated users can delete weekly employee additions"
      on public.weekly_employee_additions
      for delete
      to authenticated
      using (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'resource_favorites'
      and policyname = 'Authenticated users can read resource favorites'
  ) then
    execute 'create policy "Authenticated users can read resource favorites"
      on public.resource_favorites
      for select
      to authenticated
      using (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'resource_favorites'
      and policyname = 'Authenticated users can create resource favorites'
  ) then
    execute 'create policy "Authenticated users can create resource favorites"
      on public.resource_favorites
      for insert
      to authenticated
      with check (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'resource_favorites'
      and policyname = 'Authenticated users can delete resource favorites'
  ) then
    execute 'create policy "Authenticated users can delete resource favorites"
      on public.resource_favorites
      for delete
      to authenticated
      using (true)';
  end if;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.planning_items;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.employee_availability;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.weekly_employee_additions;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.resource_favorites;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;
