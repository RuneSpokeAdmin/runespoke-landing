-- ============================================
-- QUICK VERIFICATION OF FUNCTION SEARCH_PATH
-- Single query version to avoid EXPLAIN issues
-- ============================================

SELECT
    proname as function_name,
    CASE
        WHEN proconfig IS NULL THEN '❌ NO search_path'
        WHEN proconfig::text LIKE '%search_path%' THEN '✅ HAS search_path'
        ELSE '⚠️ No search_path'
    END as config_status,
    CASE
        WHEN pg_get_functiondef(oid) LIKE '%SET search_path%' THEN '✅ SET in definition'
        ELSE '❌ NOT in definition'
    END as definition_status,
    proconfig::text as actual_config
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission')
ORDER BY proname;