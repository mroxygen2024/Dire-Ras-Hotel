import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';

interface AdminProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'SUPERADMIN' | 'EDITOR' | 'VIEWER';
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdminLoading: boolean;
  admin: AdminProfile | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_TOKEN_KEY = 'admin_token';
const AUTH_PROFILE_KEY = 'admin_profile';

const readStoredAdmin = (): AdminProfile | null => {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(AUTH_PROFILE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AdminProfile;
  } catch {
    return null;
  }
};

const clearStoredAdmin = () => {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem('admin_access_token');
  window.localStorage.removeItem(AUTH_PROFILE_KEY);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdminLoading, setIsAdminLoading] = useState<boolean>(true);
  const [admin, setAdmin] = useState<AdminProfile | null>(() => readStoredAdmin());

  const logout = useCallback(() => {
    clearStoredAdmin();
    setIsAuthenticated(false);
    setAdmin(null);
  }, []);

  const verifySession = useCallback(async () => {
    const token = typeof window !== 'undefined'
      ? window.localStorage.getItem(AUTH_TOKEN_KEY) || window.localStorage.getItem('admin_access_token')
      : null;

    if (!token) {
      setIsAdminLoading(false);
      return;
    }

    try {
      const profile = await adminService.getProfile();
      setAdmin(profile);
      setIsAuthenticated(true);
      window.localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.error('Session verification failed, logging out:', err);
      logout();
    } finally {
      setIsAdminLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    const storedAdmin = readStoredAdmin();
    if (storedAdmin) {
      setAdmin(storedAdmin);
      setIsAuthenticated(true);
    }

    verifySession();
  }, [verifySession]);

  const login = async (credentials: any) => {
    setIsAdminLoading(true);
    try {
      const response = await adminService.login(credentials);
      const { token, accessToken, admin: adminData } = response.data;
      const resolvedToken = token || accessToken;

      if (!resolvedToken) {
        throw new Error('Authentication token missing from response.');
      }
      
      window.localStorage.setItem(AUTH_TOKEN_KEY, resolvedToken);
      window.localStorage.setItem('admin_access_token', resolvedToken);
      window.localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(adminData));
      
      setAdmin(adminData);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      setAdmin(null);
      throw err;
    } finally {
      setIsAdminLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdminLoading,
        admin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
