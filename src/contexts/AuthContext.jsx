import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Configure axios to include credentials (cookies) in all requests
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASE_URL;

// Add error logging for production debugging
if (!import.meta.env.DEV) {
  axios.interceptors.request.use(
    (config) => {
      console.log('🔄 API Request:', {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        withCredentials: config.withCredentials
      });
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log('✅ API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
      return response;
    },
    (error) => {
      console.error('❌ API Response Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.response?.data?.msg || error.message,
        headers: error.response?.headers
      });
      return Promise.reject(error);
    }
  );
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Configure axios interceptors
  useEffect(() => {
    // Add request interceptor to ensure credentials are always included
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        config.withCredentials = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle authentication errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid, clear auth state
          setUser(null);
          setIsAuthenticated(false);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Check if user is authenticated on app startup
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.AUTH.ME);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.msg || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
