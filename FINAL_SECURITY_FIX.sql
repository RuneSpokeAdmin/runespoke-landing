-- ============================================
-- FINAL SECURITY FIX BASED ON ACTUAL DATABASE
-- ============================================

-- ============================================
-- 1. FIX WAITLIST TABLE
-- ============================================

-- The waitlist table already has RLS enabled from supabase-schema.sql
-- But the policies are too permissive

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist;
DROP POLICY IF EXISTS "Service role can read all" ON waitlist;
DROP POLICY IF EXISTS "Allow unsubscribe updates" ON waitlist;
DROP POLICY IF EXISTS "Allow public to insert into waitlist" ON waitlist;
DROP POLICY IF EXISTS "Allow public to insert into waitlist with rate limit" ON waitlist;
DROP POLICY IF EXISTS "Allow public to insert into waitlist with validation" ON waitlist;
DROP POLICY IF EXISTS "Only service role can read waitlist" ON waitlist;
DROP POLICY IF EXISTS "Only service role can delete from waitlist" ON waitlist;

-- Create proper policies
CREATE POLICY "Public can insert valid emails" ON waitlist
FOR INSERT TO anon
WITH CHECK (
  email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
);

CREATE POLICY "Service role reads waitlist" ON waitlist
FOR SELECT TO service_role
USING (true);

CREATE POLICY "Service role deletes from waitlist" ON waitlist
FOR DELETE TO service_role
USING (true);

CREATE POLICY "Allow unsubscribe by email" ON waitlist
FOR UPDATE
USING (true)
WITH CHECK (unsubscribed = true);

-- ============================================
-- 2. FIX TASKS TABLE (if it exists)
-- ============================================

DO $$
BEGIN
  -- Check if tasks table exists
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tasks') THEN
    -- Drop overly permissive policy
    DROP POLICY IF EXISTS "Allow all operations on tasks" ON public.tasks;

    -- Check what column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tasks' AND column_name = 'userId') THEN
      -- Prisma style column
      CREATE POLICY "Users see own tasks" ON public.tasks
      FOR SELECT TO authenticated
      USING ("userId" = auth.uid()::text);

      CREATE POLICY "Users create own tasks" ON public.tasks
      FOR INSERT TO authenticated
      WITH CHECK ("userId" = auth.uid()::text);

      CREATE POLICY "Users update own tasks" ON public.tasks
      FOR UPDATE TO authenticated
      USING ("userId" = auth.uid()::text);

      CREATE POLICY "Users delete own tasks" ON public.tasks
      FOR DELETE TO authenticated
      USING ("userId" = auth.uid()::text);

      CREATE INDEX IF NOT EXISTS idx_tasks_userId ON public.tasks("userId");

    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'tasks' AND column_name = 'user_id') THEN
      -- Snake case column
      CREATE POLICY "Users see own tasks" ON public.tasks
      FOR SELECT TO authenticated
      USING (user_id = auth.uid());

      CREATE POLICY "Users create own tasks" ON public.tasks
      FOR INSERT TO authenticated
      WITH CHECK (user_id = auth.uid());

      CREATE POLICY "Users update own tasks" ON public.tasks
      FOR UPDATE TO authenticated
      USING (user_id = auth.uid());

      CREATE POLICY "Users delete own tasks" ON public.tasks
      FOR DELETE TO authenticated
      USING (user_id = auth.uid());

      CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
    ELSE
      -- No user column, lock it down
      CREATE POLICY "Service role only" ON public.tasks
      FOR ALL TO service_role
      USING (true);
    END IF;
  END IF;
END $$;

-- ============================================
-- 3. FIX FUNCTIONS (add search_path)
-- ============================================

-- Fix trigger_set_timestamp
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix update_updated_at if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.update_updated_at()
    RETURNS TRIGGER
    SET search_path = public
    LANGUAGE plpgsql
    AS $func$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $func$;
  END IF;
END $$;

-- Fix update_updated_at_column if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.update_updated_at_column()
    RETURNS TRIGGER
    SET search_path = public
    LANGUAGE plpgsql
    AS $func$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $func$;
  END IF;
END $$;

-- ============================================
-- 4. LOCK DOWN SENSITIVE TABLES
-- ============================================

-- OAuth authorization codes
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'oauth_authorization_codes') THEN
    -- Enable RLS if not already
    ALTER TABLE oauth_authorization_codes ENABLE ROW LEVEL SECURITY;

    -- Service role only
    CREATE POLICY IF NOT EXISTS "Service role only" ON oauth_authorization_codes
    FOR ALL TO service_role
    USING (true);

    -- Revoke from public/anon
    REVOKE ALL ON oauth_authorization_codes FROM public, anon;
  END IF;
END $$;

-- Credentials vault
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'credentials_vault') THEN
    -- Already has proper RLS from create-table.sql
    -- Just ensure no public access
    REVOKE ALL ON credentials_vault FROM public, anon;
  END IF;
END $$;

-- Other sensitive tables
DO $$
DECLARE
  tbl RECORD;
BEGIN
  FOR tbl IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename IN (
      'extension_registrations',
      'extension_sessions',
      'vault_tokens',
      '_migration_user_id_mapping'
    )
  LOOP
    -- Enable RLS
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl.tablename);

    -- Revoke public access
    EXECUTE format('REVOKE ALL ON %I FROM public, anon', tbl.tablename);

    -- Service role only policy
    EXECUTE format('CREATE POLICY IF NOT EXISTS "Service role only" ON %I FOR ALL TO service_role USING (true)', tbl.tablename);
  END LOOP;
END $$;

-- ============================================
-- 5. PERMISSION TABLES (if they exist)
-- ============================================

DO $$
BEGIN
  -- Permissions table - read for authenticated
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'permissions') THEN
    ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

    CREATE POLICY IF NOT EXISTS "Read permissions" ON permissions
    FOR SELECT TO authenticated
    USING (true);

    CREATE POLICY IF NOT EXISTS "Service manages permissions" ON permissions
    FOR ALL TO service_role
    USING (true);
  END IF;

  -- Roles table
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'roles') THEN
    ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

    CREATE POLICY IF NOT EXISTS "Read roles" ON roles
    FOR SELECT TO authenticated
    USING (true);

    CREATE POLICY IF NOT EXISTS "Service manages roles" ON roles
    FOR ALL TO service_role
    USING (true);
  END IF;

  -- Role permissions
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'role_permissions') THEN
    ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

    CREATE POLICY IF NOT EXISTS "Read role permissions" ON role_permissions
    FOR SELECT TO authenticated
    USING (true);

    CREATE POLICY IF NOT EXISTS "Service manages role permissions" ON role_permissions
    FOR ALL TO service_role
    USING (true);
  END IF;

  -- User roles - users see their own
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_roles') THEN
    ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

    -- Check column name
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'user_roles' AND column_name = 'user_id') THEN
      CREATE POLICY IF NOT EXISTS "Users see own roles" ON user_roles
      FOR SELECT TO authenticated
      USING (user_id = auth.uid());
    END IF;

    CREATE POLICY IF NOT EXISTS "Service manages user roles" ON user_roles
    FOR ALL TO service_role
    USING (true);
  END IF;
END $$;

-- ============================================
-- 6. FIX PERMISSION FUNCTIONS
-- ============================================

DO $$
BEGIN
  -- Fix get_user_permissions
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_user_permissions' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.get_user_permissions(p_user_id uuid)
    RETURNS TABLE(permission_name text)
    SET search_path = public
    LANGUAGE plpgsql
    AS $func$
    BEGIN
      RETURN QUERY
      SELECT DISTINCT p.name
      FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      JOIN user_roles ur ON rp.role_id = ur.role_id
      WHERE ur.user_id = p_user_id;
    END;
    $func$;
  END IF;

  -- Fix user_has_permission
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'user_has_permission' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.user_has_permission(p_user_id uuid, p_permission text)
    RETURNS boolean
    SET search_path = public
    LANGUAGE plpgsql
    AS $func$
    BEGIN
      RETURN EXISTS (
        SELECT 1
        FROM permissions p
        JOIN role_permissions rp ON p.id = rp.permission_id
        JOIN user_roles ur ON rp.role_id = ur.role_id
        WHERE ur.user_id = p_user_id
        AND p.name = p_permission
      );
    END;
    $func$;
  END IF;

  -- Fix assign_role_to_user
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'assign_role_to_user' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.assign_role_to_user(p_user_id uuid, p_role_name text)
    RETURNS void
    SET search_path = public
    LANGUAGE plpgsql
    AS $func$
    DECLARE
      v_role_id uuid;
    BEGIN
      SELECT id INTO v_role_id FROM roles WHERE name = p_role_name;

      IF v_role_id IS NULL THEN
        RAISE EXCEPTION 'Role % not found', p_role_name;
      END IF;

      INSERT INTO user_roles (user_id, role_id)
      VALUES (p_user_id, v_role_id)
      ON CONFLICT (user_id, role_id) DO NOTHING;
    END;
    $func$;
  END IF;
END $$;

-- ============================================
-- 7. FINAL STATUS REPORT
-- ============================================

SELECT 'SECURITY FIX COMPLETE' as status, NOW() as completed_at;

-- Show tables without RLS
SELECT
  COUNT(*) as tables_without_rls,
  string_agg(tablename, ', ') as unprotected_tables
FROM pg_tables
WHERE schemaname = 'public'
AND NOT rowsecurity;

-- Show overly permissive policies
SELECT
  COUNT(*) as permissive_policies,
  string_agg(tablename || '.' || policyname, ', ') as policies_to_review
FROM pg_policies
WHERE schemaname = 'public'
AND (qual = 'true' OR with_check = 'true')
AND cmd != 'SELECT';

-- ============================================
-- MANUAL STEPS REQUIRED IN SUPABASE DASHBOARD
-- ============================================

-- 1. Enable Leaked Password Protection:
--    Authentication > Providers > Email > "Leaked password protection"
--
-- 2. Enable MFA:
--    Authentication > Settings > Enable TOTP
--
-- 3. Upgrade PostgreSQL:
--    Settings > Infrastructure > Upgrade (if available)