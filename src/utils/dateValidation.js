/**
 * Date validation utilities for booking system
 */

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Get tomorrow's date in YYYY-MM-DD format
 */
export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

/**
 * Get a date N days from today in YYYY-MM-DD format
 */
export const getFutureDate = (daysFromNow) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysFromNow);
  return futureDate.toISOString().split('T')[0];
};

/**
 * Check if a date string is valid
 */
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Check if a date is in the past
 */
export const isDateInPast = (dateString) => {
  if (!isValidDate(dateString)) return false;
  const inputDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for comparison
  return inputDate < today;
};

/**
 * Check if check-out date is after check-in date
 */
export const isCheckOutAfterCheckIn = (checkInDate, checkOutDate) => {
  if (!isValidDate(checkInDate) || !isValidDate(checkOutDate)) return false;
  return new Date(checkOutDate) > new Date(checkInDate);
};

/**
 * Check if the date range is valid (minimum 1 night stay)
 */
export const isValidDateRange = (checkInDate, checkOutDate) => {
  if (!isValidDate(checkInDate) || !isValidDate(checkOutDate)) return false;
  
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffTime = checkOut - checkIn;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays >= 1;
};

/**
 * Calculate number of nights between two dates
 */
export const calculateNights = (checkInDate, checkOutDate) => {
  if (!isValidDate(checkInDate) || !isValidDate(checkOutDate)) return 0;
  
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffTime = checkOut - checkIn;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(diffDays, 0);
};

/**
 * Check if the stay is too long (more than 30 days)
 */
export const isStayTooLong = (checkInDate, checkOutDate, maxDays = 30) => {
  const nights = calculateNights(checkInDate, checkOutDate);
  return nights > maxDays;
};

/**
 * Check if the booking is too far in advance (more than 1 year)
 */
export const isTooFarInAdvance = (checkInDate, maxDaysInAdvance = 365) => {
  if (!isValidDate(checkInDate)) return false;
  
  const today = new Date();
  const checkIn = new Date(checkInDate);
  const diffTime = checkIn - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > maxDaysInAdvance;
};

/**
 * Comprehensive date validation for booking
 */
export const validateBookingDates = (checkInDate, checkOutDate) => {
  const errors = [];
  
  // Check if dates are provided
  if (!checkInDate) {
    errors.push("Check-in date is required");
  }
  if (!checkOutDate) {
    errors.push("Check-out date is required");
  }
  
  if (!checkInDate || !checkOutDate) {
    return { isValid: false, errors };
  }
  
  // Check if dates are valid
  if (!isValidDate(checkInDate)) {
    errors.push("Check-in date is invalid");
  }
  if (!isValidDate(checkOutDate)) {
    errors.push("Check-out date is invalid");
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  // Check if check-in is not in the past
  if (isDateInPast(checkInDate)) {
    errors.push("Check-in date cannot be in the past");
  }
  
  // Check if check-out is after check-in
  if (!isCheckOutAfterCheckIn(checkInDate, checkOutDate)) {
    errors.push("Check-out date must be after check-in date");
  }
  
  // Check minimum stay (1 night)
  if (!isValidDateRange(checkInDate, checkOutDate)) {
    errors.push("Minimum stay is 1 night");
  }
  
  // Check maximum stay (30 days)
  if (isStayTooLong(checkInDate, checkOutDate)) {
    errors.push("Maximum stay is 30 days");
  }
  
  // Check if booking is too far in advance (1 year)
  if (isTooFarInAdvance(checkInDate)) {
    errors.push("Bookings can only be made up to 1 year in advance");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    nights: errors.length === 0 ? calculateNights(checkInDate, checkOutDate) : 0
  };
};

/**
 * Format validation errors for display
 */
export const formatValidationErrors = (errors) => {
  if (errors.length === 0) return "";
  if (errors.length === 1) return errors[0];
  
  return errors.map((error, index) => `${index + 1}. ${error}`).join("\n");
};
