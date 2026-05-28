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
  mapEmbedUrl?: string;
  whatsappNumber?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  tripAdvisorUrl?: string;
  updatedAt?: string;
}

export interface HeritageSectionData {
  id?: string;
  title: string;
  slogan?: string;
  description: string;
  badgeUrl?: string;
  bgImageUrl?: string;
  establishedYear?: number | null;
}

export interface WhyStayFeatureData {
  id?: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface WhyStaySectionData {
  id?: string;
  title: string;
  subtitle?: string;
  features: WhyStayFeatureData[];
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
// 2. API Services Definitions
// ==========================================
export const adminService = {
  // --- Auth Services ---
  login: async (credentials: any) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get('/auth/profile');
    return res.data.data.user;
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

  // --- About & Heritage Services ---
  getAboutHeritage: async (): Promise<AboutPageData> => {
    const res = await api.get('/public/about-page');
    return res.data.data;
  },

  updateAboutHeritage: async (data: AboutPageData): Promise<AboutPageData> => {
    const res = await api.put('/admin/about-page', data);
    return res.data.data;
  },

  getHeritageSection: async (): Promise<HeritageSectionData> => {
    const res = await api.get('/public/heritage-section');
    return res.data.data;
  },

  updateHeritageSection: async (data: HeritageSectionData): Promise<HeritageSectionData> => {
    const res = await api.put('/admin/heritage-section', data);
    return res.data.data;
  },

  getWhyStaySection: async (): Promise<WhyStaySectionData> => {
    const res = await api.get('/public/why-stay-section');
    return res.data.data;
  },

  updateWhyStaySection: async (data: WhyStaySectionData): Promise<WhyStaySectionData> => {
    const res = await api.put('/admin/why-stay-section', data);
    return res.data.data;
  },
};
