import { api } from './api';

// ==========================================
// 1. Types & Interfaces
// ==========================================

export interface HotelInfoData {
  id?: string;
  name: string;
  logo?: string;
  tagline?: string;
  address: string;
  email: string;
  phone: string;
  phone2?: string;
  whatsappNumber?: string;
  establishedText?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription?: string;
  updatedAt?: string;
}

export interface HeroSectionData {
  id?: string;
  badgeText?: string;
  subtitle?: string;
  titlePart1: string;
  titlePart2?: string;
  tagline?: string;
  ctaBookText?: string;
  ctaVideoText?: string;
  videoUrl?: string;
  backgroundImage: string;
}

export interface RoomData {
  id?: string;
  name: string;
  price: number | string;
  currency: string;
  image: string;
  description: string;
  size?: string | null;
  occupancy: number;
  bed?: string | null;
  features: string[];
  featured: boolean;
  isAvailable?: boolean;
}

export interface HotelServiceData {
  id?: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  isAvailable?: boolean;
}

export interface ReviewSectionData {
  id?: string;
  badge?: string;
  title: string;
  subtitle?: string;
}

export interface ReviewData {
  id?: string;
  name: string;
  platform?: string;
  text: string;
  rating: number;
  isApproved: boolean;
  isFeatured: boolean;
}

export interface StorySectionData {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  order: number;
  alignRight: boolean;
}

export interface TimelineEventData {
  id: string;
  year: string;
  title: string;
  description: string;
  order: number;
}

export interface AboutPageData {
  title: string;
  subtitle?: string;
  mainImageUrl?: string;
  stories: StorySectionData[];
  events: TimelineEventData[];
}

export interface ContactPageData {
  id?: string;
  title: string;
  subtitle?: string;
  introText?: string;
  formTitle?: string;
  nameLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  msgLabel?: string;
  submitBtn?: string;
  description?: string;
  phone?: string;
  email?: string;
  whatsappLink?: string;
}

// ==========================================
// 2. Mock Database Fallback for About & Heritage
// ==========================================
const MOCK_ABOUT_KEY = 'cms_mock_about_heritage';

const getMockAboutData = (): AboutPageData => {
  const data = localStorage.getItem(MOCK_ABOUT_KEY);
  if (data) return JSON.parse(data);

  // Set default seeder data for About & Heritage
  const defaultData: AboutPageData = {
    title: 'A Legacy of Imperial Elegance in Dire Dawa',
    subtitle: 'Dire Dawa Ras Hotel stands as a glorious testament to Ethiopian history, hospitality, and timeless heritage.',
    mainImageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    stories: [
      {
        id: 'story-1',
        title: 'Founded by Royal Decree',
        description: 'Established in the mid-20th century, the Dire Dawa Ras Hotel was built to cater to travelers on the historic Franco-Ethiopian railway, representing the luxury gateway of its era.',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        order: 0,
        alignRight: false,
      },
      {
        id: 'story-2',
        title: 'Where History Meets Comfort',
        description: 'Over the decades, we have hosted nobility, diplomats, and international travelers, providing authentic Ethiopian hospitality wrapped in majestic imperial architecture.',
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        order: 1,
        alignRight: true,
      }
    ],
    events: [
      {
        id: 'event-1',
        year: '1945',
        title: 'The Blueprint and Foundation',
        description: 'Planned during the peak railroad era to serve international merchants.',
        order: 0,
      },
      {
        id: 'event-2',
        year: '1958',
        title: 'Grand Royal Opening',
        description: 'Inaugurated with historic grandeur, welcoming distinguished guests.',
        order: 1,
      },
      {
        id: 'event-3',
        year: '2026',
        title: 'Premium Modernization',
        description: 'Updated with luxury amenities while preserving the royal design essence.',
        order: 2,
      }
    ]
  };

  localStorage.setItem(MOCK_ABOUT_KEY, JSON.stringify(defaultData));
  return defaultData;
};

const saveMockAboutData = (data: AboutPageData) => {
  localStorage.setItem(MOCK_ABOUT_KEY, JSON.stringify(data));
};

// ==========================================
// 3. API Services Definitions
// ==========================================
export const adminService = {
  // --- Auth Services ---
  login: async (credentials: any) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get('/auth/profile');
    return res.data.data;
  },

  // --- Hotel Info Services ---
  getHotelInfo: async (): Promise<HotelInfoData> => {
    const res = await api.get('/public/hotel-info');
    return res.data.data;
  },

  updateHotelInfo: async (data: HotelInfoData): Promise<HotelInfoData> => {
    const res = await api.put('/admin/hotel-info', data);
    return res.data.data;
  },

  // --- Hero Section Services ---
  getHeroSection: async (): Promise<HeroSectionData> => {
    const res = await api.get('/public/hero-section');
    return res.data.data;
  },

  updateHeroSection: async (data: HeroSectionData): Promise<HeroSectionData> => {
    const res = await api.put('/admin/hero-section', data);
    return res.data.data;
  },

  // --- Room Services ---
  getRooms: async (): Promise<RoomData[]> => {
    const res = await api.get('/public/rooms');
    return res.data.data;
  },

  createRoom: async (data: RoomData): Promise<RoomData> => {
    const res = await api.post('/admin/rooms', data);
    return res.data.data;
  },

  updateRoom: async (id: string, data: RoomData): Promise<RoomData> => {
    const res = await api.put(`/admin/rooms/${id}`, data);
    return res.data.data;
  },

  deleteRoom: async (id: string): Promise<void> => {
    await api.delete(`/admin/rooms/${id}`);
  },

  // --- Service Services ---
  getServices: async (): Promise<HotelServiceData[]> => {
    const res = await api.get('/public/services');
    return res.data.data;
  },

  createService: async (data: HotelServiceData): Promise<HotelServiceData> => {
    const res = await api.post('/admin/services', data);
    return res.data.data;
  },

  updateService: async (id: string, data: HotelServiceData): Promise<HotelServiceData> => {
    const res = await api.put(`/admin/services/${id}`, data);
    return res.data.data;
  },

  deleteService: async (id: string): Promise<void> => {
    await api.delete(`/admin/services/${id}`);
  },

  // --- Review Services ---
  getReviews: async (): Promise<ReviewData[]> => {
    const res = await api.get('/admin/reviews');
    return res.data.data;
  },

  getReviewSection: async (): Promise<ReviewSectionData> => {
    const res = await api.get('/admin/reviews/section');
    return res.data.data;
  },

  updateReviewSection: async (data: ReviewSectionData): Promise<ReviewSectionData> => {
    const res = await api.put('/admin/reviews/section', data);
    return res.data.data;
  },

  createReview: async (data: ReviewData): Promise<ReviewData> => {
    const res = await api.post('/admin/reviews', data);
    return res.data.data;
  },

  updateReview: async (id: string, data: ReviewData): Promise<ReviewData> => {
    const res = await api.put(`/admin/reviews/${id}`, data);
    return res.data.data;
  },

  deleteReview: async (id: string): Promise<void> => {
    await api.delete(`/admin/reviews/${id}`);
  },

  // --- Contact Page Services ---
  getContactPage: async (): Promise<ContactPageData> => {
    const res = await api.get('/public/contact-page');
    return res.data.data;
  },

  updateContactPage: async (data: ContactPageData): Promise<ContactPageData> => {
    const res = await api.put('/admin/contact-page', data);
    return res.data.data;
  },

  // --- About & Heritage Services (Mock layer with API support ready) ---
  getAboutHeritage: async (): Promise<AboutPageData> => {
    try {
      const res = await api.get('/public/about-page');
      return res.data.data;
    } catch {
      // Fallback seamlessly to local mock storage
      return getMockAboutData();
    }
  },

  updateAboutHeritage: async (data: AboutPageData): Promise<AboutPageData> => {
    try {
      const res = await api.put('/admin/about-page', data);
      return res.data.data;
    } catch {
      saveMockAboutData(data);
      return data;
    }
  }
};
