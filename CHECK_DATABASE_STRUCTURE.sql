-- ============================================
-- CHECK DATABASE STRUCTURE FIRST
-- Run this to see what tables and columns exist
-- ============================================

-- 1. List all tables and their RLS status
SELECT
  tablename,
  CASE WHEN rowsecurity THEN '✅ RLS ON' ELSE '❌ RLS OFF' END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Check columns in tasks table
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'tasks'
ORDER BY ordinal_position;

-- 3. Check columns in waitlist table
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'waitlist'
ORDER BY ordinal_position;

-- 4. Check all existing policies
SELECT
  tablename,
  policyname,
  cmd as operation,
  roles,
  CASE
    WHEN qual = 'true' THEN '⚠️ ALWAYS TRUE'
    ELSE '✅ Has conditions'
  END as using_clause,
  CASE
    WHEN with_check = 'true' THEN '⚠️ ALWAYS TRUE'
    WHEN with_check IS NULL THEN '- N/A -'
    ELSE '✅ Has conditions'
  END as check_clause
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 5. Check all functions
SELECT
  proname as function_name,
  CASE WHEN prosecdef THEN 'SECURITY DEFINER' ELSE 'SECURITY INVOKER' END as security,
  CASE
    WHEN prosearch_path IS NOT NULL THEN '✅ search_path set'
    ELSE '❌ NO search_path'
  END as search_path_status
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
ORDER BY proname;

-- 6. List all tables that need attention
SELECT
  tablename,
  'Needs RLS enabled' as issue
FROM pg_tables
WHERE schemaname = 'public'
AND NOT rowsecurity

UNION ALL

SELECT
  tablename,
  'Has RLS but no policies' as issue
FROM pg_tables t
WHERE schemaname = 'public'
AND rowsecurity
AND NOT EXISTS (
  SELECT 1 FROM pg_policies p
  WHERE p.schemaname = t.schemaname
  AND p.tablename = t.tablename
)

ORDER BY issue, tablename;