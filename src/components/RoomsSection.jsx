import React, { useState } from 'react';
import RoomCard from './RoomCard';

const roomsData = [
  {
    title: 'Deluxe Room',
    price: 'ETB 3,200',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Executive Suite',
    price: 'ETB 5,500',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Standard Twin Room',
    price: 'ETB 2,800',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
  },
];

export default function RoomsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-14 sm:py-16 lg:py-24 bg-white" id="rooms">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        
        {/* Section Header */}
        <p className="text-gold font-sans text-xs sm:text-sm font-bold tracking-widest uppercase mb-2">
          OUR ROOMS
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark mb-10 sm:mb-16">
          Find Your Perfect Stay
        </h2>

        {/* Desktop & Tablet Layout (Grid) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsData.map((room, index) => (
            <div key={index} className="h-full">
              <RoomCard room={room} />
            </div>
          ))}
        </div>

        {/* Mobile Layout (Carousel/Slider) */}
        <div className="block md:hidden">
          {/* Card Frame */}
          <div className="w-full max-w-sm mx-auto transition-all duration-500 ease-in-out transform">
            <RoomCard room={roomsData[activeIndex]} />
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-2.5 mt-6" id="rooms-carousel-dots">
            {roomsData.map((_, index) => (
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
