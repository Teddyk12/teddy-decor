# 🔧 Troubleshooting Supabase Connection

This guide will help you fix issues with Supabase not connecting (uploads showing "Uploaded locally!" instead of "Uploaded to cloud!").

---

## 🎯 Quick Diagnosis

### Step 1: Access the Debug Page

1. Go to your deployed site: `https://teddydecor.com` (or your Vercel URL)
2. Add `/admin/debug` to the URL: `https://teddydecor.com/admin/debug`
3. You'll see a detailed status of all environment variables

### Step 2: Check What You See

**✅ GOOD - All Green Checkmarks:**
```
✅ Supabase URL: YES (>20 chars)
✅ Supabase Anon Key: YES (>100 chars)
✅ Supabase Client: Initialized
✅ Storage Bucket Test: Success
```
If you see all green checkmarks, Supabase is connected! 🎉

**❌ BAD - Red X Marks:**
```
❌ Supabase URL: NO or INVALID
❌ Supabase Anon Key: NO or INVALID
❌ Supabase Client: Not Initialized
❌ Storage Bucket Test: Failed
```
If you see red X marks, continue to Step 3.

---

## 🛠️ Step 3: Fix Environment Variables in Vercel

### 3.1 - Go to Vercel Dashboard

1. Open: https://vercel.com/dashboard
2. Click on your **teddy-decor** project
3. Click **"Settings"** tab (top navigation)
4. Click **"Environment Variables"** in left sidebar

### 3.2 - Verify Variables Exist

You should see these 3 variables:

| Variable Name | Value Preview | Environments |
|--------------|---------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx...supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1...` | Production, Preview, Development |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | `a1b2c3d4-...` | Production, Preview, Development |

### 3.3 - If Variables Are Missing

Click **"Add New"** and add each one:

**For Supabase URL:**
- Key: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://xxxxxxxxxxxxx.supabase.co` (from your Supabase project)
- Environments: ✅ Production, ✅ Preview, ✅ Development

**For Supabase Anon Key:**
- Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long key from Supabase)
- Environments: ✅ Production, ✅ Preview, ✅ Development

**For Web3Forms:**
- Key: `NEXT_PUBLIC_WEB3FORMS_KEY`
- Value: Your Web3Forms access key
- Environments: ✅ Production, ✅ Preview, ✅ Development

### 3.4 - IMPORTANT: Variable Name Requirements

⚠️ **Critical:** The variable names MUST start with `NEXT_PUBLIC_`

**Correct:**
```
NEXT_PUBLIC_SUPABASE_URL ✅
NEXT_PUBLIC_SUPABASE_ANON_KEY ✅
```

**Wrong (will not work):**
```
SUPABASE_URL ❌
SUPABASE_ANON_KEY ❌
```

Next.js only exposes environment variables to the browser if they start with `NEXT_PUBLIC_`

---

## 🚀 Step 4: Redeploy Your Site

After adding or updating environment variables:

### 4.1 - Force a Fresh Deployment

1. Go to **"Deployments"** tab
2. Find the latest deployment (top of the list)
3. Click the **"..."** menu button (three dots on the right)
4. Click **"Redeploy"**
5. A popup appears asking to confirm
6. Click **"Redeploy"** again

### 4.2 - Wait for Deployment

- Wait 2-3 minutes for the deployment to complete
- You'll see "Building" → "Deploying" → "Ready"
- Don't close the page during deployment

### 4.3 - IMPORTANT: Clear Build Cache (If Still Not Working)

If redeploying doesn't work:

1. Go to **"Settings"** → **"General"**
2. Scroll down to **"Build & Development Settings"**
3. Look for **"Clear Build Cache"** or similar option
4. Click it, then redeploy again

OR

1. Make a small code change (add a comment anywhere)
2. Push to GitHub
3. This triggers a fresh build automatically

---

## 🧪 Step 5: Test the Fix

### 5.1 - Check Debug Page Again

1. After deployment completes, go to: `https://teddydecor.com/admin/debug`
2. Click **"Refresh Check"** button
3. You should now see all green checkmarks ✅

### 5.2 - Test Gallery Upload

1. Go to: `https://teddydecor.com/admin/gallery`
2. Click **"Upload Photos/Videos"**
3. Select an image from your device
4. Wait for upload to complete
5. You should see: **"Uploaded to cloud! ✨ File accessible from all devices"**
6. ❌ If you still see "Uploaded locally!", continue to Step 6

---

## 🔍 Step 6: Advanced Debugging

### 6.1 - Check Browser Console

1. On your deployed site, press **F12** to open DevTools
2. Click **"Console"** tab
3. Look for messages starting with `🔍 Supabase Environment Check:`
4. You should see:
   ```
   🔍 Supabase Environment Check:
     URL exists: true
     URL length: 50 (or similar)
     URL value: https://xxxxx.supabase.co...
     Key exists: true
     Key length: 200+ (or similar)
     Key value: eyJhbGci...
   ```

### 6.2 - What Console Logs Tell You

**If you see this:**
```
❌ Supabase not configured - using localStorage fallback
   Reason: URL or Key missing/invalid
```

**It means:**
- Environment variables are NOT being loaded in the browser
- Possible causes:
  1. Variable names don't start with `NEXT_PUBLIC_`
  2. Deployment happened before variables were added
  3. Build cache is using old build without variables

**Fix:**
1. Double-check variable names in Vercel (must start with `NEXT_PUBLIC_`)
2. Redeploy with cache cleared
3. Wait 5 minutes, then hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

---

## 🆘 Step 7: Common Issues & Solutions

### Issue 1: "Variables are set but still not working"

**Solution:**
1. Delete the environment variables in Vercel
2. Re-add them exactly as specified (copy-paste from Supabase)
3. Make sure all 3 environments are checked (Production, Preview, Development)
4. Redeploy
5. Wait 5 minutes
6. Hard refresh browser

### Issue 2: "Upload says 'Uploaded locally' on deployed site"

**Cause:** Environment variables are not exposed to the browser.

**Solution:**
1. Variable names MUST start with `NEXT_PUBLIC_`
2. Verify in Vercel dashboard
3. Redeploy after fixing

### Issue 3: "Debug page shows variables but upload still fails"

**Cause:** Supabase storage bucket or policies not set up correctly.

**Solution:**
1. Go to your Supabase project: https://supabase.com/dashboard
2. Click **"Storage"** in left sidebar
3. Make sure you have a bucket named **"gallery"**
4. Click on the gallery bucket
5. Go to **"Policies"** tab
6. Make sure you have these policies:
   - **Allow public uploads** (INSERT policy)
   - **Allow public reads** (SELECT policy)
   - **Allow public deletes** (DELETE policy)

Follow the **SUPABASE_SETUP.md** guide for detailed instructions.

### Issue 4: "Storage Test fails with 'Bucket not found'"

**Solution:**
1. Go to Supabase Dashboard → Storage
2. Click **"New bucket"**
3. Name: **gallery**
4. Public bucket: **YES**
5. Click **"Create bucket"**
6. Add policies (see SUPABASE_SETUP.md)

### Issue 5: "Deployment keeps using old code"

**Solution: Force Fresh Build**
1. Make a tiny change to any file (add a comment)
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Force rebuild"
   git push
   ```
3. Vercel automatically deploys with fresh cache

---

## ✅ Verification Checklist

Before considering this fixed, verify:

- [ ] Debug page shows all green checkmarks
- [ ] Browser console shows Supabase initialized
- [ ] Upload shows "Uploaded to cloud! ✨"
- [ ] Uploaded images have URLs like `https://xxxxx.supabase.co/storage/v1/object/public/gallery/...`
- [ ] Images uploaded on one device are visible on another device
- [ ] Bookings save to Supabase (check Supabase Dashboard → Table Editor → bookings)

---

## 📞 Still Having Issues?

### Check These Files in Your Project:

1. **Environment Variable Names:**
   - Must be exactly: `NEXT_PUBLIC_SUPABASE_URL`
   - Must be exactly: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Case-sensitive!

2. **Supabase Values:**
   - URL should look like: `https://xxxxxxxxxxxxx.supabase.co`
   - Key should be very long (200+ characters), starting with `eyJ...`

3. **Deployment:**
   - Make sure you redeployed AFTER adding variables
   - Variables added before deployment won't work without redeploy

### Debug URLs:

- Debug Page: `https://teddydecor.com/admin/debug`
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://supabase.com/dashboard

---

## 🎯 Expected Results After Fix

**Before Fix:**
- ❌ Uploads show: "Uploaded locally! Only visible on this device"
- ❌ Debug page shows red X marks
- ❌ Console shows: "Supabase not configured"

**After Fix:**
- ✅ Uploads show: "Uploaded to cloud! ✨ File accessible from all devices"
- ✅ Debug page shows green checkmarks
- ✅ Console shows: "Supabase client initialized successfully"
- ✅ Images accessible from all devices
- ✅ Bookings save to Supabase database

---

## 🌟 Success!

Once everything works:
- Gallery images will be stored in Supabase cloud storage
- Accessible from any device
- Bookings will be saved to Supabase database
- Email notifications will work via Web3Forms

**Your Teddy Decor website is fully cloud-connected!** 🚀✨
