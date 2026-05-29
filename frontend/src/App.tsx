import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import Home from './pages/Home';

// Admin CMS pages
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { HotelInfoCMS } from './pages/admin/HotelInfoCMS';
import { HeroCMS } from './pages/admin/HeroCMS';
import { RoomsCMS } from './pages/admin/RoomsCMS';
import { ServicesCMS } from './pages/admin/ServicesCMS';
import { AboutHeritageCMS } from './pages/admin/AboutHeritageCMS';
import { ReviewsCMS } from './pages/admin/ReviewsCMS';
import { ContactCMS } from './pages/admin/ContactCMS';
import { SettingsCMS } from './pages/admin/SettingsCMS';
import { AdminLayout } from './components/AdminLayout';

// Create TanStack Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes stale time
    },
  },
});

// Protected Route Wrapper Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdminLoading } = useAuth();

  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center">
        {/* Premium visual spinner */}
        <div className="w-11 h-11 rounded-full border-3 border-stone-200 border-t-primary animate-spin" />
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold mt-4 animate-pulse">
          Authenticating Portal...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            {/* Discreet Admin quick-link: low-opacity, fixed in corner to avoid exposing to customers */}
            <Link
              to="/admin/login"
              aria-label="Admin portal"
              className="fixed left-4 bottom-4 z-50 rounded-md bg-white/80 dark:bg-black/70 px-2 py-1 text-[11px] font-medium text-stone-700 dark:text-stone-200 opacity-20 hover:opacity-90 transition-opacity duration-200 pointer-events-auto"
            >
              Admin
            </Link>
            <Routes>
              {/* 1. Public Facing Hotel site */}
              <Route path="/" element={<Home />} />

              {/* 2. Admin Authentication flow */}
              <Route path="/admin/login" element={<Login />} />

              {/* 3. Protected Administrative CMS routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/hotel-info"
                element={
                  <ProtectedRoute>
                    <HotelInfoCMS />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/hero-section"
                element={
                  <ProtectedRoute>
                    <HeroCMS />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/rooms"
                element={
                  <ProtectedRoute>
                    <RoomsCMS />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/services"
                element={
                  <ProtectedRoute>
                    <ServicesCMS />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/about"
                element={
                  <ProtectedRoute>
                    <AboutHeritageCMS />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reviews"
                element={
                  <ProtectedRoute>
                    <ReviewsCMS />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/contact"
                element={
                  <ProtectedRoute>
                    <ContactCMS />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <SettingsCMS />
                  </ProtectedRoute>
                }
              />

              {/* Redirection wildcards */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
