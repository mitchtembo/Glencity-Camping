#!/usr/bin/env node

/**
 * Environment Variables Generator for Render Deployment
 * Run with: node generate-env.js
 */

const crypto = require('crypto');

console.log('🚀 Glencity Camping Backend - Environment Variables for Render');
console.log('=' .repeat(60));
console.log('');

// Generate JWT Secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('📋 Copy these environment variables to your Render service:');
console.log('');
console.log('NODE_ENV=production');
console.log('PORT=10000');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log('JWT_EXPIRES_IN=24h');
console.log('MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/glencity-camping?retryWrites=true&w=majority');
console.log('CORS_ORIGIN=https://your-frontend-domain.com');
console.log('');

console.log('⚠️  Important:');
console.log('1. Replace MONGO_URI with your actual MongoDB Atlas connection string');
console.log('2. Replace CORS_ORIGIN with your actual frontend URL');
console.log('3. Keep the JWT_SECRET secure and never share it publicly');
console.log('');

console.log('🔧 Render Service Configuration:');
console.log('- Root Directory: backend');
console.log('- Build Command: npm install');
console.log('- Start Command: npm start');
console.log('');

console.log('✅ Your JWT secret has been generated and is ready to use!');
