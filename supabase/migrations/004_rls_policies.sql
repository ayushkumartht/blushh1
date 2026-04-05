-- 004_rls_policies.sql
-- Security first. RLS policies and helper functions.

-- Function to check for accepted request between two users
create or replace function public.can_see_instagram_handle(profile_id uuid)
returns boolean
security definer
set search_path = public
as $$
begin
  return exists (
    select 1 from requests
    where status = 'accepted'
    and (
      (sender_id = auth.uid() and receiver_id = profile_id)
      or
      (receiver_id = auth.uid() and sender_id = profile_id)
    )
  );
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

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

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
