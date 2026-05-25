import React, { useState } from 'react';
import { Calendar, User, ChevronDown } from 'lucide-react';

export default function BookingCard() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Adults, 0 Children');

  // Format date helper (e.g. "2026-05-26" -> "May 26, 2026")
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Select Date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    alert(`Checking availability:\nCheck-in: ${checkIn || 'Not selected'}\nCheck-out: ${checkOut || 'Not selected'}\nGuests: ${guests}`);
  };

  return (
    <div id="booking" className="relative z-30 max-w-7xl lg:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6 -mt-3 sm:-mt-5 lg:-mt-8">
      <form 
        onSubmit={handleCheckAvailability}
        className="bg-white rounded-2xl lg:rounded-xl shadow-xl border border-gray-100 p-5 sm:p-6 lg:p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-0"
        id="booking-form"
      >
        
        {/* Check-In Field */}
        <div className="relative flex-1 flex items-center justify-between py-3 lg:py-2 lg:px-6 border-b border-gray-100 lg:border-b-0 lg:border-r border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors rounded-lg lg:rounded-none">
          <div className="flex items-center space-x-4">
            <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
            <div className="flex flex-col text-left">
              <label className="text-[10px] font-bold tracking-widest text-muted-gray uppercase">
                CHECK-IN
              </label>
              <span className="text-sm font-semibold text-text-dark mt-0.5">
                {formatDate(checkIn)}
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-gray" />
          <input 
            type="date" 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            aria-label="Check-in Date"
            id="check-in-input"
          />
        </div>

        {/* Check-Out Field */}
        <div className="relative flex-1 flex items-center justify-between py-3 lg:py-2 lg:px-6 border-b border-gray-100 lg:border-b-0 lg:border-r border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors rounded-lg lg:rounded-none">
          <div className="flex items-center space-x-4">
            <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
            <div className="flex flex-col text-left">
              <label className="text-[10px] font-bold tracking-widest text-muted-gray uppercase">
                CHECK-OUT
              </label>
              <span className="text-sm font-semibold text-text-dark mt-0.5">
                {formatDate(checkOut)}
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-gray" />
          <input 
            type="date" 
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            aria-label="Check-out Date"
            id="check-out-input"
          />
        </div>

        {/* Guests Field */}
        <div className="relative flex-1 flex items-center justify-between py-3 lg:py-2 lg:px-6 lg:border-r border-gray-100 hover:bg-gray-50/50 transition-colors rounded-lg lg:rounded-none">
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 text-primary flex-shrink-0" />
            <div className="flex flex-col text-left">
              <label className="text-[10px] font-bold tracking-widest text-muted-gray uppercase">
                GUESTS
              </label>
              <span className="text-sm font-semibold text-text-dark mt-0.5">
                {guests}
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-gray" />
          <select 
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            aria-label="Guests Selection"
            id="guests-input"
          >
            <option value="1 Adult">1 Adult</option>
            <option value="2 Adults, 0 Children">2 Adults, 0 Children</option>
            <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
            <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
            <option value="3 Adults, 0 Children">3 Adults, 0 Children</option>
            <option value="4 Adults, 0 Children">4 Adults, 0 Children</option>
          </select>
        </div>

        {/* CTA Button */}
        <div className="lg:px-4 flex-shrink-0 flex items-center justify-center mt-2 lg:mt-0">
          <button 
            type="submit"
            className="w-full lg:w-auto bg-primary hover:bg-primary/95 text-white font-sans text-xs sm:text-sm font-bold tracking-wider px-8 py-4 sm:py-[18px] lg:py-4 rounded-lg lg:rounded-md transition-all duration-300 uppercase shadow-md hover:shadow-lg"
            id="check-availability-btn"
          >
            CHECK AVAILABILITY
          </button>
        </div>

      </form>
    </div>
  );
}
