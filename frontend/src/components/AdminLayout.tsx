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
  ShieldCheck,
  Settings,
  Crown,
  Sparkles,
  ChevronRight
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
    { name: 'Settings', path: '/admin/settings', icon: Settings },
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
    <nav className="flex-grow py-5 flex flex-col gap-1.5 px-4">
      <div className="px-3 mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.26em] text-stone-400">
        <Sparkles size={12} className="text-primary" />
        CMS Core Controls
      </div>
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClick}
            className={`group flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#8B0000] text-white shadow-lg shadow-red-950/15'
                : 'text-stone-600 hover:bg-stone-100 hover:text-text-dark'
            }`}
          >
            <span className="flex items-center gap-3 min-w-0">
              <item.icon size={18} className={isActive ? 'text-white' : 'text-stone-400 group-hover:text-[#8B0000]'} />
              <span className="truncate">{item.name}</span>
            </span>
            <ChevronRight size={14} className={isActive ? 'text-white/70' : 'text-stone-300 group-hover:text-stone-400'} />
          </NavLink>
        );
      })}

      <div className="border-t border-stone-200/60 my-4" />

      <button
        onClick={() => {
          if (onClick) onClick();
          handleLogout();
        }}
        className="flex items-center gap-3 px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-800 font-medium text-sm rounded-xl transition-all duration-200 w-full text-left cursor-pointer"
      >
        <LogOut size={18} />
        Log Out
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(139,0,0,0.08),_transparent_30%),linear-gradient(180deg,_#fbf7f1_0%,_#f8f3eb_100%)] flex text-[#1B1B1B]">
      <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-stone-200/80 bg-white/90 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.65)]">
        <div className="px-6 py-5 border-b border-stone-200/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#8B0000] flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-red-950/15">
            R
            </div>
            <div>
              <h1 className="font-serif font-bold text-[15px] leading-tight text-text-dark flex items-center gap-2">
                Dire Dawa Ras Hotel
                <Crown size={14} className="text-[#8B0000]" />
              </h1>
              <p className="text-[10px] tracking-[0.32em] text-stone-500 uppercase font-semibold mt-1">
                Heritage CMS
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-amber-50 p-4">
            <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-stone-500">Signed in as</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[#8B0000]">
                <User size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-text-dark truncate flex items-center gap-1.5">
                  {admin?.firstName || 'Hotel Admin'}
                  <ShieldCheck size={12} className="text-[#8B0000]" />
                </div>
                <div className="text-[11px] text-stone-500 truncate">{admin?.email}</div>
              </div>
            </div>
          </div>
        </div>

        {renderNavLinks()}
      </aside>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-white flex flex-col transition-transform duration-300 transform border-r border-stone-200 z-50 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-[#8B0000] flex items-center justify-center text-white font-serif font-bold text-sm shadow-lg shadow-red-950/10">
                R
              </div>
              <div>
                <h1 className="font-serif font-bold text-sm text-text-dark">Ras CMS</h1>
                <p className="text-[10px] uppercase tracking-[0.24em] text-stone-400 font-semibold">Navigation</p>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 hover:bg-stone-100 text-stone-500 rounded-lg"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-4 border-b border-stone-200 bg-stone-50/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[#8B0000]">
                <User size={14} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-text-dark truncate flex items-center gap-1.5">
                  {admin?.firstName || 'Admin'}
                  <ShieldCheck size={12} className="text-[#8B0000]" />
                </div>
                <div className="text-[10px] text-muted-gray truncate">{admin?.email}</div>
              </div>
            </div>
          </div>
          {renderNavLinks(() => setMobileOpen(false))}
        </aside>
      </div>

      {/* Main Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <header className="sticky top-0 z-20 h-20 bg-white/75 backdrop-blur-xl border-b border-stone-200/80 flex items-center justify-between px-5 sm:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-stone-400">Administration</p>
              <h2 className="text-xl font-serif font-bold text-text-dark leading-tight">{getPageTitle()}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 bg-white text-[11px] uppercase tracking-[0.22em] font-semibold rounded-full text-stone-600 hover:bg-stone-50 transition-colors"
            >
              View Public Site
            </a>

            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              API Connected
            </div>
          </div>
        </header>

        <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl w-full mx-auto space-y-6 animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
};
