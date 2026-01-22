-- ============================================
-- COMPREHENSIVE DATABASE SECURITY TEST SUITE
-- Tests all functionality after security lockdown
-- ============================================

-- Setup test data
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'STARTING DATABASE SECURITY TEST SUITE';
    RAISE NOTICE '========================================';
END $$;

-- ============================================
-- TEST 1: WAITLIST FUNCTIONALITY
-- ============================================

DO $$
DECLARE
    test_email text := 'test_' || gen_random_uuid()::text || '@example.com';
    insert_success boolean := false;
BEGIN
    RAISE NOTICE 'TEST 1: WAITLIST FUNCTIONALITY';

    -- Test 1.1: Anon can insert into waitlist
    BEGIN
        -- Simulate anon user
        SET LOCAL ROLE anon;
        INSERT INTO waitlist (email) VALUES (test_email);
        insert_success := true;
        RAISE NOTICE '  ✅ 1.1 Anon can insert into waitlist';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ❌ 1.1 Anon CANNOT insert into waitlist: %', SQLERRM;
    END;
    RESET ROLE;

    -- Test 1.2: Anon cannot read waitlist
    BEGIN
        SET LOCAL ROLE anon;
        PERFORM * FROM waitlist LIMIT 1;
        RAISE NOTICE '  ❌ 1.2 Anon CAN read waitlist (should not be able to)';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ✅ 1.2 Anon cannot read waitlist (expected)';
    END;
    RESET ROLE;

    -- Test 1.3: Anon cannot delete from waitlist
    BEGIN
        SET LOCAL ROLE anon;
        DELETE FROM waitlist WHERE email = test_email;
        RAISE NOTICE '  ❌ 1.3 Anon CAN delete from waitlist (should not be able to)';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ✅ 1.3 Anon cannot delete from waitlist (expected)';
    END;
    RESET ROLE;

    -- Clean up
    DELETE FROM waitlist WHERE email = test_email;
END $$;

-- ============================================
-- TEST 2: CRITICAL TABLES PROTECTION
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE 'TEST 2: CRITICAL TABLES PROTECTION';

    -- Test 2.1: Anon cannot access credentials_vault
    BEGIN
        SET LOCAL ROLE anon;
        PERFORM * FROM credentials_vault LIMIT 1;
        RAISE NOTICE '  ❌ 2.1 Anon CAN access credentials_vault (CRITICAL SECURITY ISSUE)';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ✅ 2.1 Anon cannot access credentials_vault';
    END;
    RESET ROLE;

    -- Test 2.2: Authenticated cannot access oauth_authorization_codes
    BEGIN
        SET LOCAL ROLE authenticated;
        PERFORM * FROM oauth_authorization_codes LIMIT 1;
        RAISE NOTICE '  ❌ 2.2 Authenticated CAN access oauth_authorization_codes (SECURITY ISSUE)';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ✅ 2.2 Authenticated cannot access oauth_authorization_codes';
    END;
    RESET ROLE;

    -- Test 2.3: Authenticated cannot access vault_tokens
    BEGIN
        SET LOCAL ROLE authenticated;
        PERFORM * FROM vault_tokens LIMIT 1;
        RAISE NOTICE '  ❌ 2.3 Authenticated CAN access vault_tokens (SECURITY ISSUE)';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ✅ 2.3 Authenticated cannot access vault_tokens';
    END;
    RESET ROLE;
END $$;

-- ============================================
-- TEST 3: USER TABLE RLS POLICIES
-- ============================================

DO $$
DECLARE
    test_user_id uuid := gen_random_uuid();
    other_user_id uuid := gen_random_uuid();
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE 'TEST 3: USER TABLE RLS POLICIES';

    -- Insert test users as service role
    INSERT INTO users (id, email) VALUES
        (test_user_id, 'testuser@example.com'),
        (other_user_id, 'otheruser@example.com');

    -- Test 3.1: User can see own record
    BEGIN
        SET LOCAL ROLE authenticated;
        SET LOCAL "request.jwt.claims" = json_build_object('sub', test_user_id)::text;
        PERFORM * FROM users WHERE id = test_user_id;
        RAISE NOTICE '  ✅ 3.1 User can see own record';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ❌ 3.1 User CANNOT see own record: %', SQLERRM;
    END;
    RESET ROLE;

    -- Test 3.2: User cannot see other user's record
    BEGIN
        SET LOCAL ROLE authenticated;
        SET LOCAL "request.jwt.claims" = json_build_object('sub', test_user_id)::text;
        PERFORM * FROM users WHERE id = other_user_id;
        -- If we get here, check if result is empty
        IF NOT FOUND THEN
            RAISE NOTICE '  ✅ 3.2 User cannot see other users record';
        ELSE
            RAISE NOTICE '  ❌ 3.2 User CAN see other users record (should not)';
        END IF;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ✅ 3.2 User cannot see other users record (via exception)';
    END;
    RESET ROLE;

    -- Clean up
    DELETE FROM users WHERE id IN (test_user_id, other_user_id);
END $$;

-- ============================================
-- TEST 4: PROJECTS TABLE RLS
-- ============================================

DO $$
DECLARE
    test_user_id uuid := gen_random_uuid();
    other_user_id uuid := gen_random_uuid();
    test_project_id int;
    other_project_id int;
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE 'TEST 4: PROJECTS TABLE RLS';

    -- Check if projects table has user_id column
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'projects'
        AND column_name = 'user_id'
    ) THEN
        -- Insert test data
        INSERT INTO projects (user_id, name) VALUES
            (test_user_id::text, 'My Project') RETURNING id INTO test_project_id;
        INSERT INTO projects (user_id, name) VALUES
            (other_user_id::text, 'Other Project') RETURNING id INTO other_project_id;

        -- Test 4.1: User can see own project
        BEGIN
            SET LOCAL ROLE authenticated;
            SET LOCAL "request.jwt.claims" = json_build_object('sub', test_user_id)::text;
            PERFORM * FROM projects WHERE user_id = test_user_id::text;
            RAISE NOTICE '  ✅ 4.1 User can see own projects';
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '  ❌ 4.1 User CANNOT see own projects: %', SQLERRM;
        END;
        RESET ROLE;

        -- Test 4.2: User cannot see other's project
        BEGIN
            SET LOCAL ROLE authenticated;
            SET LOCAL "request.jwt.claims" = json_build_object('sub', test_user_id)::text;
            PERFORM * FROM projects WHERE user_id = other_user_id::text;
            IF NOT FOUND THEN
                RAISE NOTICE '  ✅ 4.2 User cannot see others projects';
            ELSE
                RAISE NOTICE '  ❌ 4.2 User CAN see others projects (should not)';
            END IF;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '  ✅ 4.2 User cannot see others projects (via exception)';
        END;
        RESET ROLE;

        -- Clean up
        DELETE FROM projects WHERE id IN (test_project_id, other_project_id);
    ELSE
        RAISE NOTICE '  ⚠️  Projects table does not have user_id column - skipping tests';
    END IF;
END $$;

-- ============================================
-- TEST 5: TASKS TABLE RLS
-- ============================================

DO $$
DECLARE
    test_user_id uuid := gen_random_uuid();
    other_user_id uuid := gen_random_uuid();
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE 'TEST 5: TASKS TABLE RLS';

    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'tasks'
        AND column_name = 'user_id'
    ) THEN
        -- Insert test tasks
        INSERT INTO tasks (user_id, title) VALUES
            (test_user_id::text, 'My Task'),
            (other_user_id::text, 'Other Task');

        -- Test 5.1: User can CRUD own tasks
        BEGIN
            SET LOCAL ROLE authenticated;
            SET LOCAL "request.jwt.claims" = json_build_object('sub', test_user_id)::text;

            -- Try to read
            PERFORM * FROM tasks WHERE user_id = test_user_id::text;

            -- Try to update
            UPDATE tasks SET title = 'Updated Task' WHERE user_id = test_user_id::text;

            RAISE NOTICE '  ✅ 5.1 User can manage own tasks';
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '  ❌ 5.1 User CANNOT manage own tasks: %', SQLERRM;
        END;
        RESET ROLE;

        -- Test 5.2: User cannot access other's tasks
        BEGIN
            SET LOCAL ROLE authenticated;
            SET LOCAL "request.jwt.claims" = json_build_object('sub', test_user_id)::text;

            DELETE FROM tasks WHERE user_id = other_user_id::text;
            RAISE NOTICE '  ❌ 5.2 User CAN delete others tasks (should not)';
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '  ✅ 5.2 User cannot delete others tasks';
        END;
        RESET ROLE;

        -- Clean up
        DELETE FROM tasks WHERE user_id IN (test_user_id::text, other_user_id::text);
    ELSE
        RAISE NOTICE '  ⚠️  Tasks table does not have user_id column - skipping tests';
    END IF;
END $$;

-- ============================================
-- TEST 6: PERMISSION SYSTEM
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE 'TEST 6: PERMISSION SYSTEM';

    -- Test 6.1: Authenticated can read permissions
    BEGIN
        SET LOCAL ROLE authenticated;
        PERFORM * FROM permissions LIMIT 1;
        RAISE NOTICE '  ✅ 6.1 Authenticated can read permissions';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ❌ 6.1 Authenticated CANNOT read permissions: %', SQLERRM;
    END;
    RESET ROLE;

    -- Test 6.2: Authenticated cannot modify permissions
    BEGIN
        SET LOCAL ROLE authenticated;
        INSERT INTO permissions (name) VALUES ('test_permission');
        RAISE NOTICE '  ❌ 6.2 Authenticated CAN modify permissions (should not)';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ✅ 6.2 Authenticated cannot modify permissions';
    END;
    RESET ROLE;

    -- Test 6.3: Authenticated can read roles
    BEGIN
        SET LOCAL ROLE authenticated;
        PERFORM * FROM roles LIMIT 1;
        RAISE NOTICE '  ✅ 6.3 Authenticated can read roles';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '  ❌ 6.3 Authenticated CANNOT read roles: %', SQLERRM;
    END;
    RESET ROLE;
END $$;

-- ============================================
-- TEST 7: ANON RESTRICTIONS
-- ============================================

DO $$
DECLARE
    table_name text;
    tables_accessible int := 0;
    accessible_tables text := '';
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE 'TEST 7: ANON USER RESTRICTIONS';

    -- Test each table
    FOR table_name IN
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        BEGIN
            SET LOCAL ROLE anon;
            EXECUTE format('SELECT * FROM %I LIMIT 1', table_name);
            tables_accessible := tables_accessible + 1;
            accessible_tables := accessible_tables || table_name || ', ';
        EXCEPTION WHEN OTHERS THEN
            -- Expected - anon should not access most tables
            NULL;
        END;
        RESET ROLE;
    END LOOP;

    IF tables_accessible > 0 THEN
        RAISE NOTICE '  ⚠️  Anon can READ from % tables: %', tables_accessible, accessible_tables;
    ELSE
        RAISE NOTICE '  ✅ 7.1 Anon cannot read from any tables (expected)';
    END IF;
END $$;

-- ============================================
-- FINAL SUMMARY
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'TEST SUITE COMPLETED';
    RAISE NOTICE '';
    RAISE NOTICE 'Check results above for any ❌ marks';
    RAISE NOTICE 'All tests should show ✅ for secure setup';
    RAISE NOTICE '========================================';
END $$;

-- Show current security status
SELECT
    'FINAL STATUS' as report,
    (SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public' AND NOT rowsecurity) as "Tables without RLS",
    (SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public' AND rowsecurity) as "Tables with RLS",
    (SELECT COUNT(DISTINCT table_name) FROM information_schema.table_privileges WHERE grantee = 'anon' AND table_schema = 'public') as "Tables anon can access";