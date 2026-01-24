-- ============================================
-- REMOVE DUPLICATE FUNCTIONS WITHOUT SEARCH_PATH
-- ============================================

-- First, identify the exact signatures of functions WITHOUT search_path
SELECT 'Identifying duplicate functions...' as status;

-- Show all versions of each function
SELECT
    proname as function_name,
    pg_catalog.pg_get_function_identity_arguments(oid) as signature,
    CASE
        WHEN proconfig IS NULL THEN '❌ NO search_path - WILL DROP'
        WHEN proconfig::text LIKE '%search_path%' THEN '✅ HAS search_path - KEEP'
        ELSE '⚠️ Unknown'
    END as action,
    oid
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission')
ORDER BY proname, oid;

-- Drop the versions WITHOUT search_path
DO $$
DECLARE
    func_record RECORD;
    drop_cmd TEXT;
BEGIN
    -- Loop through functions without search_path
    FOR func_record IN
        SELECT
            proname,
            pg_catalog.pg_get_function_identity_arguments(oid) as args,
            oid
        FROM pg_proc
        WHERE pronamespace = 'public'::regnamespace
        AND proname IN ('assign_role_to_user', 'user_has_permission')
        AND (proconfig IS NULL OR proconfig::text NOT LIKE '%search_path%')
    LOOP
        -- Build DROP command
        drop_cmd := format('DROP FUNCTION IF EXISTS public.%I(%s)', func_record.proname, func_record.args);

        -- Log what we're dropping
        RAISE NOTICE 'Dropping duplicate: %', drop_cmd;

        -- Execute the drop
        EXECUTE drop_cmd;
    END LOOP;

    RAISE NOTICE 'Duplicate function cleanup complete!';
END;
$$;

-- ============================================
-- VERIFY CLEANUP
-- ============================================

SELECT 'Verifying cleanup...' as status;

-- Check remaining functions - should only have versions WITH search_path
SELECT
    proname as function_name,
    pg_catalog.pg_get_function_identity_arguments(oid) as signature,
    CASE
        WHEN proconfig IS NULL THEN '❌ NO search_path'
        WHEN proconfig::text LIKE '%search_path%' THEN '✅ HAS search_path'
        ELSE '⚠️ Unknown'
    END as status
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission')
ORDER BY proname;

-- Final count check
SELECT
    CASE
        WHEN COUNT(*) = 2
             AND COUNT(*) FILTER (WHERE proconfig IS NOT NULL AND proconfig::text LIKE '%search_path%') = 2
        THEN '✅ SUCCESS: Duplicates removed! Only secure versions remain.'
        WHEN COUNT(*) = 0
        THEN '❌ ERROR: All functions were removed! Run FIX_FUNCTIONS_SAFE.sql to recreate.'
        ELSE '⚠️ PARTIAL: ' || COUNT(*) || ' functions remain, ' ||
             COUNT(*) FILTER (WHERE proconfig IS NOT NULL AND proconfig::text LIKE '%search_path%') || ' have search_path'
    END as result,
    COUNT(*) as total_functions,
    COUNT(*) FILTER (WHERE proconfig IS NOT NULL AND proconfig::text LIKE '%search_path%') as with_search_path
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission');

-- ============================================
-- FINAL STATUS
-- ============================================

SELECT '
============================================
DUPLICATE FUNCTION CLEANUP COMPLETE
============================================

✅ Removed duplicate functions without search_path
✅ Kept versions with search_path = public, pg_catalog

Your database should now pass the security audit!

============================================
LAST REMAINING TASK
============================================

Enable Leaked Password Protection:
1. Go to Supabase Dashboard
2. Authentication → Settings
3. Enable "Leaked password protection"

Then you will have ZERO security warnings!
============================================
' as final_message;