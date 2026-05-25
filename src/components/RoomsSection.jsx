import React, { useState } from 'react';
import RoomCard from './RoomCard';

export default function RoomsSection({ rooms }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!rooms || rooms.length === 0) return null;

  return (
    <section className="py-14 sm:py-16 lg:pt-10 lg:pb-12 bg-white" id="rooms">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 text-center">
        
        {/* Section Header */}
        <p className="text-gold font-sans text-xs sm:text-sm font-bold tracking-widest uppercase mb-2">
          OUR ROOMS
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold text-text-dark mb-10 sm:mb-16 lg:mb-8">
          Find Your Perfect Stay
        </h2>

        {/* Desktop & Tablet Layout (Grid) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="h-full">
              <RoomCard room={room} />
            </div>
          ))}
        </div>

        {/* Mobile Layout (Carousel/Slider) */}
        <div className="block md:hidden">
          {/* Card Frame */}
          <div className="w-full max-w-sm mx-auto transition-all duration-500 ease-in-out transform">
            <RoomCard room={rooms[activeIndex]} />
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-2.5 mt-6" id="rooms-carousel-dots">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-primary w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to room ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
