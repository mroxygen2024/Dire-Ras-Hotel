import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function RoomCard({ room }) {
  if (!room) return null;
  const { name, price, currency, image } = room;

  return (
    <div 
      className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 flex flex-row md:flex-col items-center md:items-stretch h-[120px] md:h-full border border-gray-100 group cursor-pointer"
      id={`room-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Image Container */}
      <div className="w-[120px] md:w-full h-full md:h-auto flex-shrink-0 md:relative md:aspect-[16/10] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block" />
      </div>

      {/* Card Content */}
      <div className="p-3.5 md:p-4 md:pb-5 flex-1 flex flex-row md:flex-col justify-between items-center md:items-stretch relative w-full min-w-0">
        <div className="text-left pr-2 md:pr-12 min-w-0 flex-1">
          {/* Room Title */}
          <h3 className="font-serif text-[15px] sm:text-lg md:text-xl font-bold text-text-dark mb-1 md:mb-1.5 group-hover:text-gold transition-colors duration-300 truncate md:whitespace-normal">
            {name}
          </h3>
          
          {/* Room Price */}
          <p className="font-sans text-[11px] sm:text-xs md:text-xs text-muted-gray leading-tight">
            From <span className="font-semibold text-gold text-[13px] sm:text-sm md:text-sm">{currency} {price.toLocaleString()}</span> / Night
          </p>
        </div>

        {/* Circular Chevron Arrow Button */}
        <div className="relative md:absolute md:bottom-5 md:right-4 w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-gold group-hover:text-primary transition-colors duration-300 shadow-md flex-shrink-0 ml-2 md:ml-0">
          <ChevronRight className="w-4.5 h-4.5 md:w-5 md:h-5" />
        </div>
      </div>
    </div>
  );
}
