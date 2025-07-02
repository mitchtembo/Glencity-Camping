const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { config, loadSecretsFromProvider } = require('./config/environment');
const { specs, swaggerUi } = require('./config/swagger');

const app = express();

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Health Check
 *     description: Returns a simple message to confirm the API is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Glencity Camping API is running..."
 */

// Initialize server with secure configuration
const initializeServer = async () => {
  try {
    // Load secrets from cloud providers if in production
    const secureConfig = await loadSecretsFromProvider();
    
    // Configure CORS
    const corsOptions = {
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (secureConfig.nodeEnv === 'development') {
          // In development, allow localhost on any port
          if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
            return callback(null, true);
          }
        }
        
        // Check against configured CORS origin(s)
        const allowedOrigins = Array.isArray(secureConfig.corsOrigin) 
          ? secureConfig.corsOrigin 
          : [secureConfig.corsOrigin];
          
        // Flatten the array in case of nested arrays and filter out empty values
        const flattenedOrigins = allowedOrigins.flat().filter(origin => origin && origin.trim());
        
        // In production, also allow any Vercel preview domains
        if (secureConfig.nodeEnv === 'production') {
          if (origin.endsWith('.vercel.app') || origin.includes('glencity-camping')) {
            console.log(`✅ Allowing Vercel domain: ${origin}`);
            return callback(null, true);
          }
        }
          
        if (flattenedOrigins.includes(origin)) {
          console.log(`✅ Allowing configured origin: ${origin}`);
          return callback(null, true);
        }
        
        console.log(`❌ CORS blocked request from origin: ${origin}`);
        console.log(`Allowed origins: ${flattenedOrigins.join(', ')}`);
        console.log(`Environment: ${secureConfig.nodeEnv}`);
        callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
      optionsSuccessStatus: 200
    };
    
    app.use(cors(corsOptions));
    
    app.use(express.json());
    app.use(cookieParser());

    // Swagger Documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Glencity Camping API Documentation'
    }));

    // Connect to MongoDB with secure configuration
    await mongoose.connect(secureConfig.mongoUri);
    
    console.log("MongoDB database connection established successfully");
    console.log(`Environment: ${secureConfig.nodeEnv}`);

    app.get('/', (req, res) => {
      res.json({
        message: 'Glencity Camping API is running...',
        version: '1.0.0',
        environment: secureConfig.nodeEnv,
        timestamp: new Date().toISOString(),
        status: 'healthy'
      });
    });

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: secureConfig.nodeEnv,
        version: '1.0.0'
      });
    });

    // Define Routes
    app.use('/api/accommodations', require('./routes/accommodations'));
    app.use('/api/bookings', require('./routes/bookings'));
    app.use('/api/auth', require('./routes/auth'));

    // Start server
    app.listen(secureConfig.port, () => {
      console.log(`Server is running on port: ${secureConfig.port}`);
    });

  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

// Start the server
initializeServer();
