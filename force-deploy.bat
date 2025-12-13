@echo off
REM Force Fresh Deployment Script for Windows
REM This script makes a small change and pushes to GitHub to trigger a fresh Vercel build

echo ================================
echo 🚀 Force Fresh Deployment Script
echo ================================
echo.

REM Check if we're in a git repository
if not exist .git (
    echo ❌ Error: Not a git repository
    echo Please run this script from your project root directory
    pause
    exit /b 1
)

REM Add timestamp to trigger rebuild
echo 📝 Adding deployment timestamp...
echo # Last deployment: %date% %time% >> .deployment-history
echo ✅ Timestamp added
echo.

REM Commit the change
echo 💾 Creating commit...
git add .deployment-history
git commit -m "Force fresh deployment - %date% %time%"

if %errorlevel% neq 0 (
    echo ❌ Error: Failed to create commit
    pause
    exit /b 1
)
echo ✅ Commit created
echo.

REM Push to GitHub
echo 🚀 Pushing to GitHub...
git push

if %errorlevel% neq 0 (
    echo ❌ Error: Failed to push to GitHub
    echo Please push manually: git push
    pause
    exit /b 1
)

echo.
echo ✅ Successfully pushed to GitHub!
echo.
echo 📊 Next Steps:
echo 1. Go to Vercel Dashboard: https://vercel.com/dashboard
echo 2. Wait for deployment to complete (2-5 minutes)
echo 3. Check deployment status in Vercel
echo 4. Once deployed, visit: https://teddydecor.com
echo 5. Hard refresh browser: Ctrl+Shift+R
echo 6. Go to Admin -^> Gallery and check Environment Diagnostic box
echo 7. Upload a photo and verify it says 'Uploaded to cloud!'
echo.
echo 🎉 Deployment triggered successfully!
echo.
pause
