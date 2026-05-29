import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_TOKEN_KEYS = ['admin_token', 'admin_access_token'];

const getStoredToken = () => {
  if (typeof window === 'undefined') return null;

  for (const key of AUTH_TOKEN_KEYS) {
    const token = window.localStorage.getItem(key);
    if (token) return token;
  }

  return null;
};

const clearStoredAuth = () => {
  if (typeof window === 'undefined') return;

  AUTH_TOKEN_KEYS.forEach((key) => window.localStorage.removeItem(key));
  window.localStorage.removeItem('admin_profile');
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For cookie support if utilized by backend
});

// Request interceptor to automatically insert authorization token
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthorized access and unified error extraction
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the server rejects credentials as expired or unauthorized, automatically log out
    if (error.response?.status === 401) {
      clearStoredAuth();
      
      // Prevent infinite redirect loops if already on login page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login?error=session_expired';
      }
    }
    
    // Extract server API standard response error message
    const message = error.response?.data?.message || 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);
