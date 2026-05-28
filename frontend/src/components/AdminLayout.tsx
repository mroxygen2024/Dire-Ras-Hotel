import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from './ui/Toast';
import {
  LayoutDashboard,
  Building,
  Image as ImageIcon,
  BedDouble,
  Briefcase,
  History,
  MessageSquare,
  Contact,
  LogOut,
  Menu,
  X,
  User,
  ShieldCheck
} from 'lucide-react';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
}

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationItems: SidebarItem[] = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Hotel Info', path: '/admin/hotel-info', icon: Building },
    { name: 'Hero Section', path: '/admin/hero-section', icon: ImageIcon },
    { name: 'Rooms', path: '/admin/rooms', icon: BedDouble },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'About & Heritage', path: '/admin/about', icon: History },
    { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
    { name: 'Contact Page', path: '/admin/contact', icon: Contact },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    const current = navigationItems.find(item => location.pathname === item.path);
    return current ? current.name : 'Hotel Administration';
  };

  const renderNavLinks = (onClick?: () => void) => (
    <nav className="flex-grow py-6 flex flex-col gap-1.5 px-4">
      <div className="text-stone-400 font-semibold uppercase tracking-widest text-[10px] px-3 mb-2">
        CMS Core Controls
      </div>
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClick}
            className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-primary text-white shadow-md shadow-red-900/10'
                : 'text-stone-600 hover:bg-stone-100 hover:text-text-dark'
            }`}
          >
            <item.icon size={18} className={isActive ? 'text-white' : 'text-stone-400 group-hover:text-text-dark'} />
            {item.name}
          </NavLink>
        );
      })}

      <div className="border-t border-stone-200/60 my-4" />

      <button
        onClick={() => {
          if (onClick) onClick();
          handleLogout();
        }}
        className="flex items-center gap-3.5 px-4 py-3 text-red-650 hover:bg-red-50 hover:text-red-750 font-medium text-sm rounded-lg transition-all duration-200 w-full text-left cursor-pointer"
      >
        <LogOut size={18} />
        Log Out
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex">
      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-68 bg-white border-r border-stone-200 shrink-0">
        {/* Brand/Logo Header */}
        <div className="h-18 px-6 border-b border-stone-200 flex items-center gap-3 bg-white">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
            R
          </div>
          <div>
            <h1 className="font-serif font-bold text-[15px] leading-tight text-text-dark">
              Ras Hotel CMS
            </h1>
            <p className="text-[10px] tracking-wider text-muted-gray uppercase font-semibold">
              Dire Dawa Portal
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        {renderNavLinks()}

        {/* Footer/Logged In User */}
        <div className="p-4.5 border-t border-stone-200 bg-stone-50/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-105 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <User size={16} />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-text-dark truncate flex items-center gap-1.5">
              {admin?.firstName || 'Hotel Admin'}
              <ShieldCheck size={12} className="text-primary" />
            </div>
            <div className="text-[10px] text-muted-gray truncate">{admin?.email}</div>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Nav Slideout Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-white flex flex-col transition-transform duration-300 transform border-r border-stone-200 z-50 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-18 px-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-white font-serif font-bold text-sm">
                R
              </div>
              <h1 className="font-serif font-bold text-sm text-text-dark">Ras CMS Mobile</h1>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 hover:bg-stone-100 text-stone-500 rounded"
            >
              <X size={18} />
            </button>
          </div>
          {renderNavLinks(() => setMobileOpen(false))}
          
          <div className="p-4 border-t border-stone-150 bg-stone-50/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-105 flex items-center justify-center text-primary shrink-0">
              <User size={14} />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-text-dark truncate">{admin?.firstName || 'Admin'}</div>
              <div className="text-[9px] text-muted-gray truncate">{admin?.email}</div>
            </div>
          </div>
        </aside>
      </div>

      {/* 3. Main Frame container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Header Bar */}
        <header className="h-18 bg-white border-b border-stone-200 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-serif font-bold text-text-dark hidden sm:block">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4.5">
            {/* Live website button */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-250 text-[11px] uppercase tracking-wider font-semibold rounded-md text-stone-600 hover:bg-stone-50 transition-colors"
            >
              View Public Site
            </a>

            <div className="h-4.5 w-[1px] bg-stone-200 hidden md:block" />

            {/* Quick Status Tag */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              API Connected
            </div>
          </div>
        </header>

        {/* Primary Page Canvas */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};
