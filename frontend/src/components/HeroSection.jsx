import React from 'react';
import { Play } from 'lucide-react';

export default function HeroSection({ heroData, loading, whatsappNumber }) {
  if (loading) {
    return (
      <section
        className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] flex items-center bg-primary overflow-hidden"
        id="home"
      >
        <div className="relative z-20 max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 w-full text-white flex flex-col justify-center items-start h-full">
          {/* Established badge placeholder */}
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

  if (!heroData) return null;

  const { badgeText, subtitle, titlePart1, titlePart2, tagline, ctaBookText, ctaVideoText, videoUrl, backgroundImage } = heroData;
  const whatsappDigits = (whatsappNumber || '').replace(/\D+/g, '');
  const bookingUrl = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room.`
    : null;

  return (
    <section
      className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] flex items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
      id="home"
    >
      {/* Hero Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 lg:bg-gradient-to-r lg:from-black/70 lg:to-black/30 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 w-full text-white flex flex-col justify-center items-start text-left h-full animate-fade-in">
        
        {/* 1. Established Badge */}
        <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm border border-gold/30 px-3.5 py-1.5 rounded-full mb-5 sm:mb-6 shadow-md">
          {/* Miniature Gold Crown SVG */}
          <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" viewBox="0 0 100 100" fill="currentColor">
            <path d="M 38,32 H 62 V 34 H 38 Z" />
            <path d="M 39,29 H 61 V 30 H 39 Z" />
            <path d="M 39,29 L 34,22 C 34,22 38,24 41,26 L 43,23 C 43,23 46,24 48,26 L 50,16 C 50,16 51,24 52,26 L 57,23 C 57,23 58,24 59,26 L 66,22 C 66,22 62,24 61,29 Z" />
            <polygon points="50,12 52.5,15 50,18 47.5,15" />
            <polygon points="34,18 36.5,21 34,24 31.5,21" />
            <polygon points="66,18 68.5,21 66,24 63.5,21" />
            <polygon points="43,19 45.5,22 43,25 40.5,22" />
            <polygon points="57,19 59.5,22 57,25 54.5,22" />
          </svg>
          <span className="font-sans text-[8.5px] sm:text-[10px] tracking-[0.2em] text-gold font-medium uppercase">
            {badgeText}
          </span>
        </div>

        {/* 2. WELCOME TO (Pre-heading) */}
        <p className="text-gold font-sans text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2">
          {subtitle}
        </p>

        {/* 3. Main Heading (Fully responsive, prevents text overflow on very narrow viewports) */}
        <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] -tracking-[0.02em] text-white mb-3 max-w-full sm:max-w-xl lg:max-w-2xl break-words">
          {titlePart1} <br className="hidden sm:inline" />
          <span className="text-white">{titlePart2}</span>
        </h1>

        {/* 4. Tagline */}
        <p className="font-serif italic text-gold/90 text-base sm:text-lg lg:text-xl font-light mb-6 sm:mb-8 max-w-md leading-relaxed">
          {tagline}
        </p>

        {/* 5. CTA Buttons (Touch-friendly large padding & scaling sizes) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {bookingUrl ? (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center bg-gold hover:bg-white text-primary border border-gold hover:border-white font-sans text-xs font-bold tracking-widest px-6 py-4 rounded-xl shadow-lg hover:text-primary transition-all duration-300 uppercase whitespace-nowrap"
            id="hero-book-btn"
          >
            {ctaBookText}
          </a>
          ) : null}
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 border border-white hover:border-gold hover:text-gold font-sans text-xs font-bold tracking-widest px-6 py-4 rounded-xl transition-all duration-300 uppercase bg-transparent text-white whitespace-nowrap cursor-pointer"
            id="hero-video-btn"
          >
            <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center flex-shrink-0">
              <Play className="w-2 h-2 fill-current ml-0.5" />
            </div>
            <span>{ctaVideoText}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
