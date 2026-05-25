import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function RoomCard({ room }) {
  if (!room) return null;
  const { name, price, currency, image } = room;

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full border border-gray-100 group cursor-pointer"
      id={`room-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between relative">
        <div className="text-left pr-12">
          {/* Room Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-dark mb-2 group-hover:text-gold transition-colors duration-300">
            {name}
          </h3>
          
          {/* Room Price */}
          <p className="font-sans text-xs sm:text-sm text-muted-gray">
            From <span className="font-semibold text-gold text-sm sm:text-base">{currency} {price.toLocaleString()}</span> / Night
          </p>
        </div>

        {/* Circular Chevron Arrow Button */}
        <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-gold group-hover:text-primary transition-colors duration-300 shadow-md">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
