-- Create the profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  career_goal text,
  experience_level text,
  daily_study_minutes integer,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Allow authenticated users to view only their own profile
create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

-- Allow authenticated users to insert only their own profile
create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

-- Allow authenticated users to update only their own profile
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);