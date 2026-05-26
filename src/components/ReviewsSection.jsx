import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function ReviewsSection({ loading }) {
  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-[#F8F6F2] border-t border-gold/10" id="reviews">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
          <div className="flex flex-col items-center text-center mb-16">
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
                    <div key={idx} className="w-4 h-4 rounded-full bg-gray-200/20 animate-pulse" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="w-full h-3 rounded bg-gray-200/20 animate-pulse" />
                  <div className="w-5/6 h-3 rounded bg-gray-200/20 animate-pulse" />
                </div>
                <div className="pt-4 border-t border-gold/5 flex flex-col space-y-1.5">
                  <div className="w-24 h-4 rounded bg-gray-200/20 animate-pulse" />
                  <div className="w-16 h-3 rounded bg-gray-200/20 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const reviews = [
    {
      name: 'DAVID EDOM',
      platform: 'Google Review',
      text: 'The best hotel I have ever stayed in. Nice rooms and all the staff were very kind. I highly recommend it to anyone visiting Dire Dawa.',
    },
    {
      name: 'Zenamarkos Mulu',
      platform: 'Google Review',
      text: "Great everything’s perfect. The WiFi, rooms, pool, staff, food, and atmosphere were amazing with affordable prices.",
    },
    {
      name: 'Sammy Zeray',
      platform: 'Google Review',
      text: 'Nice clean rooms with best customer service.',
    },
    {
      name: 'Patrick Mumo',
      platform: 'Google Review',
      text: 'Polite and good service. Clean and spacious rooms.',
    },
    {
      name: 'Mohammed Yusuf Ibrahim',
      platform: 'Google Review',
      text: 'By far the best hotel in Dire Dawa Ethiopia.',
    },
    {
      name: 'Nahu Dimitri',
      platform: 'Google Review',
      text: "We had our sister's wedding here and it was a blast. The staff went above and beyond to help us.",
    },
    {
      name: 'Tripadvisor Guest',
      platform: 'Tripadvisor Review',
      text: 'Best restaurant and service in Dire Dawa. Wonderful breakfast, clean area, swimming pool, and affordable pricing.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8F6F2] border-t border-gold/10" id="reviews">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gold block mb-2">
            GUEST EXPERIENCES
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-primary leading-tight mb-3">
            What Our Guests Say
          </h2>
          <p className="text-sm text-primary/70 max-w-lg font-sans">
            Trusted by travelers, families, business guests, and visitors for generations in Dire Dawa.
          </p>
          <div className="w-16 h-[1.5px] bg-gold opacity-90 mt-4" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((r, i) => (
            <div 
              key={i}
              className="group bg-white border border-gold/5 hover:border-gold/20 hover:shadow-xl p-8 rounded-2xl flex flex-col justify-between transition-all duration-350 transform hover:-translate-y-1"
            >
              <div>
                {/* Top Row: Stars and Quote */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-gold fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gold/20 group-hover:text-gold/40 transition-colors duration-300" />
                </div>

                {/* Review Text */}
                <p className="font-serif italic text-primary/80 text-[15px] sm:text-base leading-relaxed mb-6">
                  "{r.text}"
                </p>
              </div>

              {/* Author & Platform details */}
              <div className="pt-4 border-t border-gold/10 flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-xs sm:text-sm font-bold text-primary uppercase tracking-wide">
                    {r.name}
                  </h4>
                  <span className="text-[10px] sm:text-xs text-gold font-medium tracking-wider uppercase block mt-0.5">
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
