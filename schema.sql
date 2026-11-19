-- Winter Arc: one row of progress per account.
-- Paste this whole file into Supabase > SQL Editor > New query, and press Run.

create table if not exists public.arc_state (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  state      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.arc_state enable row level security;

-- Each signed-in person can read and write only their own row.
drop policy if exists "own row: read"   on public.arc_state;
drop policy if exists "own row: insert" on public.arc_state;
drop policy if exists "own row: update" on public.arc_state;
drop policy if exists "own row: delete" on public.arc_state;

create policy "own row: read"   on public.arc_state for select to authenticated using ((select auth.uid()) = user_id);
create policy "own row: insert" on public.arc_state for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own row: update" on public.arc_state for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own row: delete" on public.arc_state for delete to authenticated using ((select auth.uid()) = user_id);
