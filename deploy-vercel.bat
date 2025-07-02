@echo off
REM Vercel Deployment Script for Glencity Camping (Windows)
REM This script helps prepare and deploy the project to Vercel

echo 🚀 Starting Vercel Deployment Process...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️ Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Build the project locally to check for errors
echo 🔨 Building project locally...
npm run build

if errorlevel 1 (
    echo ❌ Local build failed. Please fix build errors before deploying.
    pause
    exit /b 1
) else (
    echo ✅ Local build successful!
)

REM Login to Vercel (if not already logged in)
echo 🔐 Checking Vercel authentication...
vercel whoami >nul 2>&1
if errorlevel 1 (
    echo Please login to Vercel:
    vercel login
)

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

echo ✅ Deployment complete!
echo 📝 Remember to:
echo    1. Set VITE_API_URL environment variable in Vercel dashboard
echo    2. Verify your backend is running and accessible
echo    3. Test the deployed application

pause
