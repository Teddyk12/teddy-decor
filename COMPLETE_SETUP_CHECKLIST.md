# ✅ COMPLETE SETUP CHECKLIST

**Follow these steps in order to get your Teddy Decor website fully functional!**

---

## 📊 Quick Status Check

Check off each item as you complete it:

### Environment Setup
- [ ] Supabase account created
- [ ] Supabase database tables created
- [ ] Supabase storage bucket created
- [ ] Web3Forms account created
- [ ] Environment variables added to Vercel
- [ ] Fresh deployment triggered
- [ ] Everything tested and working

---

# PART 1: WEB3FORMS EMAIL SETUP (10 minutes)

## Why This Matters
Get instant email notifications when customers book events or contact you!

### Step 1: Create Free Web3Forms Account

1. Go to: **https://web3forms.com**
2. Click **"Get Started Free"**
3. Sign up with your email: `yonigoteddy@gmail.com`
4. Verify your email address
5. ✅ **You're in!**

### Step 2: Get Your Access Key

1. Once logged in, you'll see your **Access Key**
2. It looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
3. **Copy this key** - you'll need it in Step 4!

### Step 3: Configure Email Settings (Optional but Recommended)

1. In Web3Forms dashboard, go to **Settings**
2. Set **"From Name"**: `Teddy Decor Website`
3. Set **"Reply-To Email"**: `yonigoteddy@gmail.com`
4. Enable **"Email Notifications"**: ON
5. Save changes

### Step 4: Add to Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **teddy-decor** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key**: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - **Value**: (paste your Access Key from Step 2)
   - **Environments**: Check all three (Production, Preview, Development)
5. Click **Save**

✅ **Email notifications configured!**

---

# PART 2: SUPABASE DATABASE SETUP (15 minutes)

## Why This Matters
Store all bookings and gallery images in the cloud permanently!

### Step 1: Create Free Supabase Account

1. Go to: **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with GitHub or Google (FREE forever)
4. Verify your email if required

### Step 2: Create New Project

1. Click **"New Project"**
2. Choose organization (or create new one)
3. Fill in project details:
   - **Name**: `teddy-decor`
   - **Database Password**: Create a strong password and **SAVE IT!**
   - **Region**: Choose closest to you (e.g., `US West (Oregon)`)
   - **Pricing Plan**: **Free** (stays selected)
4. Click **"Create new project"**
5. ⏳ Wait 1-2 minutes for setup to complete

### Step 3: Create Database Tables

1. Once project is ready, click **"SQL Editor"** in left sidebar
2. Click **"+ New query"**
3. **Copy and paste this ENTIRE SQL code:**

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

-- Allow public to INSERT (submit bookings)
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

-- Allow anyone to SELECT (read) - since admin login is password protected
CREATE POLICY "Allow anyone to view bookings"
  ON public.bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anyone to view contact inquiries"
  ON public.contact_inquiries
  FOR SELECT
  TO anon, authenticated
  USING (true);
```

4. Click **"Run"** button (or press F5)
5. You should see: ✅ **"Success. No rows returned"**

### Step 4: Create Storage Bucket for Gallery

1. Click **"Storage"** in left sidebar
2. Click **"New bucket"**
3. Configure bucket:
   - **Name**: `gallery` (exactly this - lowercase)
   - **Public bucket**: Toggle **ON** ✅
   - **File size limit**: 50 MB
   - **Allowed MIME types**: Leave default
4. Click **"Create bucket"**

### Step 5: Set Storage Policies

1. Click on the **"gallery"** bucket you just created
2. Go to **"Policies"** tab at the top
3. **Create 3 policies:**

#### Policy 1: Allow Public Uploads
- Click **"New Policy"**
- Click **"For full customization"** or **"Create policy from scratch"**
- **Policy name**: `Allow public uploads`
- **Policy definition**:
  ```sql
  (true)
  ```
- **Allowed operation**: Check **INSERT**
- **Target roles**: Select **anon** and **authenticated**
- Click **"Review"** then **"Save policy"**

#### Policy 2: Allow Public Access
- Click **"New Policy"** again
- Click **"For full customization"**
- **Policy name**: `Allow public access`
- **Policy definition**:
  ```sql
  (true)
  ```
- **Allowed operation**: Check **SELECT**
- **Target roles**: Select **public**
- Click **"Review"** then **"Save policy"**

#### Policy 3: Allow Public Deletes
- Click **"New Policy"** again
- Click **"For full customization"**
- **Policy name**: `Allow public deletes`
- **Policy definition**:
  ```sql
  (true)
  ```
- **Allowed operation**: Check **DELETE**
- **Target roles**: Select **anon** and **authenticated**
- Click **"Review"** then **"Save policy"**

### Step 6: Get Your API Credentials

1. Click **"Settings"** (gear icon) in left sidebar
2. Click **"API"** in the settings menu
3. **Copy these two values:**

   📋 **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   📋 **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx...
   ```

4. **Keep these safe!** You'll need them next.

### Step 7: Add Supabase Credentials to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **teddy-decor** project
3. Go to **Settings** → **Environment Variables**
4. Add TWO new variables:

   **Variable 1:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: (paste your Project URL from Step 6)
   - **Environments**: Check all three ✅ Production ✅ Preview ✅ Development
   - Click **Save**

   **Variable 2:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: (paste your anon/public key from Step 6)
   - **Environments**: Check all three ✅ Production ✅ Preview ✅ Development
   - Click **Save**

✅ **Supabase configured!**

---

# PART 3: FORCE FRESH DEPLOYMENT (5 minutes)

## ⚠️ CRITICAL: Environment variables are embedded at BUILD time!

You MUST trigger a new deployment for the variables to work.

### Option A: Use the Script (Easiest)

**On Mac/Linux:**
```bash
cd teddy-decor
./force-deploy.sh
```

**On Windows:**
```bash
cd teddy-decor
force-deploy.bat
```

### Option B: Manual Git Push

```bash
cd teddy-decor
git add .
git commit -m "Add Supabase and Web3Forms environment variables"
git push
```

### Option C: Vercel Dashboard

1. Go to Vercel → **Deployments** tab
2. Click **⋮** (three dots) on the latest deployment
3. Click **"Redeploy"**
4. **UNCHECK** "Use existing Build Cache" ⚠️
5. Click **"Redeploy"**
6. ⏳ Wait 2-5 minutes for build to complete

---

# PART 4: VERIFY EVERYTHING WORKS (5 minutes)

### Test 1: Environment Variables Loaded

1. Go to: `https://teddydecor.com/api/check-env`
2. You should see: `"configured": true` ✅
3. Check that all three variables show as "exists: true"

### Test 2: Check Admin Panel

1. Go to: `https://teddydecor.com/admin/gallery`
2. Look for the **Environment Diagnostic** box at the top
3. Should show **GREEN** with checkmarks ✅
4. Should say "properly configured"

### Test 3: Upload Gallery Image

1. Still in Admin Gallery
2. Click **"Upload Photos/Videos"**
3. Select a test image
4. ✅ Should say: **"Uploaded to cloud! ✨ File accessible from all devices"**
5. ❌ Should NOT say: "Uploaded locally!"

### Test 4: View Image on Another Device

1. Open `https://teddydecor.com/gallery` on your phone
2. You should see the image you just uploaded ✅
3. This confirms cloud storage is working!

### Test 5: Test Booking Form

1. Go to: `https://teddydecor.com/booking`
2. Fill out the booking form with test data
3. Submit the form
4. Check your email (`yonigoteddy@gmail.com`) ✅
5. You should receive a booking notification!

### Test 6: Check Supabase Database

1. Go to Supabase dashboard
2. Click **"Table Editor"**
3. Click **"bookings"** table
4. You should see your test booking ✅

---

# 🎉 SUCCESS CHECKLIST

After completing all steps, verify:

- ✅ Email notification received when booking submitted
- ✅ Booking appears in Supabase database
- ✅ Booking appears in Admin Panel
- ✅ Gallery images upload to cloud (message says "cloud")
- ✅ Gallery images visible on all devices
- ✅ Environment Diagnostic shows green checkmark
- ✅ `/api/check-env` shows all variables configured

---

# 📧 Email Notification Settings

### Fix Spam Issues

If emails go to spam:

1. **Gmail:**
   - Open the email in Spam folder
   - Click "Not Spam"
   - Create filter: From `notifications@web3forms.com`
   - Action: "Never send to Spam"

2. **Add to Contacts:**
   - Add `notifications@web3forms.com` to your contacts
   - This helps Gmail recognize it as legitimate

3. **Check Web3Forms Dashboard:**
   - Make sure "Email Notifications" is enabled
   - Verify your email address is correct

---

# 🆘 Troubleshooting

### Issue: Variables Not Loading

**Solution:**
1. Double-check variable names are EXACT (case-sensitive)
2. Make sure applied to all environments
3. Trigger fresh deployment (see Part 3)
4. Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`

### Issue: Gallery Uploads Still Say "Locally"

**Solution:**
1. Check browser console (F12) for errors
2. Verify storage bucket named exactly "gallery"
3. Verify all 3 storage policies exist
4. Force fresh deployment
5. Clear browser cache completely

### Issue: No Email Notifications

**Solution:**
1. Check Web3Forms key is correct
2. Verify key applied to all environments in Vercel
3. Check spam/junk folder
4. Verify email in Web3Forms dashboard settings
5. Test with Web3Forms testing tool

### Issue: Bookings Not in Database

**Solution:**
1. Check SQL commands ran successfully
2. Verify both tables exist in Table Editor
3. Check RLS policies are created
4. Test with browser console open to see errors
5. Verify Supabase URL and key are correct

---

# 📞 Need More Help?

- 📖 **Supabase Docs**: https://supabase.com/docs
- 📧 **Web3Forms Docs**: https://docs.web3forms.com
- 💬 **Supabase Discord**: https://discord.supabase.com

---

**Last Updated**: December 13, 2025
**Your website will be fully functional after completing these steps!** 🚀
