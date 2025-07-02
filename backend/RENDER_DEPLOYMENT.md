# Render Deployment Guide - Backend

## 1. Render Configuration

### Root Directory
Set the **Root Directory** to: `backend`

This tells Render to:
- Run all commands from the `backend` directory
- Only trigger deployments when files in the `backend` directory change
- Use the `package.json` in the `backend` directory

### Build Command
```bash
npm install
```

### Start Command
```bash
npm start
```

**Important**: Do NOT use the auto-detected build command. Render might suggest `npm install; npm run build` but this is incorrect for a Node.js backend. Use only `npm install` as the build command.

## 2. Environment Variables

Add these environment variables in your Render service dashboard:

### Required Variables
```
NODE_ENV=production
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/glencity-camping?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-key-here-minimum-32-characters-long
PORT=10000
```

### Optional Variables
```
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://your-frontend-domain.com
FRONTEND_URL=https://your-frontend-domain.com
```

## 3. MongoDB Setup

1. Create a MongoDB Atlas cluster if you haven't already
2. Create a database user with read/write permissions
3. Whitelist Render's IP addresses (or use 0.0.0.0/0 for all IPs)
4. Get your connection string and add it to the `MONGO_URI` environment variable

## 4. JWT Secret Generation

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET` environment variable.

## 5. Deployment Steps

1. **Connect Repository**: Connect your GitHub repository to Render
2. **Create Web Service**: Choose "Web Service" 
3. **Repository Settings**:
   - Repository: `your-username/Glencity-Camping`
   - Branch: `main` (or your default branch)
   - **Root Directory**: `backend` ⭐ **THIS IS KEY**
4. **Build Settings**:
   - Environment: `Node`
   - Build Command: `npm install` (NOT `npm install; npm run build`)
   - Start Command: `npm start`
5. **Environment Variables**: Add all the variables listed above
6. **Deploy**: Click "Create Web Service"

## 6. Health Check Endpoint

The backend includes a health check at the root path (`/`) that returns:
```
Glencity Camping API is running...
```

## 7. CORS Configuration

The backend automatically configures CORS based on the environment:
- Development: `http://localhost:5173`
- Production: Uses `CORS_ORIGIN` or `FRONTEND_URL` environment variable

Make sure to set `CORS_ORIGIN` to your frontend URL in production.

## 8. API Documentation

Once deployed, your API documentation will be available at:
```
https://your-service-name.onrender.com/api-docs
```

## 9. Database Seeding

To seed your production database with initial data:

1. Use the Render shell or run locally with production MONGO_URI:
```bash
npm run seed
```

2. Or create seed data manually through the API endpoints.

## 10. Monitoring and Logs

- **Logs**: Available in the Render dashboard under "Logs"
- **Metrics**: Monitor CPU, memory usage in the dashboard
- **Health Checks**: Render automatically monitors the service

## 11. Custom Domain (Optional)

After deployment, you can:
1. Add a custom domain in the Render dashboard
2. Update your `CORS_ORIGIN` environment variable to match
3. Update your frontend API endpoints to use the new domain

## 12. Security Notes

- JWT tokens are stored in httpOnly cookies for security
- CORS is properly configured for your frontend domain
- Environment variables are encrypted in Render
- MongoDB connection uses SSL/TLS encryption

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check that `backend` is set as the root directory
2. **Database Connection**: Verify MongoDB URI and network access
3. **CORS Errors**: Ensure `CORS_ORIGIN` matches your frontend URL exactly
4. **JWT Errors**: Verify `JWT_SECRET` is set and at least 32 characters

### Useful Commands:

```bash
# Test locally with production settings
NODE_ENV=production npm start

# Validate environment configuration
npm run validate-env

# Generate new JWT secret
npm run generate-jwt-secret
```
