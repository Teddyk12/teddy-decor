# 🚀 Force Fresh Deployment - Fix Environment Variables

## Problem
Environment variables added to Vercel AFTER the initial build are not being loaded because Next.js embeds `NEXT_PUBLIC_` variables at BUILD time, not runtime.

## Solution
You need to trigger a fresh build after adding environment variables.

---

## ✅ Step-by-Step Fix

### 1. Verify Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **teddy-decor**
3. Go to **Settings** → **Environment Variables**
4. Verify these variables exist with correct values:

   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   NEXT_PUBLIC_WEB3FORMS_KEY
   ```

5. **IMPORTANT**: Make sure they are applied to:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. Make sure the values are NOT placeholders like:
   - ❌ `YOUR_SUPABASE_URL_HERE`
   - ❌ `YOUR_SUPABASE_ANON_KEY_HERE`
   - ❌ `YOUR_ACCESS_KEY_HERE`

---

### 2. Check Current Values in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Example values:
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 3. Option A: Force Deployment via Git (RECOMMENDED)

This is the most reliable way to force a fresh build:

```bash
# Navigate to project directory
cd teddy-decor

# Make a small change to trigger rebuild
echo "# Build timestamp: $(date)" >> README.md

# Commit and push
git add .
git commit -m "Force fresh deployment to load environment variables"
git push
```

Vercel will automatically detect the push and trigger a new deployment.

---

### 3. Option B: Force Deployment via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Deployments** tab
4. Click the **⋮** (three dots) on the latest deployment
5. Click **Redeploy**
6. **IMPORTANT**: Check the box that says **"Use existing Build Cache"** and make sure it's **UNCHECKED** (we want a FRESH build)
7. Click **Redeploy**
8. Wait for the build to complete (2-5 minutes)

---

### 4. Verify the Fix

After deployment completes:

1. **Open your deployed site** in a NEW incognito/private window
2. Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac) to hard refresh
3. Go to **Admin Panel** → **Gallery Management**
4. Look for the **Environment Diagnostic** box at the top
5. It should show:
   - ✅ Supabase URL: ✓ Set (XX chars)
   - ✅ Supabase Key: ✓ Set (XXX chars)
   - ✅ Green checkmark with "properly configured"

6. **Open Browser Console** (F12 → Console tab)
7. Look for this message:
   ```
   🔍 Supabase Environment Check:
   ✅ Supabase client initialized successfully!
   ```

8. **Test Upload**:
   - Upload a photo in Admin Gallery
   - You should see: **"Uploaded to cloud! ✨ File accessible from all devices"**
   - NOT: "Uploaded locally! Only visible on this device"

---

## 🔍 Diagnostic Tools

### Check Environment Variables via API
Visit this URL in your deployed site:
```
https://teddydecor.com/api/check-env
```

This will show you exactly which environment variables are loaded in the build.

### Check Browser Console
1. Open deployed site
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Go to Admin → Gallery
5. Try to upload a photo
6. Look for detailed logs about Supabase initialization

---

## ❌ Common Mistakes

1. **Environment variables added but no redeploy triggered**
   - Fix: Push to GitHub or manually redeploy

2. **Redeploying with build cache enabled**
   - Fix: Redeploy with "Use existing Build Cache" UNCHECKED

3. **Variables only added to Production, not Preview**
   - Fix: Make sure variables are applied to ALL environments

4. **Placeholder values still in place**
   - Fix: Replace with actual Supabase values

5. **Not hard refreshing browser after deployment**
   - Fix: Press Ctrl+Shift+R or Cmd+Shift+R

6. **Testing on old deployment URL**
   - Fix: Always test on your main domain after deployment

---

## 🎯 Expected Results

After following these steps:

- ✅ Uploads save to Supabase Storage (cloud)
- ✅ Images visible on ALL devices
- ✅ Video uploads work
- ✅ Environment diagnostic shows green checkmark
- ✅ Browser console shows "Supabase client initialized successfully!"
- ✅ Upload message says "Uploaded to cloud! ✨"

---

## 🆘 Still Not Working?

If you've followed all steps and it's still not working:

1. Check the browser console for specific error messages
2. Verify Supabase Storage bucket "gallery" exists with public access policies
3. Check Vercel deployment logs for build errors
4. Make sure you're testing on the LATEST deployment
5. Contact support with:
   - Screenshot of Environment Variables page in Vercel
   - Screenshot of Browser Console when uploading
   - Screenshot of Environment Diagnostic component

---

## 📝 Quick Checklist

- [ ] Environment variables added to Vercel
- [ ] Variables applied to Production, Preview, AND Development
- [ ] Values are actual Supabase values (not placeholders)
- [ ] Triggered fresh deployment (git push or manual redeploy)
- [ ] Waited for build to complete
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Checked Environment Diagnostic shows green
- [ ] Tested upload - message says "cloud" not "locally"
- [ ] Verified image visible on different device

---

**Last Updated**: December 13, 2025
