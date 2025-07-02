const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Glencity Camping API',
      version: '1.0.0',
      description: 'A comprehensive API for managing camping accommodations, bookings, and user authentication',
      contact: {
        name: 'Glencity Camping Support',
        email: 'support@glencitycamping.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://api.glencitycamping.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the user',
            },
            name: {
              type: 'string',
              description: 'The user\'s full name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'The user\'s email address',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'The user\'s password (minimum 6 characters)',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the user was created',
            },
          },
        },
        Accommodation: {
          type: 'object',
          required: ['name', 'type', 'capacity', 'pricePerNight'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the accommodation',
            },
            name: {
              type: 'string',
              description: 'The name of the accommodation',
            },
            type: {
              type: 'string',
              enum: ['tent', 'chalet', 'cabin', 'rv'],
              description: 'The type of accommodation',
            },
            capacity: {
              type: 'integer',
              minimum: 1,
              description: 'Maximum number of guests',
            },
            pricePerNight: {
              type: 'number',
              minimum: 0,
              description: 'Price per night in dollars',
            },
            description: {
              type: 'string',
              description: 'Detailed description of the accommodation',
            },
            amenities: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'List of amenities available',
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of image URLs',
            },
            available: {
              type: 'boolean',
              description: 'Whether the accommodation is available for booking',
            },
          },
        },
        Booking: {
          type: 'object',
          required: ['accommodationId', 'startDate', 'endDate', 'guests'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the booking',
            },
            userId: {
              type: 'string',
              description: 'The id of the user who made the booking',
            },
            accommodationId: {
              type: 'string',
              description: 'The id of the booked accommodation',
            },
            startDate: {
              type: 'string',
              format: 'date',
              description: 'Check-in date',
            },
            endDate: {
              type: 'string',
              format: 'date',
              description: 'Check-out date',
            },
            guests: {
              type: 'integer',
              minimum: 1,
              description: 'Number of guests',
            },
            totalPrice: {
              type: 'number',
              description: 'Total price for the booking',
            },
            status: {
              type: 'string',
              enum: ['pending', 'confirmed', 'cancelled'],
              description: 'Current status of the booking',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the booking was created',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
            error: {
              type: 'string',
              description: 'Detailed error information',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './server.js'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
