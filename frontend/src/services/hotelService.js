import { api } from './api';

const DEFAULT_NAV_LINKS = [
  { id: 1, label: 'HOME', href: '#home', page: 'home' },
  { id: 2, label: 'ABOUT US', href: '#about', page: 'about' },
  { id: 3, label: 'ROOMS', href: '#rooms', page: 'rooms' },
  { id: 4, label: 'SERVICES', href: '#services', page: 'home', section: 'services' },
  { id: 5, label: 'CONTACT', href: '#contact', page: 'contact' },
];

const mapAboutToLegacyShape = (about) => ({
  title: about?.title || '',
  subtitle: about?.subtitle || '',
  introText: about?.subtitle || '',
  storySections: Array.isArray(about?.stories)
    ? about.stories.map((story) => ({
        id: story.id,
        title: story.title,
        description: story.description,
        imageUrl: story.imageUrl,
      }))
    : [],
  timeline: Array.isArray(about?.events)
    ? about.events.map((event) => ({
        id: event.id,
        year: event.year,
        title: event.title,
        description: event.description,
      }))
    : [],
});

export const getHotelInfo = async () => {
  const res = await api.get('/public/hotel-info');
  return res.data.data;
};

// Navigation is intentionally static for SPA page anchors.
export const getNavLinks = async () => DEFAULT_NAV_LINKS;

export const getHeroData = async () => {
  const res = await api.get('/public/hero-section');
  return res.data.data;
};

export const getHeritageIntro = async () => {
  const res = await api.get('/public/heritage-section');
  const data = res.data.data;

  return {
    badge: data.slogan || 'HERITAGE & LEGACY',
    title: data.title,
    subtitle: data.slogan || '',
    paragraph1: data.description || '',
    paragraph2: '',
    ctaText: 'EXPLORE OUR STORY',
    imageUrl: data.bgImageUrl || data.badgeUrl || '',
  };
};

export const getAboutPageData = async () => {
  const res = await api.get('/public/about-page');
  return mapAboutToLegacyShape(res.data.data);
};

export const getWhyStayData = async () => {
  const res = await api.get('/public/why-stay-section');
  const data = res.data.data;

  return {
    badge: data.subtitle || 'OUR PROMISE',
    title: data.title,
    features: Array.isArray(data.features) ? data.features : [],
  };
};

export const getServices = async () => {
  const res = await api.get('/public/services');
  return res.data.data;
};

export const getRooms = async () => {
  const res = await api.get('/public/rooms');
  return res.data.data;
};

export const getReviewsData = async () => {
  const res = await api.get('/public/reviews');
  return res.data.data;
};

export const getContactPageData = async () => {
  const res = await api.get('/public/contact-page');
  return res.data.data;
};
