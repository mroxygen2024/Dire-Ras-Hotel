import React, { useState, useEffect } from 'react';

export default function WhatsAppFloatingButton({ whatsappNumber }) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 600); // Quick fade-in for high visibility
    return () => clearTimeout(timer);
  }, []);

  const digits = (whatsappNumber || '').replace(/\D+/g, '');
  const whatsappUrl = digits
    ? `https://wa.me/${digits}?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room.`
    : null;

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-end pointer-events-none">
      {/* Premium Live Reception Help Bubble */}
      <div 
        className={`bg-primary border-2 border-gold/70 text-white font-sans px-4 py-2 rounded-2xl shadow-[0_10px_30px_rgba(11,59,46,0.4)] mr-3.5 transition-all duration-500 ease-out transform origin-right flex items-center space-x-3 pointer-events-auto ${
          showTooltip 
            ? 'opacity-100 translate-x-0 scale-100' 
            : 'opacity-0 translate-x-4 scale-90 pointer-events-none'
        }`}
      >
        {/* Pulsing Active Beacon */}
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
        </span>
        
        {/* Text Area */}
        <div className="flex flex-col text-left leading-tight pr-1">
          <span className="text-[9px] text-gold font-bold tracking-widest uppercase">RECEPTION</span>
          <span className="text-[12px] font-bold text-white/95 tracking-wide mt-0.5">Need Help? Chat Online</span>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setShowTooltip(false)}
          className="text-white/60 hover:text-gold ml-1 text-[10px] focus:outline-none transition-colors cursor-pointer"
          aria-label="Close message"
        >
          ✕
        </button>
      </div>

      {/* Floating Button */}
      {whatsappUrl ? (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative pointer-events-auto flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-gold border-2 border-gold/80 hover:border-gold hover:bg-gold hover:text-primary transition-all duration-300 ease-out shadow-[0_4px_20px_rgba(11,59,46,0.3)] hover:shadow-[0_8px_30px_rgba(212,162,76,0.4)] transform hover:scale-105 group"
        id="whatsapp-floating-btn"
        aria-label="Book on WhatsApp"
      >
        {/* Pulsing Outer Glow Effect */}
        <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-25 group-hover:hidden" />

        {/* WhatsApp Premium Custom Royal Icon */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:rotate-12" 
          fill="none"
          stroke="currentColor"
        >
          {/* Subtle Outer Dotted Ring */}
          <circle cx="50" cy="50" r="43" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-75 group-hover:rotate-45 transition-transform duration-1000 origin-center" />
          
          {/* Crown atop the chat bubble */}
          <path 
            d="M38 31 L44 37 L50 28 L56 37 L62 31 L58 42 L42 42 Z" 
            fill="currentColor" 
            strokeWidth="1.2" 
            strokeLinejoin="round" 
          />
          <circle cx="38" cy="29" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="50" cy="26" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="62" cy="29" r="1.2" fill="currentColor" stroke="none" />

          {/* Premium Chat Bubble Shape */}
          <path 
            d="M50 42 C38.4 42 29 50.4 29 60.8 C29 64.6 30.3 68.2 32.6 71 L30 79 L38.5 76.5 C41.8 78.4 45.8 79.5 50 79.5 C61.6 79.5 71 71.1 71 60.8 C71 50.4 61.6 42 50 42 Z" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none"
          />
          
          {/* Detailed Elegant WhatsApp Handset */}
          <path 
            d="M44 53.5 C43.5 53.5 42.5 54 42 55 C41.3 56.3 41.5 58 43 60.3 C44.5 62.5 46.5 64.3 48.8 65.3 C50.8 66.3 52.2 66 53.2 65.3 C54 64.7 54.5 63.7 54.5 63.3 C54.5 62.9 53.8 62.3 52.8 61.7 C51.8 61.1 51 60.7 50.5 61 C50 61.3 49.5 62 49 61.7 C48 61.3 46.8 60 46 59 C45.2 58 44.8 57 45.2 56.5 C45.5 56 46.2 55.5 45.8 54.5 C45.2 53.5 44.5 53.5 44 53.5 Z" 
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </a>
      ) : null}
    </div>
  );
}
