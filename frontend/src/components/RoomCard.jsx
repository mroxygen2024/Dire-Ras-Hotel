import React from 'react';

export default function RoomCard({ room, loading, whatsappNumber }) {
  if (loading) {
    return (
      <div 
        className="bg-white rounded-2xl overflow-hidden shadow-md border border-gold-dark/10 flex flex-col h-full"
      >
        {/* Image Placeholder */}
        <div className="w-full aspect-[16/10] bg-gray-200 animate-pulse flex-shrink-0" />

        {/* Content Placeholder */}
        <div className="p-5 flex-1 flex flex-col justify-between items-center space-y-4">
          <div className="w-3/4 h-6 rounded bg-gray-200 animate-pulse mt-2 mb-4" />
          <div className="w-full h-11 rounded-lg bg-gray-200 animate-pulse mt-auto" />
        </div>
      </div>
    );
  }

  if (!room) return null;
  const { name, image } = room;

  const handleBookRoom = (e) => {
    e.stopPropagation();
    const digits = (whatsappNumber || '').replace(/\D+/g, '');
    if (!digits) return;
    const message = `Hello Dire Dawa Ras Hotel, I am interested in reserving the "${name}". Please let me know room availability.`;
    const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gold-dark/10 hover:border-gold-dark/30 transition-all duration-300 flex flex-col h-full group"
      id={`room-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
          loading="lazy"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90" />
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between items-stretch">
        
        {/* Room Details */}
        <div className="text-center mb-6">
          {/* Room Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary mb-2 group-hover:text-gold-dark transition-colors duration-300">
            {name}
          </h3>
        </div>

        {/* Large, Touch-Friendly Booking Button */}
        <button 
          onClick={handleBookRoom}
          className="w-full bg-primary hover:bg-gold text-white hover:text-primary border border-primary hover:border-gold font-sans text-xs font-bold tracking-widest py-3.5 rounded-xl transition-all duration-300 uppercase shadow-sm cursor-pointer"
        >
          BOOK ROOM NOW
        </button>

      </div>
    </div>
  );
}
