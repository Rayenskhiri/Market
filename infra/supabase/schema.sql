-- Supabase schema for Tunisia D2C Marketplace (admin-gated model)
create extension if not exists pgcrypto;

-- profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null check (role in ('consumer','producer','admin')),
  role_status text default 'pending', -- invited, pending, active, rejected, disabled
  name_fr text,
  name_ar text,
  name_ar_latn text,
  phone text,
  avatar_url text,
  verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- producer requests (submitted by producers, admin reviews)
create table if not exists public.producer_requests (
  id bigserial primary key,
  name_fr text,
  name_ar text,
  name_ar_latn text,
  phone text,
  farm_name_fr text,
  farm_name_ar text,
  farm_name_ar_latn text,
  district_id integer,
  attachments jsonb,
  status text default 'pending', -- pending, approved, rejected
  admin_comment text,
  created_at timestamptz default now()
);

-- categories
create table if not exists public.categories (
  id serial primary key,
  slug text unique,
  name_fr text,
  name_ar text,
  name_ar_latn text,
  created_at timestamptz default now()
);

-- products
create table if not exists public.products (
  id bigserial primary key,
  producer_id uuid references public.profiles(id) on delete cascade,
  category_id integer references public.categories(id),
  name_fr text not null,
  name_ar text,
  name_ar_latn text,
  description_fr text,
  description_ar text,
  unit text,
  production_cost numeric not null,
  transport_cost numeric default 0,
  platform_fee numeric default 0,
  price_per_unit numeric not null,
  currency text default 'TND',
  stock integer default 0,
  lead_time_days integer default 0,
  status text default 'draft', -- draft, pending, approved, rejected, disabled
  admin_comment text,
  badges text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- product images
create table if not exists public.product_images (
  id bigserial primary key,
  product_id bigint references public.products(id) on delete cascade,
  url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- delivery slots
create table if not exists public.delivery_slots (
  id bigserial primary key,
  district_id integer not null,
  date date not null,
  time_window_start time not null,
  time_window_end time not null,
  capacity_total integer default 50,
  capacity_remaining integer default 50,
  created_at timestamptz default now(),
  unique (district_id, date, time_window_start, time_window_end)
);

-- carts
create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  items jsonb,
  updated_at timestamptz default now()
);

-- orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  phone text,
  address jsonb,
  delivery_slot_id bigint references public.delivery_slots(id),
  payment_method text check (payment_method in ('tunisiepay','visa','wallet','cod')),
  status text default 'pending',
  total numeric,
  currency text default 'TND',
  price_breakdown jsonb,
  items jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ratings
create table if not exists public.ratings (
  id bigserial primary key,
  order_id uuid references public.orders(id),
  user_id uuid references public.profiles(id),
  producer_id uuid references public.profiles(id),
  rating smallint check (rating >=1 and rating <=5),
  comment_fr text,
  comment_ar text,
  photos text[],
  created_at timestamptz default now()
);

-- referrals
create table if not exists public.referrals (
  id bigserial primary key,
  referrer_id uuid references public.profiles(id),
  code text unique,
  created_at timestamptz default now(),
  redeemed_by uuid references public.profiles(id),
  redeemed_at timestamptz
);

-- subscriptions
create table if not exists public.subscriptions (
  id bigserial primary key,
  user_id uuid references public.profiles(id),
  plan_id integer not null,
  next_delivery date,
  active boolean default true,
  address jsonb,
  payment_method text,
  created_at timestamptz default now()
);

-- phone otps
create table if not exists public.phone_otps (
  id bigserial primary key,
  phone text not null,
  code_hash text not null,
  purpose text not null,
  created_at timestamptz default now(),
  expires_at timestamptz not null
);

-- indexes
create index if not exists idx_products_category on public.products (category_id);
create index if not exists idx_products_producer on public.products (producer_id);
create index if not exists idx_orders_producer on public.orders (user_id);

-- RLS examples (note: requires JWT with is_admin claim or check profiles.role='admin')
-- enable rls on products
alter table public.products enable row level security;

-- allow public select only on approved products
create policy public_select_approved on public.products
  for select
  using (status = 'approved');

-- producers can insert their own products
create policy producers_insert_own on public.products
  for insert
  with check (producer_id = auth.uid());

-- only admin can update status to 'approved'
-- This policy assumes a custom JWT claim 'is_admin' is set for admin tokens
create policy admin_update_status on public.products
  for update
  using (true)
  with check (
    (status != 'approved') OR (current_setting('jwt.claims.is_admin','true') = 'true')
  );
