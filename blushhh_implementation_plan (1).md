# blushhh — Full Implementation Plan

> College-only dating app. Minimalist. Secure. Open source.
> Stack: Next.js 14 · Supabase · Vercel · GitHub (MIT)

---

## Table of Contents

1. [Product Rules](#1-product-rules)
2. [Tech Stack](#2-tech-stack)
3. [Repository Structure](#3-repository-structure)
4. [Database Schema](#4-database-schema)
5. [Auth Pipeline](#5-auth-pipeline)
6. [Profile & Feed Pipeline](#6-profile--feed-pipeline)
7. [Connect Request Pipeline](#7-connect-request-pipeline)
8. [Instagram Reveal Pipeline](#8-instagram-reveal-pipeline)
9. [Chat Pipeline](#9-chat-pipeline)
10. [Account Deletion Pipeline](#10-account-deletion-pipeline)
11. [Security Pipeline](#11-security-pipeline)
12. [Deployment Pipeline](#12-deployment-pipeline)
13. [Open Source Setup](#13-open-source-setup)
14. [6-Week Build Plan](#14-6-week-build-plan)

---

## 1. Product Rules

- Only verified college email addresses can register (domain allowlist enforced server-side)
- Name is locked at signup — no user can ever change it (enforced at DB level via RLS, not just UI)
- Profiles are private by default — Instagram handle and personal info are hidden until a connect request is accepted
- A realtime chat unlocks only after both sides have accepted
- Any user can permanently delete their account at any time

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TailwindCSS |
| Auth | Supabase Auth (email/password + email verification) |
| Database | Supabase PostgreSQL with Row Level Security |
| Realtime | Supabase Realtime (chat + notifications) |
| Storage | Supabase Storage (profile photos) |
| Deployment | Vercel (frontend + serverless API routes) |
| Source Control | GitHub — public repo, MIT License |

---

## 3. Repository Structure

```
blushhh/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── verify/
│   └── (app)/
│       ├── feed/
│       ├── profile/
│       ├── requests/
│       ├── chat/
│       │   └── [requestId]/
│       └── settings/
├── components/
│   ├── ProfileCard.tsx
│   ├── RequestCard.tsx
│   ├── ChatBubble.tsx
│   └── ui/
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # browser client
│   │   └── server.ts        # server client (uses service_role)
│   ├── validations.ts
│   └── types.ts
├── supabase/
│   ├── migrations/
│   │   ├── 001_profiles.sql
│   │   ├── 002_requests.sql
│   │   ├── 003_messages.sql
│   │   └── 004_rls_policies.sql
│   └── seed.sql
├── middleware.ts             # session guard on all protected routes
├── .env.local.example
├── .gitignore
├── LICENSE
└── README.md
```

---

## 4. Database Schema

### profiles
```sql
create table profiles (
  id            uuid references auth.users primary key,
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
```

### requests
```sql
create table requests (
  id          uuid primary key default gen_random_uuid(),
  sender_id   uuid references profiles(id),
  receiver_id uuid references profiles(id),
  status      text default 'pending',        -- pending | accepted | declined
  created_at  timestamptz default now(),
  unique(sender_id, receiver_id)
);
```

### messages
```sql
create table messages (
  id          uuid primary key default gen_random_uuid(),
  request_id  uuid references requests(id),  -- chat only exists after accepted request
  sender_id   uuid references profiles(id),
  content     text,
  created_at  timestamptz default now()
);
```

---

## 5. Auth Pipeline

### Signup flow
1. User submits name + college email + password on `/signup`
2. Server action validates email domain against `ALLOWED_COLLEGE_DOMAINS` env variable (never exposed to client)
3. If domain fails → reject with error, no account created
4. If domain passes → Supabase creates auth user and sends verification email
5. User clicks verification link → redirected to `/profile/setup`
6. Profile setup page: bio, age, gender, photo, Instagram handle — name field is pre-filled and read-only
7. On submit → INSERT into profiles table → redirect to `/feed`

### Login flow
1. User submits college email + password
2. Supabase Auth verifies credentials → issues JWT in HttpOnly cookie (Secure, SameSite=Strict)
3. Next.js middleware reads cookie on every protected route request
4. If cookie missing or expired → redirect to `/login`
5. Supabase handles silent refresh token rotation automatically

### Name lock enforcement
- The `profiles` table has NO UPDATE RLS policy for the `name` column
- Settings page UI hides the name field entirely
- Even direct Supabase API calls are blocked by RLS — the UPDATE is rejected at the database

---

## 6. Profile & Feed Pipeline

### Public fields (visible to everyone in feed)
- First name, college name, age, gender, bio, profile photo

### Hidden fields (never sent to client unless reveal condition met)
- `instagram_handle`, full email, any other personal info

### Feed query rules
- Only return profiles where `deleted_at IS NULL`
- Exclude the logged-in user's own profile
- Exclude profiles where a request already exists (any status) between the two users
- All filtering enforced via RLS — not just application logic

### Profile photo
- Uploaded to Supabase Storage bucket `avatars`
- Bucket has public read, authenticated-only write
- URL stored in `profiles.photo_url`

---

## 7. Connect Request Pipeline

### Sending a request
1. User A taps "Send Request" on User B's profile card
2. Next.js server action inserts into `requests`: `sender_id=A, receiver_id=B, status='pending'`
3. Supabase Realtime fires an event to User B's client → notification badge appears
4. User B sees the request in their `/requests` inbox

### Accepting a request
1. User B taps Accept
2. Server action updates request row: `status = 'accepted'`
3. Both users can now see each other's Instagram handle (via secure server function)
4. Chat thread between the two users becomes accessible
5. Realtime notification sent to User A confirming acceptance

### Declining a request
1. User B taps Decline
2. Server action updates: `status = 'declined'`
3. Request disappears from both views silently — no notification to User A
4. User A can send again after 7-day cooldown (enforced server-side via `created_at` timestamp check)

---

## 8. Instagram Reveal Pipeline

This is the most security-critical feature. The handle must never leak.

### How it works
- `instagram_handle` is stored in the `profiles` table as a normal column
- A Supabase RLS SELECT policy uses a `SECURITY DEFINER` function to decide whether to return the column
- The function checks:
  ```sql
  SELECT 1 FROM requests
  WHERE (
    (sender_id = auth.uid() AND receiver_id = profiles.id)
    OR
    (receiver_id = auth.uid() AND sender_id = profiles.id)
  )
  AND status = 'accepted'
  ```
- If no matching accepted request exists → the column returns `NULL`
- This runs inside the database — no frontend bypass is possible
- The client receives `NULL` for the field if the condition fails — the data never travels over the wire

---

## 9. Chat Pipeline

### Access control
- Messages table RLS policy: INSERT and SELECT only allowed if a row in `requests` exists with matching user pair AND `status = 'accepted'`
- Attempting to message someone without an accepted request → rejected at DB level

### Realtime message flow
1. User A opens `/chat/[requestId]`
2. Client subscribes to Supabase Realtime channel scoped to that `request_id`
3. User A sends a message → server action inserts into `messages` table
4. Supabase Realtime broadcasts INSERT event to User B's subscribed channel
5. User B's UI appends the message instantly — no page reload
6. If User B is not on the chat page → notification badge increments via a separate Realtime channel

### Chat security
- All message inserts go through a server action — never a direct client-to-DB call
- Content is sanitized server-side before insert (strip HTML, trim whitespace)
- Realtime channel names are derived from the request UUID — not guessable

---

## 10. Account Deletion Pipeline

1. User goes to Settings → Delete Account
2. User types their email address to confirm intent
3. Server action verifies the typed email matches `auth.uid()`'s email
4. `profiles.deleted_at` is set to `NOW()` → profile immediately disappears from all feeds and searches
5. A Supabase pg_cron job runs nightly — hard-deletes all profiles where `deleted_at < NOW() - INTERVAL '30 days'`
6. Hard delete cascades: all messages, requests, and photos are permanently removed
7. Supabase Auth user record is deleted via admin API → prevents re-login with same credentials
8. Profile photo deleted from Supabase Storage

---

## 11. Security Pipeline

### Core principle
> Sensitive data never leaves the server unless the database has verified permission. Inspect-element can only reveal what was sent — if it was never sent, it cannot be found.

### Inspect-element / network tab protection
- `instagram_handle` is excluded at the RLS query level — `NULL` is returned if condition fails — the field is never in the HTTP response
- All mutations (request, message, delete, update) go through Next.js server actions — not direct browser-to-Supabase calls
- The `service_role` key (full DB access) lives only in server environment variables — never in the frontend bundle
- The `anon` key (public) is given minimum permissions via RLS — it cannot read hidden fields or perform admin actions

### College email enforcement
- Approved domain list stored in `ALLOWED_COLLEGE_DOMAINS` server env variable — never shipped to the client
- Server action checks domain before creating any Supabase auth user
- Supabase email verification confirms the user actually owns that address

### Session & cookie security
- Supabase Auth tokens stored in HttpOnly cookies — JS on the page cannot read them (XSS-safe)
- `SameSite=Strict` prevents CSRF
- Next.js middleware validates session on every protected route request

### Rate limiting
- Vercel Edge Middleware rate-limits signup and login by IP
- Supabase Auth has built-in configurable rate limits on auth attempts
- 7-day request cooldown enforced via server-side timestamp check — not a frontend timer

### RLS policy summary
| Table | Rule |
|---|---|
| profiles | SELECT: everyone sees public fields; instagram_handle only if accepted request exists |
| profiles | INSERT: authenticated users only, once |
| profiles | UPDATE: user can update own row EXCEPT name column |
| requests | INSERT: authenticated, sender_id must equal auth.uid() |
| requests | SELECT: only sender or receiver can see their own requests |
| requests | UPDATE: only receiver can change status |
| messages | INSERT/SELECT: only if accepted request exists between the two users |

---

## 12. Deployment Pipeline

### Supabase setup
1. Create new Supabase project
2. Run all SQL files from `/supabase/migrations/` in the SQL editor (tables + RLS + functions)
3. Enable Realtime on `messages` and `requests` tables in the dashboard
4. Create Storage bucket `avatars` — public read, authenticated write
5. Copy Project URL, anon key, service_role key

### Vercel setup
1. Import GitHub repository into Vercel
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ALLOWED_COLLEGE_DOMAINS` (comma-separated, e.g. `iitd.ac.in,du.ac.in,bits-pilani.ac.in`)
3. Vercel auto-deploys on push to `main`; preview deployments on every PR
4. Set Supabase Auth redirect URL to your Vercel production domain

### Environment variables reference
```
# .env.local.example (commit this, not .env.local)

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Never expose these to the client
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ALLOWED_COLLEGE_DOMAINS=iitd.ac.in,du.ac.in,bits-pilani.ac.in
```

---

## 13. Open Source Setup

### GitHub repository checklist
- `LICENSE` — MIT License
- `README.md` — project description, screenshots, local setup steps, env variable reference
- `CONTRIBUTING.md` — code style, branch naming, PR process
- `.gitignore` — exclude `.env.local`, `node_modules`, `.next`
- `.env.local.example` — template with all required keys, no real values
- `SECURITY.md` — how to report vulnerabilities privately
- Issue templates — bug report and feature request templates in `.github/ISSUE_TEMPLATE/`

### GitHub Actions CI (`.github/workflows/ci.yml`)
- Trigger: every push and PR to `main`
- Jobs: lint check, TypeScript type check
- Prevents broken code from merging

### Local development setup (for README)
```
1. Clone the repo
2. Copy .env.local.example to .env.local and fill in your Supabase keys
3. Run Supabase migrations in your Supabase project SQL editor
4. npm install
5. npm run dev
```

---

## 14. 6-Week Build Plan

### Week 1 — Foundation
- Supabase project: create tables, write all RLS policies, set up storage bucket
- Next.js scaffold: folder structure, Tailwind, Supabase client config
- Auth pages: Signup (with server-side domain check), Login, Email verification redirect
- Next.js middleware: session guard on all protected routes

### Week 2 — Profiles & Feed
- Profile setup page (name read-only, editable bio/photo/Instagram/age/gender)
- Photo upload to Supabase Storage
- Feed page: profile cards showing only public fields
- Own profile view and edit page

### Week 3 — Requests & Reveal
- Send Request button and server action
- Requests inbox: Accept / Decline actions for receiver
- Instagram reveal: security-definer function + RLS policy
- Realtime notifications for new incoming requests

### Week 4 — Chat
- Chat list page: all accepted connections
- Chat thread page: realtime messages via Supabase Realtime
- Unread message badge
- Server-side message sanitization

### Week 5 — Settings & Polish
- Settings page: edit bio/photo, change password (name field hidden)
- Account deletion flow: soft delete + confirmation input
- Mobile-first responsive UI polish
- Loading skeletons, error states, empty states

### Week 6 — Launch
- Security audit: manually test all RLS policies, attempt API bypass scenarios
- Write README, CONTRIBUTING.md, SECURITY.md
- Set up GitHub Actions CI
- Production Vercel deploy + custom domain
- Announce in college groups

---

*blushhh — built for real college connections*
