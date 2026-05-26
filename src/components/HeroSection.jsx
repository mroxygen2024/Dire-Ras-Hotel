import React from 'react';
import { Play } from 'lucide-react';

export default function HeroSection({ hotelInfo, loading }) {
  if (loading) {
    return (
      <section
        className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center bg-primary/95 overflow-hidden"
        id="home"
      >
        <div className="relative z-20 max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 w-full text-white flex flex-col justify-center items-start h-full">
          {/* Heritage badge placeholder */}
          <div className="w-48 h-8 rounded-full bg-white/10 animate-pulse mb-8" />

          {/* Subtitle placeholder */}
          <div className="w-32 h-4 rounded bg-white/10 animate-pulse mb-4" />

          {/* Title placeholder */}
          <div className="space-y-3 mb-6 w-full max-w-md">
            <div className="w-3/4 h-10 lg:h-12 rounded bg-white/10 animate-pulse" />
            <div className="w-1/2 h-10 lg:h-12 rounded bg-white/10 animate-pulse" />
          </div>

          {/* Description placeholder */}
          <div className="w-64 h-5 rounded bg-white/10 animate-pulse mb-10" />

          {/* Buttons placeholder */}
          <div className="flex flex-row items-center space-x-4">
            <div className="w-32 h-12 rounded-full bg-white/10 animate-pulse" />
            <div className="w-36 h-12 rounded-full bg-white/10 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!hotelInfo) return null;

  return (
    <section
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')`,
      }}
      id="home"
    >
      {/* Hero Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 lg:bg-gradient-to-r lg:from-black/65 lg:to-black/25 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 w-full text-white flex flex-col justify-center items-start text-left h-full animate-fade-in">
        
        {/* 1. Established Badge */}
        <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm border border-gold/30 px-3.5 py-1.5 rounded-full mb-6 sm:mb-8 shadow-md">
          {/* Miniature Gold Crown SVG */}
          <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" viewBox="0 0 100 100" fill="currentColor">
            <path d="M20,35 L35,48 L50,25 L65,48 L80,35 L75,70 L25,70 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="32" r="4" />
            <circle cx="50" cy="22" r="4" />
            <circle cx="80" cy="32" r="4" />
          </svg>
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] text-gold font-medium uppercase">
            Established Since 1964 EC
          </span>
        </div>

        {/* 2. WELCOME TO (Pre-heading) */}
        <p className="text-gold font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          {hotelInfo.heroSubtitle}
        </p>

        {/* 3. Main Heading */}
        <h1 className="font-serif text-[40px] sm:text-[54px] lg:text-[76px] font-bold leading-[1.05] -tracking-[0.02em] text-white mb-4 max-w-xl lg:max-w-2xl">
          {hotelInfo.heroTitle.split(' ')[0]} <br />
          {hotelInfo.heroTitle.split(' ').slice(1).join(' ')}
        </h1>

        {/* 4. Tagline */}
        <p className="font-serif italic text-gold/90 text-lg sm:text-xl font-light mb-8 sm:mb-10 max-w-md leading-relaxed">
          Stay a cool place in warmer city
        </p>

        {/* 5. CTA Buttons */}
        <div className="flex flex-row items-center space-x-3 sm:space-x-4">
          <a
            href="https://wa.me/251968094406?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-initial text-center bg-gold hover:bg-white text-primary font-sans text-[11px] sm:text-xs font-bold tracking-widest px-5 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg hover:text-primary transition-all duration-300 uppercase whitespace-nowrap"
            id="hero-book-btn"
          >
            BOOK NOW
          </a>
          <button
            className="flex-initial flex items-center justify-center space-x-2 border border-white hover:border-gold hover:text-gold font-sans text-[11px] sm:text-xs font-bold tracking-widest px-5 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 uppercase bg-transparent text-white whitespace-nowrap cursor-pointer"
            id="hero-video-btn"
          >
            <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center flex-shrink-0">
              <Play className="w-2 h-2 fill-current ml-0.5" />
            </div>
            <span>WATCH VIDEO</span>
          </button>
        </div>

      </div>
    </section>
  );
}
