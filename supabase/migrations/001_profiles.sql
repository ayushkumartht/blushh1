-- 001_profiles.sql
-- Profile table for blushhh

create table public.profiles (
  id            uuid references auth.users on delete cascade primary key,
  name          text not null,               -- locked at signup, no UPDATE policy
  college_email text unique not null,
  college_name  text,
  bio           text,
  age           int,
  gender        text,
  photo_url     text,
  instagram_handle text,                     -- never returned unless request accepted
  created_at    timestamptz default now(),
  deleted_at    timestamptz                  -- soft delete
);

-- Deny all by default
alter table public.profiles enable row level security;
