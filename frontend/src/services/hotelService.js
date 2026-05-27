import { 
  hotelInfo, 
  navLinks, 
  heroData, 
  heritageIntroData, 
  aboutPageData, 
  whyStayData, 
  services, 
  rooms, 
  reviewsData, 
  contactPageData 
} from '../data/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getHotelInfo = async () => {
  await delay(200);
  return hotelInfo;
};

export const getNavLinks = async () => {
  await delay(150);
  return navLinks;
};

export const getHeroData = async () => {
  await delay(150);
  return heroData;
};

export const getHeritageIntro = async () => {
  await delay(200);
  return heritageIntroData;
};

export const getAboutPageData = async () => {
  await delay(250);
  return aboutPageData;
};

export const getWhyStayData = async () => {
  await delay(200);
  return whyStayData;
};

export const getServices = async () => {
  await delay(200);
  return services;
};

export const getRooms = async () => {
  await delay(300);
  return rooms;
};

export const getReviewsData = async () => {
  await delay(250);
  return reviewsData;
};

export const getContactPageData = async () => {
  await delay(200);
  return contactPageData;
};
