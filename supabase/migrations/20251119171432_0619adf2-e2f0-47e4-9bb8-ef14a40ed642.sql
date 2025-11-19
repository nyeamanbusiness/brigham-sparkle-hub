-- Create services table to catalog Stripe services
create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('base', 'addon')),
  stripe_price_id text not null,
  stripe_product_id text not null,
  description text,
  price_cents int not null,
  display_order int default 0,
  active boolean default true,
  created_at timestamptz default now()
);

-- Create orders table to store bookings
create table orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  
  -- Customer info
  full_name text not null,
  email text not null,
  phone text,
  street text,
  city text,
  state text,
  zip text,
  
  -- Service selection
  base_service_id uuid references services(id) not null,
  addon_ids uuid[] default '{}',
  
  -- Vehicle and notes
  vehicle_details text,
  notes text,
  
  -- Stripe info
  stripe_session_id text,
  status text not null default 'pending_payment' 
    check (status in ('pending_payment','paid','cancelled'))
);

-- Enable RLS
alter table services enable row level security;
alter table orders enable row level security;

-- Services: Anyone can view active services
create policy "Anyone can view active services"
  on services for select
  using (active = true);

-- Orders: Anyone can insert (for booking)
create policy "Anyone can submit booking"
  on orders for insert
  with check (true);

-- Seed services data
insert into services (name, type, stripe_price_id, stripe_product_id, price_cents, display_order, description)
values
  -- Base packages
  ('Full Detail', 'base', 'price_1SVBeXJpEBooz8750sFQOdzy', 'prod_TS5qQK34IVicyT', 22900, 1, '3-Hour Turnaround, Best Value Full-Service Clean, Showroom-Quality Finish, Satisfaction Guaranteed'),
  ('Interior Detail', 'base', 'price_1SVBdqJpEBooz875STMJv8mK', 'prod_TS5puCInXFhnVF', 14900, 2, '2-Hour Turnaround, Best Interior Detail in the Area, Satisfaction Guaranteed, Professional-Grade Results'),
  ('Ceramic Coating (Coupe/Sedan)', 'base', 'price_1SVBcyJpEBooz875EdCjybkT', 'prod_TS5ofeiEbXStEi', 79900, 3, '3–5 Year Protection'),
  ('Ceramic Coating (SUV/Truck)', 'base', 'price_1STSnEJpEBooz875lMEB7CgF', 'prod_TQJQrO7jjZShJz', 89900, 4, '3–5 Year Protection'),
  
  -- Add-ons
  ('Odor Removal', 'addon', 'price_1SVBgtJpEBooz875MkAhDYyI', 'prod_TS5sOY3Bk2X7h2', 5000, 10, null),
  ('Headliner Cleaning', 'addon', 'price_1SVBgfJpEBooz875CAfxVIxm', 'prod_TS5sX00G8lzUgz', 2000, 11, null),
  ('Shampooing', 'addon', 'price_1SVBgPJpEBooz875MRHpRFuq', 'prod_TS5sBNmejJDoYN', 5000, 12, null),
  ('Excessive Dirt', 'addon', 'price_1SVBfzJpEBooz875RY76cHeA', 'prod_TS5rJG4cZYFIYI', 5000, 13, null),
  ('Plastic Conditioning', 'addon', 'price_1SVBfWJpEBooz875PdA3NzbI', 'prod_TS5rkYnOFCP0oA', 3000, 14, null),
  ('Leather Conditioning', 'addon', 'price_1SVBfIJpEBooz875Djndh5ha', 'prod_TS5ra0gt18IB5M', 3000, 15, null),
  ('Wax', 'addon', 'price_1SVBf4JpEBooz875IBjifQTB', 'prod_TS5qoGUU5YH7x8', 3000, 16, null),
  ('Dog Hair Removal', 'addon', 'price_1SVBerJpEBooz875vkHpGJdJ', 'prod_TS5qVv0ndAlRjC', 4000, 17, null);