"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAboutPage = seedAboutPage;
const data = __importStar(require("../data/seed-data"));
async function seedAboutPage(prisma, hotelId) {
    console.log('🌱 Seeding AboutPage, stories, and timeline events...');
    // Create AboutPage record
    const aboutPage = await prisma.aboutPage.create({
        data: {
            hotelId: hotelId,
            title: data.aboutPageData.title,
            subtitle: data.aboutPageData.subtitle,
            mainImageUrl: data.aboutPageData.mainImageUrl,
        },
    });
    // Seed Story Sections
    await Promise.all(data.aboutPageData.storySections.map((story, idx) => prisma.storySection.create({
        data: {
            aboutPageId: aboutPage.id,
            title: story.title,
            description: story.description,
            imageUrl: story.imageUrl,
            order: idx,
            alignRight: story.alignRight,
        },
    })));
    // Seed Timeline Events
    await Promise.all(data.aboutPageData.timeline.map((event, idx) => prisma.timelineEvent.create({
        data: {
            aboutPageId: aboutPage.id,
            year: event.year,
            title: event.title,
            description: event.description,
            order: idx,
        },
    })));
    console.log(`✅ AboutPage with ${data.aboutPageData.storySections.length} stories and ${data.aboutPageData.timeline.length} timeline events seeded successfully.`);
}
//# sourceMappingURL=about.seeder.js.map