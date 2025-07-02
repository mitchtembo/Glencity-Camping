@echo off
REM Glencity Camping - Secure Environment Setup Script (Windows)

echo 🔒 Glencity Camping - Secure Environment Setup
echo ==============================================

REM Check if .env already exists
if exist ".env" (
    echo ⚠️  .env file already exists! Overwriting...
)

REM Copy example file
echo 📋 Creating .env file from template...
copy .env.example .env >nul

REM Generate secure JWT secret
echo 🔑 Generating secure JWT secret...
for /f %%i in ('node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"') do set JWT_SECRET=%%i

REM Update the .env file with generated secret
powershell -Command "(gc .env) -replace 'JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters', 'JWT_SECRET=%JWT_SECRET%' | sc .env"

echo ✅ Secure JWT secret generated and set!
echo.
echo 📝 Next steps:
echo 1. Update MONGO_URI in .env with your MongoDB connection string
echo 2. Review and update other variables as needed
echo 3. NEVER commit the .env file to version control
echo.
echo 🔗 Your MongoDB URI should look like:
echo    mongodb+srv://username:password@cluster.mongodb.net/database_name
echo.
echo 🚀 Run 'npm start' to start the server once configured
echo.
echo ⚠️  Security reminders:
echo    - The .env file is already in .gitignore
echo    - Use different secrets for production
echo    - Rotate secrets regularly
echo    - Never share secrets in plain text
