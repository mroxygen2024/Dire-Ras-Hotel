import React from 'react';
import { Play } from 'lucide-react';

export default function HeroSection({ hotelInfo, loading }) {
  if (loading) {
    return (
      <section
        className="relative w-full h-[460px] lg:h-[480px] flex items-center bg-primary/95 overflow-hidden"
        id="home"
      >
        <div className="relative z-20 max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 w-full text-white flex flex-col justify-center h-full">
          {/* Heritage badge placeholder */}
          <div className="w-52 h-7 rounded-full bg-gray-200/20 animate-pulse mb-4" />

          {/* Subtitle placeholder */}
          <div className="w-40 h-4 rounded bg-gray-200/20 animate-pulse mb-4" />

          {/* Title placeholder */}
          <div className="space-y-3 mb-6 max-w-xl">
            <div className="w-3/4 h-10 lg:h-12 rounded bg-gray-200/20 animate-pulse" />
            <div className="w-1/2 h-10 lg:h-12 rounded bg-gray-200/20 animate-pulse" />
          </div>

          {/* Decorative line placeholder */}
          <div className="w-16 h-[1.5px] bg-gray-200/20 animate-pulse mb-6" />

          {/* Description placeholder */}
          <div className="w-64 h-4 rounded bg-gray-200/20 animate-pulse mb-8 lg:mb-6" />

          {/* Buttons placeholder */}
          <div className="flex flex-row items-center space-x-4 mb-6 lg:mb-5">
            <div className="w-32 h-12 rounded bg-gray-200/20 animate-pulse" />
            <div className="w-36 h-12 rounded bg-gray-200/20 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!hotelInfo) return null;

  return (
    <section
      className="relative w-full h-[460px] lg:h-[480px] flex items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')`,
      }}
      id="home"
    >
      {/* Hero Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 lg:bg-gradient-to-r lg:from-black/60 lg:to-black/30 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 w-full text-white flex flex-col justify-center h-full animate-fade-in">

        {/* Heritage Badge */}
        <div className="flex items-center space-x-2 self-start bg-primary/80 backdrop-blur-sm border border-gold/40 px-3.5 py-1.5 rounded-full mb-4 shadow-md">
          {/* Miniature Gold Crown SVG */}
          <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" viewBox="0 0 100 100" fill="currentColor">
            <path d="M20,35 L35,48 L50,25 L65,48 L80,35 L75,70 L25,70 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="32" r="4" />
            <circle cx="50" cy="22" r="4" />
            <circle cx="80" cy="32" r="4" />
          </svg>
          <span className="font-serif text-[10px] sm:text-[11px] tracking-[0.15em] text-gold font-bold uppercase">
            Established Since 1964 EC
          </span>
        </div>

        {/* Welcome Subtitle */}
        <p className="text-gold font-sans text-[14px] sm:text-[16px] lg:text-[16px] font-bold tracking-widest uppercase mb-3 sm:mb-4">
          {hotelInfo.heroSubtitle}
        </p>

        {/* Hero Title */}
        <h1 className="font-serif text-[48px] sm:text-[68px] lg:text-[60px] font-bold leading-[1.1] tracking-normal max-w-xl mb-3 sm:mb-4 lg:mb-3">
          {hotelInfo.heroTitle.split(' ').slice(0, 1).join('')} <br className="hidden sm:inline" />
          {hotelInfo.heroTitle.split(' ').slice(1).join(' ')}
        </h1>

        {/* Decorative Gold Line */}
        <div className="w-16 h-[1.5px] bg-gold opacity-90 mt-2 mb-5 sm:mb-6 lg:mb-4" />

        {/* Hero Description */}
        <p className="font-sans text-[16px] sm:text-[18px] lg:text-[17px] text-white/95 max-w-md lg:max-w-lg mb-6 lg:mb-5 leading-relaxed">
          Stay a cool place in warmer city
        </p>

        {/* Buttons Row */}
        <div className="flex flex-row items-center space-x-4 mb-6 lg:mb-5">
          <a
            href="https://wa.me/251968094406?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial text-center bg-gold hover:bg-white text-primary font-sans text-[13px] sm:text-sm font-bold tracking-wider px-6 sm:px-8 lg:px-6 py-3 sm:py-4 lg:py-3 rounded-sm shadow-lg hover:text-primary transition-all duration-300 uppercase"
            id="hero-book-btn"
          >
            BOOK NOW
          </a>
          <button
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 border border-white hover:border-gold hover:text-gold font-sans text-[13px] sm:text-sm font-bold tracking-wider px-5 sm:px-7 lg:px-5 py-3 sm:py-4 lg:py-3 rounded-sm transition-all duration-300 uppercase bg-transparent"
            id="hero-video-btn"
          >
            <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center flex-shrink-0">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
            <span>WATCH VIDEO</span>
          </button>
        </div>

      </div>
    </section>
  );
}
