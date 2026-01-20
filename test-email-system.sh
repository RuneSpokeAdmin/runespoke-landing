#!/bin/bash

echo "🧪 Testing RuneSpoke Email System"
echo "=================================="
echo ""

# Generate unique test email
TIMESTAMP=$(date +%s)
TEST_EMAIL="test-${TIMESTAMP}@runespoke.ai"

echo "1️⃣  Testing LOCAL environment (http://localhost:3000)"
echo "   Testing with: $TEST_EMAIL"
echo ""

# Test local signup
echo "   Sending signup request..."
RESPONSE=$(curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\"}" \
  -s)

echo "   Response: $RESPONSE"
echo ""

# Test with your actual email
echo "2️⃣  Testing with your admin email (should receive actual email)"
echo "   Email: admin@runespoke.ai"
echo ""

# First, let's remove admin@runespoke.ai from the waitlist to test fresh signup
echo "   Attempting fresh signup..."
ADMIN_TEST="admin-test-${TIMESTAMP}@runespoke.ai"
RESPONSE=$(curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_TEST\"}" \
  -s)

echo "   Response: $RESPONSE"
echo ""
echo "   ✅ Check your email inbox for confirmation!"
echo ""

echo "3️⃣  Testing PRODUCTION environment (Vercel)"
echo "   Make sure you've added AWS credentials to Vercel first!"
echo ""

PROD_URL="https://runespoke-landing.vercel.app"
PROD_EMAIL="prod-test-${TIMESTAMP}@runespoke.ai"

echo "   Testing with: $PROD_EMAIL"
RESPONSE=$(curl -X POST $PROD_URL/api/waitlist \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$PROD_EMAIL\"}" \
  -s)

echo "   Response: $RESPONSE"
echo ""

echo "4️⃣  Testing unsubscribe page"
echo "   Local: http://localhost:3000/api/unsubscribe?email=$TEST_EMAIL"
echo "   Production: $PROD_URL/api/unsubscribe?email=$PROD_EMAIL"
echo ""

echo "5️⃣  Viewing all collected emails (admin panel)"
echo "   Local: http://localhost:3000/admin/waitlist"
echo "   Production: $PROD_URL/admin/waitlist"
echo "   Password: rs-hub-beta-2024-secure-key"
echo ""

echo "✅ Test Summary:"
echo "   - If you received an email at admin@runespoke.ai, AWS SES is working!"
echo "   - Check spam folder if not in inbox"
echo "   - Verify email has unsubscribe link and physical address"
echo "   - Test the unsubscribe link to confirm it works"
echo ""
echo "🔍 Troubleshooting:"
echo "   - No email? Check AWS SES verified identities"
echo "   - Still in sandbox? Can only send to verified emails"
echo "   - Check Vercel logs for any errors"