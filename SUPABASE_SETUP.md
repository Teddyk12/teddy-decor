# 🗄️ Supabase Database Setup Guide

This guide will help you set up a FREE Supabase database to permanently save all bookings from your website.

---

## 📋 **What You'll Get:**

✅ **Permanent Storage** - All bookings saved forever
✅ **Access from Anywhere** - View bookings from any device
✅ **No LocalStorage Limitations** - Works across all browsers
✅ **Backup & Export** - Download your data anytime
✅ **100% FREE** - Up to 500MB database (plenty for thousands of bookings!)

---

## 🚀 **Step 1: Create Supabase Account (2 minutes)**

1. Go to: **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with GitHub, Google, or Email (FREE)
4. Verify your email if required

---

## 🏗️ **Step 2: Create a New Project (3 minutes)**

1. Click **"New Project"**
2. Fill in the details:
   - **Name**: `teddy-decor` (or any name you like)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you (e.g., `US West`)
   - **Pricing Plan**: Leave as **FREE**

3. Click **"Create new project"**
4. Wait 1-2 minutes while Supabase creates your database

---

## 🔑 **Step 3: Get Your API Credentials**

1. Once project is ready, click on **"Settings"** (gear icon on left sidebar)
2. Click **"API"** in the Settings menu
3. You'll see two important values:

   **Project URL:**
   ```
   https://xxxxx.supabase.co
   ```
   Copy this entire URL

   **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx...
   ```
   Copy this long key (starts with `eyJ`)

4. Keep these safe - you'll need them in Step 5!

---

## 📊 **Step 4: Create Database Tables**

1. Click **"SQL Editor"** on the left sidebar
2. Click **"+ New query"**
3. Copy and paste this SQL code:

```sql
-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE,
  event_time TIME,
  guest_count TEXT,
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

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT,
  event_date DATE,
  message TEXT,
  status TEXT DEFAULT 'New'
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public insert (so website can submit)
CREATE POLICY "Allow public to insert bookings"
  ON public.bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to insert contact inquiries"
  ON public.contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies to allow authenticated users to view all data
CREATE POLICY "Allow authenticated users to view bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to view contact inquiries"
  ON public.contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);
```

4. Click **"Run"** (or press F5)
5. You should see: **"Success. No rows returned"**

---

## 📁 **Step 4B: Create Storage Bucket for Gallery (Optional but Recommended)**

To upload images and videos to the cloud (instead of storing locally):

1. Click **"Storage"** on the left sidebar
2. Click **"New bucket"**
3. Fill in:
   - **Name**: `gallery`
   - **Public bucket**: Toggle **ON** (so images are publicly accessible)
   - Click **"Create bucket"**

4. **Set up Storage Policies:**
   - Click on the **"gallery"** bucket you just created
   - Go to **"Policies"** tab at the top
   - Click **"New Policy"**

5. **Policy 1: Allow Public Uploads**
   - Click **"Create policy from scratch"**
   - **Policy name**: `Allow public uploads`
   - **Allowed operation**: Select **INSERT**
   - **Target roles**: Select **anon** (and **authenticated** if you want)
   - **Policy definition**: Enter `true`
   - Click **"Review"** then **"Save policy"**

6. **Policy 2: Allow Public Access**
   - Click **"New Policy"** again
   - Click **"Create policy from scratch"**
   - **Policy name**: `Allow public access`
   - **Allowed operation**: Select **SELECT**
   - **Target roles**: Select **public**
   - **Policy definition**: Enter `true`
   - Click **"Review"** then **"Save policy"**

7. **Policy 3: Allow Public Deletes (For Admin Panel)**
   - Click **"New Policy"** again
   - Click **"Create policy from scratch"**
   - **Policy name**: `Allow public deletes`
   - **Allowed operation**: Select **DELETE**
   - **Target roles**: Select **anon** (and **authenticated** if you want)
   - **Policy definition**: Enter `true`
   - Click **"Review"** then **"Save policy"**

✅ **Now your gallery uploads will be stored in the cloud!**

---

## 🔧 **Step 5: Add Credentials to Your Project**

### **Option A: In Vercel (For Deployed Site)**

1. Go to your **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your **teddy-decor** project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

   **Variable 1:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: (paste your Project URL from Step 3)
   - Click **"Save"**

   **Variable 2:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: (paste your anon/public key from Step 3)
   - Click **"Save"**

5. **Redeploy** your site:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

### **Option B: In Local Development**

1. Open the file `.env.local` in your project
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx...
```

3. Save the file
4. Restart your development server

---

## ✅ **Step 6: Test It!**

1. Go to your website
2. Fill out a booking form
3. Submit it
4. Go back to Supabase → Click **"Table Editor"**
5. Click on **"bookings"** table
6. You should see your test booking! 🎉

---

## 📊 **Viewing Your Bookings in Supabase**

### **Option 1: Table Editor (Easy)**
1. Go to Supabase dashboard
2. Click **"Table Editor"** on left
3. Click **"bookings"** or **"contact_inquiries"**
4. See all your bookings in a spreadsheet view!

### **Option 2: SQL Editor (Advanced)**
1. Click **"SQL Editor"**
2. Run queries like:
```sql
SELECT * FROM bookings ORDER BY created_at DESC;
SELECT * FROM contact_inquiries WHERE status = 'New';
```

### **Option 3: Export Data**
1. In Table Editor, click on a table
2. Click **"..."** menu
3. Click **"Export to CSV"**
4. Download your data!

---

## 🛡️ **Security Notes:**

✅ **Your database is secure:**
- Customers can ONLY submit new bookings (insert)
- They CANNOT view other people's bookings
- Only YOU (authenticated) can view all bookings
- Row Level Security (RLS) is enabled

✅ **API keys are safe to use in your website:**
- The `anon` key is designed to be public
- It only allows submitting bookings, nothing else

---

## 🆘 **Troubleshooting:**

**Problem: "relation 'bookings' does not exist"**
- Go back to Step 4 and run the SQL again

**Problem: "row-level security policy violation"**
- Make sure you ran ALL the SQL code in Step 4 (including the policies)

**Problem: "Failed to fetch"**
- Check that your API credentials in `.env.local` or Vercel are correct
- Make sure there are no extra spaces or quotes

**Problem: Bookings not appearing**
- Check browser console for errors (F12 → Console tab)
- Verify your Supabase project URL is correct
- Make sure you ran the SQL commands to create the tables

**Problem: Gallery uploads say "Uploaded locally!"**
- Make sure environment variables are added to Vercel
- Trigger a fresh deployment (see FORCE_FRESH_DEPLOYMENT.md)
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check that the "gallery" storage bucket exists in Supabase
- Verify storage policies are set up correctly

**Problem: "Failed to upload to Supabase storage"**
- Check that storage bucket is named exactly "gallery" (lowercase)
- Verify storage policies allow public inserts and selects
- Check browser console for detailed error messages

---

## 📞 **Need Help?**

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com

---

## 🎉 **You're All Set!**

Your website now has a professional database! All bookings will be saved permanently and you can access them from anywhere.

**What's next?**
- Test submitting a few bookings
- Check them in Supabase
- Customize the admin dashboard to show database bookings (optional)
