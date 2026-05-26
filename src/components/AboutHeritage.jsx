import React from 'react';
import { Landmark, Calendar, Sparkles } from 'lucide-react';

export default function AboutHeritage({ aboutData, loading }) {
  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-white" id="about">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
          <div className="flex flex-col items-center text-center mb-16 animate-pulse">
            <div className="w-24 h-4 bg-gray-200 rounded mb-4" />
            <div className="w-80 h-10 bg-gray-200 rounded mb-4" />
            <div className="w-full max-w-xl h-4 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="space-y-4">
              <div className="w-48 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="w-full h-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!aboutData) return null;

  const { title, subtitle, introText, storySections, timeline } = aboutData;

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gold/10 overflow-hidden" id="about">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-gold-dark uppercase block mb-3">
            HERITAGE & LEGACY
          </span>
          <h2 className="font-serif text-3xl sm:text-[42px] font-bold text-primary leading-tight mb-4">
            {title}
          </h2>
          <p className="font-serif italic text-primary/80 text-lg sm:text-xl mb-6">
            {subtitle}
          </p>
          <div className="w-16 h-[1.5px] bg-gold opacity-90 mb-6" />
          <p className="text-sm sm:text-base text-primary/70 leading-relaxed font-sans font-light">
            {introText}
          </p>
        </div>

        {/* Story Sections (Alternating Grid) */}
        <div className="space-y-16 sm:space-y-24 mb-24">
          {storySections.map((section, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={section.id} 
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
              >
                {/* Image Area */}
                <div className={`col-span-1 lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                    <img 
                      src={section.imageUrl} 
                      alt={section.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Text Area */}
                <div className={`col-span-1 lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col justify-center`}>
                  <div className="flex items-center space-x-2.5 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center border border-gold-dark/30">
                      <Landmark className="w-4 h-4 text-gold-dark" />
                    </div>
                    <span className="font-serif italic text-gold-dark text-sm font-medium">Chapter {idx + 1}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-4 leading-tight">
                    {section.title}
                  </h3>
                  <p className="text-sm sm:text-base text-primary/80 leading-relaxed font-sans font-light">
                    {section.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Section */}
        <div className="relative pt-12 sm:pt-16 border-t border-gold/15">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gold-dark uppercase block mb-3">
              TIMELINE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-2">
              Hotel Milestones & History
            </h3>
            <p className="text-xs sm:text-sm text-primary/50 tracking-wider">A history built on trust and legacy</p>
          </div>

          {/* Desktop Vertical Timeline */}
          <div className="relative hidden md:block max-w-4xl mx-auto">
            {/* Center spine */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gold/50 via-primary/30 to-gold/5 opacity-80" />

            <div className="space-y-12">
              {timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={idx} className="relative flex items-center justify-between">
                    {/* Left Panel */}
                    <div className={`w-[45%] ${isLeft ? 'text-right' : 'opacity-0 pointer-events-none'}`}>
                      {isLeft && (
                        <div className="bg-[#F8F6F2] border border-gold/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                          <span className="font-serif text-2xl font-bold text-gold-dark">{item.year}</span>
                          <h4 className="font-serif text-lg font-bold text-primary mt-1 mb-2">{item.title}</h4>
                          <p className="text-xs sm:text-sm text-primary/70 leading-relaxed font-sans font-light">{item.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Timeline Node Badge */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-gold flex items-center justify-center z-10 shadow-md">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>

                    {/* Right Panel */}
                    <div className={`w-[45%] ${!isLeft ? 'text-left' : 'opacity-0 pointer-events-none'}`}>
                      {!isLeft && (
                        <div className="bg-[#F8F6F2] border border-gold/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                          <span className="font-serif text-2xl font-bold text-gold-dark">{item.year}</span>
                          <h4 className="font-serif text-lg font-bold text-primary mt-1 mb-2">{item.title}</h4>
                          <p className="text-xs sm:text-sm text-primary/70 leading-relaxed font-sans font-light">{item.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Stacked Timeline */}
          <div className="block md:hidden space-y-6 max-w-md mx-auto">
            {timeline.map((item, idx) => (
              <div 
                key={idx} 
                className="relative bg-[#F8F6F2] border-l-4 border-gold p-6 rounded-r-2xl shadow-sm flex flex-col text-left"
              >
                <div className="flex items-center space-x-2.5 mb-1.5">
                  <span className="font-serif text-xl font-bold text-gold-dark leading-none">{item.year}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                  <span className="text-[10px] text-primary/40 font-bold uppercase tracking-wider">Milestone {idx + 1}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-primary mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-primary/70 leading-relaxed font-sans font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
