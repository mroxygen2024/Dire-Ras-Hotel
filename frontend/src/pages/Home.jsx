import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('home');
  const [hotelData, setHotelData] = useState({
    info: null,
    links: [],
    servicesList: [],
    roomsList: [],
    hero: null,
    heritage: null,
    about: null,
    whyStay: null,
    reviews: null,
    contact: null
  });

  useEffect(() => {
    const loadAllData = async () => {
      try {
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
          contact
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
          getContactPageData()
        ]);
        
        setHotelData({
          info,
          links,
          servicesList,
          roomsList,
          hero,
          heritage,
          about,
          whyStay,
          reviews,
          contact
        });
      } catch (err) {
        console.error("Failed to load hotel data from mock API:", err);
      } finally {
        // Keep loading screen visible briefly for visual premium feel
        setTimeout(() => {
          setLoading(false);
        }, 600);
      }
    };

    loadAllData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F2] font-sans overflow-x-hidden antialiased">
      {/* 1. Navbar (Orchestrating Page Navigation) */}
      <Navbar 
        hotelInfo={hotelData.info} 
        navLinks={hotelData.links} 
        activePage={activePage}
        setActivePage={setActivePage}
        loading={loading} 
      />

      <main className="flex-grow">
        
        {/* VIEW 1: HOME PAGE */}
        {activePage === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <HeroSection heroData={hotelData.hero} loading={loading} />

            {/* Booking System */}
            <BookingCard loading={loading} />

            {/* Services/Features List */}
            <FeaturesSection services={hotelData.servicesList} loading={loading} />

            {/* Short Heritage Introduction */}
            <HeritageIntro 
              heritageData={hotelData.heritage} 
              setActivePage={setActivePage} 
              loading={loading} 
            />

            {/* Featured Rooms Preview */}
            <RoomsSection rooms={hotelData.roomsList} loading={loading} />

            {/* Why Stay Grid */}
            <WhyStaySection whyStayData={hotelData.whyStay} loading={loading} />

            {/* Guest Experiences / Reviews */}
            <ReviewsSection reviewsData={hotelData.reviews} loading={loading} />
          </div>
        )}

        {/* VIEW 2: DEDICATED ROOMS PAGE */}
        {activePage === 'rooms' && (
          <div className="animate-fade-in pt-6">
            <BookingCard loading={loading} />
            <RoomsSection rooms={hotelData.roomsList} loading={loading} />
          </div>
        )}

        {/* VIEW 3: ABOUT & HERITAGE STORYTELLING PAGE */}
        {activePage === 'about' && (
          <div className="animate-fade-in">
            <AboutHeritage aboutData={hotelData.about} loading={loading} />
          </div>
        )}

        {/* VIEW 4: CONTACT & INQUIRIES PAGE */}
        {activePage === 'contact' && (
          <div className="animate-fade-in">
            <ContactSection 
              contactData={hotelData.contact} 
              hotelInfo={hotelData.info} 
              loading={loading} 
            />
          </div>
        )}

      </main>

      {/* 5. Structured Footer */}
      <Footer 
        hotelInfo={hotelData.info} 
        navLinks={hotelData.links} 
        activePage={activePage}
        setActivePage={setActivePage}
        loading={loading} 
      />

      {/* 6. Premium Floating WhatsApp Button */}
      {!loading && <WhatsAppFloatingButton />}
    </div>
  );
}
