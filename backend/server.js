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
    app.use(cors({
      origin: 'http://localhost:5173', // Frontend URL
      credentials: true
    }));
    
    app.use(express.json());
    app.use(cookieParser());

    // Swagger Documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Glencity Camping API Documentation'
    }));

    // Connect to MongoDB with secure configuration
    await mongoose.connect(secureConfig.mongoUri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    
    console.log("MongoDB database connection established successfully");
    console.log(`Environment: ${secureConfig.nodeEnv}`);

    app.get('/', (req, res) => {
      res.send('Glencity Camping API is running...');
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
