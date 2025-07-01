# Glencity Camping Backend

## 🚀 Quick Start

### 1. Environment Setup

**Important:** Never commit `.env` files to version control!

```bash
# For Unix/Linux/macOS
npm run setup-env

# For Windows
npm run setup-env-win

# Or manually:
cp .env.example .env
npm run generate-jwt-secret  # Copy the output to your .env file
```

### 2. Configure Database

Update your `.env` file with your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database
```

### 3. Initialize Database

```bash
npm run init-db
```

### 4. Start Development Server

```bash
npm run dev
```

## 🔒 Security

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | ✅ |
| `PORT` | Server port | ❌ (default: 5000) |
| `NODE_ENV` | Environment mode | ❌ (default: development) |

### Security Features

- 🔐 Secure JWT secret generation
- 🛡️ Input validation middleware
- 🚫 SQL injection prevention
- 📝 Comprehensive audit logging
- 🔄 Secret rotation support
- ☁️ Cloud secret management integration

### Production Deployment

For production, use cloud secret management:

```bash
# AWS Secrets Manager
export AWS_SECRET_NAME=glencity-camping-secrets
export AWS_REGION=us-east-1

# Azure Key Vault
export AZURE_KEY_VAULT_URL=https://your-vault.vault.azure.net/

# Then deploy normally
npm start
```

## 📝 API Documentation

### Authentication

All protected routes require the `x-auth-token` header:

```bash
curl -H "x-auth-token: your-jwt-token" http://localhost:5000/api/bookings/my-bookings
```

### Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth` - Get user profile
- `GET /api/accommodations` - List accommodations
- `GET /api/accommodations/:id` - Get accommodation details
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/my-bookings` - Get user bookings (protected)
- `GET /api/bookings/check-availability` - Check availability

## 🛠️ Development Scripts

```bash
npm run dev              # Start development server with nodemon
npm run start            # Start production server
npm run init-db          # Initialize database indexes
npm run validate-env     # Validate environment configuration
npm run security-check   # Run security audit
npm run generate-jwt-secret  # Generate new JWT secret
```

## 🔧 Configuration

The application uses a secure configuration system:

- Development: `.env` file
- Production: Cloud secret management (AWS/Azure/GCP)
- Validation: Automatic environment validation
- Fallbacks: Secure defaults where possible

## 📚 Additional Documentation

- [Security Guide](./SECURITY.md) - Comprehensive security documentation
- [API Reference](./docs/api.md) - Detailed API documentation
- [Deployment Guide](./docs/deployment.md) - Production deployment instructions

## ⚡ Performance

- Database indexes for optimal query performance
- Connection pooling for MongoDB
- JWT token caching
- Input validation middleware
- Error handling and logging

## 🐛 Troubleshooting

### Common Issues

1. **"JWT_SECRET not secure"**
   ```bash
   npm run generate-jwt-secret
   # Copy the output to your .env file
   ```

2. **"MongoDB connection failed"**
   - Check your `MONGO_URI` in `.env`
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify username/password are correct

3. **"Validation failed"**
   ```bash
   npm run validate-env
   # Check the output for specific issues
   ```

### Getting Help

- Check the [Security Guide](./SECURITY.md)
- Review environment variable requirements
- Ensure all dependencies are installed: `npm install`
- Check logs for specific error messages
