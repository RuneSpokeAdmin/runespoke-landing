-- ============================================
-- VERIFY SECURITY STATUS
-- ============================================

-- 1. What can anonymous users access?
SELECT
    'ANON ACCESS' as check,
    table_name,
    array_agg(DISTINCT privilege_type ORDER BY privilege_type) as permissions
FROM information_schema.table_privileges
WHERE grantee = 'anon'
AND table_schema = 'public'
GROUP BY table_name
ORDER BY table_name;

-- 2. What can authenticated users access?
SELECT
    'AUTHENTICATED ACCESS' as check,
    table_name,
    array_agg(DISTINCT privilege_type ORDER BY privilege_type) as permissions
FROM information_schema.table_privileges
WHERE grantee = 'authenticated'
AND table_schema = 'public'
GROUP BY table_name
ORDER BY table_name;

-- 3. Show all RLS policies
SELECT
    tablename,
    policyname,
    roles,
    cmd as operation,
    CASE
        WHEN qual = 'true' THEN '⚠️ ALWAYS TRUE'
        WHEN qual IS NULL THEN 'NO CHECK'
        ELSE 'Has conditions'
    END as using_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 4. Summary
SELECT
    (SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public' AND NOT rowsecurity) as "Tables without RLS",
    (SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public' AND rowsecurity) as "Tables with RLS",
    (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public') as "Total policies",
    (SELECT COUNT(DISTINCT table_name) FROM information_schema.table_privileges WHERE grantee = 'anon' AND table_schema = 'public') as "Tables anon can access";