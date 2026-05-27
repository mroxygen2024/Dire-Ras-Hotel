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
    introText: string;
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
export declare const hotelInfo: SeedHotelInfo;
export declare const heroData: SeedHeroData;
export declare const heritageIntroData: SeedHeritageData;
export declare const aboutPageData: SeedAboutPageData;
export declare const whyStayData: SeedWhyStayData;
export declare const services: SeedService[];
export declare const rooms: SeedRoom[];
export declare const reviewsData: SeedReviewsData;
export declare const contactPageData: SeedContactPageData;
