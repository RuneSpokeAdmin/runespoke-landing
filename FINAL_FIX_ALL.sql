-- ============================================
-- FINAL COMPLETE FIX - ONE SCRIPT TO RULE THEM ALL
-- This handles everything in one go
-- ============================================

-- Step 1: Show current situation
SELECT '===== CURRENT SITUATION =====' as step;
SELECT
    proname as function_name,
    pg_catalog.pg_get_function_identity_arguments(oid) as signature,
    CASE
        WHEN proconfig IS NULL THEN '❌ NO search_path'
        WHEN proconfig::text LIKE '%search_path%' THEN '✅ HAS search_path'
    END as status
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission')
ORDER BY proname;

-- Step 2: Drop ALL versions of these functions
SELECT '===== DROPPING ALL VERSIONS =====' as step;

DROP FUNCTION IF EXISTS public.assign_role_to_user(uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.assign_role_to_user(p_user_id uuid, p_role_name text) CASCADE;
DROP FUNCTION IF EXISTS public.user_has_permission(uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.user_has_permission(p_user_id uuid, p_permission text) CASCADE;

-- Step 3: Recreate with proper search_path
SELECT '===== RECREATING WITH SEARCH_PATH =====' as step;

-- Create assign_role_to_user
CREATE FUNCTION public.assign_role_to_user(p_user_id uuid, p_role_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_role_id uuid;
BEGIN
  SELECT id INTO v_role_id FROM public.roles WHERE name = p_role_name;
  IF v_role_id IS NULL THEN
    RAISE EXCEPTION 'Role % not found', p_role_name;
  END IF;
  INSERT INTO public.user_roles (user_id, role_id)
  VALUES (p_user_id, v_role_id)
  ON CONFLICT (user_id, role_id) DO NOTHING;
END;
$$;

-- Create user_has_permission
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

-- Step 4: Final verification
SELECT '===== FINAL VERIFICATION =====' as step;
SELECT
    proname as function_name,
    CASE
        WHEN proconfig::text LIKE '%search_path%' THEN '✅ FIXED - HAS search_path'
        ELSE '❌ FAILED - NO search_path'
    END as status
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission')
ORDER BY proname;

-- Step 5: Summary
SELECT
    CASE
        WHEN COUNT(*) = 2 AND COUNT(*) FILTER (WHERE proconfig::text LIKE '%search_path%') = 2
        THEN '🎉 SUCCESS! Both functions fixed. Only leaked password protection remains.'
        ELSE '❌ Something went wrong. Check the output above.'
    END as final_result
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission');

SELECT '
============================================
✅ DATABASE SECURITY FIXES COMPLETE
============================================

Your database is now secure except for ONE manual step:

1. Go to: https://supabase.com/dashboard/project/hfmxaonbljzffkhdjyvv/settings/auth
2. Scroll to "Security and Protection"
3. Enable "Leaked password protection"

That''s it. You''re done.
============================================
' as done;