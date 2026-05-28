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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdminLoading, setIsAdminLoading] = useState<boolean>(true);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_profile');
    setIsAuthenticated(false);
    setAdmin(null);
  }, []);

  const verifySession = useCallback(async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setIsAdminLoading(false);
      return;
    }

    try {
      const profile = await adminService.getProfile();
      setAdmin(profile);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Session verification failed, logging out:', err);
      logout();
    } finally {
      setIsAdminLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const login = async (credentials: any) => {
    setIsAdminLoading(true);
    try {
      const response = await adminService.login(credentials);
      const { token, admin: adminData } = response.data;
      
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_profile', JSON.stringify(adminData));
      
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
