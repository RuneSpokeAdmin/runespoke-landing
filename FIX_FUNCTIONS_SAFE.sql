-- ============================================
-- SAFE FIX FOR REMAINING FUNCTION SEARCH_PATH
-- This version tries to avoid CASCADE drops
-- ============================================

-- Check current function definitions
SELECT 'Checking current function definitions...' as status;

SELECT
    proname as function_name,
    pg_get_functiondef(oid) as definition
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission');

-- ============================================
-- ATTEMPT 1: Try direct ALTER FUNCTION
-- This is the safest approach if it works
-- ============================================

SELECT 'Attempting to ALTER functions with SET search_path...' as status;

-- Try to alter assign_role_to_user
DO $$
BEGIN
    -- Try to alter the function
    EXECUTE 'ALTER FUNCTION public.assign_role_to_user(uuid, text) SET search_path = public, pg_catalog';
    RAISE NOTICE 'Successfully altered assign_role_to_user';
EXCEPTION
    WHEN undefined_function THEN
        -- Try with different signature
        BEGIN
            EXECUTE 'ALTER FUNCTION public.assign_role_to_user(p_user_id uuid, p_role_name text) SET search_path = public, pg_catalog';
            RAISE NOTICE 'Successfully altered assign_role_to_user with named params';
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'Could not alter assign_role_to_user: %', SQLERRM;
        END;
    WHEN OTHERS THEN
        RAISE NOTICE 'Error altering assign_role_to_user: %', SQLERRM;
END;
$$;

-- Try to alter user_has_permission
DO $$
BEGIN
    -- Try to alter the function
    EXECUTE 'ALTER FUNCTION public.user_has_permission(uuid, text) SET search_path = public, pg_catalog';
    RAISE NOTICE 'Successfully altered user_has_permission';
EXCEPTION
    WHEN undefined_function THEN
        -- Try with different signature
        BEGIN
            EXECUTE 'ALTER FUNCTION public.user_has_permission(p_user_id uuid, p_permission text) SET search_path = public, pg_catalog';
            RAISE NOTICE 'Successfully altered user_has_permission with named params';
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'Could not alter user_has_permission: %', SQLERRM;
        END;
    WHEN OTHERS THEN
        RAISE NOTICE 'Error altering user_has_permission: %', SQLERRM;
END;
$$;

-- ============================================
-- ATTEMPT 2: If ALTER didn't work, try CREATE OR REPLACE
-- This preserves dependencies but might fail if return type changed
-- ============================================

SELECT 'Attempting CREATE OR REPLACE for functions...' as status;

-- Create or replace assign_role_to_user
CREATE OR REPLACE FUNCTION public.assign_role_to_user(p_user_id uuid, p_role_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_role_id uuid;
BEGIN
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

-- Create or replace user_has_permission
CREATE OR REPLACE FUNCTION public.user_has_permission(p_user_id uuid, p_permission text)
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
-- VERIFY THE FIXES
-- ============================================

SELECT 'Verifying search_path is now set...' as status;

-- Final check
WITH function_check AS (
    SELECT
        proname,
        pg_get_functiondef(oid) as definition,
        proargtypes::regtype[] as arg_types
    FROM pg_proc
    WHERE pronamespace = 'public'::regnamespace
    AND proname IN ('assign_role_to_user', 'user_has_permission')
)
SELECT
    proname as function_name,
    arg_types,
    CASE
        WHEN definition LIKE '%SET search_path%' THEN '✅ search_path is SET'
        ELSE '❌ search_path NOT set'
    END as status,
    CASE
        WHEN definition LIKE '%public, pg_catalog%' THEN '✅ Includes pg_catalog'
        WHEN definition LIKE '%search_path%' THEN '⚠️ Has search_path but different'
        ELSE '❌ No search_path'
    END as path_value
FROM function_check
ORDER BY proname;

-- ============================================
-- FINAL STATUS
-- ============================================

SELECT '
============================================
FUNCTION SEARCH_PATH FIX RESULTS
============================================

If both functions show ✅ above, the fix worked!

If not, you may need to:
1. Check for dependencies blocking updates
2. Manually drop and recreate the functions
3. Check if functions are owned by different roles

To check dependencies, run CHECK_FUNCTION_STATUS.sql

============================================
LEAKED PASSWORD PROTECTION REMINDER
============================================

Don''t forget to enable in Supabase Dashboard:
Authentication → Settings → Password Protection
→ Enable "Leaked password protection"

============================================
' as final_status;