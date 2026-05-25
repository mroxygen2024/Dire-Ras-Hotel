import { hotelInfo, navLinks, services, rooms } from '../data/mockData';

export const getHotelInfo = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(hotelInfo);
    }, 400);
  });
};

export const getNavLinks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(navLinks);
    }, 300);
  });
};

export const getServices = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services);
    }, 500);
  });
};

export const getRooms = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rooms);
    }, 600);
  });
};
