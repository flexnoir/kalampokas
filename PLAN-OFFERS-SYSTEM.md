# Kalampokas Fotografia — Phase 2: Dynamic Offers System

## Context
The photographer (Lefteris Kalampokas) needs a way to create personalized proposals/offers for clients and send them via a unique URL. Currently, pricing discussions happen over email/WhatsApp with no structured presentation. This system will allow creating professional, on-brand offer pages that match the luxury aesthetic of the main site.

**Requirements:**
- Admin panel with proper authentication (Supabase Auth, not env-based)
- Standard offer template where photographer customizes photos, text, and services/packages
- Each offer gets a unique shareable URL
- Client can **Accept** or **Decline** + leave a message
- Email notifications when client responds

---

## Tech Stack
- **Supabase** — Auth (admin login), PostgreSQL (offers data), Storage (offer images)
- **@supabase/supabase-js** + **@supabase/ssr** — Client & server-side Supabase for Next.js App Router
- **Resend** — Email notifications (already installed)
- **react-hook-form + zod** — Form validation (already installed)
- **Framer Motion** — Animations on offer pages (already installed)

## Dependencies to Install
```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## Database Schema (Supabase SQL)

### Table: `offers`
```sql
CREATE TABLE offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Client info
  client_name TEXT NOT NULL,
  client_email TEXT,
  event_date TEXT,
  event_location TEXT,

  -- Content
  title TEXT NOT NULL,              -- e.g. "Wedding Photography Proposal"
  intro_text TEXT,                   -- Personal message to client
  cover_image TEXT,                  -- URL from Supabase Storage

  -- Services (JSONB array)
  packages JSONB DEFAULT '[]',      -- [{name, description, price, features: [...]}]

  -- Gallery images
  gallery_images JSONB DEFAULT '[]', -- [{url, alt}]

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'declined')),

  -- Auth
  created_by UUID REFERENCES auth.users(id)
);
```

### Table: `offer_responses`
```sql
CREATE TABLE offer_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
  decision TEXT NOT NULL CHECK (decision IN ('accepted', 'declined')),
  message TEXT,
  client_name TEXT
);
```

### Storage Bucket
- Bucket name: `offer-images`
- Public read access (images shown on offer pages)
- Authenticated write access (only admin can upload)

### Row Level Security (RLS)
```sql
-- offers: admin can do everything, public can read by ID
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access" ON offers
  FOR ALL USING (auth.uid() = created_by);

CREATE POLICY "Public read sent offers" ON offers
  FOR SELECT USING (status != 'draft');

-- offer_responses: anyone can insert, admin can read
ALTER TABLE offer_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can respond" ON offer_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin reads responses" ON offer_responses
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM offers WHERE offers.id = offer_id AND offers.created_by = auth.uid())
  );
```

---

## Directory Structure

```
app/
├── (main)/                          # Route group — existing site
│   ├── layout.tsx                   # Navbar + Footer (moved from root)
│   └── page.tsx                     # Homepage (existing)
│
├── (offer)/                         # Route group — client-facing offers
│   ├── layout.tsx                   # Minimal layout (no nav/footer, luxury feel)
│   └── offer/[id]/page.tsx          # Public offer page
│
├── (admin)/                         # Route group — admin panel
│   ├── layout.tsx                   # Admin layout with sidebar/header
│   ├── admin/login/page.tsx         # Login page
│   ├── admin/page.tsx               # Dashboard (offers list)
│   ├── admin/offers/new/page.tsx    # Create new offer
│   └── admin/offers/[id]/page.tsx   # Edit offer
│
├── layout.tsx                       # Root layout (fonts, metadata only)
├── globals.css                      # (existing)
└── api/
    ├── contact/route.ts             # (existing)
    └── offers/
        ├── [id]/respond/route.ts    # POST — client accept/decline
        └── [id]/route.ts            # GET — offer data for client page
```

### New Components
```
components/
├── admin/
│   ├── AdminSidebar.tsx             # Navigation sidebar
│   ├── OfferForm.tsx                # Create/edit offer form
│   ├── OfferList.tsx                # Offers table/grid
│   ├── PackageEditor.tsx            # Add/edit service packages
│   └── ImageUploader.tsx            # Supabase Storage upload
│
├── offer/
│   ├── OfferHero.tsx                # Cover image + title
│   ├── OfferIntro.tsx               # Personal message section
│   ├── OfferPackages.tsx            # Services/packages display
│   ├── OfferGallery.tsx             # Sample work gallery
│   └── OfferResponse.tsx            # Accept/Decline + message form
│
└── ui/                              # (existing components reused)
```

### New Lib Files
```
lib/
├── supabase/
│   ├── client.ts                    # Browser client (createBrowserClient)
│   ├── server.ts                    # Server client (createServerClient with cookies)
│   └── middleware.ts                # Auth middleware helper
└── supabase-admin.ts                # Service role client (for API routes)
```

---

## Implementation Phases

### Phase 1: Supabase Setup
- Install `@supabase/supabase-js` and `@supabase/ssr`
- Create `lib/supabase/client.ts`, `lib/supabase/server.ts`
- Add env vars to `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Create `middleware.ts` at root for auth session refresh

### Phase 2: Route Group Restructure
- Move existing homepage layout to `app/(main)/layout.tsx`
- Move `app/page.tsx` to `app/(main)/page.tsx`
- Root `app/layout.tsx` keeps only: fonts, metadata, html/body tags
- Create `app/(offer)/layout.tsx` — minimal, no Navbar/Footer
- Create `app/(admin)/layout.tsx` — admin chrome

### Phase 3: Database & Storage
- Create SQL migration file with tables, RLS policies, storage bucket
- User runs this in Supabase SQL Editor (documented in README)

### Phase 4: Admin Authentication
- `app/(admin)/admin/login/page.tsx` — Email/password login form
- Middleware protects `/admin/*` routes (redirect to login if unauthenticated)
- Luxury-styled login page matching site aesthetic

### Phase 5: Admin Dashboard
- `app/(admin)/admin/page.tsx` — List all offers with status badges
- Sortable by date, filterable by status
- Quick actions: copy link, delete, change status

### Phase 6: Offer Form (Create/Edit)
- `components/admin/OfferForm.tsx` — Full form with sections:
  - Client info (name, email, event date, location)
  - Cover image upload
  - Title & intro text (rich text or textarea)
  - Package editor (add/remove packages with features)
  - Gallery images upload
- `components/admin/PackageEditor.tsx` — Dynamic package rows
- `components/admin/ImageUploader.tsx` — Drag & drop → Supabase Storage
- Auto-save as draft

### Phase 7: Client Offer Page
- `app/(offer)/offer/[id]/page.tsx` — Server component, fetches offer data
- Luxury template sections:
  - **OfferHero** — Full-width cover image with client name overlay
  - **OfferIntro** — Personal message from photographer
  - **OfferPackages** — Elegant package cards with features & pricing
  - **OfferGallery** — Sample work in horizontal scroll (reuse Portfolio pattern)
  - **OfferResponse** — Accept/Decline buttons + message textarea
- Animations: fade-in on scroll, parallax (reuse existing components)
- Update offer status to "viewed" on first visit

### Phase 8: Response API
- `app/api/offers/[id]/respond/route.ts` — POST handler
  - Validates decision + message with Zod
  - Inserts into `offer_responses`
  - Updates offer status to "accepted" or "declined"
  - Sends email notification to photographer via Resend

### Phase 9: Polish & Security
- Input sanitization on all user-facing forms
- Rate limiting on response endpoint
- Proper error states and loading states
- Mobile-responsive admin and offer pages

---

## Environment Variables (New)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Key Files to Modify
- `app/layout.tsx` — Strip to bare root (fonts + metadata only)
- `middleware.ts` — New file at project root for Supabase auth
- `next.config.ts` — Add Supabase storage domain to image remotePatterns

## Reusable Existing Code
- `components/ui/AnimateOnScroll.tsx` — Scroll animations on offer pages
- `components/ui/ParallaxImage.tsx` — Parallax effects on offer hero
- `components/ui/SectionTitle.tsx` — Section headings
- `app/globals.css` — Full design system (colors, fonts, animations)
- Portfolio horizontal scroll pattern → OfferGallery

---

## Verification
1. `npm run build` — No errors
2. Admin login flow: `/admin/login` → credentials → redirect to `/admin`
3. Create offer: fill form → upload images → save
4. Copy offer URL → open in incognito → verify luxury template renders
5. Accept/Decline → verify response saved → email sent
6. Mobile: test admin panel + offer page on mobile viewport
7. Security: unauthenticated access to `/admin` redirects to login
8. Security: draft offers not accessible via public URL
