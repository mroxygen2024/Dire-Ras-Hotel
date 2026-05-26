import React, { useState } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

export default function Navbar({ hotelInfo, navLinks, activePage, setActivePage, loading }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsOpen(false);
    if (setActivePage && item.page) {
      setActivePage(item.page);
      
      // Smooth scroll if section is specified, else scroll to top
      if (item.section) {
        setTimeout(() => {
          const element = document.getElementById(item.section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  if (loading) {
    return (
      <nav className="bg-primary text-white sticky top-0 z-50 shadow-md border-b border-gold/15">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo placeholder */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
              <div className="flex flex-col space-y-1.5 pl-3 border-l border-white/10">
                <div className="w-32 h-4 rounded bg-white/10 animate-pulse" />
                <div className="w-24 h-2.5 rounded bg-white/10 animate-pulse" />
              </div>
            </div>
            
            {/* Desktop Links Placeholder */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="w-12 h-4 rounded bg-white/10 animate-pulse" />
              <div className="w-16 h-4 rounded bg-white/10 animate-pulse" />
              <div className="w-12 h-4 rounded bg-white/10 animate-pulse" />
              <div className="w-14 h-4 rounded bg-white/10 animate-pulse" />
            </div>

            {/* Mobile Menu Icon Placeholder */}
            <div className="lg:hidden flex items-center">
              <div className="w-6 h-6 rounded bg-white/10 animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (!hotelInfo || !navLinks) return null;

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md border-b border-gold/15">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            onClick={() => setActivePage && setActivePage('home')}
            className="flex items-center space-x-3 cursor-pointer select-none" 
            id="nav-logo"
          >
            {/* Hotel Logo Image */}
            <div className="flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Dire Dawa Ras Hotel Logo" 
                className="w-10 h-10 object-contain mix-blend-screen" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            
            {/* Hotel Name & Slogan */}
            <div className="flex flex-col leading-tight border-l border-gold/30 pl-3">
              <span className="font-serif text-[15px] sm:text-[17px] font-bold tracking-widest text-gold uppercase">
                {hotelInfo.name}
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] text-white/70 tracking-wider">
                {hotelInfo.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((item) => {
              const isActive = activePage === item.page && !item.section;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`font-sans text-[12px] font-bold tracking-widest transition-colors duration-300 hover:text-gold uppercase ${
                    isActive ? 'text-gold border-b border-gold pb-1.5' : 'text-white/90'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Desktop Phone + Book Now Button */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href={`tel:${hotelInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-2 text-[13px] font-sans hover:text-gold transition-colors duration-300"
              id="phone-link-desktop"
            >
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="font-bold tracking-wide text-white/90">{hotelInfo.phone}</span>
            </a>
            
            <a
              href="https://wa.me/251968094406?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-white text-primary hover:text-primary border border-gold hover:border-white font-sans text-xs font-bold tracking-widest px-5 py-2.5 rounded-lg transition-all duration-300 uppercase shadow-md"
              id="book-btn-desktop"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Right: Phone + Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <a href={`tel:${hotelInfo.phone.replace(/\s+/g, '')}`} className="text-gold p-1" id="phone-link-mobile">
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gold p-1 focus:outline-none"
              aria-label="Toggle menu"
              id="hamburger-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay & Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        id="mobile-drawer"
      >
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={toggleMenu}></div>
        
        {/* Drawer Content */}
        <div className="relative w-4/5 max-w-sm h-full bg-primary flex flex-col justify-between py-8 px-6 shadow-2xl ml-auto border-l border-gold/20">
          
          {/* Close button inside drawer */}
          <div className="flex justify-between items-center pb-4 border-b border-gold/15">
            <span className="font-serif text-sm font-bold text-gold tracking-widest">NAVIGATION</span>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gold p-1 focus:outline-none"
              aria-label="Close menu"
              id="close-drawer-btn"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Menu Links */}
          <div className="flex flex-col space-y-6 my-auto items-center">
            {navLinks.map((item) => {
              const isActive = activePage === item.page && !item.section;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`font-sans text-[15px] font-bold tracking-widest transition-colors duration-300 hover:text-gold uppercase ${
                    isActive ? 'text-gold border-b border-gold pb-1' : 'text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Drawer Footer info */}
          <div className="flex flex-col items-center space-y-4 pt-6 border-t border-gold/15">
            <a
              href={`tel:${hotelInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-2 text-[14px]"
              id="phone-link-drawer"
            >
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="text-white/95 font-bold">{hotelInfo.phone}</span>
            </a>
            
            <a
              href="https://wa.me/251968094406?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room."
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
              className="w-full text-center bg-gold hover:bg-white text-primary hover:text-primary font-sans text-xs font-bold tracking-widest py-3.5 rounded-lg transition-all duration-300 uppercase shadow-md"
              id="book-btn-drawer"
            >
              Book Now
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}
