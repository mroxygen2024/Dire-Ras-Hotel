import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar({ hotelInfo, navLinks, loading }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  if (loading) {
    return (
      <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo placeholder */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200/20 animate-pulse" />
              <div className="flex flex-col space-y-1.5 pl-3 border-l border-white/10">
                <div className="w-32 h-4 rounded bg-gray-200/20 animate-pulse" />
                <div className="w-24 h-2.5 rounded bg-gray-200/20 animate-pulse" />
              </div>
            </div>
            
            {/* Desktop Links Placeholder */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="w-12 h-4 rounded bg-gray-200/20 animate-pulse" />
              <div className="w-16 h-4 rounded bg-gray-200/20 animate-pulse" />
              <div className="w-12 h-4 rounded bg-gray-200/20 animate-pulse" />
              <div className="w-14 h-4 rounded bg-gray-200/20 animate-pulse" />
              <div className="w-16 h-4 rounded bg-gray-200/20 animate-pulse" />
            </div>

            {/* Desktop CTA Button Placeholder */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="w-24 h-4 rounded bg-gray-200/20 animate-pulse" />
              <div className="w-28 h-10 rounded bg-gray-200/20 animate-pulse" />
            </div>

            {/* Mobile Menu Icon Placeholder */}
            <div className="lg:hidden flex items-center">
              <div className="w-6 h-6 rounded bg-gray-200/20 animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (!hotelInfo || !navLinks) return null;

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer" id="nav-logo">
            {/* SVG Logo Monogram with Crown */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <svg className="w-10 h-10 text-gold" viewBox="0 0 100 100" fill="currentColor">
                <path d="M20,35 L35,48 L50,25 L65,48 L80,35 L75,70 L25,70 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="32" r="3" />
                <circle cx="50" cy="22" r="3" />
                <circle cx="80" cy="32" r="3" />
                <text x="50" y="62" fontSize="24" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle" fill="currentColor">R</text>
              </svg>
            </div>
            
            {/* Hotel Name */}
            <div className="flex flex-col leading-tight border-l border-gold/30 pl-3">
              <span className="font-serif text-[15px] sm:text-lg font-bold tracking-widest text-gold uppercase">
                {hotelInfo.name}
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] text-gold/80 tracking-wider">
                {hotelInfo.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`font-sans text-[13px] font-semibold tracking-wider transition-colors duration-300 hover:text-gold ${
                  item.active ? 'text-gold border-b-2 border-gold pb-1' : 'text-white/95'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Phone + Book Now Button */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href={`tel:${hotelInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-2 text-[14px] font-sans hover:text-gold transition-colors duration-300"
              id="phone-link-desktop"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span className="font-medium tracking-wide text-white/90">{hotelInfo.phone}</span>
            </a>
            
            <a
              href="https://wa.me/251968094406?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold text-gold font-sans text-[13px] font-semibold tracking-widest px-5 py-2.5 rounded-sm hover:bg-gold hover:text-primary transition-all duration-300 uppercase"
              id="book-btn-desktop"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Right: Phone + Hamburger */}
          <div className="flex lg:hidden items-center space-x-4">
            <a href={`tel:${hotelInfo.phone.replace(/\s+/g, '')}`} className="text-gold p-1" id="phone-link-mobile">
              <Phone className="w-6 h-6" />
            </a>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gold p-1 focus:outline-none"
              aria-label="Toggle menu"
              id="hamburger-btn"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
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
        <div className="fixed inset-0 bg-black/50" onClick={toggleMenu}></div>
        
        {/* Drawer Content */}
        <div className="relative w-4/5 max-w-sm h-full bg-primary flex flex-col justify-between py-8 px-6 shadow-2xl ml-auto border-l border-gold/20">
          
          {/* Close button inside drawer */}
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gold p-1 focus:outline-none"
              aria-label="Close menu"
              id="close-drawer-btn"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Drawer Menu Links */}
          <div className="flex flex-col space-y-6 my-auto items-center">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={toggleMenu}
                className={`font-sans text-lg font-medium tracking-widest transition-colors duration-300 hover:text-gold ${
                  item.active ? 'text-gold border-b border-gold pb-1' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Drawer Footer info */}
          <div className="flex flex-col items-center space-y-4 pt-6 border-t border-white/10">
            <a
              href={`tel:${hotelInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-2 text-[15px]"
              id="phone-link-drawer"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span className="text-white/90 font-medium">{hotelInfo.phone}</span>
            </a>
            <a
              href="https://wa.me/251968094406?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room."
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
              className="w-full text-center bg-gold text-primary font-sans text-[14px] font-bold tracking-widest py-3 rounded hover:bg-white hover:text-primary transition-all duration-300 uppercase"
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
