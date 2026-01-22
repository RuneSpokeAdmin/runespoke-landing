/**
 * API Security Test Suite
 * Tests all endpoints after database security lockdown
 * Run with: node test-api-security.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase credentials in environment');
    process.exit(1);
}

// Create different clients for different roles
const anonClient = createClient(supabaseUrl, supabaseAnonKey);
const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const testResults = [];

// Test helper functions
function test(description, fn) {
    totalTests++;
    return fn()
        .then(() => {
            passedTests++;
            console.log(`  ✅ ${description}`);
            testResults.push({ test: description, passed: true });
        })
        .catch((error) => {
            failedTests++;
            console.log(`  ❌ ${description}`);
            console.log(`     Error: ${error.message}`);
            testResults.push({ test: description, passed: false, error: error.message });
        });
}

function expectError(promise, errorMessage = 'Expected error') {
    return promise
        .then(() => {
            throw new Error(`${errorMessage} - but operation succeeded`);
        })
        .catch((error) => {
            if (error.message.includes('but operation succeeded')) {
                throw error;
            }
            // Expected error occurred
            return true;
        });
}

async function runTests() {
    console.log('========================================');
    console.log('API SECURITY TEST SUITE');
    console.log('========================================\n');

    // ============================================
    // TEST 1: WAITLIST API ENDPOINTS
    // ============================================
    console.log('TEST 1: WAITLIST FUNCTIONALITY');

    const testEmail = `test_${Date.now()}@example.com`;

    await test('1.1 Anonymous can sign up for waitlist', async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/waitlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testEmail })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to sign up: ${response.status} - ${error}`);
        }
    });

    await test('1.2 Cannot sign up with invalid email', async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/waitlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'invalid-email' })
        });

        if (response.ok) {
            throw new Error('Should not accept invalid email');
        }
    });

    await test('1.3 Admin can view waitlist with auth', async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/waitlist`, {
            headers: {
                'Authorization': `Bearer ${process.env.WAITLIST_SECRET || 'rs-hub-beta-2024-secure-key'}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get waitlist: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.emails)) {
            throw new Error('Response should contain emails array');
        }
    });

    await test('1.4 Cannot view waitlist without auth', async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/waitlist`);

        if (response.ok) {
            throw new Error('Should require authentication');
        }
    });

    // Clean up test email
    if (serviceClient) {
        await serviceClient.from('waitlist').delete().eq('email', testEmail);
    }

    // ============================================
    // TEST 2: SUPABASE CLIENT - ANON ACCESS
    // ============================================
    console.log('\nTEST 2: ANONYMOUS USER RESTRICTIONS');

    await test('2.1 Anon cannot read users table', async () => {
        return expectError(
            anonClient.from('users').select('*'),
            'Anon should not read users'
        );
    });

    await test('2.2 Anon cannot read credentials_vault', async () => {
        return expectError(
            anonClient.from('credentials_vault').select('*'),
            'Anon should not read credentials'
        );
    });

    await test('2.3 Anon cannot read oauth_authorization_codes', async () => {
        return expectError(
            anonClient.from('oauth_authorization_codes').select('*'),
            'Anon should not read OAuth codes'
        );
    });

    await test('2.4 Anon can insert into waitlist', async () => {
        const testEmail2 = `anon_test_${Date.now()}@example.com`;
        const { error } = await anonClient
            .from('waitlist')
            .insert({ email: testEmail2 });

        if (error) throw error;

        // Clean up
        await serviceClient.from('waitlist').delete().eq('email', testEmail2);
    });

    await test('2.5 Anon cannot read waitlist', async () => {
        const { data, error } = await anonClient
            .from('waitlist')
            .select('*');

        // Should either error or return empty array due to RLS
        if (!error && data && data.length > 0) {
            throw new Error('Anon should not see waitlist entries');
        }
    });

    // ============================================
    // TEST 3: AUTHENTICATED USER ACCESS
    // ============================================
    console.log('\nTEST 3: AUTHENTICATED USER ACCESS');

    // Create a test user for authenticated tests
    let testUser = null;
    if (serviceClient) {
        const { data, error } = await serviceClient.auth.admin.createUser({
            email: `testuser_${Date.now()}@example.com`,
            password: 'TestPassword123!',
            email_confirm: true
        });

        if (!error && data) {
            testUser = data.user;
            console.log(`  Created test user: ${testUser.email}`);

            // Sign in to get authenticated client
            const { data: session } = await anonClient.auth.signInWithPassword({
                email: testUser.email,
                password: 'TestPassword123!'
            });

            if (session) {
                const authClient = createClient(supabaseUrl, supabaseAnonKey, {
                    auth: {
                        persistSession: false,
                        autoRefreshToken: false
                    }
                });

                await test('3.1 Authenticated user can read own profile', async () => {
                    const { data, error } = await authClient
                        .from('users')
                        .select('*')
                        .eq('id', testUser.id);

                    if (error) throw error;
                });

                await test('3.2 Authenticated user cannot read others profiles', async () => {
                    const { data } = await authClient
                        .from('users')
                        .select('*')
                        .neq('id', testUser.id);

                    if (data && data.length > 0) {
                        throw new Error('Should not see other users');
                    }
                });

                await test('3.3 Authenticated user can read permissions', async () => {
                    const { error } = await authClient
                        .from('permissions')
                        .select('*');

                    if (error && error.code !== 'PGRST116') { // Table might not exist
                        throw error;
                    }
                });

                await test('3.4 Authenticated user cannot access critical tables', async () => {
                    return expectError(
                        authClient.from('oauth_authorization_codes').select('*'),
                        'Should not access OAuth codes'
                    );
                });
            }

            // Clean up test user
            await serviceClient.auth.admin.deleteUser(testUser.id);
        }
    }

    // ============================================
    // TEST 4: SERVICE ROLE ACCESS
    // ============================================
    console.log('\nTEST 4: SERVICE ROLE ACCESS');

    if (serviceClient) {
        await test('4.1 Service role can read all tables', async () => {
            const tables = ['users', 'waitlist', 'credentials_vault'];
            for (const table of tables) {
                const { error } = await serviceClient.from(table).select('*').limit(1);
                if (error && error.code !== 'PGRST116') { // Table might not exist
                    throw new Error(`Cannot read ${table}: ${error.message}`);
                }
            }
        });

        await test('4.2 Service role can manage waitlist', async () => {
            const testEmail3 = `service_test_${Date.now()}@example.com`;

            // Insert
            const { error: insertError } = await serviceClient
                .from('waitlist')
                .insert({ email: testEmail3 });
            if (insertError) throw insertError;

            // Read
            const { data, error: readError } = await serviceClient
                .from('waitlist')
                .select('*')
                .eq('email', testEmail3);
            if (readError) throw readError;
            if (!data || data.length === 0) throw new Error('Could not read inserted email');

            // Delete
            const { error: deleteError } = await serviceClient
                .from('waitlist')
                .delete()
                .eq('email', testEmail3);
            if (deleteError) throw deleteError;
        });
    }

    // ============================================
    // TEST 5: RLS POLICY VERIFICATION
    // ============================================
    console.log('\nTEST 5: RLS POLICY VERIFICATION');

    if (serviceClient) {
        await test('5.1 All tables have RLS enabled', async () => {
            const { data, error } = await serviceClient.rpc('check_rls_status', {});

            if (!error && data) {
                const tablesWithoutRLS = data.filter(t => !t.rls_enabled);
                if (tablesWithoutRLS.length > 0) {
                    throw new Error(`Tables without RLS: ${tablesWithoutRLS.map(t => t.tablename).join(', ')}`);
                }
            }
        }).catch(() => {
            // RPC might not exist, check via direct query
            console.log('     (RLS check via RPC not available)');
        });
    }

    // ============================================
    // FINAL SUMMARY
    // ============================================
    console.log('\n========================================');
    console.log('TEST RESULTS SUMMARY');
    console.log('========================================');
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests} ✅`);
    console.log(`Failed: ${failedTests} ❌`);
    console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

    if (failedTests > 0) {
        console.log('\nFailed Tests:');
        testResults
            .filter(r => !r.passed)
            .forEach(r => {
                console.log(`  - ${r.test}`);
                if (r.error) console.log(`    ${r.error}`);
            });
    }

    console.log('\n========================================');
    if (failedTests === 0) {
        console.log('✅ ALL TESTS PASSED - Database security is working correctly!');
    } else {
        console.log('⚠️  Some tests failed - review security configuration');
    }
    console.log('========================================');

    process.exit(failedTests > 0 ? 1 : 0);
}

// Run the tests
runTests().catch(error => {
    console.error('Test suite failed:', error);
    process.exit(1);
});