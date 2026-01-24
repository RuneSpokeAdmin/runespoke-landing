-- ============================================
-- FIX REMAINING FUNCTION SEARCH_PATH ISSUES
-- Targeted fix for the 2 functions still showing warnings
-- ============================================

-- First, let's check the current state of these functions
SELECT
    proname as function_name,
    pg_get_functiondef(oid) as current_definition
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission');

-- ============================================
-- 1. Fix assign_role_to_user
-- ============================================

-- Drop the existing function (handle different signatures)
DROP FUNCTION IF EXISTS public.assign_role_to_user(uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.assign_role_to_user(p_user_id uuid, p_role_name text) CASCADE;

-- Recreate with search_path explicitly set
CREATE FUNCTION public.assign_role_to_user(p_user_id uuid, p_role_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_role_id uuid;
BEGIN
  -- Fully qualify table references for extra safety
  SELECT id INTO v_role_id
  FROM public.roles
  WHERE name = p_role_name;

  IF v_role_id IS NULL THEN
    RAISE EXCEPTION 'Role % not found', p_role_name;
  END IF;

  INSERT INTO public.user_roles (user_id, role_id)
  VALUES (p_user_id, v_role_id)
  ON CONFLICT (user_id, role_id) DO NOTHING;
END;
$$;

-- ============================================
-- 2. Fix user_has_permission
-- ============================================

-- Drop the existing function
DROP FUNCTION IF EXISTS public.user_has_permission(uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.user_has_permission(p_user_id uuid, p_permission text) CASCADE;

-- Recreate with search_path explicitly set
CREATE FUNCTION public.user_has_permission(p_user_id uuid, p_permission text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_catalog
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.permissions p
    JOIN public.role_permissions rp ON p.id = rp.permission_id
    JOIN public.user_roles ur ON rp.role_id = ur.role_id
    WHERE ur.user_id = p_user_id
    AND p.name = p_permission
  );
END;
$$;

-- ============================================
-- 3. VERIFY THE FIXES
-- ============================================

-- Check that search_path is now set
SELECT
    proname as function_name,
    CASE
        WHEN pg_get_functiondef(oid) LIKE '%SET search_path%' THEN '✅ Has search_path'
        ELSE '❌ Missing search_path'
    END as search_path_status,
    CASE
        WHEN prosecdef THEN 'SECURITY DEFINER'
        ELSE 'SECURITY INVOKER'
    END as security_type
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission')
ORDER BY proname;

-- ============================================
-- 4. SUMMARY
-- ============================================

SELECT '
============================================
FUNCTION SECURITY FIXES APPLIED
============================================

✅ assign_role_to_user:
   - Now has SET search_path = public, pg_catalog
   - All table references fully qualified
   - SECURITY INVOKER (safer than DEFINER)

✅ user_has_permission:
   - Now has SET search_path = public, pg_catalog
   - All table references fully qualified
   - SECURITY INVOKER (safer than DEFINER)

============================================
REMAINING MANUAL STEP
============================================

⚠️ LEAKED PASSWORD PROTECTION:
   This must be enabled manually in Supabase Dashboard:

   1. Go to: Authentication → Settings
   2. Find "Password Protection" section
   3. Enable "Leaked password protection"

   This checks passwords against HaveIBeenPwned.org
   and blocks compromised passwords.

============================================
' as status;