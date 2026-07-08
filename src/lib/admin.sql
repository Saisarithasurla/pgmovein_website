-- ============================================================
-- SQL Script: Create 'admin_users' table for website owners
-- Run in: Supabase Dashboard -> SQL Editor -> New Query -> RUN
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow only service role full access (so API routes can read it)
CREATE POLICY "Service Role Full Access" ON admin_users FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow authenticated users to check their own admin status (read-only)
CREATE POLICY "Users can read own admin status" ON admin_users FOR SELECT TO authenticated USING (auth.uid() = id);

-- ============================================================
-- INSTRUCTIONS TO ADD AN ADMIN:
-- ============================================================
-- 1. Go to Authentication -> Users in Supabase.
-- 2. Add a new user (or find your existing user).
-- 3. Copy their UUID (User ID).
-- 4. Run the following INSERT query in the SQL Editor (replace UUID and EMAIL with actual values):
--
-- INSERT INTO admin_users (id, email) VALUES ('your-uuid-here', 'your-email@here.com');
-- ============================================================
