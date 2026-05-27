import React from 'react';
import RoomCard from './RoomCard';

export default function RoomsSection({ rooms, loading }) {
  if (!loading && (!rooms || rooms.length === 0)) return null;

  const displayRooms = loading 
    ? [{ id: 'sk1' }, { id: 'sk2' }, { id: 'sk3' }] 
    : rooms;

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gold/10" id="rooms">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          {loading ? (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-64 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-16 h-[2px] bg-gold/30" />
            </div>
          ) : (
            <>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-gold-dark uppercase block mb-3">
                OUR ROOMS & SUITES
              </span>
              <h2 className="font-serif text-3xl sm:text-[40px] font-bold text-primary leading-tight mb-3">
                Find Your Perfect Stay
              </h2>
              <p className="text-sm text-primary/70 max-w-md font-sans font-light">
                Relax in beautifully appointed rooms blending historic charm with standard modern comforts.
              </p>
              <div className="w-16 h-[1.5px] bg-gold opacity-90 mt-5" />
            </>
          )}
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
          {displayRooms.map((room) => (
            <div key={room.id} className="h-full">
              <RoomCard room={room} loading={loading} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
