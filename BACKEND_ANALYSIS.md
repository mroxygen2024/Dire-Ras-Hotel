# RAS Hotel Backend Analysis

**Generated:** May 29, 2026  
**Backend Path:** `/home/fuad/Desktop/ras_hotel/backend`  
**Framework:** Express.js + TypeScript + PostgreSQL (Prisma ORM)  
**Port:** 5000 (default)

---

## 1. PRISMA SCHEMA MODELS

### Complete Data Models

#### **Admin**
- `id` (UUID, primary)
- `email` (string, unique)
- `password` (string, hashed)
- `firstName`, `lastName` (optional)
- `role` (AdminRole enum: SUPERADMIN, EDITOR, VIEWER)
- `isActive` (boolean, default: true)
- `createdAt`, `updatedAt`, `isDeleted`, `deletedAt`
- **Indexes:** email, isDeleted

#### **HotelInfo** (Core hotel branding & CMS hub)
- `id` (UUID, primary)
- `name`, `tagline`, `address`, `email`, `phone`, `phone2`, `whatsappNumber`
- `establishedText`, `logoUrl`, `mapEmbedUrl`
- Social URLs: `facebookUrl`, `instagramUrl`, `twitterUrl`, `tripAdvisorUrl`
- Footer config: `footerTagline`, `footerDescription`
- `createdAt`, `updatedAt`, `isDeleted`, `deletedAt`
- **Relations:**
  - 1-to-1: heroSection, heritageSection, aboutPage, whyStaySection, reviewSection, contactPage, navigationMenu
  - 1-to-many: services, rooms, reviews, sectionConfigs
- **Indexes:** isDeleted

#### **HeroSection** (Landing page hero/banner)
- `id` (UUID, primary)
- `hotelId` (UUID, unique FK to HotelInfo)
- `badgeText`, `subtitle`, `titlePart1`, `titlePart2`, `tagline`
- `ctaBookText`, `ctaVideoText`, `videoUrl`
- `backgroundImage` (URL)
- `createdAt`, `updatedAt`
- **Cascade delete** on HotelInfo deletion

#### **HeritageSection** (Ras Hotel history/heritage intro)
- `id` (UUID, primary)
- `hotelId` (UUID, unique FK)
- `title`, `slogan`, `description` (long text)
- `badgeUrl`, `bgImageUrl`, `establishedYear` (int)
- `createdAt`, `updatedAt`

#### **AboutPage** (About page container)
- `id` (UUID, primary)
- `hotelId` (UUID, unique FK)
- `title`, `subtitle`, `mainImageUrl`
- `createdAt`, `updatedAt`
- **Relations:**
  - 1-to-many: stories (StorySection[]), events (TimelineEvent[])

#### **StorySection** (About page story blocks)
- `id` (UUID, primary)
- `aboutPageId` (UUID, FK)
- `title`, `description` (long text), `imageUrl`
- `order` (int, for sorting), `alignRight` (boolean, for layout)
- `createdAt`, `updatedAt`
- **Indexes:** aboutPageId, order

#### **TimelineEvent** (About page timeline entries)
- `id` (UUID, primary)
- `aboutPageId` (UUID, FK)
- `year` (string), `title`, `description`
- `order` (int)
- `createdAt`, `updatedAt`
- **Indexes:** aboutPageId, order

#### **WhyStaySection** (Why Stay section container)
- `id` (UUID, primary)
- `hotelId` (UUID, unique FK)
- `title`, `subtitle`
- `createdAt`, `updatedAt`
- **Relations:** 1-to-many: features (WhyStayFeature[])

#### **WhyStayFeature** (Why Stay feature boxes)
- `id` (UUID, primary)
- `whyStaySectionId` (UUID, FK)
- `icon` (string), `title`, `description`
- `order` (int)
- `createdAt`, `updatedAt`
- **Indexes:** whyStaySectionId, order

#### **Service** (Hotel services/amenities)
- `id` (UUID, primary)
- `hotelId` (UUID, FK)
- `title`, `description` (long text), `icon` (optional)
- `order` (int, default: 0)
- `isAvailable` (boolean, default: true)
- `createdAt`, `updatedAt`, `isDeleted`, `deletedAt`
- **Indexes:** hotelId, order, isAvailable, isDeleted

#### **Room** (Hotel room types)
- `id` (UUID, primary)
- `hotelId` (UUID, FK)
- `name`, `description` (long text), `image` (URL)
- `price` (Decimal 10,2), `currency` (string, default: "USD")
- `size` (string, e.g., "24 m²"), `occupancy` (int), `bed` (string)
- `features` (JSON array of strings)
- `featured` (boolean, default: false)
- `isAvailable` (boolean, default: true)
- `createdAt`, `updatedAt`, `isDeleted`, `deletedAt`
- **Indexes:** hotelId, featured, isAvailable, isDeleted

#### **ReviewSection** (Reviews section metadata)
- `id` (UUID, primary)
- `hotelId` (UUID, unique FK)
- `badge`, `title`, `subtitle`
- `createdAt`, `updatedAt`
- **Relations:** 1-to-many: reviews (Review[])

#### **Review** (Guest reviews)
- `id` (UUID, primary)
- `hotelId` (UUID, FK), `reviewSectionId` (UUID, optional FK)
- `name` (reviewer name), `platform` (source, e.g., "Google Review")
- `text` (review content), `rating` (int, 1-5)
- `isApproved` (boolean, default: true)
- `isFeatured` (boolean, default: false)
- `createdAt`, `updatedAt`, `isDeleted`, `deletedAt`
- **Indexes:** hotelId, reviewSectionId, rating, isApproved, isFeatured, isDeleted

#### **ContactPage** (Contact page configuration)
- `id` (UUID, primary)
- `hotelId` (UUID, unique FK)
- `title`, `subtitle`, `introText` (long text), `formTitle`, `description`
- Form labels: `nameLabel`, `emailLabel`, `phoneLabel`, `msgLabel`, `submitBtn`
- Contact info: `phone`, `email`, `whatsappLink`
- Map: `latitude`, `longitude`
- `createdAt`, `updatedAt`

#### **NavigationMenu** (Main navigation menu)
- `id` (UUID, primary)
- `hotelId` (UUID, unique FK)
- `isActive` (boolean, default: true)
- `createdAt`, `updatedAt`
- **Relations:** 1-to-many: items (NavigationItem[])

#### **NavigationItem** (Menu items)
- `id` (UUID, primary)
- `navigationMenuId` (UUID, FK)
- `label` (string), `page` (string: 'home', 'about', 'rooms', 'contact')
- `section` (string, optional, for same-page navigation)
- `order` (int), `isVisible` (boolean, default: true)
- `createdAt`, `updatedAt`
- **Indexes:** navigationMenuId, order

#### **SectionConfig** (Generic section configuration)
- `id` (UUID, primary)
- `hotelId` (UUID, FK)
- `sectionKey` (string: 'rooms', 'why-stay', 'reviews', 'services', 'about', etc.)
- `badge`, `title`, `subtitle`, `description` (all optional)
- `createdAt`, `updatedAt`
- **Unique constraint:** (hotelId, sectionKey)
- **Indexes:** hotelId, sectionKey

### Enums

```typescript
enum AdminRole {
  SUPERADMIN    // Full system access
  EDITOR        // Can edit content
  VIEWER        // Read-only access
}

enum RoomType {
  STANDARD
  DELUXE
  SUITE
  PRESIDENTIAL
}
```

---

## 2. API CONTROLLERS

All controllers use `asyncHandler` wrapper for error handling and return standardized JSON responses.

### AuthController (`src/controllers/auth.controller.ts`)
- **`login`** - POST /auth/login
  - Validates email & password
  - Returns admin object + JWT token
  
- **`getProfile`** - GET /auth/profile (Protected)
  - Returns currently logged-in admin profile

### HotelInfoController (`src/controllers/hotel-info.controller.ts`)
- **`get`** - GET /api/public/hotel-info
  - Returns all hotel configuration (public)
  
- **`update`** - PUT /api/admin/hotel-info (Protected)
  - Updates hotel name, contact info, social URLs, logo, etc.

### HeroSectionController (`src/controllers/hero-section.controller.ts`)
- **`get`** - GET /api/public/hero-section
  - Returns hero banner configuration
  
- **`update`** - PUT /api/admin/hero-section (Protected)
  - Updates hero section text, images, CTAs, video URL

### RoomController (`src/controllers/room.controller.ts`)
- **`create`** - POST /api/admin/rooms (Protected)
  - Create new room with validation
  
- **`getAll`** - GET /api/public/rooms
  - List rooms with pagination, filtering (featured), sorting, search
  
- **`getSingle`** - GET /api/public/rooms/:id
  - Get single room details
  
- **`update`** - PUT /api/admin/rooms/:id (Protected)
  - Update room details
  
- **`delete`** - DELETE /api/admin/rooms/:id (Protected)
  - Soft delete (marks isDeleted = true)

### ServiceController (`src/controllers/service.controller.ts`)
- **`create`** - POST /api/admin/services (Protected)
  - Create new service
  
- **`getAll`** - GET /api/public/services
  - List all services sorted by order
  
- **`getSingle`** - GET /api/public/services/:id
  - Get single service
  
- **`update`** - PUT /api/admin/services/:id (Protected)
  - Update service
  
- **`delete`** - DELETE /api/admin/services/:id (Protected)
  - Soft delete service

### ReviewController (`src/controllers/review.controller.ts`)
- **`getPublicReviews`** - GET /api/public/reviews
  - Returns approved, public reviews + section metadata
  
- **`adminGetReviews`** - GET /api/admin/reviews (Protected)
  - List all reviews (admin view)
  
- **`adminGetReview`** - GET /api/admin/reviews/:id (Protected)
  - Get single review details
  
- **`adminCreateReview`** - POST /api/admin/reviews (Protected)
  - Create new review
  
- **`adminUpdateReview`** - PUT /api/admin/reviews/:id (Protected)
  - Update review (approval status, featured flag, etc.)
  
- **`adminDeleteReview`** - DELETE /api/admin/reviews/:id (Protected)
  - Soft delete review
  
- **`adminGetReviewSection`** - GET /api/admin/reviews/section (Protected)
  - Get review section metadata (title, badge, etc.)
  
- **`adminUpdateReviewSection`** - PUT /api/admin/reviews/section (Protected)
  - Update review section settings

### ContactPageController (`src/controllers/contact-page.controller.ts`)
- **`get`** - GET /api/public/contact-page
  - Returns contact page configuration
  
- **`update`** - PUT /api/admin/contact-page (Protected)
  - Updates contact page content & form labels

### ContentController (`src/controllers/content.controller.ts`)
Content management for modular CMS sections:

- **`getHeritage`** - GET /api/public/heritage-section
  - Get heritage section (Ras Hotel history)
  
- **`updateHeritage`** - PUT /api/admin/heritage-section (Protected)
  - Update heritage content, badges, images
  
- **`getAboutPage`** - GET /api/public/about-page
  - Get about page with story sections & timeline
  
- **`updateAboutPage`** - PUT /api/admin/about-page (Protected)
  - Update about page title, image, stories (nested), timeline events (nested)
  
- **`getWhyStay`** - GET /api/public/why-stay-section
  - Get why stay section with features
  
- **`updateWhyStay`** - PUT /api/admin/why-stay-section (Protected)
  - Update why stay section title & features (nested)

---

## 3. API ROUTES

All routes are mounted under `/api` prefix in `app.ts` with the following structure:

### Auth Routes (`/auth/*`)
```
POST   /auth/login              (Public, rate-limited)
GET    /auth/profile            (Protected)
```

### Hotel Info Routes (`/*`)
```
GET    /api/public/hotel-info   (Public)
PUT    /api/admin/hotel-info    (Protected)
```

### Hero Section Routes (`/*`)
```
GET    /api/public/hero-section     (Public)
PUT    /api/admin/hero-section      (Protected)
```

### Room Routes (`/*`)
```
GET    /api/public/rooms           (Public - paginated, filterable)
GET    /api/public/rooms/:id       (Public)
POST   /api/admin/rooms            (Protected)
PUT    /api/admin/rooms/:id        (Protected)
DELETE /api/admin/rooms/:id        (Protected)
```

### Service Routes (`/*`)
```
GET    /api/public/services         (Public)
GET    /api/public/services/:id     (Public)
POST   /api/admin/services          (Protected)
PUT    /api/admin/services/:id      (Protected)
DELETE /api/admin/services/:id      (Protected)
```

### Review Routes (`/*`)
```
GET    /api/public/reviews          (Public - approved reviews only)
GET    /api/admin/reviews           (Protected - all reviews)
POST   /api/admin/reviews           (Protected)
GET    /api/admin/reviews/:id       (Protected)
PUT    /api/admin/reviews/:id       (Protected)
DELETE /api/admin/reviews/:id       (Protected)
GET    /api/admin/reviews/section   (Protected)
PUT    /api/admin/reviews/section   (Protected)
```

### Contact Page Routes (`/*`)
```
GET    /api/public/contact-page     (Public)
PUT    /api/admin/contact-page      (Protected)
```

### Content Routes (`/*`)
Heritage, About, Why Stay management:
```
GET    /api/public/heritage-section             (Public)
PUT    /api/admin/heritage-section              (Protected)
GET    /api/public/about-page                   (Public)
PUT    /api/admin/about-page                    (Protected - with nested updates)
GET    /api/public/why-stay-section             (Public)
PUT    /api/admin/why-stay-section              (Protected - with nested updates)
```

### Health Check
```
GET    /api/health                (Public)
```

---

## 4. API ENDPOINTS - COMPLETE MAPPING

### Public Endpoints (No Authentication)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Health check |
| POST | `/auth/login` | Admin login (rate-limited) |
| GET | `/api/public/hotel-info` | Get hotel branding & contact info |
| GET | `/api/public/hero-section` | Get hero banner configuration |
| GET | `/api/public/heritage-section` | Get hotel heritage/history section |
| GET | `/api/public/about-page` | Get about page (stories + timeline) |
| GET | `/api/public/why-stay-section` | Get why stay section with features |
| GET | `/api/public/contact-page` | Get contact page configuration |
| GET | `/api/public/reviews` | Get approved reviews & section meta |
| GET | `/api/public/rooms` | List rooms (paginated, filterable) |
| GET | `/api/public/rooms/:id` | Get single room details |
| GET | `/api/public/services` | List all services |
| GET | `/api/public/services/:id` | Get single service |

### Protected Endpoints (Requires JWT + Admin Role)

| Method | Endpoint | Purpose | Role Check |
|--------|----------|---------|-----------|
| GET | `/auth/profile` | Get logged-in admin profile | Any (protect) |
| PUT | `/api/admin/hotel-info` | Update hotel config | Any (protect) |
| PUT | `/api/admin/hero-section` | Update hero section | Any (protect) |
| POST | `/api/admin/rooms` | Create room | Any (protect) |
| PUT | `/api/admin/rooms/:id` | Update room | Any (protect) |
| DELETE | `/api/admin/rooms/:id` | Delete room (soft) | Any (protect) |
| POST | `/api/admin/services` | Create service | Any (protect) |
| PUT | `/api/admin/services/:id` | Update service | Any (protect) |
| DELETE | `/api/admin/services/:id` | Delete service (soft) | Any (protect) |
| GET | `/api/admin/reviews` | List all reviews | Any (protect) |
| POST | `/api/admin/reviews` | Create review | Any (protect) |
| GET | `/api/admin/reviews/:id` | Get review details | Any (protect) |
| PUT | `/api/admin/reviews/:id` | Update review | Any (protect) |
| DELETE | `/api/admin/reviews/:id` | Delete review (soft) | Any (protect) |
| GET | `/api/admin/reviews/section` | Get review section metadata | Any (protect) |
| PUT | `/api/admin/reviews/section` | Update review section | Any (protect) |
| PUT | `/api/admin/contact-page` | Update contact page | Any (protect) |
| PUT | `/api/admin/heritage-section` | Update heritage section | Any (protect) |
| PUT | `/api/admin/about-page` | Update about page (with nested) | Any (protect) |
| PUT | `/api/admin/why-stay-section` | Update why stay section | Any (protect) |

**Total Endpoints:** 33 (20 public, 13 protected)

---

## 5. SERVICES (Business Logic)

Each service handles core business operations:

### AuthService (`src/services/auth.service.ts`)
- **`login(email, password)`** - Authenticate admin, return token
  - Validates credentials against hashed password
  - Checks account is active
  - Generates JWT token with userId, email, role
  - Returns admin object + token
  
- **`seedSuperAdmin()`** - Auto-seed default admin if none exists
  - Email: `admin@rashotel.com`
  - Password: `admin123` (must change in production)
  - Role: SUPERADMIN

### HotelInfoService
- **`getHotelInfo()`** - Fetch main hotel configuration
  - Returns all HotelInfo fields
  
- **`updateHotelInfo(payload)`** - Update hotel branding
  - Updates name, phone, email, address, social URLs, logos, etc.

### HeroSectionService
- **`getHeroSection()`** - Fetch hero banner config
- **`updateHeroSection(payload)`** - Update hero content, images, CTAs

### RoomService
- **`createRoom(data)`** - Create new room with validation
- **`getRoom(id)`** - Fetch single room
- **`getRooms(filters)`** - List rooms with pagination, filtering, sorting
  - Supports: featured filter, pagination (page/limit), sorting
- **`updateRoom(id, data)`** - Update room details
- **`deleteRoom(id)`** - Soft delete (isDeleted = true)

### ServiceService
- **`createService(data)`** - Create service/amenity
- **`getService(id)`** - Fetch single service
- **`getServices()`** - List all services sorted by order
- **`updateService(id, data)`** - Update service
- **`deleteService(id)`** - Soft delete service

### ReviewService
- **`getPublicReviews()`** - Fetch approved reviews + section metadata
  - Filters: isApproved = true, isDeleted = false
  - Returns ReviewSection + featured reviews
  
- **`getAllReviews()`** - Admin: fetch all reviews
- **`getReview(id)`** - Admin: fetch single review
- **`createReview(data)`** - Admin: create review
- **`updateReview(id, data)`** - Admin: update review (approval, featured flag)
- **`deleteReview(id)`** - Admin: soft delete review
- **`getReviewSection()`** - Admin: get review section metadata
- **`updateReviewSection(data)`** - Admin: update review section (badge, title)

### ContactPageService
- **`getContactPage()`** - Fetch contact page configuration
- **`updateContactPage(payload)`** - Update contact page content & form labels

### ContentService (CMS - Heritage, About, Why Stay)
- **`getHeritageSection()`** - Fetch Ras Hotel heritage/history
- **`updateHeritageSection(payload)`** - Update heritage content
  
- **`getAboutPage()`** - Fetch about page with nested stories & timeline
  - Includes: StorySection[], TimelineEvent[]
  
- **`updateAboutPage(payload)`** - Update about page
  - Handles nested create/update of stories and timeline events
  
- **`getWhyStaySection()`** - Fetch why stay section with features
  - Includes: WhyStayFeature[]
  
- **`updateWhyStaySection(payload)`** - Update why stay section
  - Handles nested create/update of features

---

## 6. VALIDATIONS (Input Sanitization & Type Safety)

All validations use **Zod** schema library:

### Hotel Info Validation
```typescript
// UpdateHotelInfoSchema validates:
- name (required string)
- tagline (optional)
- phone (required, min 5 chars)
- phone2 (optional)
- email (required, valid email format)
- address (required)
- heroTitle (required)
- heroSubtitle, heroDescription (optional)
- establishedText (optional)
- logo/logoUrl (optional)
- mapEmbedUrl, whatsappNumber (optional)
- facebookUrl, instagramUrl, twitterUrl, tripAdvisorUrl (optional)
```

### Room Validation
```typescript
CreateRoomSchema validates:
- name (required, non-empty string)
- price (required, positive number or decimal string)
- currency (ETB | USD, default: ETB)
- image (required, URL)
- description (required)
- size (optional)
- occupancy (required, positive int)
- bed (optional)
- features (array of strings, default: [])
- featured (boolean, default: false)

UpdateRoomSchema: All fields optional (partial)
```

### Service Validation
```typescript
CreateServiceSchema validates:
- title (required)
- description (required)
- icon (optional)
- order (int, default: 0)

UpdateServiceSchema: All fields optional
```

### Review Validation
```typescript
CreateReviewSchema validates:
- name (required, reviewer name)
- platform (optional, default: "Google Review")
- text (required, review content)
- rating (required, 1-5 range)
- isApproved, isFeatured (boolean, optional)

UpdateReviewSchema: All fields optional

UpdateReviewSectionSchema validates:
- badge (optional)
- title (required)
- subtitle (optional)
```

### Contact Page Validation
```typescript
UpdateContactPageSchema validates:
- title (required)
- subtitle, introText, formTitle (optional)
- nameLabel, emailLabel, phoneLabel, msgLabel, submitBtn (optional)
- description, phone, email, whatsappLink (optional)
- latitude, longitude (number, optional)
```

### Content (Heritage/About/Why Stay) Validation
```typescript
UpdateHeritageSectionSchema validates:
- title (required)
- slogan, description (required)
- badgeUrl, bgImageUrl (optional)
- establishedYear (optional int)

StorySectionSchema (nested in About):
- id (optional UUID)
- title, description (required)
- imageUrl (optional)
- order (int, default: 0)
- alignRight (boolean, default: false)

TimelineEventSchema (nested in About):
- id (optional UUID)
- year, title, description (required)
- order (int, default: 0)

UpdateAboutPageSchema validates:
- title, subtitle, mainImageUrl (optional for title)
- stories (array of StorySectionSchema, default: [])
- events (array of TimelineEventSchema, default: [])

WhyStayFeatureSchema (nested in Why Stay):
- id (optional UUID)
- icon, title, description (required)
- order (int, default: 0)

UpdateWhyStaySectionSchema validates:
- title (required)
- subtitle (optional)
- features (array of WhyStayFeatureSchema, default: [])
```

---

## 7. DATABASE SEEDERS (Demo Data)

Seeders populate the database with demo content. Located in `prisma/seeders/`:

### Admin Seeder (`admin.seeder.ts`)
Creates default admin account:
- **Email:** `admin@rashotel.com`
- **Password:** `admin123` (hashed with bcrypt)
- **Role:** SUPERADMIN
- **Status:** Active

### Hotel Seeder (`hotel.seeder.ts`)
Creates entire hotel configuration including:

**HotelInfo:**
- Name: "DIRE DAWA RAS HOTEL"
- Tagline: "Comfort. Hospitality. Dire Dawa."
- Phone: +251 25 111 3255
- Email: ddrashotel1@gmail.com
- Address: HVQ5+FGV Hotel, Dire Dawa 1487, Ethiopia
- Established: 1964 EC
- Social: Facebook, Instagram, TripAdvisor URLs

**HeroSection:**
- Badge: "ESTABLISHED SINCE 1964 EC"
- Title: "Dire Dawa Ras Hotel"
- Tagline: "Stay a cool place in warmer city"
- CTA Buttons: "BOOK NOW", "WATCH VIDEO"
- Background image: Unsplash URL

**HeritageSection:**
- Title: "An Ethiopian Landmark"
- Description: Long heritage narrative about 1964 founding
- Established Year: 1964

**WhyStaySection + Features:**
1. Prime Landmark Location (icon: Map)
2. Traditional Hospitality (icon: Heart)
3. Cool Oasis Gardens (icon: Award)
4. Heritage Comforts (icon: Briefcase)

**ContactPageConfiguration:**
- Form labels, WhatsApp link, map coordinates

### Rooms Seeder (`rooms.seeder.ts`)
Creates 3 room types:

| Room Type | Price (ETB) | Size | Occupancy | Bed | Featured |
|-----------|-------------|------|-----------|-----|----------|
| Standard Room | 2,500 | 24 m² | 2 | 1 Double | ✓ |
| Premium Room | 4,500 | 40 m² | 2 | 1 King | ✓ |
| Deluxe Room | 3,200 | 32 m² | 2 | 1 Premium King | ✓ |

Features per room: WiFi, Garden View, Working Desk, etc.

### Services Seeder
Creates 5 services:
1. Heritage Rooms
2. Timeless Dining
3. Free Fiber Wi-Fi
4. Meetings & Events
5. 24/7 Hospitality

### About Page Seeder (`about.seeder.ts`)
**Title:** "Our Timeless Story"  
**Subtitle:** "Decades of Heritage in Eastern Ethiopia"

**Story Sections:**
1. "The Golden Railway Era" (railway history)
2. "A Trusted Oasis of Calm" (modern legacy)

**Timeline Events:**
1. 1964 EC - The Grand Inauguration
2. 1980s GC - Social & Cultural Hub
3. 2015 GC - Restoration & Modernity
4. Present - Continuing The Legacy

### Reviews Seeder (`reviews.seeder.ts`)
Creates 5 demo guest reviews:
- David Edom (5 stars)
- Zenamarkos Mulu (5 stars)
- Sammy Zeray (5 stars)
- Patrick Mumo (4 stars)
- Mohammed Yusuf Ibrahim (5 stars)

All reviews platform: "Google Review"

---

## 8. AUTHENTICATION & AUTHORIZATION

### Authentication Flow

1. **Login** (POST /auth/login)
   - Email + password submitted
   - Password hashed using bcrypt and compared
   - On success: JWT token generated

2. **Token Validation** (via `protect` middleware)
   - Bearer token extracted from Authorization header
   - Token verified using `JwtUtil.verify()`
   - Admin record fetched from database
   - User object attached to request

3. **JWT Structure**
   ```typescript
   {
     userId: string (UUID),
     email: string,
     role: AdminRole
   }
   ```

4. **Token Storage**
   - Returned as `token` in login response
   - Client must store and send in: `Authorization: Bearer <token>`

### Authorization

**Middleware:** `protect` & `restrictTo`

- **`protect`** - Validates JWT, ensures admin is active & exists
  - Required for all `/api/admin/*` endpoints
  - Attaches user to `req.user`

- **`restrictTo(...roles)`** - Role-based access control
  - Currently: ALL protected endpoints allow any role (SUPERADMIN, EDITOR, VIEWER)
  - Can be applied selectively, e.g., `restrictTo(AdminRole.SUPERADMIN)`

### Role Hierarchy

1. **SUPERADMIN** - Full system access
2. **EDITOR** - Can edit content (no user management)
3. **VIEWER** - Read-only access to content

Currently, only login is implemented. Role-based middleware is available but not enforced on protected routes.

### Security Measures

- **Password Hashing:** bcrypt with salt rounds
- **Rate Limiting:** 
  - Auth limiter: 5 requests per 15 minutes on `/auth/login`
  - Global API limiter: Applied to `/api` routes
- **CORS:** Whitelist-based origin validation
- **Helmet:** Security headers (CSP, clickjacking protection, etc.)
- **Input Sanitization:** XSS prevention middleware
- **Payload Limits:** 50KB max for JSON/form data

---

## 9. MISSING MODELS & POTENTIAL IMPROVEMENTS

### Missing/Not Yet Implemented

1. **Booking Model** 
   - No reservation/booking system exists
   - Could include: guest info, check-in/out dates, room ID, status
   - Frontend: No booking form visible

2. **Guest/User Model**
   - No guest user authentication
   - Could enable: guest reviews, guest accounts, booking history
   - Currently: Reviews are created admin-side only

3. **Room Rate/Pricing Model**
   - Room prices are static (single price per room)
   - Missing: seasonal rates, occupancy-based pricing, discounts
   - Could include: dateRange, minOccupancy, discount%, active status

4. **Amenity/Feature Model**
   - Room features stored as JSON array (string[])
   - Could be normalized: separate Amenity model with relations
   - Would improve: filtering, category management, reusability

5. **Image/Media Model**
   - All images stored as URL strings
   - Missing: file upload system, image management, CDN integration
   - Could enable: on-demand resizing, alt text, image ordering

6. **Page/View Statistics Model**
   - No analytics tracking
   - Could include: page views, conversion tracking, user sessions
   - Would improve: CMS insights, popular content identification

7. **Email/Notification Model**
   - No email service integrated
   - Missing: contact form email delivery, booking confirmations
   - Could include: email templates, delivery logs

8. **Settings/Configuration Model**
   - No global application settings
   - Could include: email credentials, feature flags, maintenance mode
   - Would improve: runtime configuration management

9. **Audit Log Model**
   - No change tracking/audit trail
   - Could include: who, what, when for all changes
   - Would improve: compliance, debugging, accountability

10. **Currency/Multi-language Support**
    - No localization models
    - Prices in mixed currencies (ETB/USD)
    - Could normalize: supported currencies, exchange rates, translations

### Recommended Next Steps

1. **Implement Booking System** - Core feature for hotel business
2. **Add Image Upload/Management** - Replace URL strings with file handling
3. **Implement Contact Form Email** - Enable guest inquiries
4. **Add Audit Logging** - Track content changes
5. **Normalize Amenities** - Extract room features to separate model
6. **Guest User Authentication** - Allow booking & guest reviews
7. **Booking Confirmation Emails** - Automated email workflow
8. **Page Analytics** - Track popular content

---

## 10. ARCHITECTURAL NOTES

### Technology Stack
- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT + bcrypt
- **Validation:** Zod
- **Security:** Helmet, CORS, Rate Limiting, XSS protection

### Design Patterns

1. **MVC-like Architecture**
   - Controllers: HTTP request handling
   - Services: Business logic
   - Routes: Endpoint definitions
   - Validations: Input schema definitions

2. **Middleware Chain**
   - Global: Helmet, CORS, logging, rate-limiting, sanitization
   - Route-specific: Auth protection, validation

3. **Error Handling**
   - `asyncHandler` wrapper: Catches Promise rejections
   - `AppError` custom error class
   - Global error middleware: Standardized error responses

4. **Soft Deletes**
   - Models with `isDeleted`, `deletedAt` fields
   - Preserves data, filters deleted records by default

5. **Cascading Relations**
   - HotelInfo → HeroSection, AboutPage, etc.
   - Cascade delete: child records deleted when parent deleted

### Response Format

All endpoints return standardized JSON:
```json
{
  "success": true/false,
  "message": "Description of result",
  "data": { ... } // Optional, contains response body
}
```

### Environment Configuration
- Handled via `src/config/env.ts`
- Supports: NODE_ENV, DATABASE_URL, JWT_SECRET, ALLOWED_ORIGINS, etc.

---

## 11. DEPLOYMENT & RUNNING

### Development
```bash
# Install dependencies
npm install

# Setup database
npx prisma migrate dev

# Seed demo data
npm run seed

# Start server
npm run dev  # Runs on port 5000
```

### Production
```bash
# Build TypeScript
npm run build

# Run migrations
npx prisma migrate deploy

# Start server
npm start
```

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `NODE_ENV` - "development" or "production"
- `ALLOWED_ORIGINS` - Comma-separated CORS origins
- `API_PORT` - Server port (default: 5000)

---

## 12. FRONTEND API EXPECTATIONS

Based on frontend analysis in session memory, the frontend expects:

### Public API Responses (No Auth)
- GET `/api/public/hotel-info` - For header/footer branding
- GET `/api/public/hero-section` - Landing page hero
- GET `/api/public/rooms` - Room listing page
- GET `/api/public/services` - Services/amenities section
- GET `/api/public/reviews` - Testimonials section
- GET `/api/public/contact-page` - Contact form configuration
- GET `/api/public/heritage-section` - Heritage/history section
- GET `/api/public/about-page` - About page content
- GET `/api/public/why-stay-section` - Why stay section

### Admin API Responses (With Auth)
- POST `/auth/login` - Returns: { admin, token }
- GET `/auth/profile` - Returns: { user }
- PUT endpoints for all content (hotel, hero, rooms, etc.)

### Response Structure
```typescript
// Public endpoints
{
  success: boolean,
  message: string,
  data: { ... }  // Model instance or array
}

// Login endpoint
{
  success: true,
  message: "Login successful.",
  data: {
    admin: { id, email, role, firstName, lastName },
    token: "jwt_token_string"
  }
}

// Profile endpoint
{
  success: true,
  message: "...",
  data: {
    user: { id, email, role }  // From req.user
  }
}
```

---

## SUMMARY

**Total Endpoints:** 33 (20 public, 13 protected)  
**Total Models:** 15 Prisma models  
**Roles:** 3 (SUPERADMIN, EDITOR, VIEWER)  
**Demo Data:** 5 seeders (hotel, rooms, services, about, reviews)  
**Authentication:** JWT-based  
**Authorization:** Role-based (middleware ready)

The backend provides a complete CMS API for managing a hotel website with:
- ✅ Hotel branding & configuration
- ✅ Room management (CRUD)
- ✅ Services/amenities
- ✅ Guest reviews (moderation)
- ✅ Content sections (hero, about, heritage, why-stay, contact)
- ✅ Admin authentication & profiles
- ✅ Data validation & sanitization
- ❌ Bookings (not yet implemented)
- ❌ Guest user system (not yet implemented)
- ❌ Email notifications (not yet implemented)
