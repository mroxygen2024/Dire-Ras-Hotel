import React from 'react';
import { Map, Heart, Award, Briefcase } from 'lucide-react';

export default function WhyStaySection({ loading }) {
  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-white border-t border-gold/10" id="why-stay">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-24 h-4 rounded bg-gray-200 animate-pulse mb-3" />
            <div className="w-64 h-8 rounded bg-gray-200 animate-pulse mb-4" />
            <div className="w-16 h-[2px] bg-gold/30" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#F8F6F2] p-8 rounded-2xl flex flex-col space-y-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-32 h-6 rounded bg-gray-200 animate-pulse" />
                <div className="w-full h-12 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const features = [
    {
      title: 'Prime City Location',
      description: 'Located in the vibrant center of Dire Dawa, offering easy access to transport hubs, local markets, and historic sites.',
      icon: <Map className="w-6 h-6 text-gold" />,
    },
    {
      title: 'Traditional Ethiopian Hospitality',
      description: 'Experience the legendary warmth and authenticity of Ethiopian service, combined with classic professional standards.',
      icon: <Heart className="w-6 h-6 text-gold" />,
    },
    {
      title: 'Comfortable Modern Rooms',
      description: 'Relax in beautifully designed rooms that blend classic heritage styling with modern amenities for a restful stay.',
      icon: <Award className="w-6 h-6 text-gold" />,
    },
    {
      title: 'Business & Leisure Friendly',
      description: 'Equipped with high-speed internet, conference facilities, and quiet working areas alongside serene spaces for absolute relaxation.',
      icon: <Briefcase className="w-6 h-6 text-gold" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gold/10" id="why-stay">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gold uppercase block mb-2">
            OUR PROMISE
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-primary leading-tight mb-3">
            Why Stay With Us
          </h2>
          <div className="w-16 h-[1.5px] bg-gold opacity-90" />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div 
              key={i}
              className="group bg-[#F8F6F2] hover:bg-white border border-gold/5 hover:border-gold/30 hover:shadow-2xl p-8 rounded-2xl flex flex-col items-start transition-all duration-500 transform hover:-translate-y-1.5"
            >
              {/* Circle Icon Container */}
              <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-primary flex items-center justify-center border border-gold/20 mb-6 transition-colors duration-300">
                <div className="group-hover:text-gold transition-colors duration-300">
                  {f.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-primary mb-3">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-primary/70 leading-relaxed font-sans">
                {f.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
