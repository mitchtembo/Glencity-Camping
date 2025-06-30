/**
 * Tests for date validation utilities
 */

import {
  getTodayDate,
  getTomorrowDate,
  getFutureDate,
  isValidDate,
  isDateInPast,
  isCheckOutAfterCheckIn,
  isValidDateRange,
  calculateNights,
  isStayTooLong,
  isTooFarInAdvance,
  validateBookingDates,
  formatValidationErrors
} from '../utils/dateValidation';

describe('Date Validation Utils', () => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  describe('getTodayDate', () => {
    test('returns today\'s date in YYYY-MM-DD format', () => {
      expect(getTodayDate()).toBe(today);
    });
  });

  describe('getTomorrowDate', () => {
    test('returns tomorrow\'s date in YYYY-MM-DD format', () => {
      expect(getTomorrowDate()).toBe(tomorrowStr);
    });
  });

  describe('getFutureDate', () => {
    test('returns correct future date', () => {
      const future = new Date();
      future.setDate(future.getDate() + 7);
      const futureStr = future.toISOString().split('T')[0];
      expect(getFutureDate(7)).toBe(futureStr);
    });
  });

  describe('isValidDate', () => {
    test('returns true for valid date strings', () => {
      expect(isValidDate('2024-12-25')).toBe(true);
      expect(isValidDate(today)).toBe(true);
    });

    test('returns false for invalid date strings', () => {
      expect(isValidDate('')).toBe(false);
      expect(isValidDate('invalid')).toBe(false);
      expect(isValidDate('2024-13-01')).toBe(false);
      expect(isValidDate(null)).toBe(false);
      expect(isValidDate(undefined)).toBe(false);
    });
  });

  describe('isDateInPast', () => {
    test('returns true for past dates', () => {
      expect(isDateInPast(yesterdayStr)).toBe(true);
      expect(isDateInPast('2020-01-01')).toBe(true);
    });

    test('returns false for today and future dates', () => {
      expect(isDateInPast(today)).toBe(false);
      expect(isDateInPast(tomorrowStr)).toBe(false);
    });

    test('returns false for invalid dates', () => {
      expect(isDateInPast('invalid')).toBe(false);
      expect(isDateInPast('')).toBe(false);
    });
  });

  describe('isCheckOutAfterCheckIn', () => {
    test('returns true when checkout is after checkin', () => {
      expect(isCheckOutAfterCheckIn(today, tomorrowStr)).toBe(true);
      expect(isCheckOutAfterCheckIn('2024-01-01', '2024-01-05')).toBe(true);
    });

    test('returns false when checkout is same or before checkin', () => {
      expect(isCheckOutAfterCheckIn(today, today)).toBe(false);
      expect(isCheckOutAfterCheckIn(tomorrowStr, today)).toBe(false);
    });

    test('returns false for invalid dates', () => {
      expect(isCheckOutAfterCheckIn('invalid', today)).toBe(false);
      expect(isCheckOutAfterCheckIn(today, 'invalid')).toBe(false);
    });
  });

  describe('isValidDateRange', () => {
    test('returns true for valid date ranges (minimum 1 night)', () => {
      expect(isValidDateRange(today, tomorrowStr)).toBe(true);
      expect(isValidDateRange('2024-01-01', '2024-01-03')).toBe(true);
    });

    test('returns false for same day or invalid ranges', () => {
      expect(isValidDateRange(today, today)).toBe(false);
      expect(isValidDateRange(tomorrowStr, today)).toBe(false);
    });
  });

  describe('calculateNights', () => {
    test('calculates correct number of nights', () => {
      expect(calculateNights(today, tomorrowStr)).toBe(1);
      expect(calculateNights('2024-01-01', '2024-01-03')).toBe(2);
      expect(calculateNights('2024-01-01', '2024-01-08')).toBe(7);
    });

    test('returns 0 for invalid dates', () => {
      expect(calculateNights('invalid', today)).toBe(0);
      expect(calculateNights(today, 'invalid')).toBe(0);
    });
  });

  describe('isStayTooLong', () => {
    test('returns false for stays within limit', () => {
      expect(isStayTooLong(today, tomorrowStr, 30)).toBe(false);
      const future30 = getFutureDate(30);
      expect(isStayTooLong(today, future30, 30)).toBe(false);
    });

    test('returns true for stays exceeding limit', () => {
      const future31 = getFutureDate(31);
      expect(isStayTooLong(today, future31, 30)).toBe(true);
    });
  });

  describe('isTooFarInAdvance', () => {
    test('returns false for dates within advance booking limit', () => {
      expect(isTooFarInAdvance(today, 365)).toBe(false);
      expect(isTooFarInAdvance(tomorrowStr, 365)).toBe(false);
      const future300 = getFutureDate(300);
      expect(isTooFarInAdvance(future300, 365)).toBe(false);
    });

    test('returns true for dates exceeding advance booking limit', () => {
      const future400 = getFutureDate(400);
      expect(isTooFarInAdvance(future400, 365)).toBe(true);
    });
  });

  describe('validateBookingDates', () => {
    test('returns valid result for correct dates', () => {
      const result = validateBookingDates(today, tomorrowStr);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.nights).toBe(1);
    });

    test('returns errors for missing dates', () => {
      const result = validateBookingDates('', '');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Check-in date is required');
      expect(result.errors).toContain('Check-out date is required');
    });

    test('returns errors for past check-in date', () => {
      const result = validateBookingDates(yesterdayStr, today);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Check-in date cannot be in the past');
    });

    test('returns errors for checkout before checkin', () => {
      const result = validateBookingDates(tomorrowStr, today);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Check-out date must be after check-in date');
    });

    test('returns errors for stays too long', () => {
      const future35 = getFutureDate(35);
      const result = validateBookingDates(today, future35);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Maximum stay is 30 days');
    });

    test('returns errors for bookings too far in advance', () => {
      const future400 = getFutureDate(400);
      const future401 = getFutureDate(401);
      const result = validateBookingDates(future400, future401);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Bookings can only be made up to 1 year in advance');
    });
  });

  describe('formatValidationErrors', () => {
    test('returns empty string for no errors', () => {
      expect(formatValidationErrors([])).toBe('');
    });

    test('returns single error as is', () => {
      expect(formatValidationErrors(['Single error'])).toBe('Single error');
    });

    test('formats multiple errors as numbered list', () => {
      const errors = ['First error', 'Second error'];
      const result = formatValidationErrors(errors);
      expect(result).toBe('1. First error\n2. Second error');
    });
  });
});
