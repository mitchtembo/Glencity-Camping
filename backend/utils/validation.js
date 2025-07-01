/**
 * Validation utilities for booking system
 */

// Validate MongoDB ObjectId format
const isValidObjectId = (id) => {
  return id && typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/);
};

// Validate email format
const isValidEmail = (email) => {
  return email && typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// Validate date string
const isValidDate = (dateString) => {
  return dateString && !isNaN(Date.parse(dateString));
};

// Validate date is not in the past
const isDateNotInPast = (dateString) => {
  if (!isValidDate(dateString)) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

// Validate date range
const isValidDateRange = (startDate, endDate, maxDays = 365) => {
  if (!isValidDate(startDate) || !isValidDate(endDate)) return { valid: false, error: 'Invalid date format' };
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (end <= start) {
    return { valid: false, error: 'End date must be after start date' };
  }
  
  const daysDifference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  if (daysDifference > maxDays) {
    return { valid: false, error: `Date range cannot exceed ${maxDays} days` };
  }
  
  return { valid: true };
};

// Validate booking is not too far in advance
const isBookingNotTooFarInAdvance = (startDate, maxYears = 1) => {
  if (!isValidDate(startDate)) return false;
  
  const start = new Date(startDate);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + maxYears);
  
  return start <= maxDate;
};

// Validate string field
const validateStringField = (value, fieldName, minLength = 1, maxLength = 255) => {
  if (!value || typeof value !== 'string') {
    return { valid: false, error: `${fieldName} is required` };
  }
  
  const trimmed = value.trim();
  if (trimmed.length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} character(s) long` };
  }
  
  if (trimmed.length > maxLength) {
    return { valid: false, error: `${fieldName} must be less than ${maxLength} characters` };
  }
  
  return { valid: true };
};

// Validate numeric field
const validateNumericField = (value, fieldName, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  if (value === undefined || value === null) {
    return { valid: false, error: `${fieldName} is required` };
  }
  
  if (typeof value !== 'number' || isNaN(value)) {
    return { valid: false, error: `${fieldName} must be a valid number` };
  }
  
  if (value < min) {
    return { valid: false, error: `${fieldName} must be at least ${min}` };
  }
  
  if (value > max) {
    return { valid: false, error: `${fieldName} cannot exceed ${max}` };
  }
  
  return { valid: true };
};

// Comprehensive booking validation
const validateBookingInput = (data) => {
  const errors = [];
  const { accommodationId, startDate, endDate, guestName, guestEmail, totalPrice } = data;
  
  // Validate accommodation ID
  if (!isValidObjectId(accommodationId)) {
    errors.push('Invalid accommodation ID format');
  }
  
  // Validate guest name
  const nameValidation = validateStringField(guestName, 'Guest name', 2, 100);
  if (!nameValidation.valid) {
    errors.push(nameValidation.error);
  }
  
  // Validate guest email
  if (!isValidEmail(guestEmail)) {
    errors.push('Invalid email format');
  }
  
  // Validate total price
  const priceValidation = validateNumericField(totalPrice, 'Total price', 0.01, 100000);
  if (!priceValidation.valid) {
    errors.push(priceValidation.error);
  }
  
  // Validate dates
  if (!isValidDate(startDate)) {
    errors.push('Invalid start date format');
  } else if (!isDateNotInPast(startDate)) {
    errors.push('Start date cannot be in the past');
  } else if (!isBookingNotTooFarInAdvance(startDate)) {
    errors.push('Bookings cannot be made more than 1 year in advance');
  }
  
  if (!isValidDate(endDate)) {
    errors.push('Invalid end date format');
  }
  
  // Validate date range if both dates are valid
  if (isValidDate(startDate) && isValidDate(endDate)) {
    const rangeValidation = isValidDateRange(startDate, endDate);
    if (!rangeValidation.valid) {
      errors.push(rangeValidation.error);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate availability check input
const validateAvailabilityInput = (data) => {
  const errors = [];
  const { accommodationId, startDate, endDate } = data;
  
  // Validate accommodation ID
  if (!isValidObjectId(accommodationId)) {
    errors.push('Invalid accommodation ID format');
  }
  
  // Validate dates
  if (!isValidDate(startDate)) {
    errors.push('Invalid start date format');
  } else if (!isDateNotInPast(startDate)) {
    errors.push('Start date cannot be in the past');
  }
  
  if (!isValidDate(endDate)) {
    errors.push('Invalid end date format');
  }
  
  // Validate date range if both dates are valid
  if (isValidDate(startDate) && isValidDate(endDate)) {
    const rangeValidation = isValidDateRange(startDate, endDate);
    if (!rangeValidation.valid) {
      errors.push(rangeValidation.error);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  isValidObjectId,
  isValidEmail,
  isValidDate,
  isDateNotInPast,
  isValidDateRange,
  isBookingNotTooFarInAdvance,
  validateStringField,
  validateNumericField,
  validateBookingInput,
  validateAvailabilityInput
};
