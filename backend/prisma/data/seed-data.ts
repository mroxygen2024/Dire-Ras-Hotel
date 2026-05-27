export interface SeedHotelInfo {
  name: string;
  tagline: string;
  phone: string;
  phone2: string;
  email: string;
  address: string;
  establishedText: string;
  logoUrl: string;
  whatsappNumber: string;
  mapEmbedUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string | null;
  tripAdvisorUrl: string;
}

export interface SeedHeroData {
  badgeText: string;
  subtitle: string;
  titlePart1: string;
  titlePart2: string;
  tagline: string;
  ctaBookText: string;
  ctaVideoText: string;
  videoUrl: string;
  backgroundImage: string;
}

export interface SeedHeritageData {
  title: string;
  slogan: string;
  description: string;
  badgeUrl: string | null;
  bgImageUrl: string;
  establishedYear: number;
}

export interface SeedStorySection {
  title: string;
  description: string;
  imageUrl: string;
  alignRight: boolean;
}

export interface SeedTimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface SeedAboutPageData {
  title: string;
  subtitle: string;
  introText: string; // Will map to Story/Timeline intro or description if needed
  mainImageUrl: string;
  storySections: SeedStorySection[];
  timeline: SeedTimelineEvent[];
}

export interface SeedWhyStayFeature {
  title: string;
  description: string;
  icon: string;
}

export interface SeedWhyStayData {
  title: string;
  subtitle: string;
  features: SeedWhyStayFeature[];
}

export interface SeedService {
  title: string;
  description: string;
  icon: string;
}

export interface SeedRoom {
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  size: string;
  occupancy: number;
  bed: string;
  features: string[];
  featured: boolean;
}

export interface SeedReview {
  name: string;
  platform: string;
  text: string;
  rating: number;
}

export interface SeedReviewsData {
  badge: string;
  title: string;
  subtitle: string;
  reviews: SeedReview[];
}

export interface SeedContactPageData {
  title: string;
  subtitle: string;
  introText: string;
  formTitle: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  msgLabel: string;
  submitBtn: string;
  latitude: number;
  longitude: number;
}

export const hotelInfo: SeedHotelInfo = {
  name: "DIRE DAWA RAS HOTEL",
  tagline: "Comfort. Hospitality. Dire Dawa.",
  phone: "+251 25 111 3255",
  phone2: "+251 915 320 033",
  email: "ddrashotel1@gmail.com",
  address: "HVQ5+FGV Hotel, Dire Dawa 1487, Ethiopia",
  establishedText: "Established Since 1964 EC",
  logoUrl: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=200&h=200&fit=crop", // placeholder logo
  whatsappNumber: "+251915320033",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.9130796338575!2d41.859663!3d9.601322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1635f10255b55555%3A0xe1068df626c04414!2sDire%20Dawa%20Ras%20Hotel!5e0!3m2!1sen!2set!4v1716700000000!5m2!1sen!2set",
  facebookUrl: "https://facebook.com/diredawarashotel",
  instagramUrl: "https://instagram.com/diredawarashotel",
  twitterUrl: null,
  tripAdvisorUrl: "https://www.tripadvisor.com/Hotel_Review-g317079-d1066807-Reviews-Ras_Hotel-Dire_Dawa_Dire_Dawa_Region.html"
};

export const heroData: SeedHeroData = {
  badgeText: "ESTABLISHED SINCE 1964 EC",
  subtitle: "WELCOME TO",
  titlePart1: "Dire Dawa",
  titlePart2: "Ras Hotel",
  tagline: "Stay a cool place in warmer city",
  ctaBookText: "BOOK NOW",
  ctaVideoText: "WATCH VIDEO",
  videoUrl: "https://www.youtube.com/watch?v=rashoteldiredawa",
  backgroundImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
};

export const heritageIntroData: SeedHeritageData = {
  title: "An Ethiopian Landmark",
  slogan: "Serving travelers in Dire Dawa since 1964 EC with authentic charm and warmth.",
  description: "Dire Dawa Ras Hotel is a legendary monument of hospitality. Established during a golden age of rail travel, our hotel bridges historic Ethiopian heritage with refined, relaxed comforts. Nestled as a lush cool oasis in a warm, lively city, we have hosted royalty, international delegates, and generations of travelers.\n\nEvery corner of our estate—from the serene courtyard gardens to our classic architectural design—tells a story of trust, safety, and legendary hospitality. We are not just a place to sleep; we are the historic gateway to the unique atmosphere of Dire Dawa.",
  badgeUrl: null,
  bgImageUrl: "https://images.unsplash.com/photo-1670915198844-51975abf6955?q=80&w=2010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  establishedYear: 1964
};

export const aboutPageData: SeedAboutPageData = {
  title: "Our Timeless Story",
  subtitle: "Decades of Heritage in Eastern Ethiopia",
  introText: "Founded in 1964 EC, the Dire Dawa Ras Hotel is more than a hotel—it is a living archive of the city's rich history. Built to welcome guests arriving via the historic Franco-Ethiopian railway, Ras Hotel stands as a symbol of hospitality, warmth, and trust. Our beautiful warm cream walls, deep maroon details, and lush green gardens reflect the historic charm of our home city.",
  mainImageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  storySections: [
    {
      title: "The Golden Railway Era",
      description: "When Dire Dawa flourished as a hub of trade and railway travel, the Ras Hotel was built to offer absolute comfort. Its classic architectural lines and breezy verandas became the central meeting point for diplomats, railway managers, and globetrotters alike.",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      alignRight: false
    },
    {
      title: "A Trusted Oasis of Calm",
      description: "Throughout decades, we have remained a peaceful, shaded retreat in eastern Ethiopia. Our legacy of hospitality is carried forward by our loyal team members, who serve guests with traditional Ethiopian warmth combined with international care standards.",
      imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      alignRight: true
    }
  ],
  timeline: [
    {
      year: "1964 EC",
      title: "The Grand Inauguration",
      description: "Dire Dawa Ras Hotel opens as the grandest hotel in eastern Ethiopia, welcoming elite travelers of the Franco-Ethiopian Railway."
    },
    {
      year: "1980s GC",
      title: "Social & Cultural Hub",
      description: "The hotel establishes itself as the premier venue for royal visits, national diplomatic summits, and magnificent family celebrations."
    },
    {
      year: "2015 GC",
      title: "Restoration & Modernity",
      description: "A careful interior renovation integrates fast fiber-optic Wi-Fi, air conditioning, and top-tier bedding while fully maintaining our historical facade."
    },
    {
      year: "Present",
      title: "Continuing The Legacy",
      description: "Proudly standing as Dire Dawa's most authentic landmark hotel, blending historic charm with standard modern comforts."
    }
  ]
};

export const whyStayData: SeedWhyStayData = {
  title: "Why Choose Ras Hotel",
  subtitle: "OUR PROMISE",
  features: [
    {
      title: "Prime Landmark Location",
      description: "Located in the very heart of historic Dire Dawa, offering easy access to traditional markets, railway sites, and transport hubs.",
      icon: "Map"
    },
    {
      title: "Traditional Hospitality",
      description: "Experience the legendary, authentic warmth of Ethiopian hospitality, delivered with utmost professional courtesy and attention.",
      icon: "Heart"
    },
    {
      title: "Cool Oasis Gardens",
      description: "Relax inside our tranquil courtyard gardens, offering a breezy, shaded escape from the vibrant warmth of the city.",
      icon: "Award"
    },
    {
      title: "Heritage Comforts",
      description: "Sleep inside beautifully proportioned rooms that combine classic historic architecture with high-speed internet and premium linen.",
      icon: "Briefcase"
    }
  ]
};

export const services: SeedService[] = [
  {
    title: "Heritage Rooms",
    description: "Relax in our peaceful, high-ceilinged rooms",
    icon: "Bed"
  },
  {
    title: "Timeless Dining",
    description: "Enjoy delicious traditional Ethiopian and European dishes",
    icon: "Utensils"
  },
  {
    title: "Free Fiber Wi-Fi",
    description: "Stay fully connected with modern high-speed internet",
    icon: "Wifi"
  },
  {
    title: "Meetings & Events",
    description: "Perfect historic halls for your conferences and weddings",
    icon: "Users"
  },
  {
    title: "24/7 Hospitality",
    description: "Our legendary reception team is always at your service",
    icon: "Bell"
  }
];

export const rooms: SeedRoom[] = [
  {
    name: "Standard Room",
    price: 2500,
    currency: "ETB",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    description: "A comfortable, bright room equipped with essential amenities, perfect for short stays.",
    size: "24 m²",
    occupancy: 2,
    bed: "1 Double Bed",
    features: ["Quiet Shaded Garden View", "Dedicated Working Desk", "High-Speed Wi-Fi"],
    featured: true
  },
  {
    name: "Premium Room",
    price: 4500,
    currency: "ETB",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    description: "Experience extra space and premium comfort with upgraded amenities and beautiful views.",
    size: "40 m²",
    occupancy: 2,
    bed: "1 King Bed",
    features: ["Balcony with City View", "Mini Bar Fridge", "VIP Welcome Amenities"],
    featured: true
  },
  {
    name: "Deluxe Room",
    price: 3200,
    currency: "ETB",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    description: "An elegant, airy room featuring a high ceiling, beautiful custom wood furnishings, a cozy seating area.",
    size: "32 m²",
    occupancy: 2,
    bed: "1 Premium King Bed",
    features: ["Balcony with Garden View", "Individual Air Conditioning", "Free High-Speed Wi-Fi"],
    featured: true
  }
];

export const reviewsData: SeedReviewsData = {
  badge: "GUEST STORIES",
  title: "What Our Guests Say",
  subtitle: "Loved and trusted by generations of local and international travelers in Dire Dawa.",
  reviews: [
    {
      name: "DAVID EDOM",
      platform: "Google Review",
      text: "The best hotel I have ever stayed in. Nice rooms and all the staff were very kind. I highly recommend it to anyone visiting Dire Dawa.",
      rating: 5
    },
    {
      name: "Zenamarkos Mulu",
      platform: "Google Review",
      text: "Great everything's perfect. The WiFi, rooms, pool, staff, food, and atmosphere were amazing with affordable prices.",
      rating: 5
    },
    {
      name: "Sammy Zeray",
      platform: "Google Review",
      text: "Nice clean rooms with best customer service.",
      rating: 5
    },
    {
      name: "Patrick Mumo",
      platform: "Google Review",
      text: "Polite and good service. Clean and spacious rooms.",
      rating: 4
    },
    {
      name: "Mohammed Yusuf Ibrahim",
      platform: "Google Review",
      text: "By far the best hotel in Dire Dawa Ethiopia.",
      rating: 5
    }
  ]
};

export const contactPageData: SeedContactPageData = {
  title: "Connect With Us",
  subtitle: "Plan Your Visit to Our Historic Oasis",
  introText: "Whether you wish to book a room, plan an unforgettable traditional wedding, or host a corporate event in Dire Dawa, our experienced hospitality team is here to assist. Fill out the contact form below or reach out via WhatsApp or call us directly.",
  formTitle: "Send a Message",
  nameLabel: "Full Name",
  emailLabel: "Email Address",
  phoneLabel: "Phone Number",
  msgLabel: "Message / Booking Inquiry",
  submitBtn: "Submit via WhatsApp Chat",
  latitude: 9.601322,
  longitude: 41.859663
};
