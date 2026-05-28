import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  getHotelInfo, 
  getNavLinks, 
  getServices, 
  getRooms,
  getHeroData,
  getHeritageIntro,
  getAboutPageData,
  getWhyStayData,
  getReviewsData,
  getContactPageData 
} from '../services/hotelService';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BookingCard from '../components/BookingCard';
import FeaturesSection from '../components/FeaturesSection';
import RoomsSection from '../components/RoomsSection';
import HeritageIntro from '../components/HeritageIntro';
import AboutHeritage from '../components/AboutHeritage';
import WhyStaySection from '../components/WhyStaySection';
import ReviewsSection from '../components/ReviewsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';

export default function Home() {
  const [activePage, setActivePage] = useState('home');
  const { data: hotelData, isLoading } = useQuery({
    queryKey: ['public-home-data'],
    queryFn: async () => {
      const [
        info,
        links,
        servicesList,
        roomsList,
        hero,
        heritage,
        about,
        whyStay,
        reviews,
        contact,
      ] = await Promise.all([
        getHotelInfo(),
        getNavLinks(),
        getServices(),
        getRooms(),
        getHeroData(),
        getHeritageIntro(),
        getAboutPageData(),
        getWhyStayData(),
        getReviewsData(),
        getContactPageData(),
      ]);

      return {
        info,
        links,
        servicesList,
        roomsList,
        hero,
        heritage,
        about,
        whyStay,
        reviews,
        contact,
      };
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  });

  const loading = isLoading;

  const safeHotelData = hotelData || {
    info: null,
    links: [],
    servicesList: [],
    roomsList: [],
    hero: null,
    heritage: null,
    about: null,
    whyStay: null,
    reviews: null,
    contact: null,
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F2] font-sans overflow-x-hidden antialiased">
      {/* 1. Navbar (Orchestrating Page Navigation) */}
      <Navbar 
        hotelInfo={safeHotelData.info} 
        navLinks={safeHotelData.links} 
        activePage={activePage}
        setActivePage={setActivePage}
        loading={loading} 
      />

      <main className="flex-grow">
        
        {/* VIEW 1: HOME PAGE */}
        {activePage === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <HeroSection
              heroData={safeHotelData.hero}
              loading={loading}
              whatsappNumber={safeHotelData.info?.whatsappNumber}
            />

            {/* Booking System */}
            <BookingCard loading={loading} whatsappNumber={safeHotelData.info?.whatsappNumber} />

            {/* Services/Features List */}
            <FeaturesSection services={safeHotelData.servicesList} loading={loading} />

            {/* Short Heritage Introduction */}
            <HeritageIntro 
              heritageData={safeHotelData.heritage} 
              setActivePage={setActivePage} 
              loading={loading} 
            />

            {/* Featured Rooms Preview */}
            <RoomsSection
              rooms={safeHotelData.roomsList}
              loading={loading}
              whatsappNumber={safeHotelData.info?.whatsappNumber}
            />

            {/* Why Stay Grid */}
            <WhyStaySection whyStayData={safeHotelData.whyStay} loading={loading} />

            {/* Guest Experiences / Reviews */}
            <ReviewsSection reviewsData={safeHotelData.reviews} loading={loading} />
          </div>
        )}

        {/* VIEW 2: DEDICATED ROOMS PAGE */}
        {activePage === 'rooms' && (
          <div className="animate-fade-in pt-6">
            <BookingCard loading={loading} whatsappNumber={safeHotelData.info?.whatsappNumber} />
            <RoomsSection
              rooms={safeHotelData.roomsList}
              loading={loading}
              whatsappNumber={safeHotelData.info?.whatsappNumber}
            />
          </div>
        )}

        {/* VIEW 3: ABOUT & HERITAGE STORYTELLING PAGE */}
        {activePage === 'about' && (
          <div className="animate-fade-in">
            <AboutHeritage aboutData={safeHotelData.about} loading={loading} />
          </div>
        )}

        {/* VIEW 4: CONTACT & INQUIRIES PAGE */}
        {activePage === 'contact' && (
          <div className="animate-fade-in">
            <ContactSection 
              contactData={safeHotelData.contact} 
              hotelInfo={safeHotelData.info} 
              loading={loading} 
            />
          </div>
        )}

      </main>

      {/* 5. Structured Footer */}
      <Footer 
        hotelInfo={safeHotelData.info} 
        navLinks={safeHotelData.links} 
        activePage={activePage}
        setActivePage={setActivePage}
        loading={loading} 
      />

      {/* 6. Premium Floating WhatsApp Button */}
      {!loading && <WhatsAppFloatingButton whatsappNumber={safeHotelData.info?.whatsappNumber} />}
    </div>
  );
}
