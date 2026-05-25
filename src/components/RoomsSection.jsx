import React, { useState } from 'react';
import RoomCard from './RoomCard';

export default function RoomsSection({ rooms, loading }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!loading && (!rooms || rooms.length === 0)) return null;

  const displayRooms = loading 
    ? [{ id: 'sk1' }, { id: 'sk2' }, { id: 'sk3' }] 
    : rooms;

  return (
    <section className="py-10 sm:py-12 lg:pt-10 lg:pb-12 bg-white" id="rooms">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6 text-center">
        
        {/* Section Header */}
        {loading ? (
          <div className="flex flex-col items-center mb-6 sm:mb-8 lg:mb-8">
            <div className="w-24 h-3 rounded bg-gray-200 animate-pulse mb-3.5" />
            <div className="w-56 h-8 rounded bg-gray-200 animate-pulse" />
          </div>
        ) : (
          <>
            <p className="text-gold font-sans text-xs sm:text-sm font-bold tracking-widest uppercase mb-2">
              OUR ROOMS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold text-text-dark mb-6 sm:mb-8 lg:mb-8">
              Find Your Perfect Stay
            </h2>
          </>
        )}

        {/* Desktop & Tablet Layout (Grid) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {displayRooms.map((room) => (
            <div key={room.id} className="h-full">
              <RoomCard room={room} loading={loading} />
            </div>
          ))}
        </div>

        {/* Mobile Layout (Carousel/Slider) */}
        <div className="block md:hidden">
          {/* Card Frame */}
          <div className="w-full max-w-sm mx-auto transition-all duration-500 ease-in-out transform">
            <RoomCard room={displayRooms[activeIndex]} loading={loading} />
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-2.5 mt-6" id="rooms-carousel-dots">
            {displayRooms.map((_, index) => (
              <button
                key={index}
                onClick={() => !loading && setActiveIndex(index)}
                disabled={loading}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  loading 
                    ? 'bg-gray-200 animate-pulse' 
                    : activeIndex === index ? 'bg-primary w-6' : 'bg-gray-300'
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
