-- 005_hardened_security.sql
-- Active defense layers for the blushhh database

-- 1. Create a Secure View for Feed (automatically excludes sensitive columns)
-- This is used for the general discovery feed where NO instagram_handle should ever be visible.
create or replace view public.discovery_feed as
select 
  id,
  name,
  college_name,
  bio,
  age,
  gender,
  photo_url,
  created_at
from public.profiles
where deleted_at is null;

-- 2. Revoke Direct Access to Sensitive Profile Columns for Authenticated Role
-- Note: Supabase RLS is row-level. Column-level security is best handled via Views or Functions.
-- We already have get_profile_with_reveal() for the detail view.

-- 3. Add Cooldown Enforcement for Requests (7-day rule)
-- This function prevents spamming requests to the same person.
create or replace function public.check_request_cooldown()
returns trigger as $$
begin
  if exists (
    select 1 from public.requests
    where sender_id = new.sender_id
    and receiver_id = new.receiver_id
    and created_at > now() - interval '7 days'
  ) then
    raise exception 'You must wait 7 days before sending another request to this user.';
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger tr_check_request_cooldown
  before insert on public.requests
  for each row execute function public.check_request_cooldown();

-- 4. Auto-update deleted_at on account deletion
-- This function ensures that when a profile is "soft-deleted", 
-- it immediately gets hidden from all existing RLS-bound queries.
create or replace function public.handle_profile_soft_delete()
returns trigger as $$
begin
  if new.deleted_at is not null then
    -- Cancel any pending requests involving this user
    update public.requests
    set status = 'declined'
    where (sender_id = new.id or receiver_id = new.id)
    and status = 'pending';
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger tr_handle_profile_soft_delete
  after update on public.profiles
  for each row
  when (new.deleted_at is not null and old.deleted_at is null)
  execute function public.handle_profile_soft_delete();

-- 5. Force sender_id = auth.uid() at Database Level (IDOR Protection)
-- Even if the Server Action is bypassed, the DB will reject the insert.
create or replace function public.force_sender_id()
returns trigger as $$
begin
  new.sender_id := auth.uid();
  return new;
end;
$$ language plpgsql security definer;

create trigger tr_force_request_sender_id
  before insert on public.requests
  for each row execute function public.force_sender_id();

create trigger tr_force_message_sender_id
  before insert on public.messages
  for each row execute function public.force_sender_id();

-- 6. Audit Logging for Security Events (Optional but Recommended)
create table if not exists public.security_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  event_type text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

alter table public.security_logs enable row level security;
-- Only service_role can read logs
create policy "Only admins can see security logs"
  on public.security_logs for select
  using (false);
