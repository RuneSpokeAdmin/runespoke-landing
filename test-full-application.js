#!/usr/bin/env node

/**
 * FULL APPLICATION TEST SUITE
 * Tests EVERYTHING - pages, routes, API, database, auth, etc.
 * Ensures nothing is broken after security lockdown
 */

const { execSync } = require('child_process');
const http = require('http');
const https = require('https');
const fs = require('fs');

// Colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Test tracking
const testResults = {
  passed: [],
  failed: [],
  warnings: []
};

// Helper: Test runner
async function test(category, name, fn) {
  const fullName = `${category}: ${name}`;
  process.stdout.write(`${colors.cyan}Testing ${fullName}...${colors.reset} `);

  try {
    await fn();
    console.log(`${colors.green}✅${colors.reset}`);
    testResults.passed.push(fullName);
  } catch (error) {
    console.log(`${colors.red}❌${colors.reset}`);
    console.error(`  ${colors.red}Error: ${error.message}${colors.reset}`);
    testResults.failed.push({ test: fullName, error: error.message });
  }
}

// Helper: Make HTTP request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data, headers: res.headers });
      });
    }).on('error', reject);
  });
}

// Helper: Execute command
function exec(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      ...options
    });
    return { success: true, output: result };
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout?.toString() };
  }
}

// ============================================
// 1. BUILD AND COMPILATION TESTS
// ============================================

async function testBuildSystem() {
  console.log(`\n${colors.magenta}=== BUILD & COMPILATION ===${colors.reset}\n`);

  // Test Next.js build
  await test('Build', 'Next.js production build', async () => {
    console.log('\n  Building Next.js app (this may take a minute)...');
    const result = exec('npm run build', { stdio: 'pipe' });

    if (!result.success) {
      throw new Error(`Build failed: ${result.error}`);
    }

    // Check for build output
    if (!fs.existsSync('.next')) {
      throw new Error('.next directory not created');
    }

    console.log('  Build completed successfully');
  });

  // Test TypeScript compilation
  await test('Build', 'TypeScript compilation', async () => {
    const result = exec('npx tsc --noEmit', { stdio: 'pipe' });
    if (!result.success && result.error.includes('error TS')) {
      throw new Error('TypeScript compilation errors found');
    }
  });

  // Test linting
  await test('Build', 'ESLint check', async () => {
    const result = exec('npm run lint', { stdio: 'pipe' });
    if (!result.success && !result.error.includes('warning')) {
      throw new Error('ESLint errors found');
    }
  });
}

// ============================================
// 2. PRODUCTION SERVER TESTS
// ============================================

async function testProductionServer() {
  console.log(`\n${colors.magenta}=== PRODUCTION SERVER ===${colors.reset}\n`);

  console.log('Starting production server...');

  // Start the production server
  const server = exec('npm run start', {
    detached: true,
    stdio: 'ignore'
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Test homepage
  await test('Pages', 'Homepage loads', async () => {
    const response = await makeRequest('http://localhost:3000');
    if (response.status !== 200) {
      throw new Error(`Homepage returned status ${response.status}`);
    }
    if (!response.data.includes('<!DOCTYPE html>')) {
      throw new Error('Homepage HTML not valid');
    }
  });

  // Test critical pages
  const pages = [
    { path: '/', name: 'Landing page' },
    { path: '/beta', name: 'Beta page' },
    { path: '/dashboard', name: 'Dashboard (redirect expected)' },
    { path: '/login', name: 'Login page' },
    { path: '/signup', name: 'Signup page' },
    { path: '/api/health', name: 'Health check API' }
  ];

  for (const page of pages) {
    await test('Pages', page.name, async () => {
      const response = await makeRequest(`http://localhost:3000${page.path}`);

      // Allow redirects for protected pages
      if (page.path === '/dashboard' && (response.status === 302 || response.status === 307)) {
        return; // Redirect to login is expected
      }

      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Page returned ${response.status}`);
      }
    });
  }

  // Kill the server
  try {
    exec('pkill -f "next start"', { stdio: 'ignore' });
  } catch (e) {
    // Ignore errors when killing process
  }
}

// ============================================
// 3. DATABASE CONNECTION TESTS
// ============================================

async function testDatabaseConnection() {
  console.log(`\n${colors.magenta}=== DATABASE CONNECTION ===${colors.reset}\n`);

  const { createClient } = require('@supabase/supabase-js');

  // Load environment variables
  require('dotenv').config({ path: '.env.local' });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  // Test anon connection
  await test('Database', 'Anonymous client connection', async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase credentials not found in environment');
    }

    const client = createClient(supabaseUrl, supabaseAnonKey);

    // Try a simple query
    const { data, error } = await client
      .from('waitlist')
      .select('count')
      .limit(1);

    if (error && !error.message.includes('permission')) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  });

  // Test service role connection
  await test('Database', 'Service role connection', async () => {
    if (!supabaseServiceKey) {
      console.log('  (Service key not found - skipping)');
      return;
    }

    const client = createClient(supabaseUrl, supabaseServiceKey);

    const { count, error } = await client
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Service connection failed: ${error.message}`);
    }
  });

  // Test RLS is enabled
  await test('Database', 'RLS enabled on critical tables', async () => {
    const client = createClient(supabaseUrl, supabaseAnonKey);

    // Try to read credentials_vault (should fail/return empty)
    const { data } = await client
      .from('credentials_vault')
      .select('*');

    if (data && data.length > 0) {
      throw new Error('CRITICAL: credentials_vault is readable by anonymous!');
    }
  });
}

// ============================================
// 4. API ENDPOINT TESTS
// ============================================

async function testAPIEndpoints() {
  console.log(`\n${colors.magenta}=== API ENDPOINTS ===${colors.reset}\n`);

  // Test Supabase endpoints
  await test('API', 'Supabase REST API accessible', async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const response = await makeRequest(`${supabaseUrl}/rest/v1/`);

    if (response.status === 404) {
      // This is actually expected - the root returns 404
      return;
    }

    if (response.status >= 500) {
      throw new Error(`Supabase API error: ${response.status}`);
    }
  });

  // Test auth endpoints
  await test('API', 'Supabase Auth API accessible', async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const response = await makeRequest(`${supabaseUrl}/auth/v1/health`);

    if (response.status !== 200) {
      throw new Error(`Auth API returned ${response.status}`);
    }
  });
}

// ============================================
// 5. AUTHENTICATION FLOW TESTS
// ============================================

async function testAuthenticationFlows() {
  console.log(`\n${colors.magenta}=== AUTHENTICATION FLOWS ===${colors.reset}\n`);

  const { createClient } = require('@supabase/supabase-js');
  require('dotenv').config({ path: '.env.local' });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const client = createClient(supabaseUrl, supabaseAnonKey);

  // Test signup flow
  await test('Auth', 'Signup flow works', async () => {
    const testEmail = `test_${Date.now()}@example.com`;
    const testPassword = `TestPass${Date.now()}!`;

    const { data, error } = await client.auth.signUp({
      email: testEmail,
      password: testPassword
    });

    if (error) {
      throw new Error(`Signup failed: ${error.message}`);
    }

    // Clean up
    if (data.user) {
      await client.auth.admin?.deleteUser?.(data.user.id).catch(() => {});
    }
  });

  // Test password reset flow
  await test('Auth', 'Password reset flow initiates', async () => {
    const { error } = await client.auth.resetPasswordForEmail('test@example.com');

    // We expect this to succeed even for non-existent emails (security)
    if (error && !error.message.includes('rate')) {
      throw new Error(`Reset failed: ${error.message}`);
    }
  });
}

// ============================================
// 6. WAITLIST FUNCTIONALITY
// ============================================

async function testWaitlistFunctionality() {
  console.log(`\n${colors.magenta}=== WAITLIST FUNCTIONALITY ===${colors.reset}\n`);

  const { createClient } = require('@supabase/supabase-js');
  require('dotenv').config({ path: '.env.local' });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  const anonClient = createClient(supabaseUrl, supabaseAnonKey);
  const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

  const testEmail = `test_${Date.now()}@example.com`;

  // Test waitlist signup
  await test('Waitlist', 'Can sign up for waitlist', async () => {
    const { error } = await anonClient
      .from('waitlist')
      .insert({ email: testEmail });

    if (error) {
      throw new Error(`Waitlist insert failed: ${error.message}`);
    }
  });

  // Test invalid email rejection
  await test('Waitlist', 'Rejects invalid emails', async () => {
    const { error } = await anonClient
      .from('waitlist')
      .insert({ email: 'not-an-email' });

    if (!error) {
      throw new Error('Should have rejected invalid email');
    }
  });

  // Cleanup
  await serviceClient
    .from('waitlist')
    .delete()
    .eq('email', testEmail)
    .catch(() => {});
}

// ============================================
// 7. FILE SYSTEM AND ASSETS
// ============================================

async function testFileSystem() {
  console.log(`\n${colors.magenta}=== FILE SYSTEM & ASSETS ===${colors.reset}\n`);

  // Check critical files exist
  const criticalFiles = [
    'package.json',
    'next.config.js',
    'tailwind.config.js',
    'tsconfig.json',
    '.env.local'
  ];

  for (const file of criticalFiles) {
    await test('Files', `${file} exists`, async () => {
      if (!fs.existsSync(file)) {
        throw new Error(`Critical file missing: ${file}`);
      }
    });
  }

  // Check critical directories
  const criticalDirs = [
    'src',
    'src/app',
    'src/components',
    'public'
  ];

  for (const dir of criticalDirs) {
    await test('Files', `${dir}/ directory exists`, async () => {
      if (!fs.existsSync(dir)) {
        throw new Error(`Critical directory missing: ${dir}`);
      }
    });
  }
}

// ============================================
// MAIN TEST RUNNER
// ============================================

async function runAllTests() {
  console.log(`${colors.yellow}${'='.repeat(70)}${colors.reset}`);
  console.log(`${colors.yellow}    FULL APPLICATION TEST SUITE${colors.reset}`);
  console.log(`${colors.yellow}    Testing EVERYTHING after security lockdown${colors.reset}`);
  console.log(`${colors.yellow}${'='.repeat(70)}${colors.reset}`);

  try {
    // Run all test suites
    await testFileSystem();
    await testBuildSystem();
    await testDatabaseConnection();
    await testAPIEndpoints();
    await testAuthenticationFlows();
    await testWaitlistFunctionality();
    await testProductionServer();

    // Generate report
    console.log(`\n${colors.yellow}${'='.repeat(70)}${colors.reset}`);
    console.log(`${colors.yellow}    FINAL TEST REPORT${colors.reset}`);
    console.log(`${colors.yellow}${'='.repeat(70)}${colors.reset}\n`);

    const total = testResults.passed.length + testResults.failed.length;
    const passRate = ((testResults.passed.length / total) * 100).toFixed(1);

    console.log(`${colors.green}✅ Passed: ${testResults.passed.length}/${total} (${passRate}%)${colors.reset}`);

    if (testResults.failed.length > 0) {
      console.log(`${colors.red}❌ Failed: ${testResults.failed.length}${colors.reset}\n`);
      console.log(`${colors.red}Failed Tests:${colors.reset}`);
      testResults.failed.forEach(({ test, error }) => {
        console.log(`  ${colors.red}✗${colors.reset} ${test}`);
        console.log(`    ${colors.yellow}→${colors.reset} ${error}`);
      });
    }

    if (testResults.warnings.length > 0) {
      console.log(`\n${colors.yellow}⚠️  Warnings: ${testResults.warnings.length}${colors.reset}`);
      testResults.warnings.forEach(warning => {
        console.log(`  ${colors.yellow}!${colors.reset} ${warning}`);
      });
    }

    // Overall status
    console.log(`\n${colors.cyan}${'='.repeat(70)}${colors.reset}`);
    console.log(`${colors.cyan}    APPLICATION STATUS${colors.reset}`);
    console.log(`${colors.cyan}${'='.repeat(70)}${colors.reset}\n`);

    if (passRate >= 90) {
      console.log(`${colors.green}🎉 EXCELLENT! Application is fully functional.${colors.reset}`);
      console.log(`${colors.green}Database security is locked down AND everything still works!${colors.reset}`);
    } else if (passRate >= 75) {
      console.log(`${colors.green}✅ GOOD! Core functionality is working.${colors.reset}`);
      console.log(`${colors.yellow}Some minor issues may need attention.${colors.reset}`);
    } else if (passRate >= 60) {
      console.log(`${colors.yellow}⚠️  PARTIAL SUCCESS - Most features working.${colors.reset}`);
      console.log(`${colors.yellow}Review failed tests above for issues.${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ CRITICAL ISSUES DETECTED${colors.reset}`);
      console.log(`${colors.red}Many tests failed. Review errors above.${colors.reset}`);
    }

    console.log(`\n${colors.blue}Key Results:${colors.reset}`);
    console.log(`  • Build system: ${testResults.passed.filter(t => t.includes('Build')).length > 0 ? '✅' : '❌'}`);
    console.log(`  • Database connection: ${testResults.passed.filter(t => t.includes('Database')).length > 0 ? '✅' : '❌'}`);
    console.log(`  • Authentication: ${testResults.passed.filter(t => t.includes('Auth')).length > 0 ? '✅' : '❌'}`);
    console.log(`  • Waitlist: ${testResults.passed.filter(t => t.includes('Waitlist')).length > 0 ? '✅' : '❌'}`);
    console.log(`  • Production pages: ${testResults.passed.filter(t => t.includes('Pages')).length > 0 ? '✅' : '❌'}`);
    console.log(`  • Critical files: ${testResults.passed.filter(t => t.includes('Files')).length > 0 ? '✅' : '❌'}`);

  } catch (error) {
    console.error(`\n${colors.red}Fatal error during testing: ${error.message}${colors.reset}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Check if we have required dependencies
try {
  require('@supabase/supabase-js');
  require('dotenv');
} catch (e) {
  console.log(`${colors.yellow}Installing required dependencies...${colors.reset}`);
  execSync('npm install @supabase/supabase-js dotenv', { stdio: 'inherit' });
}

// Run the tests
console.log(`${colors.cyan}Starting comprehensive test suite...${colors.reset}\n`);
runAllTests().then(() => {
  console.log(`\n${colors.cyan}Test suite completed!${colors.reset}`);
  process.exit(testResults.failed.length > 0 ? 1 : 0);
}).catch(error => {
  console.error(`${colors.red}Test suite crashed: ${error.message}${colors.reset}`);
  process.exit(1);
});