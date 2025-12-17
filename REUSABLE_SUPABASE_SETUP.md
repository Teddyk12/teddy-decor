# 🚀 COMPLETE SUPABASE + VERCEL SETUP GUIDE
## (Reusable for Any Project)

This guide contains everything you need to set up Supabase cloud storage and database for any website.

---

## 📋 PART 1: SUPABASE PROJECT SETUP

### Step 1: Create Supabase Project

1. Go to: **https://supabase.com/dashboard**
2. Click **"New Project"**
3. Fill in:
   - **Name:** `your-project-name`
   - **Database Password:** Create a strong password (SAVE IT!)
   - **Region:** Choose closest to you (e.g., `US West`)
   - **Pricing Plan:** Free
4. Click **"Create new project"**
5. Wait 1-2 minutes for setup

---

## 📋 PART 2: CREATE DATABASE TABLES

### Step 1: Open SQL Editor

1. Click **"SQL Editor"** in left sidebar
2. Click **"+ New query"**

### Step 2: Copy & Paste This SQL

```sql
-- ============================================
-- EVENT BOOKING WEBSITE DATABASE
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

-- 4. Create policies (allow all access)
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

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON public.bookings(event_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_email ON public.contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_inquiries(created_at DESC);
```

### Step 3: Run the SQL

1. Click **"Run"** (or press Ctrl + Enter)
2. Should see: **"Success. No rows returned"**

### Step 4: Verify Tables

1. Click **"Table Editor"** in left sidebar
2. Should see:
   - ✅ `bookings`
   - ✅ `contact_inquiries`

---

## 📋 PART 3: CREATE STORAGE BUCKET

### Step 1: Create Bucket

1. Click **"Storage"** in left sidebar
2. Click **"Create a new bucket"**
3. Fill in:
   - **Name:** `gallery`
   - **Public bucket:** ✅ CHECK THIS (important!)
4. Click **"Create bucket"**

### Step 2: Create Storage Policies

1. Click on the **`gallery`** bucket
2. Click **"Policies"** tab
3. Click **"New Policy"**
4. Click **"For full customization"**
5. Copy and paste this SQL:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery' );

-- Allow public uploads
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'gallery' );
```

6. Click **"Review"** → **"Save Policy"**

---

## 📋 PART 4: GET YOUR CREDENTIALS

### Step 1: Find Your Supabase Keys

1. Click **Settings** (gear icon) in left sidebar
2. Click **"API"**
3. You'll see:

**Project URL:**
```
https://YOUR-PROJECT-ID.supabase.co
```
Copy this - it's your `NEXT_PUBLIC_SUPABASE_URL`

**anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
Copy this - it's your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📋 PART 5: ADD TO VERCEL

### Step 1: Add Environment Variables

1. Go to: **https://vercel.com/dashboard**
2. Click your project
3. Click **Settings** → **Environment Variables**

### Step 2: Add These 3 Variables

**Variable 1:**
- Key: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://YOUR-PROJECT-ID.supabase.co`
- Environments: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

**Variable 2:**
- Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Environments: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

**Variable 3 (Optional - for email notifications):**
- Key: `NEXT_PUBLIC_WEB3FORMS_KEY`
- Value: (Get from https://web3forms.com)
- Environments: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

---

## 📋 PART 6: CONFIGURE VERCEL BUILD SETTINGS

### Step 1: Check Build Settings

1. Go to **Settings** → **Build & Development Settings**
2. Make sure these are correct:

**Framework Preset:** Next.js

**Build Command:**
- Override: ❌ OFF (or use `next build`)

**Output Directory:**
- Override: ❌ OFF (or use `.next`)

**Install Command:**
- Override: ❌ OFF

3. Click **Save**

---

## 📋 PART 7: DEPLOY

### Step 1: Trigger Fresh Deployment

1. Go to **Deployments** tab
2. Click **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. **IMPORTANT:** Uncheck "Use existing Build Cache"
5. Click **"Redeploy"**

### Step 2: Wait for Build

- Should take 2-3 minutes
- Wait for **"Ready"** status

---

## 📋 PART 8: CODE INTEGRATION

### Add Supabase Client to Your Project

**File: `src/lib/supabase.ts`**

```typescript
// Supabase client with proper Next.js environment variable access
let supabaseInstance: any = null;
let initializationAttempted = false;

function getEnvVar(key: string): string | undefined {
  // Next.js requires direct property access for build-time replacement
  if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
    return process.env.NEXT_PUBLIC_SUPABASE_URL;
  }
  if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }
  return undefined;
}

export async function getSupabase(): Promise<any> {
  if (typeof window === 'undefined') {
    return null;
  }

  if (supabaseInstance !== null) {
    return supabaseInstance;
  }

  if (initializationAttempted && supabaseInstance === null) {
    return null;
  }

  initializationAttempted = true;

  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  console.log('🔍 Supabase Environment Check:');
  console.log('  URL exists:', !!supabaseUrl);
  console.log('  Key exists:', !!supabaseAnonKey);

  const isUrlValid = supabaseUrl && supabaseUrl.length > 20;
  const isKeyValid = supabaseAnonKey && supabaseAnonKey.length > 100;

  if (!isUrlValid || !isKeyValid) {
    console.warn('❌ Supabase NOT configured');
    return null;
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized successfully!');
    return supabaseInstance;
  } catch (error) {
    console.error('❌ Failed to create Supabase client:', error);
    return null;
  }
}
```

### Install Supabase Package

```bash
bun add @supabase/supabase-js
# or
npm install @supabase/supabase-js
```

---

## 📋 PART 9: USAGE EXAMPLES

### Example 1: Upload Image to Storage

```typescript
import { getSupabase } from '@/lib/supabase';

async function uploadImage(file: File) {
  const supabase = await getSupabase();

  if (supabase) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(fileName, file);

    if (!error) {
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      console.log('Uploaded to:', publicUrl);
      return publicUrl;
    }
  }

  // Fallback to localStorage
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result);
    reader.readAsDataURL(file);
  });
}
```

### Example 2: Save Booking to Database

```typescript
import { getSupabase } from '@/lib/supabase';

async function saveBooking(bookingData: any) {
  const supabase = await getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        event_type: bookingData.eventType,
        event_date: bookingData.eventDate,
        status: 'New'
      }])
      .select();

    if (!error) {
      console.log('Saved to Supabase:', data);
      return data;
    }
  }

  // Fallback to localStorage
  localStorage.setItem('bookings', JSON.stringify([bookingData]));
}
```

### Example 3: Load Bookings from Database

```typescript
import { getSupabase } from '@/lib/supabase';

async function loadBookings() {
  const supabase = await getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      console.log('Loaded from Supabase:', data);
      return data;
    }
  }

  // Fallback to localStorage
  const saved = localStorage.getItem('bookings');
  return saved ? JSON.parse(saved) : [];
}
```

---

## ✅ VERIFICATION CHECKLIST

After setup, verify these:

- [ ] Supabase project created
- [ ] Database tables created (`bookings`, `contact_inquiries`)
- [ ] Storage bucket created (`gallery`)
- [ ] Storage bucket is PUBLIC
- [ ] Storage policies created
- [ ] Got Supabase URL
- [ ] Got Supabase Anon Key
- [ ] Added environment variables to Vercel
- [ ] Checked ALL 3 environment checkboxes
- [ ] Turned OFF build overrides in Vercel
- [ ] Triggered fresh deployment (no cache)
- [ ] Deployment shows "Ready"
- [ ] Console shows "Supabase client initialized successfully!"
- [ ] Test upload shows "Uploaded to cloud!"

---

## 🆘 TROUBLESHOOTING

### Images still saving locally
- Check storage bucket is PUBLIC
- Verify storage policies exist
- Check environment variables are set

### Bookings not saving to database
- Verify tables were created
- Check table policies allow INSERT
- Verify environment variables are correct

### Environment variables showing UNDEFINED
- Check variable names are EXACT (case-sensitive)
- Make sure all 3 environment boxes are checked
- Trigger fresh deployment WITHOUT cache
- Hard refresh browser (Ctrl+Shift+R)

---

## 📝 NOTES FOR DIFFERENT PROJECTS

### For Portfolio Sites:
- Keep `gallery` bucket
- Remove `bookings` table if not needed
- Add `projects` table if needed

### For E-commerce:
- Add `products` table
- Add `orders` table
- Add `customers` table

### For Blogs:
- Add `posts` table
- Add `comments` table
- Add `authors` table

---

## 🔗 USEFUL LINKS

- Supabase Dashboard: https://supabase.com/dashboard
- Supabase Docs: https://supabase.com/docs
- Vercel Dashboard: https://vercel.com/dashboard
- Web3Forms: https://web3forms.com

---

**🎉 This setup works for ANY Next.js project with Supabase + Vercel!**

**Just copy this file and follow the steps for each new project.**
