import React from 'react';
import { Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react';

export default function Footer({ hotelInfo, navLinks, activePage, setActivePage, loading }) {
  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (setActivePage && item.page) {
      setActivePage(item.page);
      
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
      <footer className="bg-primary text-white pt-16 pb-8 relative border-t border-gold/15" id="footer">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 relative z-10">
          <div className="flex flex-col items-center mb-12 animate-pulse">
            <div className="w-24 h-3 bg-white/10 rounded mb-4" />
            <div className="w-64 h-8 bg-white/10 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-white/10 animate-pulse">
            <div className="h-32 bg-white/5 rounded-xl" />
            <div className="h-32 bg-white/5 rounded-xl" />
            <div className="h-32 bg-white/5 rounded-xl" />
          </div>
        </div>
      </footer>
    );
  }

  if (!hotelInfo || !navLinks) return null;

  return (
    <footer className="bg-primary text-white pt-16 pb-6 relative overflow-hidden border-t border-gold/15" id="footer">
      {/* Subtle background radial texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #D4AF37 0%, transparent 70%)' }} 
      />
      
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 relative z-10">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Brand details (Col 5) */}
          <div className="md:col-span-5 flex flex-col space-y-5">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Dire Dawa Ras Hotel Logo" 
                className="w-12 h-12 object-contain mix-blend-screen flex-shrink-0" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="flex flex-col leading-tight border-l border-gold/30 pl-3">
                <span className="font-serif text-[16px] sm:text-[18px] font-bold tracking-widest text-gold uppercase">
                  {hotelInfo.name}
                </span>
                <span className="font-sans text-[9px] sm:text-[10px] text-white/85 tracking-wider">
                  {hotelInfo.tagline}
                </span>
              </div>
            </div>
            
            <p className="font-sans text-sm text-white/85 leading-relaxed max-w-sm font-light">
              Serving eastern Ethiopia since 1964 EC, the Dire Dawa Ras Hotel represents timeless hospitality, trust, and landmark luxury in a beautiful courtyard setting.
            </p>
            
            <div className="inline-flex items-center self-start px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/25">
              <span className="text-[9px] text-gold uppercase tracking-widest font-bold">
                {hotelInfo.establishedText || "Established Since 1964 EC"}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Quick Links (Col 3) */}
          <div className="md:col-span-3 flex flex-col space-y-5 md:pl-6 lg:pl-12">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-gold/20 pb-2">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-3 text-sm text-white/85 font-light">
              {navLinks.map((item) => (
                <a 
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="hover:text-gold transition-colors duration-300 self-start tracking-widest text-[11px] uppercase font-bold"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Contacts & Follow Us (Col 4) */}
          <div className="md:col-span-4 flex flex-col space-y-5">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-gold/20 pb-2">
              Connect With Us
            </h4>
            
            {/* Social Badges */}
            <div className="flex space-x-3.5">
              <a 
                href="https://www.tiktok.com/@ras_dire" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300 transform hover:scale-105"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@rashoteldiredawa" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300 transform hover:scale-105"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61570400957998" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300 transform hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            {/* Micro Contacts */}
            <div className="pt-2 flex flex-col space-y-3">
              <a href={`tel:${hotelInfo.phone.replace(/\s+/g, '')}`} className="flex items-center space-x-3 text-xs text-white/85 hover:text-gold transition-colors font-medium">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{hotelInfo.phone}</span>
              </a>
              <a href="https://wa.me/251968094406" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-xs text-white/85 hover:text-gold transition-colors font-medium">
                <svg viewBox="0 0 100 100" className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="50" cy="50" r="43" strokeWidth="4" strokeDasharray="3 3" />
                  <path d="M50 42 C38.4 42 29 50.4 29 60.8 C29 64.6 30.3 68.2 32.6 71 L30 79 L38.5 76.5 C41.8 78.4 45.8 79.5 50 79.5 C61.6 79.5 71 71.1 71 60.8 C71 50.4 61.6 42 50 42 Z" strokeWidth="5" />
                </svg>
                <span>WhatsApp Desk (+251 968 094 406)</span>
              </a>
              <a href={`mailto:${hotelInfo.email}`} className="flex items-center space-x-3 text-xs text-white/85 hover:text-gold transition-colors font-medium break-all">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{hotelInfo.email}</span>
              </a>
              <div className="flex items-start space-x-3 text-xs text-white/85 font-medium">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{hotelInfo.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="border-t border-white/10 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/75 tracking-wider">
          <p>© 2026 Dire Dawa Ras Hotel. All rights reserved.</p>
          <p className="mt-2.5 sm:mt-0 font-serif italic text-gold text-[11px] capitalize tracking-normal">
            Designed with historic landmark heritage.
          </p>
        </div>

      </div>
    </footer>
  );
}
