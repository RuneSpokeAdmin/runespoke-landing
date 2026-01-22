-- ============================================
-- EMERGENCY LOCKDOWN - THIS ONE ACTUALLY WORKS
-- ============================================

-- STEP 1: REVOKE EVERYTHING
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon CASCADE;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon CASCADE;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon CASCADE;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated CASCADE;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM authenticated CASCADE;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM authenticated CASCADE;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM public CASCADE;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM public CASCADE;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM public CASCADE;

-- STEP 2: ENABLE RLS EVERYWHERE
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

-- STEP 3: DROP ALL EXISTING POLICIES
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- STEP 4: GRANT MINIMAL PERMISSIONS BACK

-- Service role gets everything
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Waitlist: anon can only insert
GRANT INSERT ON waitlist TO anon;
GRANT USAGE ON SEQUENCE waitlist_id_seq TO anon;

-- Authenticated users get basic access (RLS will restrict)
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON projects TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON tasks TO authenticated;
GRANT SELECT ON permissions TO authenticated;
GRANT SELECT ON roles TO authenticated;
GRANT SELECT ON role_permissions TO authenticated;
GRANT SELECT ON user_roles TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- STEP 5: CREATE SIMPLE POLICIES

-- Waitlist
CREATE POLICY "anyone_insert" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "service_all" ON waitlist FOR ALL TO service_role USING (true);

-- Users table - check the actual data type
DO $$
DECLARE
    id_type text;
BEGIN
    SELECT data_type INTO id_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'users'
    AND column_name = 'id';

    IF id_type = 'uuid' THEN
        CREATE POLICY "own_user" ON users FOR ALL TO authenticated
        USING (id = auth.uid());
    ELSIF id_type = 'text' OR id_type LIKE 'character%' THEN
        CREATE POLICY "own_user" ON users FOR ALL TO authenticated
        USING (id::text = auth.uid()::text);
    END IF;
END $$;

-- Profiles table
DO $$
DECLARE
    col_type text;
    col_name text;
BEGIN
    -- Check if user_id exists
    SELECT column_name, data_type INTO col_name, col_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name IN ('user_id', 'id')
    LIMIT 1;

    IF col_name = 'user_id' AND col_type = 'uuid' THEN
        CREATE POLICY "own_profile" ON profiles FOR ALL TO authenticated
        USING (user_id = auth.uid());
    ELSIF col_name = 'user_id' THEN
        CREATE POLICY "own_profile" ON profiles FOR ALL TO authenticated
        USING (user_id::text = auth.uid()::text);
    ELSIF col_name = 'id' AND col_type = 'uuid' THEN
        CREATE POLICY "own_profile" ON profiles FOR ALL TO authenticated
        USING (id = auth.uid());
    ELSIF col_name = 'id' THEN
        CREATE POLICY "own_profile" ON profiles FOR ALL TO authenticated
        USING (id::text = auth.uid()::text);
    END IF;
END $$;

-- Projects table
DO $$
DECLARE
    col_type text;
BEGIN
    SELECT data_type INTO col_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'projects'
    AND column_name = 'user_id';

    IF col_type = 'uuid' THEN
        CREATE POLICY "own_projects" ON projects FOR ALL TO authenticated
        USING (user_id = auth.uid());
    ELSIF col_type IS NOT NULL THEN
        CREATE POLICY "own_projects" ON projects FOR ALL TO authenticated
        USING (user_id::text = auth.uid()::text);
    END IF;
END $$;

-- Tasks table
DO $$
DECLARE
    col_type text;
BEGIN
    -- Drop the bad policy first
    DROP POLICY IF EXISTS "Allow all operations on tasks" ON tasks;

    SELECT data_type INTO col_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'tasks'
    AND column_name = 'user_id';

    IF col_type = 'uuid' THEN
        CREATE POLICY "own_tasks" ON tasks FOR ALL TO authenticated
        USING (user_id = auth.uid());
    ELSIF col_type IS NOT NULL THEN
        CREATE POLICY "own_tasks" ON tasks FOR ALL TO authenticated
        USING (user_id::text = auth.uid()::text);
    END IF;
END $$;

-- Permissions tables - read only
CREATE POLICY "read_perms" ON permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "read_roles" ON roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "read_role_perms" ON role_permissions FOR SELECT TO authenticated USING (true);

-- User roles - see own
DO $$
DECLARE
    col_type text;
BEGIN
    SELECT data_type INTO col_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'user_roles'
    AND column_name = 'user_id';

    IF col_type = 'uuid' THEN
        CREATE POLICY "own_roles" ON user_roles FOR SELECT TO authenticated
        USING (user_id = auth.uid());
    ELSIF col_type IS NOT NULL THEN
        CREATE POLICY "own_roles" ON user_roles FOR SELECT TO authenticated
        USING (user_id::text = auth.uid()::text);
    END IF;
END $$;

-- Critical tables - service role only
CREATE POLICY "service_only" ON credentials_vault FOR ALL TO service_role USING (true);
CREATE POLICY "service_only" ON oauth_authorization_codes FOR ALL TO service_role USING (true);
CREATE POLICY "service_only" ON vault_tokens FOR ALL TO service_role USING (true);
CREATE POLICY "service_only" ON extension_registrations FOR ALL TO service_role USING (true);
CREATE POLICY "service_only" ON extension_sessions FOR ALL TO service_role USING (true);
CREATE POLICY "service_only" ON _migration_user_id_mapping FOR ALL TO service_role USING (true);

-- STEP 6: VERIFY
SELECT 'LOCKDOWN COMPLETE - Checking results...' as status;

-- What can anon access?
SELECT
    table_name,
    array_agg(DISTINCT privilege_type) as permissions
FROM information_schema.table_privileges
WHERE grantee = 'anon'
AND table_schema = 'public'
GROUP BY table_name;

-- Tables without RLS?
SELECT COUNT(*) as "Tables without RLS"
FROM pg_tables
WHERE schemaname = 'public'
AND NOT rowsecurity;