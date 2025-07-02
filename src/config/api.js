// API Configuration for Glencity Camping
// This file centralizes all API endpoints and configuration

// Base API URL - automatically switches between development and production
const getBaseURL = () => {
  // Check if we're in development or production
  if (import.meta.env.DEV) {
    // Development - use localhost
    return import.meta.env.VITE_API_URL || 'http://localhost:5000';
  } else {
    // Production - use Render deployment
    return import.meta.env.VITE_API_URL || 'https://glencity-camping.onrender.com';
  }
};

export const API_BASE_URL = getBaseURL();

// API Endpoints
export const API_ENDPOINTS = {
  // Base
  BASE: API_BASE_URL,
  HEALTH: `${API_BASE_URL}/health`,
  
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    ME: `${API_BASE_URL}/api/auth`,
  },
  
  // Accommodations
  ACCOMMODATIONS: {
    LIST: `${API_BASE_URL}/api/accommodations`,
    DETAIL: (id) => `${API_BASE_URL}/api/accommodations/${id}`,
  },
  
  // Bookings
  BOOKINGS: {
    CREATE: `${API_BASE_URL}/api/bookings`,
    MY_BOOKINGS: `${API_BASE_URL}/api/bookings/my-bookings`,
    DETAIL: (id) => `${API_BASE_URL}/api/bookings/${id}`,
  }
};

console.log('🌐 API Configuration:', {
  environment: import.meta.env.DEV ? 'development' : 'production',
  baseURL: API_BASE_URL
});
