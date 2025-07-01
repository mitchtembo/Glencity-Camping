const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { config, loadSecretsFromProvider } = require('./config/environment');

const app = express();

// Initialize server with secure configuration
const initializeServer = async () => {
  try {
    // Load secrets from cloud providers if in production
    const secureConfig = await loadSecretsFromProvider();
    
    // Configure CORS
    app.use(cors({
      origin: secureConfig.corsOrigin,
      credentials: true
    }));
    
    app.use(express.json());

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
