-- 004_rls_policies.sql
-- Security first. RLS policies and helper functions.

-- Function to check for accepted request and return profile data securely
-- This replaces raw SELECT * on profiles to prevent instagram_handle leakage
create or replace function public.get_profile_with_reveal(target_id uuid)
returns table (
  id uuid,
  name text,
  college_name text,
  bio text,
  age int,
  gender text,
  photo_url text,
  instagram_handle text,
  created_at timestamptz
)
security definer
set search_path = public
as $$
begin
  return query
  select 
    p.id,
    p.name,
    p.college_name,
    p.bio,
    p.age,
    p.gender,
    p.photo_url,
    case 
      when exists (
        select 1 from requests r
        where r.status = 'accepted'
        and (
          (r.sender_id = auth.uid() and r.receiver_id = target_id)
          or
          (r.receiver_id = auth.uid() and r.sender_id = target_id)
        )
      ) then p.instagram_handle
      else null
    end as instagram_handle,
    p.created_at
  from profiles p
  where p.id = target_id
  and p.deleted_at is null;
end;
$$ language plpgsql;

-- Profile Policies
create policy "Public profiles are visible to all authenticated users"
  on public.profiles for select
  to authenticated
  using (deleted_at is null);

-- Special rule: instagram_handle is NULLed out in SELECT by default via SQL views or RLS column level (Supabase RLS is row-level)
-- We will handle the column-level privacy in the SELECT query using our function or by creating a view.
-- RLS doesn't natively support "masking" a column in a row it returns.
-- Workaround: We'll create a View for standard profile fetching.

-- Profile update/insert
create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- Profile update: user can update bio, photo, etc. but NEVER name
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (
    auth.uid() = id AND 
    name = (select name from profiles where id = auth.uid()) -- Name immutability check
  );

-- Request Policies
create policy "Users can see their own requests"
  on public.requests for select
  to authenticated
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can send requests as themselves"
  on public.requests for insert
  to authenticated
  with check (auth.uid() = sender_id);

create policy "Receivers can update request status"
  on public.requests for update
  to authenticated
  using (auth.uid() = receiver_id)
  with check (auth.uid() = receiver_id);

-- Message Policies
create policy "Users can see messages in accepted requests"
  on public.messages for select
  to authenticated
  using (
    exists (
      select 1 from requests
      where id = request_id
      and status = 'accepted'
      and (sender_id = auth.uid() or receiver_id = auth.uid())
    )
  );

create policy "Users can send messages in accepted requests"
  on public.messages for insert
  to authenticated
  with check (
    sender_id = auth.uid() and
    exists (
      select 1 from requests
      where id = request_id
      and status = 'accepted'
      and (sender_id = auth.uid() or receiver_id = auth.uid())
    )
  );
