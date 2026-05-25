import React, { useState, useEffect } from 'react';
import { getHotelInfo, getNavLinks, getServices, getRooms } from '../services/hotelService';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BookingCard from '../components/BookingCard';
import FeaturesSection from '../components/FeaturesSection';
import RoomsSection from '../components/RoomsSection';
import Footer from '../components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [hotelData, setHotelData] = useState({
    info: null,
    links: [],
    servicesList: [],
    roomsList: [],
  });

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [info, links, servicesList, roomsList] = await Promise.all([
          getHotelInfo(),
          getNavLinks(),
          getServices(),
          getRooms(),
        ]);
        
        setHotelData({
          info,
          links,
          servicesList,
          roomsList,
        });
      } catch (err) {
        console.error("Failed to load hotel data from mock API:", err);
      } finally {
        // Keep loading screen visible for at least 800ms for visual premium feel
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    loadAllData();
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          if (targetId === '') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center text-white" id="app-loading-screen">
        {/* Luxury Monogram with slow pulse */}
        <div className="relative animate-pulse duration-1000 mb-6">
          <svg className="w-20 h-20 text-gold" viewBox="0 0 100 100" fill="currentColor">
            <path d="M20,35 L35,48 L50,25 L65,48 L80,35 L75,70 L25,70 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="32" r="3" />
            <circle cx="50" cy="22" r="3" />
            <circle cx="80" cy="32" r="3" />
            <text x="50" y="62" fontSize="24" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle" fill="currentColor">R</text>
          </svg>
        </div>
        
        {/* Title & Tagline with delay fade */}
        <h2 className="font-serif text-2xl tracking-[0.2em] text-gold uppercase font-bold text-center px-4">
          DIREDAWA RAS HOTEL
        </h2>
        <p className="font-sans text-xs tracking-widest text-gold/60 uppercase mt-2">
          Comfort. Hospitality. Diredawa.
        </p>

        {/* Loading Spinner ring */}
        <div className="mt-8 w-6 h-6 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F2]">
      {/* 1. Navbar */}
      <Navbar hotelInfo={hotelData.info} navLinks={hotelData.links} />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <HeroSection hotelInfo={hotelData.info} />

        {/* 3. Floating Booking Search Card */}
        <BookingCard />

        {/* 4. Features/Services Row */}
        <FeaturesSection services={hotelData.servicesList} />

        {/* 5. Rooms Section */}
        <RoomsSection rooms={hotelData.roomsList} />
      </main>

      {/* 6. Footer */}
      <Footer hotelInfo={hotelData.info} navLinks={hotelData.links} />
    </div>
  );
}
