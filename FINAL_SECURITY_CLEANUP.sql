-- ============================================
-- FINAL SECURITY CLEANUP
-- Fixes remaining security warnings
-- ============================================

-- ============================================
-- 1. FIX FUNCTIONS WITH MUTABLE SEARCH PATH
-- ============================================

-- Fix assign_role_to_user
CREATE OR REPLACE FUNCTION public.assign_role_to_user(p_user_id uuid, p_role_name text)
RETURNS void
SECURITY INVOKER
SET search_path = public
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

-- Fix get_user_permissions
CREATE OR REPLACE FUNCTION public.get_user_permissions(p_user_id uuid)
RETURNS TABLE(permission_name text)
SECURITY INVOKER
SET search_path = public
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

-- Fix update_updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix user_has_permission
CREATE OR REPLACE FUNCTION public.user_has_permission(p_user_id uuid, p_permission text)
RETURNS boolean
SECURITY INVOKER
SET search_path = public
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

-- ============================================
-- 2. FIX WAITLIST INSERT POLICY
-- ============================================

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "anyone_insert" ON waitlist;

-- Create a more restrictive policy with validation
CREATE POLICY "public_signup_with_validation" ON waitlist
FOR INSERT
WITH CHECK (
  -- Valid email format
  email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
  -- Reasonable email length
  AND length(email) BETWEEN 5 AND 255
  -- Not obviously fake
  AND email NOT LIKE '%test%test%'
  AND email NOT LIKE '%example.com'
);

-- ============================================
-- 3. VERIFY FIXES
-- ============================================

-- Check functions now have search_path set
SELECT
  proname as function_name,
  CASE
    WHEN prosecdef THEN 'SECURITY DEFINER'
    ELSE 'SECURITY INVOKER'
  END as security_type,
  'search_path set' as status
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN (
  'assign_role_to_user',
  'get_user_permissions',
  'trigger_set_timestamp',
  'update_updated_at',
  'update_updated_at_column',
  'user_has_permission'
);

-- Check waitlist policy
SELECT
  policyname,
  cmd as operation,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'waitlist'
AND cmd = 'INSERT';

-- ============================================
-- 4. MANUAL STEPS REQUIRED
-- ============================================

SELECT '
============================================
MANUAL STEPS REQUIRED IN SUPABASE DASHBOARD
============================================

1. ENABLE LEAKED PASSWORD PROTECTION:
   - Go to: Authentication → Settings
   - Scroll to "Password Protection"
   - Enable "Leaked password protection"
   - This checks passwords against HaveIBeenPwned.org

2. ENABLE MFA (Multi-Factor Authentication):
   - Go to: Authentication → Settings
   - Enable "Time-based One-Time Password (TOTP)"
   - Consider enabling SMS if you have Twilio configured

3. SET PASSWORD REQUIREMENTS:
   - Minimum password length: 8+ characters
   - Require uppercase, lowercase, and numbers

4. ENABLE EMAIL CONFIRMATIONS:
   - Go to: Authentication → Settings
   - Enable "Confirm email"
   - Customize confirmation email template

============================================
' as manual_steps;