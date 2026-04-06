-- ================================================================
--  Advantech Website — Supabase Database Schema
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- ── Extensions ────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ================================================================
--  PRODUCTS
-- ================================================================
create table if not exists products (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  category    text not null default 'Other',
  description text not null default '',
  price       text not null default '',
  image       text not null default '',
  featured    boolean not null default false,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on products
  for each row execute function set_updated_at();

-- RLS
alter table products enable row level security;

-- Anyone can read products (public website)
create policy "products_public_read"
  on products for select
  using (true);

-- Only authenticated admins can write
create policy "products_admin_insert"
  on products for insert
  with check (auth.role() = 'authenticated');

create policy "products_admin_update"
  on products for update
  using (auth.role() = 'authenticated');

create policy "products_admin_delete"
  on products for delete
  using (auth.role() = 'authenticated');

-- ================================================================
--  PARTNERS
-- ================================================================
create table if not exists partners (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  description text not null default '',
  logo_url   text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table partners enable row level security;

create policy "partners_public_read"
  on partners for select
  using (true);

create policy "partners_admin_insert"
  on partners for insert
  with check (auth.role() = 'authenticated');

create policy "partners_admin_update"
  on partners for update
  using (auth.role() = 'authenticated');

create policy "partners_admin_delete"
  on partners for delete
  using (auth.role() = 'authenticated');

-- ================================================================
--  SITE SETTINGS  (single row — id = 'main')
-- ================================================================
create table if not exists site_settings (
  id                      text primary key default 'main',
  phone1                  text not null default '',
  phone2                  text not null default '',
  fax                     text not null default '',
  email                   text not null default '',
  address                 text not null default '',
  whatsapp_number         text not null default '',
  whatsapp_business       text not null default '',
  telegram_bot_token      text not null default '',
  telegram_bot_username   text not null default '',
  telegram_chat_id        text not null default '',
  hero_video_url          text not null default '',
  admin_password_hash     text not null default '',
  updated_at              timestamptz not null default now()
);

alter table site_settings enable row level security;

-- Settings are admin-only (never expose to public)
create policy "settings_admin_only"
  on site_settings for all
  using (auth.role() = 'authenticated');

-- ================================================================
--  STORAGE BUCKET  (for product/partner images)
-- ================================================================
-- Run in Supabase Dashboard → Storage → New Bucket
-- Bucket name: "images"
-- Public: true
--
-- Or via SQL:
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Allow public reads
create policy "images_public_read"
  on storage.objects for select
  using (bucket_id = 'images');

-- Allow authenticated uploads
create policy "images_admin_upload"
  on storage.objects for insert
  with check (bucket_id = 'images' and auth.role() = 'authenticated');

create policy "images_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'images' and auth.role() = 'authenticated');
