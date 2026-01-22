-- ============================================
-- COMPLETE DATABASE INSPECTION
-- Run this to see EVERYTHING in your database
-- ============================================

-- 1. ALL TABLES AND THEIR RLS STATUS
SELECT '=== ALL TABLES AND RLS STATUS ===' as section;
SELECT
  schemaname,
  tablename,
  rowsecurity as has_rls,
  CASE WHEN rowsecurity THEN 'YES' ELSE 'NO' END as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. ALL COLUMNS IN ALL TABLES
SELECT '=== ALL COLUMNS IN ALL TABLES ===' as section;
SELECT
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- 3. ALL EXISTING POLICIES
SELECT '=== ALL EXISTING POLICIES ===' as section;
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual as using_clause,
  with_check as with_check_clause
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 4. ALL FUNCTIONS
SELECT '=== ALL FUNCTIONS ===' as section;
SELECT
  proname as function_name,
  prosecdef as is_security_definer,
  provolatile as volatility,
  pronargs as num_arguments
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
ORDER BY proname;

-- 5. ALL VIEWS
SELECT '=== ALL VIEWS ===' as section;
SELECT
  table_name as view_name,
  view_definition
FROM information_schema.views
WHERE table_schema = 'public'
ORDER BY table_name;

-- 6. ALL INDEXES
SELECT '=== ALL INDEXES ===' as section;
SELECT
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 7. ALL TRIGGERS
SELECT '=== ALL TRIGGERS ===' as section;
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- 8. ALL FOREIGN KEYS
SELECT '=== ALL FOREIGN KEYS ===' as section;
SELECT
  conname as constraint_name,
  conrelid::regclass as table_name,
  confrelid::regclass as foreign_table_name
FROM pg_constraint
WHERE contype = 'f'
AND connamespace = 'public'::regnamespace
ORDER BY conrelid::regclass::text, conname;

-- 9. TABLE SIZES
SELECT '=== TABLE SIZES ===' as section;
SELECT
  relname as table_name,
  pg_size_pretty(pg_total_relation_size(relid)) as total_size,
  n_tup_ins as rows_inserted,
  n_tup_upd as rows_updated,
  n_tup_del as rows_deleted,
  n_live_tup as approximate_row_count
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(relid) DESC;

-- 10. ROLES AND PERMISSIONS
SELECT '=== DATABASE ROLES ===' as section;
SELECT
  rolname,
  rolsuper as is_superuser,
  rolinherit as can_inherit,
  rolcreaterole as can_create_role,
  rolcreatedb as can_create_db,
  rolcanlogin as can_login,
  rolreplication as can_replicate
FROM pg_roles
WHERE rolname IN ('anon', 'authenticated', 'service_role', 'postgres')
ORDER BY rolname;

-- 11. GRANTS ON TABLES
SELECT '=== TABLE PERMISSIONS ===' as section;
SELECT
  grantee,
  table_name,
  privilege_type
FROM information_schema.table_privileges
WHERE table_schema = 'public'
AND grantee IN ('anon', 'authenticated', 'service_role', 'public')
ORDER BY table_name, grantee, privilege_type;