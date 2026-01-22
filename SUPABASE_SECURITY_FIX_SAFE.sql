-- ============================================
-- SAFE SUPABASE SECURITY FIX
-- Checks table structure before applying fixes
-- ============================================

-- ============================================
-- 1. CHECK AND FIX TASKS TABLE
-- ============================================

-- First, check what columns the tasks table has
DO $$
DECLARE
  has_user_id boolean;
  has_created_by boolean;
  has_owner_id boolean;
  col_name text;
BEGIN
  -- Check for common user identifier columns
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'tasks'
    AND column_name = 'user_id'
  ) INTO has_user_id;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'tasks'
    AND column_name = 'created_by'
  ) INTO has_created_by;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'tasks'
    AND column_name = 'owner_id'
  ) INTO has_owner_id;

  -- Drop the overly permissive policy
  DROP POLICY IF EXISTS "Allow all operations on tasks" ON public.tasks;

  -- Create appropriate policies based on table structure
  IF has_user_id THEN
    col_name := 'user_id';
  ELSIF has_created_by THEN
    col_name := 'created_by';
  ELSIF has_owner_id THEN
    col_name := 'owner_id';
  ELSE
    -- No user column found, lock down to service role only
    RAISE NOTICE 'No user column found in tasks table. Locking down to service role only.';

    -- Service role only access
    CREATE POLICY "Service role only" ON public.tasks
    FOR ALL TO service_role USING (true);

    -- Revoke all from public and anon
    REVOKE ALL ON public.tasks FROM public, anon, authenticated;
    RETURN;
  END IF;

  -- Create user-specific policies using the identified column
  RAISE NOTICE 'Creating policies for tasks table using column: %', col_name;

  EXECUTE format('CREATE POLICY "Users can view own tasks" ON public.tasks FOR SELECT TO authenticated USING (%I = auth.uid())', col_name);
  EXECUTE format('CREATE POLICY "Users can create own tasks" ON public.tasks FOR INSERT TO authenticated WITH CHECK (%I = auth.uid())', col_name);
  EXECUTE format('CREATE POLICY "Users can update own tasks" ON public.tasks FOR UPDATE TO authenticated USING (%I = auth.uid())', col_name);
  EXECUTE format('CREATE POLICY "Users can delete own tasks" ON public.tasks FOR DELETE TO authenticated USING (%I = auth.uid())', col_name);

  -- Create index for performance
  EXECUTE format('CREATE INDEX IF NOT EXISTS idx_tasks_%s ON public.tasks(%I)', col_name, col_name);
END $$;

-- ============================================
-- 2. FIX WAITLIST INSERT POLICY
-- ============================================

-- Drop and recreate with better security
DROP POLICY IF EXISTS "Allow public to insert into waitlist" ON public.waitlist;

CREATE POLICY "Allow public to insert into waitlist with validation"
ON public.waitlist FOR INSERT
TO anon
WITH CHECK (
  -- Only allow valid email format
  email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
);

-- ============================================
-- 3. FIX SECURITY DEFINER VIEW (if exists)
-- ============================================

DO $$
BEGIN
  -- Check if view exists before dropping
  IF EXISTS (SELECT 1 FROM information_schema.views WHERE table_schema = 'public' AND table_name = 'waitlist_stats') THEN
    DROP VIEW public.waitlist_stats CASCADE;

    -- Recreate without SECURITY DEFINER
    CREATE VIEW public.waitlist_stats AS
    SELECT
      COUNT(*) as total_signups,
      COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as signups_this_week,
      COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) as signups_this_month
    FROM public.waitlist;

    -- Grant appropriate permissions
    GRANT SELECT ON public.waitlist_stats TO service_role;
    REVOKE ALL ON public.waitlist_stats FROM anon, authenticated, public;
  END IF;
END $$;

-- ============================================
-- 4. FIX FUNCTIONS WITH MUTABLE SEARCH PATH (if they exist)
-- ============================================

-- Only fix functions that actually exist
DO $$
BEGIN
  -- Fix update_updated_at if exists
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.update_updated_at()
    RETURNS TRIGGER
    SECURITY DEFINER
    SET search_path = public, pg_catalog
    LANGUAGE plpgsql
    AS $func$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $func$;
  END IF;

  -- Fix trigger_set_timestamp if exists
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'trigger_set_timestamp' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
    RETURNS TRIGGER
    SECURITY DEFINER
    SET search_path = public, pg_catalog
    LANGUAGE plpgsql
    AS $func$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $func$;
  END IF;

  -- Fix update_updated_at_column if exists
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.update_updated_at_column()
    RETURNS TRIGGER
    SECURITY DEFINER
    SET search_path = public, pg_catalog
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
-- 5. ADD POLICIES FOR TABLES WITH RLS BUT NO POLICIES
-- ============================================

-- Only add policies if tables exist
DO $$
BEGIN
  -- OAuth authorization codes - service role only
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'oauth_authorization_codes') THEN
    CREATE POLICY IF NOT EXISTS "Service role only" ON public.oauth_authorization_codes
    FOR ALL TO service_role USING (true);
  END IF;

  -- Extension registrations - service role only
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'extension_registrations') THEN
    CREATE POLICY IF NOT EXISTS "Service role only" ON public.extension_registrations
    FOR ALL TO service_role USING (true);
  END IF;

  -- Extension sessions - service role only
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'extension_sessions') THEN
    CREATE POLICY IF NOT EXISTS "Service role only" ON public.extension_sessions
    FOR ALL TO service_role USING (true);
  END IF;

  -- Vault tokens - service role only
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'vault_tokens') THEN
    CREATE POLICY IF NOT EXISTS "Service role only" ON public.vault_tokens
    FOR ALL TO service_role USING (true);
  END IF;

  -- Migration mapping - service role only
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = '_migration_user_id_mapping') THEN
    CREATE POLICY IF NOT EXISTS "Service role only" ON public._migration_user_id_mapping
    FOR ALL TO service_role USING (true);
  END IF;
END $$;

-- ============================================
-- 6. HANDLE PERMISSION TABLES (if they exist)
-- ============================================

DO $$
BEGIN
  -- Permissions table
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'permissions') THEN
    CREATE POLICY IF NOT EXISTS "Authenticated users can read permissions"
    ON public.permissions FOR SELECT
    TO authenticated USING (true);

    CREATE POLICY IF NOT EXISTS "Service role manages permissions"
    ON public.permissions FOR ALL
    TO service_role USING (true);
  END IF;

  -- Roles table
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'roles') THEN
    CREATE POLICY IF NOT EXISTS "Authenticated users can read roles"
    ON public.roles FOR SELECT
    TO authenticated USING (true);

    CREATE POLICY IF NOT EXISTS "Service role manages roles"
    ON public.roles FOR ALL
    TO service_role USING (true);
  END IF;

  -- Role permissions
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'role_permissions') THEN
    CREATE POLICY IF NOT EXISTS "Authenticated users can read role permissions"
    ON public.role_permissions FOR SELECT
    TO authenticated USING (true);

    CREATE POLICY IF NOT EXISTS "Service role manages role permissions"
    ON public.role_permissions FOR ALL
    TO service_role USING (true);
  END IF;

  -- User roles
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_roles') THEN
    -- Check if user_id column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'user_roles' AND column_name = 'user_id') THEN
      CREATE POLICY IF NOT EXISTS "Users can see own roles"
      ON public.user_roles FOR SELECT
      TO authenticated
      USING (user_id = auth.uid());
    END IF;

    CREATE POLICY IF NOT EXISTS "Service role manages user roles"
    ON public.user_roles FOR ALL
    TO service_role USING (true);
  END IF;
END $$;

-- ============================================
-- 7. FIX PERMISSION FUNCTIONS (if they exist and need fixing)
-- ============================================

DO $$
BEGIN
  -- Fix get_user_permissions if exists
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_user_permissions' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.get_user_permissions(p_user_id uuid)
    RETURNS TABLE(permission_name text)
    SECURITY DEFINER
    SET search_path = public, pg_catalog
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

  -- Fix user_has_permission if exists
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'user_has_permission' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.user_has_permission(p_user_id uuid, p_permission text)
    RETURNS boolean
    SECURITY DEFINER
    SET search_path = public, pg_catalog
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

  -- Fix assign_role_to_user if exists
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'assign_role_to_user' AND pronamespace = 'public'::regnamespace) THEN
    CREATE OR REPLACE FUNCTION public.assign_role_to_user(p_user_id uuid, p_role_name text)
    RETURNS void
    SECURITY DEFINER
    SET search_path = public, pg_catalog
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
-- 8. REVOKE DANGEROUS PERMISSIONS
-- ============================================

-- Revoke all permissions from public and anon on sensitive tables
DO $$
DECLARE
  tbl RECORD;
BEGIN
  FOR tbl IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename IN (
      'oauth_authorization_codes',
      'extension_registrations',
      'extension_sessions',
      'permissions',
      'roles',
      'role_permissions',
      'user_roles',
      'vault_tokens',
      '_migration_user_id_mapping'
    )
  LOOP
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM public, anon', tbl.tablename);
    RAISE NOTICE 'Revoked permissions on %', tbl.tablename;
  END LOOP;
END $$;

-- ============================================
-- 9. FINAL STATUS CHECK
-- ============================================

-- Show what was fixed
SELECT
  'SECURITY FIX APPLIED' as status,
  NOW() as completed_at;

-- Show tables without RLS (should be 0)
SELECT
  COUNT(*) as "Tables without RLS",
  string_agg(tablename, ', ') as "Unprotected tables"
FROM pg_tables
WHERE schemaname = 'public'
AND NOT rowsecurity;

-- Show remaining permissive policies
SELECT
  COUNT(*) as "Permissive non-SELECT policies",
  string_agg(tablename || '.' || policyname, ', ') as "Policies to review"
FROM pg_policies
WHERE schemaname = 'public'
AND (qual = 'true' OR with_check = 'true')
AND cmd != 'SELECT';

-- ============================================
-- MANUAL STEPS STILL REQUIRED
-- ============================================

/*
COMPLETE THESE IN SUPABASE DASHBOARD:

1. Enable Leaked Password Protection:
   - Go to Authentication > Providers > Email
   - Enable "Leaked password protection"

2. Enable MFA Options:
   - Go to Authentication > Settings
   - Enable TOTP (Time-based One-Time Password)

3. Upgrade PostgreSQL:
   - Go to Settings > Infrastructure
   - Click "Upgrade" if available
*/

RAISE NOTICE 'Security fixes applied successfully. Check output above for status.';
RAISE NOTICE 'IMPORTANT: Complete manual steps in Supabase Dashboard for full security.';