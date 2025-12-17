# 🎯 Quick Start - Fix Environment Variables & Supabase

## 🚨 Current Issue

Your gallery uploads and bookings are showing "Uploaded locally!" instead of saving to the cloud. This is because:

1. **Environment variables are not loaded** - Supabase credentials need to be embedded in the build
2. **Storage bucket may not exist** - The "gallery" bucket needs to be created in Supabase
3. **Database tables may not exist** - The "bookings" and "contact_inquiries" tables need to be created

---

## ✅ Complete Fix - Follow These Steps in Order

### Step 1: Check Current Status (2 minutes)

1. Open your deployed site: https://teddydecor.com
2. Go to **Admin Panel** → **Gallery Management**
3. Look for the **yellow or green box** at the top showing "Environment Diagnostic"
4. Note what it says:
   - ❌ Red/Yellow = Not configured
   - ✅ Green = Configured correctly

5. Open **Browser Console** (Press F12 → Console tab)
6. Look for messages like:
   ```
   🔍 Supabase Environment Check:
   URL exists: false
   Key exists: false
   ```

---

### Step 2: Set Up Supabase (10 minutes - One Time Only)

📖 **Follow this detailed guide:** [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)

Quick checklist:
- [ ] Create free Supabase account
- [ ] Create new project
- [ ] Get Project URL and anon key
- [ ] Run SQL commands to create database tables
- [ ] Create "gallery" storage bucket
- [ ] Set up storage policies (allow public upload/delete/select)
- [ ] Save your credentials (you'll need them next)

---

### Step 3: Add Environment Variables to Vercel (5 minutes)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **teddy-decor** project
3. Go to **Settings** → **Environment Variables**
4. Add these THREE variables:

   **Variable 1: Supabase URL**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co` (from Supabase Step 3)
   - Apply to: **Production**, **Preview**, **Development** (check all three!)
   - Click **Save**

   **Variable 2: Supabase Key**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJI...` (from Supabase Step 3)
   - Apply to: **Production**, **Preview**, **Development** (check all three!)
   - Click **Save**

   **Variable 3: Web3Forms (for emails)**
   - Key: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Value: Your Web3Forms key (from https://web3forms.com)
   - Apply to: **Production**, **Preview**, **Development** (check all three!)
   - Click **Save**

✅ **Screenshot your Environment Variables page for reference!**

---

### Step 4: Force Fresh Deployment (5 minutes)

**CRITICAL**: Environment variables are embedded at BUILD time, not runtime. You MUST trigger a new build!

#### Option A: Use the Script (Easiest)

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

#### Option B: Manual Git Push

```bash
cd teddy-decor
echo "# Deployment: $(date)" >> README.md
git add .
git commit -m "Force fresh deployment to load environment variables"
git push
```

#### Option C: Vercel Dashboard

1. Go to Vercel → **Deployments** tab
2. Click **⋮** (three dots) on latest deployment
3. Click **Redeploy**
4. **UNCHECK** "Use existing Build Cache" (very important!)
5. Click **Redeploy**

---

### Step 5: Wait for Deployment (2-5 minutes)

1. Go to Vercel → **Deployments** tab
2. Watch the build progress
3. Wait until it shows **"Ready"** with a green checkmark
4. Note the deployment URL or use your custom domain

---

### Step 6: Verify the Fix (5 minutes)

1. **Open in NEW incognito/private window**: https://teddydecor.com
2. **Hard refresh**: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Go to **Admin Panel** → **Gallery Management**
4. Check the **Environment Diagnostic** box at the top:
   - Should be **GREEN** with checkmarks
   - Should say "✅ Supabase environment variables are properly configured!"

5. **Open Browser Console** (F12 → Console)
6. Look for:
   ```
   ✅ Supabase client initialized successfully!
   URL: https://xxxxx.supabase.co
   Storage bucket: gallery
   ```

7. **Test Upload**:
   - Click "Upload Photos/Videos"
   - Select an image
   - Wait for upload
   - Should say: **"Uploaded to cloud! ✨ File accessible from all devices"**
   - NOT: "Uploaded locally! Only visible on this device"

8. **Test on Different Device**:
   - Open site on phone or another computer
   - Go to Gallery page
   - Uploaded image should be visible!

---

## 🎉 Success Checklist

After following all steps, you should see:

- ✅ Environment Diagnostic shows GREEN with checkmarks
- ✅ Browser console shows "Supabase client initialized successfully!"
- ✅ Uploads say "Uploaded to cloud! ✨"
- ✅ Images visible on all devices
- ✅ Bookings appear in Admin Panel
- ✅ Bookings appear in Supabase Table Editor
- ✅ Email notifications working

---

## 🆘 Still Not Working?

### Diagnostic Steps

1. **Check `/api/check-env` endpoint:**
   - Visit: https://teddydecor.com/api/check-env
   - Should show `"configured": true`
   - Check the `details` section for environment variable values

2. **Check Browser Console:**
   - Press F12 → Console tab
   - Look for error messages
   - Screenshot and share if asking for help

3. **Check Vercel Deployment Logs:**
   - Go to Vercel → Deployments → Click on latest
   - Click "Build Logs"
   - Look for errors related to environment variables

4. **Verify Supabase Storage:**
   - Go to Supabase → Storage
   - Make sure "gallery" bucket exists
   - Click on bucket → Policies tab
   - Should have policies for INSERT, SELECT, DELETE

### Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| Environment Diagnostic still red | Re-check Step 3 & 4, make sure variables are spelled exactly right |
| "Uploaded locally!" message | Force a fresh deployment (Step 4), then hard refresh browser |
| Images not visible on other devices | Check Supabase storage policies allow public SELECT |
| Bookings not showing in admin | Check that database tables exist (run SQL from Supabase setup) |
| Build failing in Vercel | Check build logs for specific error, may need to clear cache |

---

## 📚 Additional Resources

- 📖 **[FORCE_FRESH_DEPLOYMENT.md](./FORCE_FRESH_DEPLOYMENT.md)** - Detailed deployment guide
- 📖 **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Complete Supabase setup with SQL commands
- 📖 **[EMAIL_NOTIFICATIONS_SETUP.md](./EMAIL_NOTIFICATIONS_SETUP.md)** - Configure email alerts
- 📖 **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Vercel deployment guide

---

## 🎯 Quick Commands Reference

```bash
# Force fresh deployment (Mac/Linux)
./force-deploy.sh

# Force fresh deployment (Windows)
force-deploy.bat

# Start local development
bun run dev

# Check environment variables locally
cat .env.local

# Push changes to GitHub
git add .
git commit -m "Your message"
git push
```

---

## 📞 Need Help?

If you're stuck after following ALL these steps:

1. **Screenshot** the Environment Diagnostic component
2. **Screenshot** the Browser Console (F12)
3. **Screenshot** Vercel Environment Variables page
4. **Screenshot** Supabase Storage buckets
5. Share these with support

---

**Last Updated**: December 13, 2025
**Version**: 37
