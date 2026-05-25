import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer({ hotelInfo, navLinks, loading }) {
  if (loading) {
    return (
      <footer className="bg-primary text-white border-t border-gold/10 pt-16 pb-8" id="contact">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Monogram */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200/20 animate-pulse" />
                <div className="flex flex-col space-y-1.5 pl-2">
                  <div className="w-24 h-4 rounded bg-gray-200/20 animate-pulse" />
                  <div className="w-16 h-2.5 rounded bg-gray-200/20 animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-3 rounded bg-gray-200/20 animate-pulse" />
                <div className="w-5/6 h-3 rounded bg-gray-200/20 animate-pulse" />
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col space-y-3">
              <div className="w-28 h-5 rounded bg-gray-200/20 animate-pulse mb-2" />
              <div className="w-20 h-3.5 rounded bg-gray-200/20 animate-pulse" />
              <div className="w-24 h-3.5 rounded bg-gray-200/20 animate-pulse" />
              <div className="w-16 h-3.5 rounded bg-gray-200/20 animate-pulse" />
            </div>

            {/* Contact */}
            <div className="flex flex-col space-y-3">
              <div className="w-28 h-5 rounded bg-gray-200/20 animate-pulse mb-2" />
              <div className="w-36 h-3.5 rounded bg-gray-200/20 animate-pulse" />
              <div className="w-28 h-3.5 rounded bg-gray-200/20 animate-pulse" />
            </div>

            {/* Newsletter */}
            <div className="flex flex-col space-y-3">
              <div className="w-28 h-5 rounded bg-gray-200/20 animate-pulse mb-2" />
              <div className="w-full h-3 rounded bg-gray-200/20 animate-pulse" />
              <div className="flex space-x-3 mt-2">
                <div className="w-9 h-9 rounded-full bg-gray-200/20 animate-pulse" />
                <div className="w-9 h-9 rounded-full bg-gray-200/20 animate-pulse" />
                <div className="w-9 h-9 rounded-full bg-gray-200/20 animate-pulse" />
              </div>
            </div>

          </div>
        </div>
      </footer>
    );
  }

  if (!hotelInfo || !navLinks) return null;

  return (
    <footer className="bg-primary text-white border-t border-gold/10 pt-16 pb-8" id="contact">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Monogram + Brand */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <svg className="w-10 h-10 text-gold" viewBox="0 0 100 100" fill="currentColor">
                <path d="M20,35 L35,48 L50,25 L65,48 L80,35 L75,70 L25,70 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="32" r="3" />
                <circle cx="50" cy="22" r="3" />
                <circle cx="80" cy="32" r="3" />
                <text x="50" y="62" fontSize="24" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle" fill="currentColor">R</text>
              </svg>
              <div className="flex flex-col leading-tight pl-2">
                <span className="font-serif text-[15px] font-bold tracking-widest text-gold uppercase">
                  {hotelInfo.name}
                </span>
                <span className="font-sans text-[9px] text-gold/80 tracking-wider">
                  {hotelInfo.tagline}
                </span>
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              A landmark of luxury and hospitality in the heart of Dire Dawa. Offering unparalleled services, classic accommodations, and fine culinary experiences since 1968.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-gold tracking-wide mb-5">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-white/85">
              {navLinks.map((item) => (
                <a 
                  key={item.id}
                  href={item.href} 
                  className="hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold tracking-wide mb-1">
              Contact Us
            </h4>
            <div className="flex flex-col space-y-3 text-xs sm:text-sm text-white/85">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span>{hotelInfo.address}</span>
              </div>
              <a href={`tel:${hotelInfo.phone.replace(/\s+/g, '')}`} className="flex items-center space-x-3 hover:text-gold transition-colors">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span>{hotelInfo.phone}</span>
              </a>
              <a href={`mailto:${hotelInfo.email}`} className="flex items-center space-x-3 hover:text-gold transition-colors">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span>{hotelInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold tracking-wide mb-1">
              Follow Us
            </h4>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
              Stay connected with us on social media for exclusive offers and updates.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60">
          <p>© 2026 {hotelInfo.name}. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
