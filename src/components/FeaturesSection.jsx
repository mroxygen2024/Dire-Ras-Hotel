import React from 'react';
import * as Icons from 'lucide-react';

export default function FeaturesSection({ services }) {
  if (!services) return null;

  return (
    <section className="py-14 sm:py-16 lg:py-24 bg-[#F8F6F2]" id="services">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 lg:gap-0 lg:divide-x divide-gray-200/80">
          {services.map((item, index) => {
            // Dynamically resolve icon from string name
            const IconComponent = Icons[item.icon] || Icons.HelpCircle;
            
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
