import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function ReviewsSection({ reviewsData, loading }) {
  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-[#F8F6F2] border-t border-gold/10" id="reviews">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
          <div className="flex flex-col items-center text-center mb-16 animate-pulse">
            <div className="w-28 h-4 rounded bg-gray-200 animate-pulse mb-3" />
            <div className="w-72 h-8 rounded bg-gray-200 animate-pulse mb-4" />
            <div className="w-96 h-4 rounded bg-gray-200 animate-pulse mb-4" />
            <div className="w-16 h-[2px] bg-gold/30" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl flex flex-col space-y-4 shadow-sm border border-gold/5">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="w-4 h-4 rounded-full bg-gray-200 animate-pulse" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="w-full h-3 rounded bg-gray-200 animate-pulse" />
                  <div className="w-5/6 h-3 rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="pt-4 border-t border-gold/5 flex flex-col space-y-1.5">
                  <div className="w-24 h-4 rounded bg-gray-200 animate-pulse" />
                  <div className="w-16 h-3 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!reviewsData) return null;

  const { badge, title, subtitle, reviews } = reviewsData;

  return (
    <section className="py-16 sm:py-24 bg-[#F8F6F2] border-t border-gold/10" id="reviews">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gold-dark block mb-2">
            {badge}
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-primary leading-tight mb-3">
            {title}
          </h2>
          <p className="text-sm text-primary/70 max-w-lg font-sans font-light">
            {subtitle}
          </p>
          <div className="w-16 h-[1.5px] bg-gold opacity-90 mt-4" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((r, i) => (
            <div 
              key={i}
              className="group bg-white border border-gold/5 hover:border-gold/20 hover:shadow-xl p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                {/* Top Row: Stars and Quote */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-gold-dark fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gold/20 group-hover:text-gold/40 transition-colors duration-300" />
                </div>

                {/* Review Text */}
                <p className="font-serif italic text-primary/85 text-[15px] sm:text-base leading-relaxed mb-6">
                  "{r.text}"
                </p>
              </div>

              {/* Author & Platform details */}
              <div className="pt-4 border-t border-gold/10 flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-xs sm:text-sm font-bold text-primary uppercase tracking-wide">
                    {r.name}
                  </h4>
                  <span className="text-[10px] sm:text-xs text-gold-dark font-medium tracking-wider uppercase block mt-0.5">
                    {r.platform}
                  </span>
                </div>
                
                {/* Micro Platform Badge */}
                <div className="text-[9px] font-bold text-primary/30 uppercase tracking-widest px-2.5 py-1 rounded bg-primary/5 border border-primary/10">
                  {r.platform.split(' ')[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
