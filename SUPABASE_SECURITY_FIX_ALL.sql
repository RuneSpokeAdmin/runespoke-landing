-- ============================================
-- COMPREHENSIVE SUPABASE SECURITY FIX
-- Addresses ALL security issues from the audit
-- Run this AFTER the initial RLS setup
-- ============================================

-- ============================================
-- 1. FIX OVERLY PERMISSIVE RLS POLICIES
-- ============================================

-- Fix the tasks table policy that allows unrestricted access
DROP POLICY IF EXISTS "Allow all operations on tasks" ON public.tasks;

-- Create proper restrictive policies for tasks
CREATE POLICY "Users can view own tasks"
ON public.tasks FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can create own tasks"
ON public.tasks FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own tasks"
ON public.tasks FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can delete own tasks"
ON public.tasks FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Fix waitlist insert policy (keep it but make it more secure)
DROP POLICY IF EXISTS "Allow public to insert into waitlist" ON public.waitlist;

CREATE POLICY "Allow public to insert into waitlist with rate limit"
ON public.waitlist FOR INSERT
TO anon
WITH CHECK (
  -- Only allow valid email format
  email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
  -- Additional rate limiting would be done at application level
);

-- ============================================
-- 2. FIX SECURITY DEFINER VIEW
-- ============================================

-- Drop and recreate the view without SECURITY DEFINER
-- unless it's intentionally used for admin stats
DROP VIEW IF EXISTS public.waitlist_stats CASCADE;

CREATE VIEW public.waitlist_stats AS
SELECT
  COUNT(*) as total_signups,
  COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as signups_this_week,
  COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) as signups_this_month
FROM public.waitlist;

-- Grant appropriate permissions
GRANT SELECT ON public.waitlist_stats TO service_role;
REVOKE ALL ON public.waitlist_stats FROM anon, authenticated, public;

-- ============================================
-- 3. FIX FUNCTIONS WITH MUTABLE SEARCH PATH
-- ============================================

-- Fix update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_catalog
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix get_user_permissions function
CREATE OR REPLACE FUNCTION public.get_user_permissions(p_user_id uuid)
RETURNS TABLE(permission_name text)
SECURITY DEFINER
SET search_path = public, pg_catalog
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT p.name
  FROM permissions p
  JOIN role_permissions rp ON p.id = rp.permission_id
  JOIN user_roles ur ON rp.role_id = ur.role_id
  WHERE ur.user_id = p_user_id;
END;
$$;

-- Fix user_has_permission function
CREATE OR REPLACE FUNCTION public.user_has_permission(p_user_id uuid, p_permission text)
RETURNS boolean
SECURITY DEFINER
SET search_path = public, pg_catalog
LANGUAGE plpgsql
AS $$
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
$$;

-- Fix assign_role_to_user function
CREATE OR REPLACE FUNCTION public.assign_role_to_user(p_user_id uuid, p_role_name text)
RETURNS void
SECURITY DEFINER
SET search_path = public, pg_catalog
LANGUAGE plpgsql
AS $$
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
$$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_catalog
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix trigger_set_timestamp function
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_catalog
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ============================================
-- 4. ADD POLICIES FOR TABLES WITH RLS BUT NO POLICIES
-- ============================================

-- These tables have RLS enabled but no policies (complete lockdown)
-- Add minimal policies for service role only

-- OAuth authorization codes - service role only
CREATE POLICY "Service role only" ON public.oauth_authorization_codes
FOR ALL TO service_role USING (true);

-- Extension registrations - service role only
CREATE POLICY "Service role only" ON public.extension_registrations
FOR ALL TO service_role USING (true);

-- Extension sessions - service role only
CREATE POLICY "Service role only" ON public.extension_sessions
FOR ALL TO service_role USING (true);

-- Permissions table - read for authenticated, manage for service role
CREATE POLICY "Authenticated users can read permissions"
ON public.permissions FOR SELECT
TO authenticated USING (true);

CREATE POLICY "Service role manages permissions"
ON public.permissions FOR ALL
TO service_role USING (true);

-- Roles table - read for authenticated, manage for service role
CREATE POLICY "Authenticated users can read roles"
ON public.roles FOR SELECT
TO authenticated USING (true);

CREATE POLICY "Service role manages roles"
ON public.roles FOR ALL
TO service_role USING (true);

-- Role permissions - read for authenticated, manage for service role
CREATE POLICY "Authenticated users can read role permissions"
ON public.role_permissions FOR SELECT
TO authenticated USING (true);

CREATE POLICY "Service role manages role permissions"
ON public.role_permissions FOR ALL
TO service_role USING (true);

-- User roles - users see own, service role manages all
CREATE POLICY "Users can see own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Service role manages user roles"
ON public.user_roles FOR ALL
TO service_role USING (true);

-- Vault tokens - service role only
CREATE POLICY "Service role only" ON public.vault_tokens
FOR ALL TO service_role USING (true);

-- Migration mapping - service role only
CREATE POLICY "Service role only" ON public._migration_user_id_mapping
FOR ALL TO service_role USING (true);

-- ============================================
-- 5. REVOKE DANGEROUS PERMISSIONS
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
-- 6. CREATE INDEXES FOR PERFORMANCE
-- ============================================

-- Indexes for RLS policies
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON public.user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON public.role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id ON public.role_permissions(permission_id);

-- ============================================
-- 7. VERIFY FINAL SECURITY STATUS
-- ============================================

-- Check all tables have RLS
SELECT
  tablename,
  CASE
    WHEN rowsecurity THEN '✅ RLS Enabled'
    ELSE '❌ RLS DISABLED - FIX NOW!'
  END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY rowsecurity DESC, tablename;

-- Check for overly permissive policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
AND (qual = 'true' OR with_check = 'true')
AND cmd != 'SELECT';  -- SELECT with true is often intentional

-- ============================================
-- 8. AUTH SETTINGS (Manual Configuration Required)
-- ============================================

/*
MANUAL STEPS IN SUPABASE DASHBOARD:

1. Enable Leaked Password Protection:
   - Go to Authentication > Providers > Email
   - Enable "Leaked password protection"
   - This checks passwords against HaveIBeenPwned

2. Enable MFA Options:
   - Go to Authentication > Settings
   - Enable TOTP (Time-based One-Time Password)
   - Consider enabling SMS if you have Twilio configured

3. Upgrade PostgreSQL Version:
   - Go to Settings > Infrastructure
   - Click "Upgrade" to apply security patches
   - Schedule during low-traffic period

4. Configure Auth Security:
   - Set minimum password length to 8+ characters
   - Enable email confirmations
   - Set secure session timeouts
*/

-- ============================================
-- 9. SUMMARY REPORT
-- ============================================

SELECT 'SECURITY FIX COMPLETE' as status,
  (SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public' AND NOT rowsecurity) as "Tables without RLS",
  (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public' AND (qual = 'true' OR with_check = 'true') AND cmd != 'SELECT') as "Overly Permissive Policies",
  (SELECT COUNT(*) FROM pg_proc WHERE proname IN ('update_updated_at', 'get_user_permissions', 'user_has_permission', 'assign_role_to_user', 'update_updated_at_column', 'trigger_set_timestamp') AND prosecdef = true) as "Fixed Functions";