-- CRITICAL SECURITY SETUP FOR SUPABASE
-- Run these commands in Supabase SQL Editor immediately!
-- Without RLS, anyone with your anon key can access all data!

-- 1. Enable Row Level Security on waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- 2. Create policies for the waitlist table

-- Policy: Anyone can INSERT (for public signups)
CREATE POLICY "Allow public to insert into waitlist"
ON waitlist
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Only service role can SELECT (for admin panel)
CREATE POLICY "Only service role can read waitlist"
ON waitlist
FOR SELECT
TO service_role
USING (true);

-- Policy: Only service role can DELETE (for admin panel)
CREATE POLICY "Only service role can delete from waitlist"
ON waitlist
FOR DELETE
TO service_role
USING (true);

-- Policy: Block all UPDATE operations (emails shouldn't be changed)
-- No UPDATE policy = no updates allowed

-- 3. Verify RLS is enabled (run this to check)
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM
  pg_tables
WHERE
  schemaname = 'public'
  AND tablename = 'waitlist';

-- Should return rowsecurity = true

-- 4. Test the security (optional)
-- Try to SELECT from the waitlist table using the anon key in Supabase dashboard
-- It should return empty results with RLS enabled

-- ADDITIONAL SECURITY RECOMMENDATIONS:

-- 5. If you have other tables, enable RLS on ALL of them:
/*
ALTER TABLE your_other_table ENABLE ROW LEVEL SECURITY;
-- Then create appropriate policies
*/

-- 6. Review all existing tables for RLS status:
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM
  pg_tables
WHERE
  schemaname = 'public'
ORDER BY tablename;

-- Any table with rowsecurity = false is COMPLETELY EXPOSED!