#!/bin/bash

# Quick fix script for backend CORS issues
# This script helps update backend environment variables on Render

echo "🔧 Backend CORS Fix Instructions"
echo "================================"
echo ""
echo "1. Go to your Render dashboard: https://dashboard.render.com"
echo "2. Select your backend service (glencity-camping or similar)"
echo "3. Go to Environment tab"
echo "4. Update/Add these environment variables:"
echo ""
echo "NODE_ENV=production"
echo "CORS_ORIGIN=https://glencity-camping.vercel.app,https://glencity-camping-git-main.vercel.app"
echo ""
echo "5. Add your actual Vercel URL(s) to CORS_ORIGIN (comma-separated)"
echo "6. Click 'Save Changes' to trigger a redeploy"
echo ""
echo "📍 To find your Vercel URL:"
echo "- Go to Vercel dashboard"
echo "- Click on your project"
echo "- Copy the production domain (should be something like: https://glencity-camping-xxx.vercel.app)"
echo ""
echo "🚀 After updating, wait for Render to redeploy (takes 2-3 minutes)"
echo "Then test your application again!"
