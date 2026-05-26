import React from 'react';
import { Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react';

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

            {/* Follow Us */}
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
              <svg className="w-10 h-10 text-gold flex-shrink-0" viewBox="0 0 100 100" fill="currentColor">
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
              Dire Dawa Ras Hotel is a landmark of hospitality and comfort in the heart of Dire Dawa, Ethiopia. Established in 1964 EC, the hotel offers full-service accommodations for both business and leisure travelers with traditional hospitality and modern amenities.
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
                  className="hover:text-gold transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-gold py-0.5"
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
              
              {/* Clickable Phone Links */}
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-1">
                  <a href="tel:+251251113255" className="hover:text-gold transition-colors focus:outline-none focus:ring-1 focus:ring-gold">
                    +251 251 113 255
                  </a>
                  <a href="tel:+251915320033" className="hover:text-gold transition-colors focus:outline-none focus:ring-1 focus:ring-gold">
                    +251 915 320 033
                  </a>
                </div>
              </div>

              {/* Clickable WhatsApp Link */}
              <a 
                href="https://wa.me/251968094406?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-gold transition-colors focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <svg viewBox="0 0 100 100" className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="50" cy="50" r="43" strokeWidth="4" strokeDasharray="3 3" />
                  <path d="M50 42 C38.4 42 29 50.4 29 60.8 C29 64.6 30.3 68.2 32.6 71 L30 79 L38.5 76.5 C41.8 78.4 45.8 79.5 50 79.5 C61.6 79.5 71 71.1 71 60.8 C71 50.4 61.6 42 50 42 Z" strokeWidth="5" />
                </svg>
                <span>+251 968 094 406</span>
              </a>

              {/* Clickable Email Link */}
              <a href={`mailto:${hotelInfo.email}`} className="flex items-center space-x-3 hover:text-gold transition-colors focus:outline-none focus:ring-1 focus:ring-gold">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="break-all">{hotelInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold tracking-wide mb-1">
              Follow Us
            </h4>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
              Stay connected with us on social media for hotel updates, offers, and hospitality experiences.
            </p>
            
            {/* Social Icons Row */}
            <div className="flex space-x-3">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61570400957998" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-gold"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@rashoteldiredawa" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-gold"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@ras_dire" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-gold"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60">
          <p>© 2026 Dire Dawa Ras Hotel. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-gold/80">Designed with hospitality in mind.</p>
        </div>

      </div>
    </footer>
  );
}
