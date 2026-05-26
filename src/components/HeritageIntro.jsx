import React from 'react';
import { Landmark } from 'lucide-react';

export default function HeritageIntro({ heritageData, setActivePage, loading }) {
  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-white" id="heritage-intro">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-pulse">
            <div className="space-y-4">
              <div className="w-32 h-4 bg-gray-200 rounded" />
              <div className="w-3/4 h-8 bg-gray-200 rounded" />
              <div className="w-full h-24 bg-gray-200 rounded" />
            </div>
            <div className="aspect-[16/10] bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  if (!heritageData) return null;

  const { badge, title, subtitle, paragraph1, paragraph2, ctaText, imageUrl } = heritageData;

  const handleDiscoverStory = (e) => {
    e.preventDefault();
    if (setActivePage) {
      setActivePage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gold/10 overflow-hidden" id="heritage-intro">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Area (Col 7 on large, Col 12 on mobile) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Small Badge */}
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center border border-gold-dark/25">
                <Landmark className="w-4 h-4 text-gold-dark" />
              </div>
              <span className="font-serif italic text-gold-dark text-xs font-bold tracking-wider uppercase">
                {badge}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-serif text-3xl sm:text-[40px] font-bold text-primary leading-tight mb-4">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="font-serif italic text-primary/80 text-lg sm:text-xl mb-6 leading-relaxed">
              {subtitle}
            </p>

            {/* Paragraph Block */}
            <div className="space-y-4 text-sm sm:text-base text-primary/80 font-sans font-light leading-relaxed mb-8">
              <p>{paragraph1}</p>
              <p>{paragraph2}</p>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={handleDiscoverStory}
                className="bg-primary hover:bg-gold text-white hover:text-primary border border-primary hover:border-gold font-sans text-xs font-bold tracking-widest px-7 py-3.5 rounded-xl transition-all duration-300 uppercase shadow-md cursor-pointer"
              >
                {ctaText}
              </button>
            </div>

          </div>

          {/* Image Area (Col 5 on large, Col 12 on mobile) */}
          <div className="lg:col-span-5 relative">
            {/* Elegant Background Card Effect */}
            <div className="absolute inset-0 bg-gold/10 rounded-2xl transform rotate-2 translate-x-2 translate-y-2 pointer-events-none border border-gold/20" />
            
            {/* Image Box */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              <img 
                src={imageUrl} 
                alt="Timeless heritage of Dire Dawa Ras Hotel" 
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                loading="lazy"
              />
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
