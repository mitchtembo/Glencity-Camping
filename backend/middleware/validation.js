const { validateBookingInput, validateAvailabilityInput } = require('../utils/validation');

/**
 * Middleware to validate booking creation input
 */
const validateBookingCreation = (req, res, next) => {
  const validation = validateBookingInput(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      msg: 'Validation failed',
      errors: validation.errors
    });
  }
  
  next();
};

/**
 * Middleware to validate availability check input
 */
const validateAvailabilityCheck = (req, res, next) => {
  const validation = validateAvailabilityInput(req.query);
  
  if (!validation.isValid) {
    return res.status(400).json({
      msg: 'Validation failed',
      errors: validation.errors
    });
  }
  
  next();
};

/**
 * Generic validation middleware factory
 */
const createValidationMiddleware = (validationFunction, source = 'body') => {
  return (req, res, next) => {
    const data = source === 'query' ? req.query : req.body;
    const validation = validationFunction(data);
    
    if (!validation.isValid) {
      return res.status(400).json({
        msg: 'Validation failed',
        errors: validation.errors
      });
    }
    
    next();
  };
};

module.exports = {
  validateBookingCreation,
  validateAvailabilityCheck,
  createValidationMiddleware
};
