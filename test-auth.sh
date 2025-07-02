#!/bin/bash

echo "Testing Secure Cookie-based Authentication"
echo "=========================================="

# Test 1: Login and check if cookie is set
echo "1. Testing login with cookie authentication..."
curl -c cookies.txt -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  2>/dev/null

if [ -f cookies.txt ]; then
  echo "✅ Cookie file created"
  cat cookies.txt | grep auth_token && echo "✅ Auth token cookie found" || echo "❌ Auth token cookie not found"
else
  echo "❌ Cookie file not created"
fi

# Test 2: Use cookie to access protected route
echo ""
echo "2. Testing protected route with cookie..."
curl -b cookies.txt http://localhost:5000/api/auth 2>/dev/null | grep -q "email" && echo "✅ Protected route accessible with cookie" || echo "❌ Protected route not accessible"

# Test 3: Test logout
echo ""
echo "3. Testing logout..."
curl -b cookies.txt -c cookies_after_logout.txt -X POST http://localhost:5000/api/auth/logout 2>/dev/null | grep -q "success" && echo "✅ Logout successful" || echo "❌ Logout failed"

# Cleanup
rm -f cookies.txt cookies_after_logout.txt

echo ""
echo "Test complete!"
