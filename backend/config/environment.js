/**
 * Environment Configuration Module
 * Handles secure environment variable loading and validation
 */

require('dotenv').config();
const crypto = require('crypto');

/**
 * Generate a secure JWT secret if none is provided
 */
const generateSecureSecret = () => {
  console.warn('WARNING: No JWT_SECRET provided. Generating a temporary secret.');
  console.warn('This should NOT be used in production. Set a proper JWT_SECRET in your .env file.');
  return crypto.randomBytes(64).toString('hex');
};

/**
 * Validate required environment variables
 */
const validateEnvironment = () => {
  const errors = [];

  if (!process.env.MONGO_URI) {
    errors.push('MONGO_URI is required');
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your_jwt_secret' || process.env.JWT_SECRET === 'your_super_secure_jwt_secret_key_here_minimum_32_characters') {
    errors.push('JWT_SECRET must be set to a secure value (not the default placeholder)');
  }

  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    errors.push('JWT_SECRET should be at least 32 characters long for security');
  }

  if (process.env.NODE_ENV === 'production') {
    if (!process.env.MONGO_URI.includes('mongodb+srv://') && !process.env.MONGO_URI.includes('mongodb://')) {
      errors.push('Invalid MONGO_URI format for production');
    }
  }

  return errors;
};

/**
 * Environment configuration object
 */
const config = {
  // Database
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/glencity-camping-dev',
  
  // Authentication
  jwtSecret: process.env.JWT_SECRET || generateSecureSecret(),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Security
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Feature flags
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};

/**
 * Validate configuration on module load
 */
const validationErrors = validateEnvironment();
if (validationErrors.length > 0) {
  console.error('Environment Configuration Errors:');
  validationErrors.forEach(error => console.error(`- ${error}`));
  
  if (config.isProduction) {
    console.error('Exiting due to configuration errors in production environment.');
    process.exit(1);
  } else {
    console.warn('Continuing with warnings in development environment.');
  }
}

/**
 * Secret management integration for production
 */
const loadSecretsFromProvider = async () => {
  if (!config.isProduction) {
    return config;
  }

  // AWS Secrets Manager example
  if (process.env.AWS_SECRET_NAME) {
    try {
      const AWS = require('aws-sdk');
      const secretsManager = new AWS.SecretsManager({
        region: process.env.AWS_REGION || 'us-east-1'
      });
      
      const secret = await secretsManager.getSecretValue({
        SecretId: process.env.AWS_SECRET_NAME
      }).promise();
      
      const secretData = JSON.parse(secret.SecretString);
      
      return {
        ...config,
        mongoUri: secretData.MONGO_URI || config.mongoUri,
        jwtSecret: secretData.JWT_SECRET || config.jwtSecret,
      };
    } catch (error) {
      console.error('Failed to load secrets from AWS Secrets Manager:', error);
      throw error;
    }
  }

  // Azure Key Vault example
  if (process.env.AZURE_KEY_VAULT_URL) {
    try {
      const { DefaultAzureCredential } = require('@azure/identity');
      const { SecretClient } = require('@azure/keyvault-secrets');
      
      const credential = new DefaultAzureCredential();
      const client = new SecretClient(process.env.AZURE_KEY_VAULT_URL, credential);
      
      const mongoSecret = await client.getSecret('mongo-uri');
      const jwtSecret = await client.getSecret('jwt-secret');
      
      return {
        ...config,
        mongoUri: mongoSecret.value || config.mongoUri,
        jwtSecret: jwtSecret.value || config.jwtSecret,
      };
    } catch (error) {
      console.error('Failed to load secrets from Azure Key Vault:', error);
      throw error;
    }
  }

  return config;
};

module.exports = {
  config,
  loadSecretsFromProvider,
  validateEnvironment,
  generateSecureSecret
};
