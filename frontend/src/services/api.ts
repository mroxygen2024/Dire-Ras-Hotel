import axios from 'axios';

// Express backend CMS URL (port 5000)
const API_BASE_URL = 'http://localhost:5000/api';

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
    const token = localStorage.getItem('admin_token');
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
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_profile');
      
      // Prevent infinite redirect loops if already on login page
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login?error=session_expired';
      }
    }
    
    // Extract server API standard response error message
    const message = error.response?.data?.message || 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);
