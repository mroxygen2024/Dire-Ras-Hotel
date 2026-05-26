import React, { useState, useRef } from 'react';
import { Calendar, User, ChevronDown } from 'lucide-react';

export default function BookingCard({ loading }) {
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [checkIn, setCheckIn] = useState(getTodayString());
  const [checkOut, setCheckOut] = useState(getTomorrowString());
  const [guests, setGuests] = useState('2 Adults, 0 Children');

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  // Format date helper (e.g. "2026-05-26" -> "May 26, 2026")
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Select Date';
    // Split to avoid timezone shift issues with Date parsing
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const triggerPicker = (ref) => {
    if (ref.current) {
      try {
        ref.current.showPicker();
      } catch (err) {
        // Fallback for older browsers
        ref.current.click();
      }
    }
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    let message = "Hello Dire Dawa Ras Hotel, I would like to reserve a room.";
    const details = [];
    if (checkIn) details.push(`Check-in: ${formatDate(checkIn)}`);
    if (checkOut) details.push(`Check-out: ${formatDate(checkOut)}`);
    if (guests) details.push(`Guests: ${guests}`);
    
    if (details.length > 0) {
      message += ` (${details.join(', ')})`;
    }
    
    const url = `https://wa.me/251968094406?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div id="booking" className="relative z-30 max-w-7xl lg:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6 -mt-3 sm:-mt-5 lg:-mt-8">
        <div className="bg-white rounded-2xl lg:rounded-xl shadow-xl border border-gray-100 p-5 sm:p-6 lg:p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-0 h-auto">
          
          {/* Check-in input placeholder */}
          <div className="flex-1 lg:px-4 py-2 lg:py-0 flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
            <div className="flex flex-col space-y-1.5 flex-grow">
              <div className="w-16 h-3 rounded bg-gray-200 animate-pulse" />
              <div className="w-28 h-5 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>

          <div className="hidden lg:block w-[1px] h-10 bg-gray-100" />

          {/* Check-out input placeholder */}
          <div className="flex-1 lg:px-4 py-2 lg:py-0 flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
            <div className="flex flex-col space-y-1.5 flex-grow">
              <div className="w-16 h-3 rounded bg-gray-200 animate-pulse" />
              <div className="w-28 h-5 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>

          <div className="hidden lg:block w-[1px] h-10 bg-gray-100" />

          {/* Guests input placeholder */}
          <div className="flex-1 lg:px-4 py-2 lg:py-0 flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
            <div className="flex flex-col space-y-1.5 flex-grow">
              <div className="w-12 h-3 rounded bg-gray-200 animate-pulse" />
              <div className="w-32 h-5 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>

          {/* Submit button placeholder */}
          <div className="lg:px-4 flex-shrink-0 flex items-center justify-center mt-2 lg:mt-0">
            <div className="w-full lg:w-44 h-12 rounded bg-gray-200 animate-pulse" />
          </div>

        </div>
      </div>
    );
  }

  return (
    <div id="booking" className="relative z-30 max-w-7xl lg:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6 -mt-3 sm:-mt-5 lg:-mt-8">
      <form 
        onSubmit={handleCheckAvailability}
        className="bg-white rounded-2xl lg:rounded-xl shadow-xl border border-gray-100 p-5 sm:p-6 lg:p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-0"
        id="booking-form"
      >
        
        {/* Check-In Field */}
        <div 
          onClick={() => triggerPicker(checkInRef)}
          className="relative flex-1 flex items-center justify-between py-3 lg:py-2 lg:px-6 border-b border-gray-100 lg:border-b-0 lg:border-r border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors rounded-lg lg:rounded-none cursor-pointer"
        >
          <div className="flex items-center space-x-4 pointer-events-none">
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
          <ChevronDown className="w-4 h-4 text-muted-gray pointer-events-none" />
          <input 
            ref={checkInRef}
            type="date" 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="absolute pointer-events-none opacity-0 w-0 h-0"
            aria-label="Check-in Date"
            id="check-in-input"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Check-Out Field */}
        <div 
          onClick={() => triggerPicker(checkOutRef)}
          className="relative flex-1 flex items-center justify-between py-3 lg:py-2 lg:px-6 border-b border-gray-100 lg:border-b-0 lg:border-r border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors rounded-lg lg:rounded-none cursor-pointer"
        >
          <div className="flex items-center space-x-4 pointer-events-none">
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
          <ChevronDown className="w-4 h-4 text-muted-gray pointer-events-none" />
          <input 
            ref={checkOutRef}
            type="date" 
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
            className="absolute pointer-events-none opacity-0 w-0 h-0"
            aria-label="Check-out Date"
            id="check-out-input"
            onClick={(e) => e.stopPropagation()}
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
            className="w-full lg:w-auto bg-primary hover:bg-primary/95 text-white font-sans text-xs sm:text-sm font-bold tracking-wider px-8 py-4 sm:py-[18px] lg:py-4 rounded-lg lg:rounded-md transition-all duration-300 uppercase shadow-md hover:shadow-lg cursor-pointer"
            id="check-availability-btn"
          >
            CHECK AVAILABILITY
          </button>
        </div>

      </form>
    </div>
  );
}
