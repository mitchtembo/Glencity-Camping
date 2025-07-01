# Security Guide

## Environment Variables Security

### ⚠️ IMPORTANT SECURITY NOTICE
The `.env` file contains sensitive credentials and should **NEVER** be committed to version control.

### Quick Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Generate a secure JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Update `.env` with your actual values:**
   - Replace `MONGO_URI` with your MongoDB connection string
   - Replace `JWT_SECRET` with the generated secure key
   - Update other variables as needed

### Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.net/db` | Yes |
| `JWT_SECRET` | Secret key for JWT tokens (min 32 chars) | `abc123...` | Yes |
| `PORT` | Server port number | `5000` | No |
| `NODE_ENV` | Environment mode | `development/production` | No |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` | No |

### Production Secret Management

For production deployments, use dedicated secret management services:

#### AWS Secrets Manager
```bash
# Set environment variable to use AWS Secrets Manager
export AWS_SECRET_NAME=glencity-camping-secrets
export AWS_REGION=us-east-1
```

#### Azure Key Vault
```bash
# Set environment variable to use Azure Key Vault
export AZURE_KEY_VAULT_URL=https://your-vault.vault.azure.net/
```

#### Google Secret Manager
```bash
# Set environment variable to use Google Secret Manager
export GOOGLE_PROJECT_ID=your-project-id
export GOOGLE_SECRET_NAME=glencity-camping-secrets
```

### Security Best Practices

1. **Never commit `.env` files**
   - Always add `.env*` to `.gitignore`
   - Use `.env.example` for documentation

2. **Use strong secrets**
   - JWT secrets should be at least 32 characters
   - Use cryptographically secure random generators
   - Different secrets for each environment

3. **Rotate secrets regularly**
   - Change JWT secrets periodically
   - Update database passwords quarterly
   - Monitor for leaked credentials

4. **Environment-specific configuration**
   - Development: Local `.env` file
   - Staging: Cloud secret management
   - Production: Cloud secret management + encryption

5. **Access control**
   - Limit who can access production secrets
   - Use service accounts for applications
   - Enable audit logging

### Removing Committed Secrets

If you accidentally committed secrets to git:

1. **Change all exposed secrets immediately**
2. **Remove from git history:**
   ```bash
   # Remove file from git history (DANGEROUS - rewrites history)
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch backend/.env' \
   --prune-empty --tag-name-filter cat -- --all
   
   # Force push (coordinate with team first)
   git push origin --force --all
   ```

3. **Alternative (safer for shared repos):**
   ```bash
   # Add to .gitignore and commit the removal
   echo "backend/.env" >> .gitignore
   git rm --cached backend/.env
   git commit -m "Remove .env file and add to .gitignore"
   ```

### Environment Setup Scripts

Create setup scripts for different environments:

```bash
# scripts/setup-dev.sh
#!/bin/bash
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file. Please update with your values."
    echo "Generate JWT secret with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
fi
```

### Monitoring and Alerts

- Set up alerts for secret access
- Monitor for credentials in logs
- Regular security audits
- Automated secret scanning in CI/CD

### Emergency Response

If secrets are compromised:

1. **Immediately rotate all affected secrets**
2. **Revoke access tokens**
3. **Check access logs**
4. **Notify security team**
5. **Update applications with new secrets**
6. **Document incident for future prevention**
