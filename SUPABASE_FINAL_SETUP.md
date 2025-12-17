# 🗄️ SUPABASE DATABASE SETUP - FINAL STEP

Your Supabase storage is working! Now let's create the database tables so bookings save to the cloud.

---

## 📋 STEP 1: Create Database Tables

1. **Go to your Supabase Dashboard**
   - URL: https://supabase.com/dashboard

2. **Click on your `teddy-decor` project**

3. **Click "SQL Editor"** in the left sidebar

4. **Click "+ New query"** button

5. **Copy and paste this ENTIRE SQL code:**

```sql
-- ============================================
-- TEDDY DECOR DATABASE TABLES
-- ============================================

-- 1. Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Personal Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,

  -- Event Details
  event_type TEXT,
  event_date DATE,
  event_time TIME,
  guest_count INTEGER,

  -- Venue Information
  venue_known TEXT,
  venue_name TEXT,
  venue_address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,

  -- Meeting Preference
  meeting_preference TEXT,
  preferred_meeting_date DATE,
  preferred_meeting_time TIME,

  -- Additional Details
  budget TEXT,
  color_scheme TEXT,
  theme TEXT,
  special_requests TEXT,
  how_did_you_hear TEXT,

  -- Status
  status TEXT DEFAULT 'New'
);

-- 2. Create contact_inquiries table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT,
  event_date DATE,
  message TEXT,
  status TEXT DEFAULT 'New'
);

-- 3. Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 4. Create policies (allow all access for now - you can restrict later)
CREATE POLICY "Enable all access for bookings"
ON public.bookings
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable all access for contact_inquiries"
ON public.contact_inquiries
FOR ALL
USING (true)
WITH CHECK (true);

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON public.bookings(event_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_email ON public.contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_inquiries(created_at DESC);
```

6. **Click "Run"** (or press `Ctrl+Enter`)

7. **You should see:**
   - ✅ "Success. No rows returned"
   - Or a list of successful CREATE statements

---

## ✅ STEP 2: Verify Tables Were Created

1. **Click "Table Editor"** in the left sidebar

2. **You should see TWO new tables:**
   - ✅ `bookings`
   - ✅ `contact_inquiries`

3. **Click on `bookings` table** to view its structure

---

## 🖼️ STEP 3: Verify Storage Bucket Policies

Your images are uploading, but let's make sure they're publicly accessible.

1. **Click "Storage"** in the left sidebar

2. **Click on the `gallery` bucket**

3. **Click "Policies"** tab

4. **You should see at least ONE policy**

5. **If NO policies exist, click "New Policy"** and add:

```sql
-- Allow public read access to all images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery' );

-- Allow public insert (upload)
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'gallery' );
```

---

## ✅ SUCCESS INDICATORS

After completing these steps, you should have:

- ✅ `bookings` table created
- ✅ `contact_inquiries` table created
- ✅ Row Level Security enabled
- ✅ Policies created for database access
- ✅ Storage bucket policies for images
- ✅ Indexes created for performance

---

## 🧪 TESTING (We'll do this next)

After creating the tables, we'll test:
1. Submit a test booking
2. Check if it appears in Supabase Table Editor
3. Check if it appears in Admin → Bookings
4. Verify images are clear on all devices

---

**Complete these steps and let me know when you see "Success. No rows returned"!** ✅
