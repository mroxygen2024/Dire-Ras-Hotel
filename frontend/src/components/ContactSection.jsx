import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function ContactSection({ contactData, hotelInfo, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const whatsappDigits = (hotelInfo?.whatsappNumber || '').replace(/\D+/g, '');
  const defaultWhatsappUrl = whatsappDigits ? `https://wa.me/${whatsappDigits}` : '';

  const pageData = {
    title: contactData?.title || 'Connect With Us',
    subtitle: contactData?.subtitle || 'Plan Your Visit to Our Historic Oasis',
    introText:
      contactData?.introText ||
      'Whether you wish to book a room, plan an unforgettable traditional wedding, or host a corporate event in Dire Dawa, our experienced hospitality team is here to assist. Fill out the contact form below or reach out via WhatsApp or call us directly.',
    form: {
      title: contactData?.formTitle || 'Send a Message',
      nameLabel: contactData?.nameLabel || 'Full Name',
      emailLabel: contactData?.emailLabel || 'Email Address',
      phoneLabel: contactData?.phoneLabel || 'Phone Number',
      msgLabel: contactData?.msgLabel || 'Message / Booking Inquiry',
      submitBtn: contactData?.submitBtn || 'Submit via WhatsApp Chat',
    },
  };

  const whatsappUrlBase = contactData?.whatsappLink || defaultWhatsappUrl;
  const mapEmbedSrc =
    hotelInfo?.mapEmbedUrl ||
    'https://maps.google.com/maps?q=Dire%20Dawa%20Ras%20Hotel,%20Dire%20Dawa,%20Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!whatsappUrlBase) return;
    
    // Construct rich text message for WhatsApp submission
    let messageText = `Hello Dire Dawa Ras Hotel,\n\nI have a new inquiry:\n`;
    messageText += `• Name: ${formData.name}\n`;
    if (formData.email) messageText += `• Email: ${formData.email}\n`;
    if (formData.phone) messageText += `• Phone: ${formData.phone}\n`;
    messageText += `\nMessage:\n"${formData.message}"`;

    const encodedText = encodeURIComponent(messageText);
    const separator = whatsappUrlBase.includes('?') ? '&' : '?';
    const whatsappUrl = `${whatsappUrlBase}${separator}text=${encodedText}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-[#F8F6F2] border-t border-gold/10" id="contact">
        <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
          <div className="flex flex-col items-center text-center mb-16 animate-pulse">
            <div className="w-24 h-4 bg-gray-200 rounded mb-4" />
            <div className="w-80 h-10 bg-gray-200 rounded mb-4" />
            <div className="w-96 h-4 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 h-96 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="lg:col-span-6 h-96 bg-gray-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  const defaultContacts = [
    {
      id: 'location',
      title: 'Our Address',
      icon: <MapPin className="w-5 h-5 text-gold-dark" />,
      content: hotelInfo?.address || 'HVQ5+FGV Hotel, Dire Dawa 1487, Ethiopia',
      subtext: 'Heart of Dire Dawa',
      actionLabel: 'Get Directions',
      actionUrl: 'https://maps.google.com/?q=Dire+Dawa+Ras+Hotel',
    },
    {
      id: 'phone',
      title: 'Reception Desk',
      icon: <Phone className="w-5 h-5 text-gold-dark" />,
      content: hotelInfo?.phone || '+251 25 111 3255',
      content2: hotelInfo?.phone2 || '0915 32 00 33',
      subtext: 'Available 24/7 for bookings',
      actionLabel: 'Call Reception',
      actionUrl: `tel:${(hotelInfo?.phone || '+251251113255').replace(/\s+/g, '')}`,
    },
    {
      id: 'email',
      title: 'Email Queries',
      icon: <Mail className="w-5 h-5 text-gold-dark" />,
      content: hotelInfo?.email || 'ddrashotel1@gmail.com',
      subtext: 'For business & group offers',
      actionLabel: 'Send an Email',
      actionUrl: `mailto:${hotelInfo?.email || 'ddrashotel1@gmail.com'}`,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8F6F2] border-t border-gold/10" id="contact">
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-gold-dark uppercase block mb-3">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-3xl sm:text-[40px] font-bold text-primary leading-tight mb-4">
            {pageData.title}
          </h2>
          <p className="text-sm sm:text-base text-primary/70 leading-relaxed font-sans font-light">
            {pageData.introText}
          </p>
          <div className="w-16 h-[1.5px] bg-gold opacity-90 mt-5" />
        </div>

        {/* Contact Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {defaultContacts.map((c) => (
            <div 
              key={c.id}
              className="bg-white border border-gold-dark/10 hover:border-gold-dark/30 hover:shadow-lg p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div className="flex flex-col space-y-4">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-gold-dark/20">
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-primary">
                    {c.title}
                  </h3>
                  <p className="text-[10px] text-primary/50 tracking-wider uppercase mt-0.5">
                    {c.subtext}
                  </p>
                </div>
                <div className="text-sm text-primary/80 font-medium space-y-0.5 break-words">
                  <p>{c.content}</p>
                  {c.content2 && <p>{c.content2}</p>}
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gold-dark/10">
                <a 
                  href={c.actionUrl}
                  target={c.id === 'location' ? "_blank" : undefined}
                  rel={c.id === 'location' ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center text-xs font-bold text-gold-dark hover:text-primary transition-colors duration-300 focus:outline-none"
                >
                  <span className="mr-1.5 uppercase tracking-wider">{c.actionLabel}</span>
                  <span className="text-[14px]">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid: Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Premium Contact Form */}
          <div className="lg:col-span-7 flex flex-col justify-stretch">
            <div className="bg-white rounded-2xl border border-gold-dark/10 shadow-xl p-6 sm:p-8 flex flex-col h-full justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">
                  {pageData.form.title}
                </h3>
                <p className="text-xs sm:text-sm text-primary/60 font-light mb-6">
                  Fill out details to text our front desk reservation system instantly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
                {/* Name */}
                <div className="flex flex-col text-left">
                  <label htmlFor="form-name" className="text-[10px] font-bold tracking-widest text-primary/80 uppercase mb-2">
                    {pageData.form.nameLabel} <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-[#F8F6F2] border border-gold-dark/15 focus:border-gold-dark rounded-xl px-4 py-3 text-sm text-primary placeholder-primary/40 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email and Phone (2 Columns on tablet/desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col text-left">
                    <label htmlFor="form-email" className="text-[10px] font-bold tracking-widest text-primary/80 uppercase mb-2">
                      {pageData.form.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="w-full bg-[#F8F6F2] border border-gold-dark/15 focus:border-gold-dark rounded-xl px-4 py-3 text-sm text-primary placeholder-primary/40 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <label htmlFor="form-phone" className="text-[10px] font-bold tracking-widest text-primary/80 uppercase mb-2">
                      {pageData.form.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      id="form-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full bg-[#F8F6F2] border border-gold-dark/15 focus:border-gold-dark rounded-xl px-4 py-3 text-sm text-primary placeholder-primary/40 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col text-left">
                  <label htmlFor="form-message" className="text-[10px] font-bold tracking-widest text-primary/80 uppercase mb-2">
                    {pageData.form.msgLabel} <span className="text-gold-dark">*</span>
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we assist you with rooms, wedding venues, or conference requests?"
                    className="w-full bg-[#F8F6F2] border border-gold-dark/15 focus:border-gold-dark rounded-xl px-4 py-3 text-sm text-primary placeholder-primary/40 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/95 text-white font-sans text-xs sm:text-sm font-bold tracking-wider py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{pageData.form.submitBtn}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Google Map Container */}
          <div className="lg:col-span-5 flex flex-col justify-stretch">
            <div className="relative w-full h-[320px] lg:h-full lg:min-h-[420px] rounded-2xl overflow-hidden border-2 border-gold-dark/20 shadow-xl group">
              {/* Decorative Location Overlay Badge */}
              <div className="absolute top-4 left-4 z-20 bg-primary/95 backdrop-blur-sm border border-gold/50 px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2.5">
                <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M 38,32 H 62 V 34 H 38 Z" />
                  <path d="M 39,29 H 61 V 30 H 39 Z" />
                  <path d="M 39,29 L 34,22 C 34,22 38,24 41,26 L 43,23 C 43,23 46,24 48,26 L 50,16 C 50,16 51,24 52,26 L 57,23 C 57,23 58,24 59,26 L 66,22 C 66,22 62,24 61,29 Z" />
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
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
