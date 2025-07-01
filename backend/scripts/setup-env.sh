#!/bin/bash

# Glencity Camping - Secure Environment Setup Script

echo "🔒 Glencity Camping - Secure Environment Setup"
echo "=============================================="

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/N): " overwrite
    if [[ $overwrite != "y" && $overwrite != "Y" ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

# Copy example file
echo "📋 Creating .env file from template..."
cp .env.example .env

# Generate secure JWT secret
echo "🔑 Generating secure JWT secret..."
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Update the .env file with generated secret
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters/JWT_SECRET=$JWT_SECRET/" .env
else
    # Linux
    sed -i "s/JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters/JWT_SECRET=$JWT_SECRET/" .env
fi

echo "✅ Secure JWT secret generated and set!"
echo ""
echo "📝 Next steps:"
echo "1. Update MONGO_URI in .env with your MongoDB connection string"
echo "2. Review and update other variables as needed"
echo "3. NEVER commit the .env file to version control"
echo ""
echo "🔗 Your MongoDB URI should look like:"
echo "   mongodb+srv://username:password@cluster.mongodb.net/database_name"
echo ""
echo "🚀 Run 'npm start' to start the server once configured"
echo ""
echo "⚠️  Security reminders:"
echo "   - The .env file is already in .gitignore"
echo "   - Use different secrets for production"
echo "   - Rotate secrets regularly"
echo "   - Never share secrets in plain text"
