-- ==============================================================================
-- Pago Paolo: Supabase Database Schema & Row Level Security (RLS)
-- ==============================================================================

-- 1. Profiles Table (syncs with Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Automatically create profile entry on user sign-up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Groups Table
create table if not exists public.groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  currency text default 'EUR' not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Group Members Table
create table if not exists public.group_members (
  id uuid default gen_random_uuid() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text default 'member' check (role in ('admin', 'member')) not null,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (group_id, user_id)
);

-- 4. Expenses Table
create table if not exists public.expenses (
  id uuid default gen_random_uuid() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  payer_id uuid references public.profiles(id) on delete cascade not null,
  description text not null,
  amount numeric(10, 2) not null check (amount > 0),
  currency text default 'EUR' not null,
  category text default 'general' not null,
  date date default current_date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Expense Splits Table
create table if not exists public.expense_splits (
  id uuid default gen_random_uuid() primary key,
  expense_id uuid references public.expenses(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount numeric(10, 2) not null check (amount >= 0),
  paid boolean default false not null,
  unique (expense_id, user_id)
);

-- 6. Settlements Table (debt repayments)
create table if not exists public.settlements (
  id uuid default gen_random_uuid() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  from_user_id uuid references public.profiles(id) on delete cascade not null,
  to_user_id uuid references public.profiles(id) on delete cascade not null,
  amount numeric(10, 2) not null check (amount > 0),
  settled_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- Enable Row Level Security (RLS)
-- ==============================================================================
alter table public.profiles enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.expenses enable row level security;
alter table public.expense_splits enable row level security;
alter table public.settlements enable row level security;

-- Profiles: Authenticated users can read all profiles; users can update only their own profile
create policy "Profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Groups: Viewable by group members
create policy "Groups are viewable by members"
  on public.groups for select
  to authenticated
  using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = groups.id
        and group_members.user_id = auth.uid()
    )
  );

create policy "Users can create groups"
  on public.groups for insert
  to authenticated
  with check (auth.uid() = created_by);

-- Group Members: Members can view members of their groups
create policy "Group members are viewable by members of the same group"
  on public.group_members for select
  to authenticated
  using (
    exists (
      select 1 from public.group_members gm
      where gm.group_id = group_members.group_id
        and gm.user_id = auth.uid()
    )
  );

create policy "Group admins can add members"
  on public.group_members for insert
  to authenticated
  with check (
    auth.uid() = user_id or
    exists (
      select 1 from public.group_members gm
      where gm.group_id = group_members.group_id
        and gm.user_id = auth.uid()
        and gm.role = 'admin'
    )
  );

-- Expenses: Viewable and creatable by members of the group
create policy "Expenses are viewable by group members"
  on public.expenses for select
  to authenticated
  using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = expenses.group_id
        and group_members.user_id = auth.uid()
    )
  );

create policy "Group members can insert expenses"
  on public.expenses for insert
  to authenticated
  with check (
    exists (
      select 1 from public.group_members
      where group_members.group_id = expenses.group_id
        and group_members.user_id = auth.uid()
    )
  );

-- Expense splits: Viewable by group members
create policy "Splits are viewable by group members"
  on public.expense_splits for select
  to authenticated
  using (
    exists (
      select 1 from public.expenses
      join public.group_members on group_members.group_id = expenses.group_id
      where expenses.id = expense_splits.expense_id
        and group_members.user_id = auth.uid()
    )
  );

create policy "Group members can insert splits"
  on public.expense_splits for insert
  to authenticated
  with check (
    exists (
      select 1 from public.expenses
      join public.group_members on group_members.group_id = expenses.group_id
      where expenses.id = expense_splits.expense_id
        and group_members.user_id = auth.uid()
    )
  );

-- Settlements: Viewable by group members
create policy "Settlements are viewable by group members"
  on public.settlements for select
  to authenticated
  using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = settlements.group_id
        and group_members.user_id = auth.uid()
    )
  );

create policy "Group members can insert settlements"
  on public.settlements for insert
  to authenticated
  with check (
    exists (
      select 1 from public.group_members
      where group_members.group_id = settlements.group_id
        and group_members.user_id = auth.uid()
    )
  );
