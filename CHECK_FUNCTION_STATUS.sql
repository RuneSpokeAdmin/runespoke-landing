-- ============================================
-- FUNCTION SEARCH_PATH STATUS CHECK
-- Diagnose why the functions still show warnings
-- ============================================

-- 1. Check exact function signatures
SELECT '===== 1. EXACT FUNCTION SIGNATURES =====' as section;
SELECT
    p.proname as function_name,
    pg_catalog.pg_get_function_identity_arguments(p.oid) as arguments,
    p.prorettype::regtype as return_type,
    p.prolang::regprocedure as language,
    p.proowner::regrole as owner
FROM pg_proc p
WHERE p.pronamespace = 'public'::regnamespace
AND p.proname IN ('assign_role_to_user', 'user_has_permission')
ORDER BY p.proname;

-- 2. Check current search_path settings
SELECT '===== 2. CURRENT SEARCH_PATH SETTINGS =====' as section;
SELECT
    p.proname as function_name,
    p.proconfig as config_settings,
    CASE
        WHEN p.proconfig IS NULL THEN '❌ NO CONFIG (uses caller search_path)'
        WHEN p.proconfig::text LIKE '%search_path%' THEN '✅ Has search_path: ' || p.proconfig::text
        ELSE '⚠️ Has config but no search_path: ' || p.proconfig::text
    END as search_path_status
FROM pg_proc p
WHERE p.pronamespace = 'public'::regnamespace
AND p.proname IN ('assign_role_to_user', 'user_has_permission')
ORDER BY p.proname;

-- 3. Check function definitions for SET clauses
SELECT '===== 3. FUNCTION DEFINITIONS (checking for SET clauses) =====' as section;
SELECT
    p.proname as function_name,
    CASE
        WHEN pg_get_functiondef(p.oid) LIKE '%SET search_path%' THEN 'YES - Has SET search_path'
        WHEN pg_get_functiondef(p.oid) LIKE '%SET %' THEN 'PARTIAL - Has SET but not search_path'
        ELSE 'NO - No SET clause found'
    END as has_set_clause,
    substring(pg_get_functiondef(p.oid) from 'SET [^;]+') as set_clause_extract
FROM pg_proc p
WHERE p.pronamespace = 'public'::regnamespace
AND p.proname IN ('assign_role_to_user', 'user_has_permission')
ORDER BY p.proname;

-- 4. Check for multiple versions of the same function
SELECT '===== 4. CHECKING FOR MULTIPLE FUNCTION VERSIONS =====' as section;
SELECT
    p.proname as function_name,
    count(*) as version_count,
    string_agg(pg_catalog.pg_get_function_identity_arguments(p.oid), ', ') as all_signatures
FROM pg_proc p
WHERE p.pronamespace = 'public'::regnamespace
AND p.proname IN ('assign_role_to_user', 'user_has_permission')
GROUP BY p.proname;

-- 5. Check dependencies that might prevent updates
SELECT '===== 5. DEPENDENCIES ON THESE FUNCTIONS =====' as section;
SELECT
    p.proname as function_name,
    d.deptype,
    CASE d.deptype
        WHEN 'n' THEN 'NORMAL'
        WHEN 'a' THEN 'AUTO'
        WHEN 'i' THEN 'INTERNAL'
        WHEN 'e' THEN 'EXTENSION'
        WHEN 'p' THEN 'PINNED'
        ELSE d.deptype::text
    END as dependency_type,
    COALESCE(
        d.refobjid::regclass::text,
        d.refobjid::regproc::text,
        d.refobjid::text
    ) as dependent_object
FROM pg_depend d
JOIN pg_proc p ON p.oid = d.objid
WHERE p.pronamespace = 'public'::regnamespace
AND p.proname IN ('assign_role_to_user', 'user_has_permission')
AND d.deptype NOT IN ('i', 'a')  -- Exclude internal/auto dependencies
ORDER BY p.proname, d.deptype;

-- 6. Get the full current definition of each function
SELECT '===== 6. FULL CURRENT DEFINITIONS =====' as section;

SELECT
    '--- Function: assign_role_to_user ---' as function_header,
    pg_get_functiondef(oid) as definition
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname = 'assign_role_to_user'
LIMIT 1;

SELECT
    '--- Function: user_has_permission ---' as function_header,
    pg_get_functiondef(oid) as definition
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname = 'user_has_permission'
LIMIT 1;

-- 7. Summary
SELECT '===== DIAGNOSIS SUMMARY =====' as section;
SELECT
    'Total functions checked' as metric,
    count(*) as value
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('assign_role_to_user', 'user_has_permission');

SELECT
    'Functions WITHOUT search_path' as metric,
    count(*) as value
FROM pg_proc p
WHERE p.pronamespace = 'public'::regnamespace
AND p.proname IN ('assign_role_to_user', 'user_has_permission')
AND (p.proconfig IS NULL OR p.proconfig::text NOT LIKE '%search_path%');

-- Final recommendations
SELECT '
============================================
DIAGNOSIS COMPLETE - WHAT TO DO NEXT:
============================================

1. Look at section 2 above:
   - If you see "NO CONFIG" → Functions need search_path set
   - Run FIX_FUNCTIONS_SAFE.sql next

2. Look at section 4 above:
   - If version_count > 1 → You have overloaded functions
   - May need to drop specific signatures

3. Look at section 5 above:
   - If dependencies exist → Other objects depend on these
   - May need CASCADE or careful handling

4. Look at section 6 above:
   - Check if definitions show "SET search_path"
   - If not, they definitely need updating

============================================
' as recommendations;