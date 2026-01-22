-- CRITICAL SECURITY SETUP FOR SUPABASE
-- Run these commands in Supabase SQL Editor immediately!
-- Without RLS, anyone with your anon key can access all data!

-- ============================================
-- 1. WAITLIST TABLE SECURITY
-- ============================================

-- Enable Row Level Security on waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Revoke all public access
REVOKE ALL ON waitlist FROM public;
REVOKE ALL ON waitlist FROM anon;

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

-- ============================================
-- 2. OAUTH_AUTHORIZATION_CODES TABLE SECURITY
-- ============================================

-- Enable RLS on oauth_authorization_codes
ALTER TABLE oauth_authorization_codes ENABLE ROW LEVEL SECURITY;

-- Revoke all public access
REVOKE ALL ON oauth_authorization_codes FROM public;
REVOKE ALL ON oauth_authorization_codes FROM anon;

-- Only service role should manage OAuth codes
-- No policies = complete lockdown except for service role

-- ============================================
-- 3. ENABLE RLS ON ALL OTHER TABLES
-- ============================================

-- Run this to see ALL exposed tables:
SELECT
  schemaname,
  tablename,
  CASE
    WHEN rowsecurity = true THEN '✅ PROTECTED'
    WHEN rowsecurity = false THEN '🚨 EXPOSED - ENABLE RLS NOW!'
  END as security_status,
  rowsecurity
FROM
  pg_tables
WHERE
  schemaname = 'public'
ORDER BY rowsecurity ASC, tablename;

-- For each exposed table, run:
-- ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
-- REVOKE ALL ON table_name FROM public;
-- REVOKE ALL ON table_name FROM anon;

-- Common tables that need RLS:
DO $$
DECLARE
    tbl RECORD;
BEGIN
    -- Enable RLS on all public schema tables
    FOR tbl IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        AND rowsecurity = false
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl.tablename);
        EXECUTE format('REVOKE ALL ON %I FROM public', tbl.tablename);
        EXECUTE format('REVOKE ALL ON %I FROM anon', tbl.tablename);
        RAISE NOTICE 'Enabled RLS on table: %', tbl.tablename;
    END LOOP;
END $$;

-- ============================================
-- 4. COMMON POLICIES FOR USER TABLES
-- ============================================

-- If you have user tables, add these policies:
-- Replace 'users' with your actual user table name

/*
-- Users can only see their own data
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Users can update their own data
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
TO authenticated
USING (id = auth.uid());
*/

-- ============================================
-- 5. PROJECT/WORKSPACE TABLES
-- ============================================

-- If you have project/workspace tables from mcp-hub:
/*
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;

-- Example policies for multi-tenant apps
CREATE POLICY "Users see their workspace projects"
ON projects FOR SELECT
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members
    WHERE user_id = auth.uid()
  )
);
*/

-- ============================================
-- 6. VERIFY SECURITY STATUS
-- ============================================

-- After running above, check all tables are protected:
SELECT
  tablename,
  CASE
    WHEN rowsecurity = true THEN '✅ PROTECTED'
    WHEN rowsecurity = false THEN '🚨 STILL EXPOSED!'
  END as status
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY rowsecurity ASC, tablename;

-- ============================================
-- 7. PERFORMANCE INDEXES
-- ============================================

-- Add indexes for any columns used in RLS policies:
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- If you have user-based tables:
-- CREATE INDEX IF NOT EXISTS idx_projects_workspace_id ON projects(workspace_id);
-- CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON workspace_members(user_id);