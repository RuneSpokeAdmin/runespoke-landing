-- ============================================
-- EMERGENCY SECURITY LOCKDOWN
-- YOUR DATABASE IS COMPLETELY EXPOSED!
-- RUN THIS IMMEDIATELY!
-- ============================================

-- REVOKE ALL PERMISSIONS FROM ANON (UNAUTHENTICATED USERS)
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon;

-- REVOKE ALL PERMISSIONS FROM AUTHENTICATED USERS
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM authenticated;

-- REVOKE ALL PERMISSIONS FROM PUBLIC
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM public;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM public;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM public;

-- Now grant back ONLY what's needed

-- ============================================
-- WAITLIST: Only allow signups
-- ============================================

-- Allow anon to INSERT into waitlist (for signups only)
GRANT INSERT ON waitlist TO anon;

-- Allow service role full access for admin
GRANT ALL ON waitlist TO service_role;
GRANT USAGE ON SEQUENCE waitlist_id_seq TO anon;

-- ============================================
-- CRITICAL TABLES: SERVICE ROLE ONLY
-- ============================================

-- These should NEVER be accessible to anon or authenticated
-- Already revoked above, just ensuring service_role has access
GRANT ALL ON credentials_vault TO service_role;
GRANT ALL ON oauth_authorization_codes TO service_role;
GRANT ALL ON vault_tokens TO service_role;
GRANT ALL ON extension_registrations TO service_role;
GRANT ALL ON extension_sessions TO service_role;
GRANT ALL ON _migration_user_id_mapping TO service_role;

-- ============================================
-- USER TABLES: Authenticated users see own data
-- ============================================

-- Users can read their own profile
GRANT SELECT ON users TO authenticated;
GRANT UPDATE (username, first_name, last_name, avatar_url) ON users TO authenticated;

-- Profiles table
GRANT SELECT ON profiles TO authenticated;
GRANT INSERT ON profiles TO authenticated;
GRANT UPDATE ON profiles TO authenticated;

-- ============================================
-- PROJECTS & TASKS: Authenticated users manage own
-- ============================================

GRANT SELECT, INSERT, UPDATE, DELETE ON projects TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON tasks TO authenticated;
GRANT USAGE ON SEQUENCE projects_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE tasks_id_seq TO authenticated;

-- ============================================
-- PERMISSION SYSTEM: Read only for authenticated
-- ============================================

GRANT SELECT ON permissions TO authenticated;
GRANT SELECT ON roles TO authenticated;
GRANT SELECT ON role_permissions TO authenticated;
GRANT SELECT ON user_roles TO authenticated;

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================

-- Enable RLS on every table
ALTER TABLE _migration_user_id_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials_vault ENABLE ROW LEVEL SECURITY;
ALTER TABLE extension_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE extension_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_authorization_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE RLS POLICIES
-- ============================================

-- WAITLIST: Public can insert, service reads
DROP POLICY IF EXISTS "Allow public to insert into waitlist" ON waitlist;
DROP POLICY IF EXISTS "Only service role can read waitlist" ON waitlist;

CREATE POLICY "Public can signup" ON waitlist
FOR INSERT TO anon
WITH CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

CREATE POLICY "Service reads waitlist" ON waitlist
FOR SELECT TO service_role
USING (true);

CREATE POLICY "Service manages waitlist" ON waitlist
FOR ALL TO service_role
USING (true);

-- USERS: Users see and update own profile
CREATE POLICY "Users see own profile" ON users
FOR SELECT TO authenticated
USING (id = auth.uid()::text);

CREATE POLICY "Users update own profile" ON users
FOR UPDATE TO authenticated
USING (id = auth.uid()::text)
WITH CHECK (id = auth.uid()::text);

-- PROFILES: Similar to users
CREATE POLICY "Users manage own profile" ON profiles
FOR ALL TO authenticated
USING (user_id = auth.uid()::text);

-- PROJECTS: Users manage their own
CREATE POLICY "Users see own projects" ON projects
FOR SELECT TO authenticated
USING (user_id = auth.uid()::text);

CREATE POLICY "Users create projects" ON projects
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users update own projects" ON projects
FOR UPDATE TO authenticated
USING (user_id = auth.uid()::text);

CREATE POLICY "Users delete own projects" ON projects
FOR DELETE TO authenticated
USING (user_id = auth.uid()::text);

-- TASKS: Users manage their own
DROP POLICY IF EXISTS "Allow all operations on tasks" ON tasks;

CREATE POLICY "Users see own tasks" ON tasks
FOR SELECT TO authenticated
USING (user_id = auth.uid()::text);

CREATE POLICY "Users create tasks" ON tasks
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users update own tasks" ON tasks
FOR UPDATE TO authenticated
USING (user_id = auth.uid()::text);

CREATE POLICY "Users delete own tasks" ON tasks
FOR DELETE TO authenticated
USING (user_id = auth.uid()::text);

-- PERMISSIONS/ROLES: Read only
CREATE POLICY "Anyone can read permissions" ON permissions
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Anyone can read roles" ON roles
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Anyone can read role permissions" ON role_permissions
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Users see own roles" ON user_roles
FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- CRITICAL TABLES: Service role only (no other policies)
CREATE POLICY "Service only" ON credentials_vault
FOR ALL TO service_role
USING (true);

CREATE POLICY "Service only" ON oauth_authorization_codes
FOR ALL TO service_role
USING (true);

CREATE POLICY "Service only" ON vault_tokens
FOR ALL TO service_role
USING (true);

CREATE POLICY "Service only" ON extension_registrations
FOR ALL TO service_role
USING (true);

CREATE POLICY "Service only" ON extension_sessions
FOR ALL TO service_role
USING (true);

CREATE POLICY "Service only" ON _migration_user_id_mapping
FOR ALL TO service_role
USING (true);

-- ============================================
-- VERIFY LOCKDOWN
-- ============================================

SELECT 'EMERGENCY LOCKDOWN COMPLETE' as status;

-- Show what anon can still access (should only be INSERT on waitlist)
SELECT DISTINCT
  table_name,
  string_agg(privilege_type, ', ') as permissions
FROM information_schema.table_privileges
WHERE table_schema = 'public'
AND grantee = 'anon'
GROUP BY table_name
ORDER BY table_name;

-- Show tables without RLS (should be 0)
SELECT COUNT(*) as "Tables without RLS"
FROM pg_tables
WHERE schemaname = 'public'
AND NOT rowsecurity;