-- ============================================
-- EMERGENCY SECURITY LOCKDOWN (FIXED VERSION)
-- YOUR DATABASE IS COMPLETELY EXPOSED!
-- RUN THIS IMMEDIATELY!
-- ============================================

-- STEP 1: REVOKE EVERYTHING FROM EVERYONE
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM authenticated;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM public;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM public;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM public;

-- ============================================
-- STEP 2: GRANT BACK ONLY ESSENTIAL PERMISSIONS
-- ============================================

-- WAITLIST: Only allow signups
GRANT INSERT ON waitlist TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon; -- For auto-increment IDs

-- Service role gets everything
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Authenticated users: Basic permissions
-- We'll control access via RLS policies, not column-level grants
GRANT SELECT ON users TO authenticated;
GRANT UPDATE ON users TO authenticated; -- RLS will restrict to own record

GRANT SELECT, INSERT, UPDATE, DELETE ON profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON projects TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON tasks TO authenticated;

GRANT SELECT ON permissions TO authenticated;
GRANT SELECT ON roles TO authenticated;
GRANT SELECT ON role_permissions TO authenticated;
GRANT SELECT ON user_roles TO authenticated;

GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================
-- STEP 3: ENABLE RLS ON EVERY TABLE
-- ============================================

DO $$
DECLARE
    tbl RECORD;
BEGIN
    FOR tbl IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl.tablename);
        RAISE NOTICE 'Enabled RLS on %', tbl.tablename;
    END LOOP;
END $$;

-- ============================================
-- STEP 4: DROP ALL EXISTING POLICIES (CLEAN SLATE)
-- ============================================

DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
                      pol.policyname, pol.schemaname, pol.tablename);
        RAISE NOTICE 'Dropped policy % on %', pol.policyname, pol.tablename;
    END LOOP;
END $$;

-- ============================================
-- STEP 5: CREATE NEW RESTRICTIVE POLICIES
-- ============================================

-- WAITLIST: Public can insert only
CREATE POLICY "Public can signup" ON waitlist
FOR INSERT TO anon
WITH CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

CREATE POLICY "Service manages waitlist" ON waitlist
FOR ALL TO service_role
USING (true);

-- USERS TABLE
DO $$
BEGIN
    -- Check if users table has id column that matches auth.uid()
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'users'
        AND column_name = 'id'
    ) THEN
        -- Check data type of id column
        IF EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = 'users'
            AND column_name = 'id'
            AND data_type = 'uuid'
        ) THEN
            -- UUID type
            CREATE POLICY "Users see own record" ON users
            FOR SELECT TO authenticated
            USING (id = auth.uid());

            CREATE POLICY "Users update own record" ON users
            FOR UPDATE TO authenticated
            USING (id = auth.uid())
            WITH CHECK (id = auth.uid());
        ELSE
            -- Text/String type
            CREATE POLICY "Users see own record" ON users
            FOR SELECT TO authenticated
            USING (id = auth.uid()::text);

            CREATE POLICY "Users update own record" ON users
            FOR UPDATE TO authenticated
            USING (id = auth.uid()::text)
            WITH CHECK (id = auth.uid()::text);
        END IF;
    END IF;
END $$;

-- PROFILES TABLE (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'user_id') THEN
            CREATE POLICY "Users manage own profile" ON profiles
            FOR ALL TO authenticated
            USING (user_id = auth.uid()::text);
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'id') THEN
            CREATE POLICY "Users manage own profile" ON profiles
            FOR ALL TO authenticated
            USING (id = auth.uid()::text);
        END IF;
    END IF;
END $$;

-- PROJECTS TABLE
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'projects') THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'user_id') THEN
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
        END IF;
    END IF;
END $$;

-- TASKS TABLE
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tasks') THEN
        -- First drop the bad "Allow all" policy
        DROP POLICY IF EXISTS "Allow all operations on tasks" ON tasks;

        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tasks' AND column_name = 'user_id') THEN
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
        END IF;
    END IF;
END $$;

-- PERMISSION TABLES: Read only for authenticated
CREATE POLICY IF NOT EXISTS "Read permissions" ON permissions
FOR SELECT TO authenticated
USING (true);

CREATE POLICY IF NOT EXISTS "Read roles" ON roles
FOR SELECT TO authenticated
USING (true);

CREATE POLICY IF NOT EXISTS "Read role permissions" ON role_permissions
FOR SELECT TO authenticated
USING (true);

-- USER ROLES: See own roles
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_roles') THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'user_roles' AND column_name = 'user_id') THEN
            CREATE POLICY "Users see own roles" ON user_roles
            FOR SELECT TO authenticated
            USING (user_id = auth.uid());
        END IF;
    END IF;
END $$;

-- CRITICAL TABLES: Lock down completely (service role only)
DO $$
DECLARE
    critical_table text;
    critical_tables text[] := ARRAY[
        'credentials_vault',
        'oauth_authorization_codes',
        'vault_tokens',
        'extension_registrations',
        'extension_sessions',
        '_migration_user_id_mapping'
    ];
BEGIN
    FOREACH critical_table IN ARRAY critical_tables
    LOOP
        IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = critical_table) THEN
            EXECUTE format('CREATE POLICY "Service only" ON %I FOR ALL TO service_role USING (true)', critical_table);
            RAISE NOTICE 'Locked down % to service_role only', critical_table;
        END IF;
    END LOOP;
END $$;

-- ============================================
-- STEP 6: VERIFY THE LOCKDOWN
-- ============================================

-- Check what anon can access (should only be INSERT on waitlist)
SELECT
    'ANON ACCESS CHECK' as check_type,
    table_name,
    string_agg(privilege_type, ', ' ORDER BY privilege_type) as permissions
FROM information_schema.table_privileges
WHERE table_schema = 'public'
AND grantee = 'anon'
GROUP BY table_name
ORDER BY table_name;

-- Check tables without RLS (should be 0)
SELECT
    'RLS CHECK' as check_type,
    COUNT(*) as tables_without_rls,
    string_agg(tablename, ', ') as unprotected_tables
FROM pg_tables
WHERE schemaname = 'public'
AND NOT rowsecurity;

-- Check for overly permissive policies
SELECT
    'PERMISSIVE POLICIES CHECK' as check_type,
    COUNT(*) as permissive_policies,
    string_agg(tablename || '.' || policyname, ', ') as bad_policies
FROM pg_policies
WHERE schemaname = 'public'
AND (qual = 'true' OR with_check = 'true')
AND cmd != 'SELECT';

-- Final status
SELECT
    '🔒 LOCKDOWN COMPLETE' as status,
    NOW() as completed_at;