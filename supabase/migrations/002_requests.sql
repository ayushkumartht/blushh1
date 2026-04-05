-- 002_requests.sql
-- Request table for blushhh

create table public.requests (
  id          uuid primary key default gen_random_uuid(),
  sender_id   uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  status      text default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at  timestamptz default now(),
  unique(sender_id, receiver_id)
);

-- Deny all by default
alter table public.requests enable row level security;
