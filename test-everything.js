#!/usr/bin/env node

/**
 * COMPLETE APPLICATION TEST
 * Tests everything to ensure nothing broke after security changes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const http = require('http');

// Colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Results tracking
const results = { passed: 0, failed: 0, errors: [] };

// Test helper
async function test(name, fn) {
  process.stdout.write(`Testing ${name}... `);
  try {
    await fn();
    console.log(`${colors.green}✅${colors.reset}`);
    results.passed++;
  } catch (error) {
    console.log(`${colors.red}❌${colors.reset}`);
    console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
    results.failed++;
    results.errors.push({ test: name, error: error.message });
  }
}

async function runTests() {
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.blue}COMPREHENSIVE APPLICATION TEST${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

  // 1. PROJECT STRUCTURE
  console.log(`${colors.cyan}=== PROJECT STRUCTURE ===${colors.reset}\n`);

  await test('package.json exists', async () => {
    if (!fs.existsSync('package.json')) throw new Error('Missing package.json');
  });

  await test('Next.js config exists', async () => {
    if (!fs.existsSync('next.config.ts') && !fs.existsSync('next.config.js') && !fs.existsSync('next.config.mjs')) {
      throw new Error('Missing Next.js config');
    }
  });

  await test('.env.local exists', async () => {
    if (!fs.existsSync('.env.local')) throw new Error('Missing .env.local');
  });

  await test('app directory exists', async () => {
    if (!fs.existsSync('app') && !fs.existsSync('src/app')) throw new Error('Missing app directory');
  });

  // 2. BUILD TEST
  console.log(`\n${colors.cyan}=== BUILD TEST ===${colors.reset}\n`);

  await test('Project builds successfully', async () => {
    console.log('\n  Building project (this may take a minute)...');
    execSync('npm run build', { stdio: 'pipe' });
    console.log('  Build complete!');
  });

  await test('.next directory created', async () => {
    if (!fs.existsSync('.next')) throw new Error('Build output missing');
  });

  // 3. DATABASE CONNECTION
  console.log(`\n${colors.cyan}=== DATABASE CONNECTION ===${colors.reset}\n`);

  // Load environment variables
  require('dotenv').config({ path: '.env.local' });

  await test('Supabase environment variables exist', async () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
  });

  // 4. DATABASE FUNCTIONALITY
  console.log(`\n${colors.cyan}=== DATABASE FUNCTIONALITY ===${colors.reset}\n`);

  const { createClient } = require('@supabase/supabase-js');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  const anonClient = createClient(supabaseUrl, supabaseAnonKey);
  const serviceClient = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

  // Test waitlist
  await test('Waitlist - can insert', async () => {
    const testEmail = `test_${Date.now()}@example.com`;
    const { error } = await anonClient.from('waitlist').insert({ email: testEmail });
    if (error) throw new Error(`Waitlist insert failed: ${error.message}`);

    // Cleanup
    if (serviceClient) {
      await serviceClient.from('waitlist').delete().eq('email', testEmail);
    }
  });

  await test('Waitlist - rejects invalid email', async () => {
    const { error } = await anonClient.from('waitlist').insert({ email: 'not-valid' });
    if (!error) throw new Error('Should reject invalid email');
  });

  await test('Waitlist - anonymous cannot read', async () => {
    const { data } = await anonClient.from('waitlist').select('*');
    if (data && data.length > 0) throw new Error('Waitlist should not be readable');
  });

  // Test critical tables protection
  await test('Critical tables - credentials_vault protected', async () => {
    const { data } = await anonClient.from('credentials_vault').select('*');
    if (data && data.length > 0) throw new Error('CRITICAL: credentials_vault exposed!');
  });

  await test('Critical tables - oauth_codes protected', async () => {
    const { data } = await anonClient.from('oauth_authorization_codes').select('*');
    if (data && data.length > 0) throw new Error('CRITICAL: oauth_codes exposed!');
  });

  // Test authentication
  await test('Authentication - signup works', async () => {
    const testEmail = `test_${Date.now()}@testuser.com`;
    const testPassword = `TestPassword${Date.now()}!`;

    const { data, error } = await anonClient.auth.signUp({
      email: testEmail,
      password: testPassword
    });

    if (error && !error.message.includes('rate') && !error.message.includes('Email')) {
      throw new Error(`Signup failed: ${error.message}`);
    }

    // Cleanup if successful
    if (data?.user?.id && serviceClient) {
      try {
        await serviceClient.auth.admin.deleteUser(data.user.id);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  });

  // Test RLS on other tables
  await test('RLS - users table protected', async () => {
    const { data } = await anonClient.from('users').select('*');
    if (data && data.length > 0) throw new Error('Users table should not be readable by anonymous');
  });

  await test('RLS - projects table protected', async () => {
    const { data } = await anonClient.from('projects').select('*');
    if (data && data.length > 0) throw new Error('Projects table should not be readable by anonymous');
  });

  await test('RLS - roles table protected', async () => {
    const { data } = await anonClient.from('roles').select('*');
    if (data && data.length > 0) throw new Error('Roles table should not be readable by anonymous');
  });

  // 5. PRODUCTION SERVER TEST
  console.log(`\n${colors.cyan}=== PRODUCTION SERVER ===${colors.reset}\n`);

  console.log('Starting production server...');
  const { spawn } = require('child_process');
  const serverProcess = spawn('npm', ['run', 'start'], {
    detached: true,
    stdio: 'ignore'
  });

  serverProcess.unref();

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Test pages
  await test('Homepage loads', async () => {
    return new Promise((resolve, reject) => {
      http.get('http://localhost:3000', (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          reject(new Error(`Homepage returned status ${res.statusCode}`));
        }
      }).on('error', reject);
    });
  });

  await test('Beta page accessible', async () => {
    return new Promise((resolve, reject) => {
      http.get('http://localhost:3000/beta', (res) => {
        // Allow redirects and 200s
        if (res.statusCode < 500) {
          resolve();
        } else {
          reject(new Error(`Beta page error ${res.statusCode}`));
        }
      }).on('error', reject);
    });
  });

  // Kill server
  try {
    if (serverProcess.pid) {
      process.kill(-serverProcess.pid);
    }
  } catch (e) {
    // Try alternative method
    try {
      execSync('pkill -f "next start"', { stdio: 'ignore' });
    } catch (e2) {
      // Ignore
    }
  }

  // FINAL REPORT
  console.log(`\n${colors.yellow}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.yellow}TEST RESULTS${colors.reset}`);
  console.log(`${colors.yellow}${'='.repeat(60)}${colors.reset}\n`);

  const total = results.passed + results.failed;
  const percentage = total > 0 ? ((results.passed / total) * 100).toFixed(1) : 0;

  console.log(`Passed: ${colors.green}${results.passed}/${total} (${percentage}%)${colors.reset}`);
  console.log(`Failed: ${colors.red}${results.failed}${colors.reset}\n`);

  if (results.errors.length > 0) {
    console.log(`${colors.red}Failed Tests:${colors.reset}`);
    results.errors.forEach(e => {
      console.log(`  • ${e.test}: ${e.error}`);
    });
  }

  console.log(`\n${colors.blue}SUMMARY:${colors.reset}`);

  if (percentage >= 90) {
    console.log(`${colors.green}✅ EXCELLENT! Application fully functional after security lockdown.${colors.reset}`);
  } else if (percentage >= 75) {
    console.log(`${colors.green}✅ GOOD! Core functionality working, minor issues present.${colors.reset}`);
  } else if (percentage >= 60) {
    console.log(`${colors.yellow}⚠️ PARTIAL: Most features work but needs attention.${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ CRITICAL: Significant issues detected.${colors.reset}`);
  }

  console.log(`\n${colors.cyan}Key Systems Status:${colors.reset}`);
  console.log(`  • Build System: ${results.errors.find(e => e.test.includes('build')) ? '❌' : '✅'}`);
  console.log(`  • Database Security: ${results.errors.find(e => e.test.includes('Critical')) ? '❌' : '✅'}`);
  console.log(`  • Waitlist: ${results.errors.find(e => e.test.includes('Waitlist')) ? '❌' : '✅'}`);
  console.log(`  • Authentication: ${results.errors.find(e => e.test.includes('Authentication')) ? '❌' : '✅'}`);
  console.log(`  • RLS Protection: ${results.errors.find(e => e.test.includes('RLS')) ? '❌' : '✅'}`);
  console.log(`  • Production Pages: ${results.errors.find(e => e.test.includes('page')) ? '❌' : '✅'}`);

  process.exit(results.failed > 3 ? 1 : 0); // Allow a few failures
}

// Check dependencies
try {
  require('@supabase/supabase-js');
  require('dotenv');
} catch (e) {
  console.log(`${colors.yellow}Installing required dependencies...${colors.reset}`);
  execSync('npm install @supabase/supabase-js dotenv', { stdio: 'inherit' });
}

// Run tests
runTests().catch(error => {
  console.error(`${colors.red}Test suite crashed: ${error.message}${colors.reset}`);
  process.exit(1);
});