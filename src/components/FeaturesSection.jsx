import React from 'react';
import { Bed, Utensils, Wifi, Users, Bell, HelpCircle } from 'lucide-react';

// Selective map to preserve tree-shaking and reduce bundle size
const iconMap = {
  Bed,
  Utensils,
  Wifi,
  Users,
  Bell
};

export default function FeaturesSection({ services, loading }) {
  if (loading) {
    return (
      <section className="py-10 sm:py-12 lg:py-10 bg-[#F8F6F2]" id="services">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 lg:gap-0 lg:divide-x divide-gray-200/80">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4 lg:px-8">
                {/* Icon Placeholder */}
                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse mb-4" />
                {/* Title Placeholder */}
                <div className="w-24 h-4 rounded bg-gray-200 animate-pulse mb-2.5" />
                {/* Description Placeholder */}
                <div className="w-32 h-3 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!services) return null;

  return (
    <section className="py-10 sm:py-12 lg:py-10 bg-[#F8F6F2]" id="services">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 lg:gap-0 lg:divide-x divide-gray-200/80">
          {services.map((item) => {
            // Resolve icon Component from our optimized map
            const IconComponent = iconMap[item.icon] || HelpCircle;
            
            return (
              <div 
                key={item.id} 
                className="flex flex-col items-center text-center px-4 sm:px-6 hover:translate-y-[-2px] transition-transform duration-300"
                id={`feature-item-${item.id}`}
              >
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4">
                  <IconComponent className="w-6 h-6 stroke-[1.5]" />
                </div>
                
                {/* Title */}
                <h3 className="font-sans text-sm sm:text-base font-bold text-text-dark tracking-wide mb-2">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-muted-gray leading-relaxed max-w-[200px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
