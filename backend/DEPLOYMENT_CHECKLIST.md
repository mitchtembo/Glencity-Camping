# Render Deployment Checklist

## Pre-Deployment Setup

- [ ] **MongoDB Atlas Setup**
  - [ ] Create MongoDB Atlas account
  - [ ] Create cluster
  - [ ] Create database user
  - [ ] Whitelist IP addresses (0.0.0.0/0 for Render)
  - [ ] Get connection string

- [ ] **Environment Variables Ready**
  - [ ] Run `npm run generate-env` to get template
  - [ ] Replace MongoDB URI with actual connection string
  - [ ] Set CORS_ORIGIN to your frontend URL
  - [ ] Keep JWT_SECRET secure

## Render Service Configuration

- [ ] **Repository Connection**
  - [ ] Connect GitHub repository to Render
  - [ ] Select correct branch (usually `main`)

- [ ] **Service Settings**
  - [ ] Service type: Web Service
  - [ ] Environment: Node
  - [ ] **Root Directory: `backend`** ⭐ **CRITICAL**
  - [ ] Build Command: `npm install` (NOT `npm install; npm run build`)
  - [ ] Start Command: `npm start`

- [ ] **Environment Variables**
  - [ ] Add all variables from the generator
  - [ ] Verify MONGO_URI is correct
  - [ ] Verify CORS_ORIGIN matches frontend
  - [ ] JWT_SECRET is at least 32 characters

## Post-Deployment Verification

- [ ] **Service Health**
  - [ ] Service deploys successfully
  - [ ] No build errors in logs
  - [ ] Health check endpoint responds: `https://your-service.onrender.com/health`

- [ ] **Database Connection**
  - [ ] Check logs for successful MongoDB connection
  - [ ] Test API endpoints work
  - [ ] Seed database if needed: `npm run seed`

- [ ] **API Documentation**
  - [ ] Swagger docs accessible: `https://your-service.onrender.com/api-docs`

- [ ] **Frontend Integration**
  - [ ] Update frontend API base URL to Render service URL
  - [ ] Test authentication flow works
  - [ ] Verify CORS allows frontend requests

## Quick Commands

```bash
# Generate environment variables locally
npm run generate-env

# Validate configuration locally
npm run validate-env

# Test production setup locally
NODE_ENV=production npm start

# Seed production database
npm run seed
```

## Service URLs

After deployment, your service will be available at:
- **API Base**: `https://your-service-name.onrender.com`
- **Health Check**: `https://your-service-name.onrender.com/health`
- **API Docs**: `https://your-service-name.onrender.com/api-docs`

## Troubleshooting

❌ **Build fails**: Check root directory is set to `backend` and build command is `npm install` (not `npm install; npm run build`)
❌ **CORS errors**: Verify CORS_ORIGIN matches frontend URL exactly
❌ **Database errors**: Check MongoDB URI and network access
❌ **JWT errors**: Ensure JWT_SECRET is set and secure

✅ **Success indicators**:
- Build completes without errors
- Health endpoint returns JSON response
- API documentation loads
- MongoDB connection established in logs
