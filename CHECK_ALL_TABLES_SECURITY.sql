-- RUN THIS TO SEE ALL EXPOSED TABLES IN YOUR DATABASE
-- Any table with rowsecurity = FALSE is COMPLETELY EXPOSED to the public!

SELECT
  schemaname,
  tablename,
  CASE
    WHEN rowsecurity = true THEN '✅ PROTECTED'
    WHEN rowsecurity = false THEN '🚨 EXPOSED - ENABLE RLS NOW!'
  END as security_status,
  rowsecurity
FROM
  pg_tables
WHERE
  schemaname = 'public'
ORDER BY rowsecurity ASC, tablename;

-- If you see any tables with '🚨 EXPOSED', run this for each one:
-- ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Then create appropriate policies based on your needs:
-- - Public read: FOR SELECT TO anon
-- - Public write: FOR INSERT TO anon
-- - Admin only: FOR ALL TO service_role
-- - Authenticated users: FOR ALL TO authenticated