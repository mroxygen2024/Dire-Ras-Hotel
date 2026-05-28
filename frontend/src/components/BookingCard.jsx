import React, { useState, useRef, useEffect } from 'react';
import { Calendar, User, ChevronDown, Plus, Minus } from 'lucide-react';

export default function BookingCard({ loading, whatsappNumber }) {
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
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const guestDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target)) {
        setShowGuestDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    const digits = (whatsappNumber || '').replace(/\D+/g, '');
    if (!digits) return;
    let message = "Hello Dire Dawa Ras Hotel, I would like to reserve a room.";
    const details = [];
    if (checkIn) details.push(`Check-in: ${formatDate(checkIn)}`);
    if (checkOut) details.push(`Check-out: ${formatDate(checkOut)}`);
    details.push(`Guests: ${adults} ${adults === 1 ? 'Adult' : 'Adults'}, ${children} ${children === 1 ? 'Child' : 'Children'}`);
    
    if (details.length > 0) {
      message += ` (${details.join(', ')})`;
    }
    
    const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
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
        <div 
          ref={guestDropdownRef}
          className="relative flex-1 flex items-center justify-between py-3 lg:py-2 lg:px-6 lg:border-r border-gray-100 hover:bg-gray-50/50 transition-colors rounded-lg lg:rounded-none cursor-pointer"
          onClick={() => setShowGuestDropdown(!showGuestDropdown)}
        >
          <div className="flex items-center space-x-4 pointer-events-none">
            <User className="w-6 h-6 text-primary flex-shrink-0" />
            <div className="flex flex-col text-left">
              <label className="text-[10px] font-bold tracking-widest text-muted-gray uppercase">
                GUESTS
              </label>
              <span className="text-sm font-semibold text-text-dark mt-0.5">
                {adults} {adults === 1 ? 'Adult' : 'Adults'}, {children} {children === 1 ? 'Child' : 'Children'}
              </span>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-gray transition-transform duration-200 pointer-events-none ${showGuestDropdown ? 'rotate-180' : ''}`} />
          
          {/* Guest Dropdown Popup */}
          {showGuestDropdown && (
            <div 
              className="absolute top-full left-0 lg:left-auto lg:right-0 mt-2 w-full lg:w-[300px] bg-white rounded-xl shadow-xl border border-gray-100 p-5 z-50 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-5">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-text-dark">Adults</span>
                    <span className="text-xs text-muted-gray">Ages 13 or above</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-current"
                      disabled={adults <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center text-sm font-semibold text-text-dark">{adults}</span>
                    <button 
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-text-dark">Children</span>
                    <span className="text-xs text-muted-gray">Ages 0-12</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-current"
                      disabled={children <= 0}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center text-sm font-semibold text-text-dark">{children}</span>
                    <button 
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
