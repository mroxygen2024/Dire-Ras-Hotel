import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactSection({ loading }) {
  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-[#F8F6F2] border-t border-gold/10" id="contact-info">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Info Skeleton */}
            <div className="lg:col-span-7 flex flex-col space-y-8">
              <div className="space-y-3">
                <div className="w-24 h-4 rounded bg-gray-200 animate-pulse" />
                <div className="w-64 h-8 rounded bg-gray-200 animate-pulse" />
                <div className="w-16 h-[2px] bg-gold/30" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white border border-gold/10 p-6 rounded-2xl flex flex-col space-y-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                    <div className="w-28 h-5 rounded bg-gray-200 animate-pulse" />
                    <div className="w-full h-4 rounded bg-gray-200 animate-pulse" />
                    <div className="w-3/4 h-3 rounded bg-gray-200 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Map Skeleton */}
            <div className="lg:col-span-5 h-[360px] lg:h-auto lg:min-h-[420px] rounded-2xl bg-gray-200 animate-pulse" />

          </div>
        </div>
      </section>
    );
  }

  const contacts = [
    {
      id: 'location',
      title: 'Our Address',
      icon: <MapPin className="w-5 h-5 text-gold" />,
      content: 'HVQ5+FGV Hotel, Dire Dawa 1487, Ethiopia',
      subtext: 'Heart of Dire Dawa',
      actionLabel: 'Get Directions',
      actionUrl: 'https://maps.google.com/?q=Dire+Dawa+Ras+Hotel',
    },
    {
      id: 'phone',
      title: 'Reception Desk',
      icon: <Phone className="w-5 h-5 text-gold" />,
      content: '+251 25 111 3255',
      content2: '0915 32 00 33',
      subtext: 'Available 24/7 for bookings',
      actionLabel: 'Call Reception',
      actionUrl: 'tel:+251251113255',
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Booking',
      icon: (
        <svg viewBox="0 0 100 100" className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="43" strokeWidth="4" strokeDasharray="3 3" />
          <path d="M50 42 C38.4 42 29 50.4 29 60.8 C29 64.6 30.3 68.2 32.6 71 L30 79 L38.5 76.5 C41.8 78.4 45.8 79.5 50 79.5 C61.6 79.5 71 71.1 71 60.8 C71 50.4 61.6 42 50 42 Z" strokeWidth="5" />
        </svg>
      ),
      content: '+251 968 094 406',
      subtext: 'Direct instant chat',
      actionLabel: 'Chat on WhatsApp',
      actionUrl: 'https://wa.me/251968094406?text=Hello%20Dire%20Dawa%20Ras%20Hotel%2C%20I%20would%20like%20to%20reserve%20a%20room.',
    },
    {
      id: 'email',
      title: 'Email Queries',
      icon: <Mail className="w-5 h-5 text-gold" />,
      content: 'ddrashotel1@gmail.com',
      subtext: 'For business & group offers',
      actionLabel: 'Send an Email',
      actionUrl: 'mailto:ddrashotel1@gmail.com',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8F6F2] border-t border-gold/10" id="contact-info">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Section Heading */}
            <div className="mb-8">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gold uppercase block mb-2">
                GET IN TOUCH
              </span>
              <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-primary leading-tight mb-3">
                Contact & Location
              </h2>
              <div className="w-16 h-[1.5px] bg-gold opacity-90" />
            </div>

            {/* Grid of Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contacts.map((c) => (
                <div 
                  key={c.id}
                  className="group bg-white border border-gold/10 hover:border-gold/30 hover:shadow-lg p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <div className="flex flex-col space-y-4">
                    {/* Circle Icon Badge */}
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-gold/20 group-hover:bg-primary group-hover:text-gold transition-colors duration-300">
                      {c.icon}
                    </div>
                    {/* Header */}
                    <div>
                      <h3 className="font-serif text-[18px] font-bold text-primary">
                        {c.title}
                      </h3>
                      <p className="text-[10px] text-primary/50 tracking-wider uppercase mt-0.5">
                        {c.subtext}
                      </p>
                    </div>
                    {/* Content text */}
                    <div className="text-sm text-primary/80 font-medium space-y-0.5 break-all">
                      <p>{c.content}</p>
                      {c.content2 && <p>{c.content2}</p>}
                    </div>
                  </div>

                  {/* Call-to-action Link */}
                  <div className="mt-5 pt-4 border-t border-gold/5">
                    <a 
                      href={c.actionUrl}
                      target={c.id !== 'phone' && c.id !== 'email' ? "_blank" : undefined}
                      rel={c.id !== 'phone' && c.id !== 'email' ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center text-xs font-bold text-gold hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-gold py-0.5"
                    >
                      <span className="mr-1.5 uppercase tracking-wider">{c.actionLabel}</span>
                      <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Google Map Embedded */}
          <div className="lg:col-span-5 flex flex-col justify-stretch">
            <div className="relative w-full h-[360px] lg:h-full lg:min-h-[420px] rounded-2xl overflow-hidden border-2 border-gold/20 shadow-xl group">
              {/* Decorative Location Overlay Badge */}
              <div className="absolute top-4 left-4 z-20 bg-primary/95 backdrop-blur-sm border border-gold/50 px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2.5">
                <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 100 100" fill="currentColor">
                  {/* Elegant Crown */}
                  <path d="M 38,32 H 62 V 34 H 38 Z" />
                  <path d="M 39,29 H 61 V 30 H 39 Z" />
                  <path d="M 39,29 L 34,22 C 34,22 38,24 41,26 L 43,23 C 43,23 46,24 48,26 L 50,16 C 50,16 51,24 52,26 L 57,23 C 57,23 58,24 59,26 L 66,22 C 66,22 62,24 61,29 Z" />
                  {/* Crown Diamonds */}
                  <polygon points="50,12 52.5,15 50,18 47.5,15" />
                  <polygon points="34,18 36.5,21 34,24 31.5,21" />
                  <polygon points="66,18 68.5,21 66,24 63.5,21" />
                  <polygon points="43,19 45.5,22 43,25 40.5,22" />
                  <polygon points="57,19 59.5,22 57,25 54.5,22" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="font-serif text-[11px] font-bold tracking-widest text-gold uppercase">DIRE DAWA RAS HOTEL</span>
                  <span className="text-[8px] text-white/70 tracking-wider">Established Since 1964 EC</span>
                </div>
              </div>

              {/* Map Iframe */}
              <iframe
                title="Google Maps Location of Dire Dawa Ras Hotel"
                src="https://maps.google.com/maps?q=Dire%20Dawa%20Ras%20Hotel,%20Dire%20Dawa,%20Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.1) contrast(1.05)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
