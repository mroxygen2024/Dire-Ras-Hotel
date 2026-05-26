import React from 'react';
import { Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react';

export default function Footer({ hotelInfo, navLinks, loading }) {
  if (loading) {
    return (
      <footer className="bg-primary text-white pt-20 pb-8 relative overflow-hidden" id="contact">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 relative z-10">
          <div className="flex flex-col items-center mb-16 animate-pulse">
            <div className="w-24 h-3 bg-white/10 rounded mb-4" />
            <div className="w-64 h-8 bg-white/10 rounded mb-4" />
            <div className="w-96 h-4 bg-white/10 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-white/5 rounded-xl border border-white/10" />
            ))}
          </div>
          <div className="border-t border-gold/10 pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 animate-pulse">
            <div className="h-40 bg-white/5 rounded-xl" />
            <div className="h-40 bg-white/5 rounded-xl" />
            <div className="h-40 bg-white/5 rounded-xl" />
          </div>
        </div>
      </footer>
    );
  }

  if (!hotelInfo || !navLinks) return null;

  const contacts = [
    {
      id: 'location',
      title: 'Our Address',
      icon: <MapPin className="w-5 h-5 text-gold" />,
      content: 'HVQ5+FGV Hotel, Dire Dawa 1487, Ethiopia',
      actionLabel: 'Get Directions →',
      actionUrl: 'https://maps.google.com/?q=Dire+Dawa+Ras+Hotel',
    },
    {
      id: 'phone',
      title: 'Reception Desk',
      icon: <Phone className="w-5 h-5 text-gold" />,
      content: '+251 25 111 3255\n+251 915 320 033',
      actionLabel: 'Call Reception →',
      actionUrl: 'tel:+251251113255',
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Booking',
      icon: (
        <svg viewBox="0 0 100 100" className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="43" strokeWidth="4" strokeDasharray="3 3" />
          <path d="M50 42 C38.4 42 29 50.4 29 60.8 C29 64.6 30.3 68.2 32.6 71 L30 79 L38.5 76.5 C41.8 78.4 45.8 79.5 50 79.5 C61.6 79.5 71 71.1 71 60.8 C71 50.4 61.6 42 50 42 Z" strokeWidth="5" />
        </svg>
      ),
      content: '+251 968 094 406',
      actionLabel: 'Chat on WhatsApp →',
      actionUrl: 'https://wa.me/251968094406?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room.',
    },
    {
      id: 'email',
      title: 'Email Queries',
      icon: <Mail className="w-5 h-5 text-gold" />,
      content: 'ddrashotel1@gmail.com',
      actionLabel: 'Send an Email →',
      actionUrl: 'mailto:ddrashotel1@gmail.com',
    },
  ];

  return (
    <footer className="bg-primary text-white pt-20 pb-6 relative overflow-hidden" id="contact">
      {/* Subtle background gradient texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #D4AF37 0%, transparent 70%)' }}></div>
      
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 relative z-10">
        
        {/* 1. CONTACT INTRO AREA */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gold uppercase block mb-3">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Contact & Location
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-lg font-sans font-light">
            We are always ready to welcome you in the heart of Dire Dawa.
          </p>
        </div>

        {/* 2. INTERACTIVE CONTACT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contacts.map((c) => (
            <div 
              key={c.id}
              className="group bg-white/5 backdrop-blur-sm border border-gold/10 hover:border-gold/30 hover:bg-white/10 p-6 rounded-xl flex flex-col justify-between transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(212,175,55,0.05)]"
            >
              <div className="flex flex-col space-y-5">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border border-gold/20 group-hover:bg-gold group-hover:text-primary transition-colors duration-500 shadow-inner">
                  {React.cloneElement(c.icon, { className: 'w-5 h-5 text-gold group-hover:text-primary transition-colors duration-500' })}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    {c.title}
                  </h3>
                  <div className="text-sm text-white/70 font-light space-y-1 whitespace-pre-line leading-relaxed">
                    {c.content}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gold/10">
                <a 
                  href={c.actionUrl}
                  target={c.id !== 'phone' && c.id !== 'email' ? "_blank" : undefined}
                  rel={c.id !== 'phone' && c.id !== 'email' ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center text-xs font-bold text-gold hover:text-white transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-gold py-0.5 uppercase tracking-wider group-hover:translate-x-1 transform"
                >
                  {c.actionLabel}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Divider before main footer */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-16" />

        {/* 3. MAIN FOOTER AREA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
          
          {/* LEFT COLUMN — BRANDING */}
          <div className="flex flex-col space-y-5">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Dire Dawa Ras Hotel Logo" 
                className="w-12 h-12 object-contain mix-blend-screen flex-shrink-0" 
              />
              <div className="flex flex-col leading-tight pl-2">
                <span className="font-serif text-[17px] font-bold tracking-[0.15em] text-gold uppercase">
                  DIRE DAWA RAS HOTEL
                </span>
                <span className="font-sans text-[10px] text-white/60 tracking-[0.2em] uppercase mt-1">
                  Comfort. Hospitality. Dire Dawa.
                </span>
              </div>
            </div>
            <p className="font-sans text-sm text-white/70 leading-relaxed max-w-sm font-light mt-1">
              A trusted hospitality landmark in the heart of Dire Dawa since 1964 EC.
            </p>
            <div className="inline-flex items-center self-start px-3 py-1.5 rounded bg-gold/10 border border-gold/20 mt-2">
              <span className="text-[10px] text-gold uppercase tracking-widest font-bold">Established Since 1964 EC</span>
            </div>
          </div>

          {/* CENTER COLUMN — QUICK LINKS */}
          <div className="flex flex-col space-y-6 md:pl-8 lg:pl-12">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-3 text-sm text-white/70 font-light">
              {['HOME', 'ABOUT US', 'ROOMS', 'SERVICES', 'GALLERY', 'OFFERS', 'CONTACT'].map((label) => {
                const link = navLinks?.find(n => n.label.toUpperCase() === label);
                return (
                  <a 
                    key={label}
                    href={link ? link.href : `#${label.toLowerCase().replace(' ', '-')}`} 
                    className="hover:text-gold transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-gold self-start tracking-wider text-[13px]"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN — SOCIAL & CONTACT */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide">
              Follow Us
            </h4>
            <p className="font-sans text-sm text-white/70 leading-relaxed font-light">
              Stay connected with us for hotel updates, hospitality experiences, and special offers.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://www.tiktok.com/@ras_dire" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300 transform hover:scale-110"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@rashoteldiredawa" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300 transform hover:scale-110"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61570400957998" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex flex-col space-y-3">
              <a href="tel:+251251113255" className="flex items-center space-x-3 text-sm text-white/70 hover:text-gold transition-colors font-light">
                <Phone className="w-4 h-4 text-gold" />
                <span>+251 25 111 3255</span>
              </a>
              <a href="https://wa.me/251968094406" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-sm text-white/70 hover:text-gold transition-colors font-light">
                <svg viewBox="0 0 100 100" className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="50" cy="50" r="43" strokeWidth="4" strokeDasharray="3 3" />
                  <path d="M50 42 C38.4 42 29 50.4 29 60.8 C29 64.6 30.3 68.2 32.6 71 L30 79 L38.5 76.5 C41.8 78.4 45.8 79.5 50 79.5 C61.6 79.5 71 71.1 71 60.8 C71 50.4 61.6 42 50 42 Z" strokeWidth="5" />
                </svg>
                <span>+251 968 094 406</span>
              </a>
              <a href="mailto:ddrashotel1@gmail.com" className="flex items-center space-x-3 text-sm text-white/70 hover:text-gold transition-colors font-light break-all">
                <Mail className="w-4 h-4 text-gold" />
                <span>ddrashotel1@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* 4. BOTTOM COPYRIGHT BAR */}
        <div className="border-t border-white/10 pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 tracking-wider">
          <p>© 2026 Dire Dawa Ras Hotel. All rights reserved.</p>
          <p className="mt-3 sm:mt-0 font-serif italic text-gold/70 text-[12px] capitalize tracking-normal">Designed with hospitality in mind.</p>
        </div>

      </div>
    </footer>
  );
}
