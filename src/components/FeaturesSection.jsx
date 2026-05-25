import React from 'react';
import { Bed, Utensils, Wifi, Users, Bell } from 'lucide-react';

const features = [
  {
    icon: Bed,
    title: 'Comfortable Rooms',
    description: 'Relax in our stylish and spacious rooms',
  },
  {
    icon: Utensils,
    title: 'Fine Dining',
    description: 'Enjoy delicious local and international cuisine',
  },
  {
    icon: Wifi,
    title: 'Free Wi-Fi',
    description: 'Stay connected with high speed internet',
  },
  {
    icon: Users,
    title: 'Meeting & Events',
    description: 'Perfect space for your meetings and events',
  },
  {
    icon: Bell,
    title: '24/7 Service',
    description: 'We are here for you around the clock',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-14 sm:py-16 lg:py-24 bg-[#F8F6F2]" id="services">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 lg:gap-0 lg:divide-x divide-gray-200/80">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center px-4 sm:px-6 hover:translate-y-[-2px] transition-transform duration-300"
                id={`feature-item-${index}`}
              >
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
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
