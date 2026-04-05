-- 003_messages.sql
-- Message table for blushhh

create table public.messages (
  id          uuid primary key default gen_random_uuid(),
  request_id  uuid references public.requests(id) on delete cascade not null,
  sender_id   uuid references public.profiles(id) on delete cascade not null,
  content     text not null,
  created_at  timestamptz default now()
);

-- Deny all by default
alter table public.messages enable row level security;
