import React, { useState, useEffect } from 'react';
import { getHotelInfo, getNavLinks, getServices, getRooms } from '../services/hotelService';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BookingCard from '../components/BookingCard';
import FeaturesSection from '../components/FeaturesSection';
import RoomsSection from '../components/RoomsSection';
import Footer from '../components/Footer';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';

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

  return (
    <div className={`flex flex-col min-h-screen bg-[#F8F6F2] ${!loading ? 'animate-fade-in' : ''}`} key={loading ? 'loading' : 'ready'}>
      {/* 1. Navbar */}
      <Navbar hotelInfo={hotelData.info} navLinks={hotelData.links} loading={loading} />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <HeroSection hotelInfo={hotelData.info} loading={loading} />

        {/* 3. Floating Booking Search Card */}
        <BookingCard loading={loading} />

        {/* 4. Features/Services Row */}
        <FeaturesSection services={hotelData.servicesList} loading={loading} />

        {/* 5. Rooms Section */}
        <RoomsSection rooms={hotelData.roomsList} loading={loading} />
      </main>

      {/* 6. Footer */}
      <Footer hotelInfo={hotelData.info} navLinks={hotelData.links} loading={loading} />

      {/* 7. Premium Floating WhatsApp Button */}
      {!loading && <WhatsAppFloatingButton />}
    </div>
  );
}
