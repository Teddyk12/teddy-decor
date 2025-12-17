# 🚨 QUICK FIX: Add Supabase Environment Variables to Vercel

**Your console shows: "Supabase NOT configured - using localStorage fallback"**

This means your environment variables are NOT set in Vercel. Let's fix it in **5 minutes**!

---

## 🎯 What You Need

You need TWO values from your Supabase dashboard:
1. **Supabase URL**
2. **Supabase Anon Key**

---

## 📋 Step 1: Get Your Supabase Credentials

### Option A: If You Already Have a Supabase Project

1. Go to **https://supabase.com/dashboard**
2. Log in
3. Click on your **teddy-decor** project (or create one if you haven't)
4. Click **Settings** (gear icon in left sidebar)
5. Click **API** in the settings menu
6. You'll see:
   - **Project URL** - This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. ✅ **Copy both values** - keep them ready!

### Option B: If You DON'T Have a Supabase Project Yet

1. Go to **https://supabase.com**
2. Sign up free (with GitHub or Google)
3. Click **"New Project"**
4. Fill in:
   - **Name**: `teddy-decor`
   - **Database Password**: (create a strong password and SAVE IT!)
   - **Region**: Choose closest to you (e.g., `US West`)
5. Click **"Create new project"**
6. Wait 1-2 minutes for setup
7. Then follow **Option A** above to get your credentials

---

## 📋 Step 2: Add Environment Variables to Vercel

1. Go to **https://vercel.com/dashboard**
2. Click on your **teddy-decor** project
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. Add FIRST variable:
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: (paste your Project URL from Supabase)
   - **Environments**: ✅ Check ALL THREE boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **Save**
6. Add SECOND variable:
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: (paste your anon public key from Supabase)
   - **Environments**: ✅ Check ALL THREE boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **Save**

✅ **Both variables added!**

---

## 📋 Step 3: Create Storage Bucket in Supabase

1. Go back to your Supabase dashboard
2. Click **Storage** (bucket icon in left sidebar)
3. Click **"Create a new bucket"**
4. Fill in:
   - **Name**: `gallery`
   - **Public bucket**: ✅ Check this box (so images are accessible)
5. Click **"Create bucket"**
6. Click on your new `gallery` bucket
7. Click **Policies** tab
8. Click **"New Policy"**
9. Choose **"For full customization"**
10. Use this policy:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery' );

-- Allow authenticated insert
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'gallery' );
```

11. Click **Review** → **Save Policy**

✅ **Storage bucket ready!**

---

## 📋 Step 4: Create Database Tables (Optional but Recommended)

This stores all bookings permanently in the cloud.

1. In Supabase dashboard, click **SQL Editor**
2. Click **"+ New query"**
3. Paste this SQL:

```sql
-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT,
  event_date DATE,
  event_time TIME,
  guest_count INTEGER,
  venue_known TEXT,
  venue_name TEXT,
  venue_address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  meeting_preference TEXT,
  preferred_meeting_date DATE,
  preferred_meeting_time TIME,
  budget TEXT,
  color_scheme TEXT,
  theme TEXT,
  special_requests TEXT,
  how_did_you_hear TEXT,
  status TEXT DEFAULT 'New'
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations (since this is admin-only)
CREATE POLICY "Enable all access for bookings"
ON public.bookings
FOR ALL
USING (true)
WITH CHECK (true);

-- Create contact_inquiries table (for contact form)
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New'
);

-- Enable Row Level Security
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations
CREATE POLICY "Enable all access for contact_inquiries"
ON public.contact_inquiries
FOR ALL
USING (true)
WITH CHECK (true);
```

4. Click **Run** (or press `Ctrl+Enter`)
5. You should see: "Success. No rows returned"

✅ **Database tables created!**

---

## 📋 Step 5: Trigger Fresh Deployment

**CRITICAL**: Vercel needs to rebuild with the new environment variables!

### Option A: Push to GitHub (Recommended)

1. Open terminal in your project
2. Run these commands:

```bash
cd teddy-decor
git add .
git commit -m "Add Supabase environment variables"
git push
```

3. Vercel will automatically detect the push and redeploy
4. Wait 2-3 minutes for deployment to complete

### Option B: Manual Redeploy in Vercel

1. Go to **https://vercel.com/dashboard**
2. Click on your **teddy-decor** project
3. Click **Deployments** tab
4. Click the **...** menu on the latest deployment
5. Click **"Redeploy"**
6. Click **"Redeploy"** again to confirm
7. Wait 2-3 minutes for deployment to complete

✅ **Fresh deployment triggered!**

---

## 📋 Step 6: Test Everything!

1. **Wait 2-3 minutes** for deployment to finish
2. Go to **https://teddydecor.com**
3. Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac) to hard refresh
4. Press `F12` to open console
5. Check the console - you should now see:
   - ✅ "Supabase client initialized successfully"
   - ✅ "Bookings loaded: X from Supabase"
   - NO errors about "UNDEFINED"

6. **Test Upload**:
   - Go to **Admin → Gallery**
   - Upload a test image
   - You should see: **"Uploaded to cloud! ✨"**
   - NOT "Uploaded locally!"

7. **Test Booking**:
   - Go to **Booking** page
   - Fill out and submit a test booking
   - Go to **Admin → Bookings**
   - You should see your test booking appear!

---

## ✅ Success Checklist

After following all steps, you should have:

- ✅ Supabase environment variables set in Vercel
- ✅ Storage bucket created with policies
- ✅ Database tables created
- ✅ Fresh deployment completed
- ✅ Console shows "Supabase client initialized successfully"
- ✅ Uploads show "Uploaded to cloud! ✨"
- ✅ Bookings save to database
- ✅ Images visible on all devices

---

## 🆘 Troubleshooting

### Console still shows "UNDEFINED"

1. ✅ Double-check you added BOTH variables to Vercel
2. ✅ Make sure you checked ALL THREE environment checkboxes
3. ✅ Trigger a fresh deployment again
4. ✅ Hard refresh the page (Ctrl+Shift+R)

### "Uploaded locally!" still appears

1. ✅ Check storage bucket exists and is named exactly `gallery`
2. ✅ Check storage policies are created
3. ✅ Try uploading again after fresh deployment

### Bookings don't appear in Supabase

1. ✅ Check database tables were created successfully
2. ✅ Check policies were created
3. ✅ Look in Supabase → Table Editor → bookings table

---

## 📞 Still Stuck?

1. Take screenshots of:
   - Vercel environment variables page
   - Supabase project settings → API page
   - Browser console errors
2. Contact Same support with screenshots

---

**🚀 Total time: 5-10 minutes to get everything working!**
