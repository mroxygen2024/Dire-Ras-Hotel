import React from 'react';
import { Play } from 'lucide-react';

export default function HeroSection({ hotelInfo }) {
  if (!hotelInfo) return null;

  return (
    <section 
      className="relative w-full h-[520px] lg:h-[480px] flex items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')`,
      }}
      id="home"
    >
      {/* Hero Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 lg:bg-gradient-to-r lg:from-black/60 lg:to-black/30 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 w-full text-white flex flex-col justify-center h-full animate-fade-in">
        
        {/* Welcome Subtitle */}
        <p className="text-gold font-sans text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4">
          {hotelInfo.heroSubtitle}
        </p>

        {/* Hero Title */}
        <h1 className="font-serif text-[42px] sm:text-6xl lg:text-[52px] font-bold leading-[1.1] tracking-normal max-w-xl mb-4 lg:mb-4 sm:mb-6">
          {hotelInfo.heroTitle.split(' ').slice(0, 1).join('')} <br className="hidden sm:inline" />
          {hotelInfo.heroTitle.split(' ').slice(1).join(' ')}
        </h1>

        {/* Hero Description */}
        <p className="font-sans text-sm sm:text-base lg:text-[15px] text-white/95 max-w-md lg:max-w-lg mb-8 lg:mb-5 leading-relaxed">
          {hotelInfo.heroDescription}
        </p>

        {/* Buttons Row */}
        <div className="flex flex-row items-center space-x-4 mb-8 lg:mb-5">
          <a
            href="#booking"
            className="flex-1 sm:flex-initial text-center bg-gold hover:bg-white text-primary font-sans text-[13px] sm:text-sm font-bold tracking-wider px-6 sm:px-8 lg:px-6 py-3.5 sm:py-4 lg:py-3 rounded-sm shadow-lg hover:text-primary transition-all duration-300 uppercase"
            id="hero-book-btn"
          >
            BOOK NOW
          </a>
          <button
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 border border-white hover:border-gold hover:text-gold font-sans text-[13px] sm:text-sm font-bold tracking-wider px-5 sm:px-7 lg:px-5 py-3.5 sm:py-4 lg:py-3 rounded-sm transition-all duration-300 uppercase bg-transparent"
            id="hero-video-btn"
          >
            <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center flex-shrink-0">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
            <span>WATCH VIDEO</span>
          </button>
        </div>

        {/* Bullet Page Indicators (Dots) */}
        <div className="flex space-x-2 lg:hidden">
          <span className="w-2.5 h-2.5 rounded-full bg-gold cursor-pointer transition-all duration-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/75 cursor-pointer transition-all duration-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/75 cursor-pointer transition-all duration-300" />
        </div>

      </div>
    </section>
  );
}
