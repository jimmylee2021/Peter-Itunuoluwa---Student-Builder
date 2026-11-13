create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null,
  cover_image_url text,
  category text,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  author_name text not null default 'Itunuoluwa Adejimi',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-covers',
  'blog-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can upload blog cover images" on storage.objects;
create policy "Admins can upload blog cover images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'blog-covers'
  and (select public.is_admin())
);

create or replace function public.set_post_timestamps()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();

  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  elsif new.status = 'draft' then
    new.published_at := null;
  end if;

  return new;
end;
$$;

drop trigger if exists posts_set_timestamps on public.posts;
create trigger posts_set_timestamps
before insert or update on public.posts
for each row execute function public.set_post_timestamps();

alter table public.admin_users enable row level security;
alter table public.posts enable row level security;

revoke all on public.admin_users from anon, authenticated;
revoke all on public.posts from anon, authenticated;
grant select on public.admin_users to authenticated;
grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "Admins can read their own allowlist record" on public.admin_users;
create policy "Admins can read their own allowlist record"
on public.admin_users for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Anyone can read published posts" on public.posts;
create policy "Anyone can read published posts"
on public.posts for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Admins can read all posts" on public.posts;
create policy "Admins can read all posts"
on public.posts for select
to authenticated
using ((select public.is_admin()));

drop policy if exists "Admins can create posts" on public.posts;
create policy "Admins can create posts"
on public.posts for insert
to authenticated
with check ((select public.is_admin()));

drop policy if exists "Admins can update posts" on public.posts;
create policy "Admins can update posts"
on public.posts for update
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Admins can delete posts" on public.posts;
create policy "Admins can delete posts"
on public.posts for delete
to authenticated
using ((select public.is_admin()));

-- After creating your first user in Supabase Auth, authorize that exact account:

