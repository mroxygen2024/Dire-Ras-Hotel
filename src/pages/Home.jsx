import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BookingCard from '../components/BookingCard';
import FeaturesSection from '../components/FeaturesSection';
import RoomsSection from '../components/RoomsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F2]">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Floating Booking Search Card */}
        <BookingCard />

        {/* 4. Features/Services Row */}
        <FeaturesSection />

        {/* 5. Rooms Section */}
        <RoomsSection />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
