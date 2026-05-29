# HARDCODED CONTENT INVENTORY & FIXES
**Date:** May 29, 2026  
**Total Items Found:** 10  
**Total Estimated Fix Time:** 2-3 hours

---

## CRITICAL HARDCODING ISSUES

### 1. Navigation Links - DEFAULT_NAV_LINKS Array

| Detail | Value |
|--------|-------|
| **File** | `/frontend/src/services/hotelService.js` |
| **Lines** | 3-8, 39 |
| **Type** | Static array constant |
| **Severity** | 🔴 CRITICAL - Navigation not editable |
| **Affected Components** | Navbar.jsx, Footer.jsx |

**Current Code:**
```javascript
const DEFAULT_NAV_LINKS = [
  { id: 1, label: 'HOME', href: '#home', page: 'home' },
  { id: 2, label: 'ABOUT US', href: '#about', page: 'about' },
  { id: 3, label: 'ROOMS', href: '#rooms', page: 'rooms' },
  { id: 4, label: 'SERVICES', href: '#services', page: 'home', section: 'services' },
  { id: 5, label: 'CONTACT', href: '#contact', page: 'contact' },
];

export const getNavLinks = async () => DEFAULT_NAV_LINKS;
```

**Issue:** Navigation items cannot be edited without code changes

**Fix:**
```javascript
// Change getNavLinks to call API
export const getNavLinks = async () => {
  try {
    const res = await api.get('/public/navigation');
    return res.data.data;
  } catch (error) {
    // Fallback to defaults only on error
    return DEFAULT_NAV_LINKS;
  }
};
```

**Backend Needed:**
- Endpoint: `GET /public/navigation` → Returns array of navigation items
- Endpoint: `PUT /admin/navigation` → Update navigation items
- Database Model: `NavigationMenu` + `NavigationItem` (already defined)

**Acceptance:** Admin can add/edit/remove nav items, frontend updates instantly

---

### 2. Rooms Section Badge - "OUR ROOMS & SUITES"

| Detail | Value |
|--------|-------|
| **File** | `/frontend/src/components/RoomsSection.jsx` |
| **Line** | 25 |
| **Type** | Hardcoded string in JSX |
| **Severity** | 🟡 MEDIUM - Marketing copy not editable |
| **Affected Components** | RoomsSection.jsx only |

**Current Code:**
```jsx
<span className="...uppercase...">
  OUR ROOMS & SUITES
</span>
```

**Issue:** Section badge cannot be changed without editing component

**Fix:**
```jsx
// Fetch from SectionConfig API
const [sectionConfig, setSectionConfig] = useState(null);

useEffect(() => {
  api.get('/public/section-config/rooms')
    .then(res => setSectionConfig(res.data.data))
    .catch(err => console.error(err));
}, []);

// In render:
<span className="...uppercase...">
  {sectionConfig?.badge || 'OUR ROOMS & SUITES'}
</span>
```

**Backend Needed:**
- Endpoint: `GET /public/section-config/rooms`
- Endpoint: `PUT /admin/section-config/rooms`
- Database Model: `SectionConfig` (already defined)

**Acceptance:** Badge text editable via CMS, frontend updates instantly

---

### 3. Rooms Section Title - "Find Your Perfect Stay"

| Detail | Value |
|--------|-------|
| **File** | `/frontend/src/components/RoomsSection.jsx` |
| **Line** | 27 |
| **Type** | Hardcoded string in JSX |
| **Severity** | 🟡 MEDIUM - Marketing copy not editable |
| **Affected Components** | RoomsSection.jsx only |

**Current Code:**
```jsx
<h2 className="...">
  Find Your Perfect Stay
</h2>
```

**Issue:** Section title cannot be changed without editing component

**Fix:**
```jsx
<h2 className="...">
  {sectionConfig?.title || 'Find Your Perfect Stay'}
</h2>
```

**Acceptance:** Title editable via CMS, frontend updates instantly

---

### 4. Rooms Section Description

| Detail | Value |
|--------|-------|
| **File** | `/frontend/src/components/RoomsSection.jsx` |
| **Lines** | 29-30 |
| **Type** | Hardcoded string in JSX |
| **Severity** | 🟡 MEDIUM - Marketing copy not editable |
| **Affected Components** | RoomsSection.jsx only |

**Current Code:**
```jsx
<p className="...">
  Relax in beautifully appointed rooms blending historic 
  charm with standard modern comforts.
</p>
```

**Issue:** Description cannot be changed without editing component

**Fix:**
```jsx
<p className="...">
  {sectionConfig?.description || 'Relax in beautifully appointed rooms...'}
</p>
```

**Acceptance:** Description editable via CMS, frontend updates instantly

---

### 5. Footer Brand Tagline - "Serving eastern Ethiopia since 1964 EC..."

| Detail | Value |
|--------|-------|
| **File** | `/frontend/src/components/Footer.jsx` |
| **Line** | 80 |
| **Type** | Hardcoded string in JSX |
| **Severity** | 🟡 MEDIUM - Brand copy not editable |
| **Affected Components** | Footer.jsx only |

**Current Code:**
```jsx
<p className="...">
  Serving eastern Ethiopia since 1964 EC, the Dire Dawa Ras Hotel 
  represents timeless hospitality, trust, and landmark luxury 
  in a beautiful courtyard setting.
</p>
```

**Issue:** Footer brand message cannot be updated without code changes

**Fix:**
```jsx
<p className="...">
  {hotelInfo?.footerTagline || 'Serving eastern Ethiopia since 1964 EC...'}
</p>
```

**Note:** `HotelInfo` model already has `footerTagline` field - just need to use it

**Acceptance:** Tagline editable via HotelInfoCMS, footer updates instantly

---

### 6. Footer Section Heading - "Quick Links"

| Detail | Value |
|--------|-------|
| **File** | `/frontend/src/components/Footer.jsx` |
| **Line** | 116 |
| **Type** | Hardcoded string in JSX |
| **Severity** | 🟢 LOW - UI text, less critical |
| **Affected Components** | Footer.jsx only |

**Current Code:**
```jsx
<h4 className="...">
  Quick Links
</h4>
```

**Issue:** Section heading hardcoded

**Fix Option A (Simple):**
```jsx
<h4 className="...">
  {hotelInfo?.quickLinksHeading || 'Quick Links'}
</h4>
```

**Fix Option B (Better - Use SectionConfig):**
```jsx
<h4 className="...">
  {footerConfig?.quickLinksHeading || 'Quick Links'}
</h4>
```

**Acceptance:** Heading could be made editable via HotelInfo or SectionConfig

---

### 7. Footer Section Heading - "Connect With Us"

| Detail | Value |
|--------|-------|
| **File** | `/frontend/src/components/Footer.jsx` |
| **Line** | 139 |
| **Type** | Hardcoded string in JSX |
| **Severity** | 🟢 LOW - UI text, less critical |
| **Affected Components** | Footer.jsx only |

**Current Code:**
```jsx
<h4 className="...">
  Connect With Us
</h4>
```

**Issue:** Section heading hardcoded

**Fix:**
```jsx
<h4 className="...">
  {footerConfig?.connectHeading || 'Connect With Us'}
</h4>
```

**Acceptance:** Heading could be made editable

---

### 8. Footer Byline - "Designed with historic landmark heritage"

| Detail | Value |
|--------|-------|
| **File** | `/frontend/src/components/Footer.jsx` |
| **Line** | 176 |
| **Type** | Hardcoded string in JSX |
| **Severity** | 🟢 LOW - UI branding text |
| **Affected Components** | Footer.jsx only |

**Current Code:**
```jsx
<p className="...">
  Designed with historic landmark heritage.
</p>
```

**Issue:** Footer byline hardcoded

**Fix:**
```jsx
<p className="...">
  {hotelInfo?.footerByline || 'Designed with historic landmark heritage.'}
</p>
```

**Acceptance:** Byline could be made editable

---

### 9. Logo Path - "/logo.png"

| Detail | Value |
|--------|-------|
| **File** | `/frontend/src/components/Footer.jsx` (Line 66) |
| | `/frontend/src/components/Navbar.jsx` |
| **Type** | Hardcoded string in src attribute |
| **Severity** | 🟢 LOW - But important for branding |
| **Affected Components** | Footer.jsx, Navbar.jsx |

**Current Code:**
```jsx
<img 
  src="/logo.png" 
  alt="Dire Dawa Ras Hotel Logo" 
  ...
/>
```

**Issue:** Logo path hardcoded - must edit component to change logo

**Fix:**
```jsx
<img 
  src={hotelInfo?.logoUrl || '/logo.png'} 
  alt="Dire Dawa Ras Hotel Logo"
  ...
/>
```

**Note:** `HotelInfo` model already has `logoUrl` field - just need to use it

**Acceptance:** Logo updateable via HotelInfoCMS, both components reflect change

---

### 10. Contact Section Form Labels & Fallbacks

| Detail | Value |
|--------|-------|
| **File** | `/frontend/src/components/ContactSection.jsx` |
| **Lines** | 26-31, 36-39 |
| **Type** | Hardcoded fallback strings |
| **Severity** | 🟡 MEDIUM - Form not fully CMS-controlled |
| **Affected Components** | ContactSection.jsx only |

**Current Code:**
```javascript
const pageData = {
  title: contactData?.title || 'Connect With Us',
  subtitle: contactData?.subtitle || 'Plan Your Visit to Our Historic Oasis',
  introText: contactData?.introText || 'Whether you wish to book...',
  form: {
    title: contactData?.formTitle || 'Send a Message',
    nameLabel: contactData?.nameLabel || 'Full Name',
    emailLabel: contactData?.emailLabel || 'Email Address',
    phoneLabel: contactData?.phoneLabel || 'Phone Number',
    msgLabel: contactData?.msgLabel || 'Message / Booking Inquiry',
    submitBtn: contactData?.submitBtn || 'Submit via WhatsApp Chat',
  },
};

const defaultContacts = [
  {
    content: hotelInfo?.address || 'HVQ5+FGV Hotel, Dire Dawa 1487, Ethiopia',
    content2: hotelInfo?.phone2 || '0915 32 00 33',
  },
];

const mapEmbedSrc = hotelInfo?.mapEmbedUrl || 
  'https://maps.google.com/maps?q=Dire%20Dawa%20Ras%20Hotel,...';
```

**Issue:** Extensive hardcoded fallbacks - API data not trusted

**Fix:**
Remove all fallback strings - let API handle defaults via seeder
```javascript
const pageData = {
  title: contactData?.title,
  subtitle: contactData?.subtitle,
  introText: contactData?.introText,
  form: {
    title: contactData?.formTitle,
    nameLabel: contactData?.nameLabel,
    emailLabel: contactData?.emailLabel,
    phoneLabel: contactData?.phoneLabel,
    msgLabel: contactData?.msgLabel,
    submitBtn: contactData?.submitBtn,
  },
};
```

**Acceptance:** All data from API, no hardcoded fallbacks in component

---

## PRIORITY MATRIX

```
IMPACT vs EFFORT

                HIGH IMPACT
                    ↑
                    |
        [1] Nav    [2,3,4] Section
        [5] Footer Headers
                    |
        ────────────+──────── HIGH EFFORT
        |           |           |
     [6,7,8,9]  [10] Contact
        LOW      MEDIUM
      IMPACT    EFFORT
```

---

## FIX CHECKLIST

### Immediate Fixes (Under 30 min each)
- [ ] Fix #9: Logo path (5 min)
- [ ] Fix #1: Navigation API integration (20 min - just update function)

### Quick Fixes (30-60 min each)
- [ ] Fix #5: Footer tagline (5 min)
- [ ] Fix #2,3,4: RoomsSection headers (need API, 45 min)

### Medium Fixes (1-2 hours)
- [ ] Fix #10: ContactSection fallbacks (30 min cleanup)
- [ ] Fix #6,7,8: Footer UI text (30 min)

### Full Fixes (including backend)
- [ ] Create navigation API endpoints (1.5 hours)
- [ ] Create section-config API endpoints (1.5 hours)
- [ ] Create CMS admin pages (6+ hours)

---

## VERIFICATION TESTS

### After Fixing Each Item

```
Test 1: Edit in Admin
- Edit item in admin CMS
- Save changes
- Check API returns updated value

Test 2: Frontend Updates
- Refresh page
- Should show updated value
- No hardcoded fallback shown

Test 3: Error Handling
- Temporarily break API
- Component should show graceful fallback
- Console error logged but not thrown

Test 4: Loading States
- Monitor network tab
- Should show skeleton/loading
- Should not flash hardcoded text

Test 5: Mobile Responsive
- Test on mobile devices
- All text readable
- Layout not broken
```

---

## RELATED DATABASE FIELDS

### Already Available in Database
- ✅ `HotelInfo.logoUrl` - Use in Footer + Navbar
- ✅ `HotelInfo.footerTagline` - Use in Footer  
- ✅ `ContactPage.*` - All form fields already in model
- ✅ `NavigationMenu` + `NavigationItem` - Model ready for API

### Need to Add to Database
- ❌ `SectionConfig` - Model defined but not fully utilized
- ❌ `HotelInfo.footerByline` - Could add if needed
- ❌ `HotelInfo.quickLinksHeading` - Could add if needed

---

## DEPENDENCIES

### Required for Navigation Fix
- [ ] Create `/backend/src/routes/navigation.routes.ts`
- [ ] Create `/backend/src/controllers/navigation.controller.ts`
- [ ] Create `/backend/src/services/navigation.service.ts`
- [ ] Update `/backend/src/app.ts` to register routes
- [ ] Test endpoints via Postman

### Required for Section Config Fix
- [ ] Create `/backend/src/routes/section-config.routes.ts`
- [ ] Create `/backend/src/controllers/section-config.controller.ts`
- [ ] Create `/backend/src/services/section-config.service.ts`
- [ ] Update `/backend/src/app.ts` to register routes
- [ ] Test endpoints via Postman

### Required for CMS Pages
- [ ] Create `/frontend/src/pages/admin/NavigationCMS.tsx`
- [ ] Create `/frontend/src/pages/admin/SectionConfigCMS.tsx`
- [ ] Update admin routing
- [ ] Add sidebar navigation links

---

**Last Updated:** May 29, 2026  
**Ready for Implementation:** YES  
**Estimated Total Time:** 2-24 hours depending on scope
