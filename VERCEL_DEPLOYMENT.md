# 🚀 Vercel Deployment Guide - Teddy Decor

This guide will walk you through deploying your Teddy Decor website to Vercel (100% FREE for this project).

---

## ✅ **Why Vercel?**

- **FREE Forever** for personal projects
- **Built for Next.js** (made by the same company)
- **Automatic HTTPS** with free SSL certificates
- **Global CDN** for fast loading worldwide
- **Zero Configuration** needed
- **Easy Custom Domain** setup
- **Automatic Deployments** from GitHub

---

## 📋 **What You'll Get:**

✅ Live website at: `https://teddy-decor.vercel.app` (or custom name)
✅ Automatic HTTPS/SSL
✅ Global CDN (fast worldwide)
✅ Automatic updates when you push to GitHub
✅ Free custom domain support (e.g., teddydecor.com)

---

## 🚀 **Step 1: Sign Up for Vercel (2 minutes)**

1. Go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account
5. You're in! 🎉

---

## 📦 **Step 2: Import Your GitHub Repository**

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"teddy-decor"** and click **"Import"**

---

## ⚙️ **Step 3: Configure Your Project (1 minute)**

Vercel will auto-detect your Next.js settings. Verify these:

- **Framework Preset:** Next.js ✅ (auto-detected)
- **Root Directory:** `./` (leave as is)
- **Build Command:** `npm run build` ✅ (auto-detected)
- **Output Directory:** `.next` ✅ (auto-detected)
- **Install Command:** `npm install` ✅ (auto-detected)

### Environment Variables (Optional - Add Later):

You can add these NOW or LATER (after deployment):

Click **"Environment Variables"** and add:

```
NEXT_PUBLIC_WEB3FORMS_KEY = (your Web3Forms key - optional)
NEXT_PUBLIC_SUPABASE_URL = (your Supabase URL - optional)
NEXT_PUBLIC_SUPABASE_ANON_KEY = (your Supabase key - optional)
```

**Note:** The site works perfectly WITHOUT these! They're only needed for:
- Web3Forms: Email notifications
- Supabase: Database storage (falls back to localStorage)

---

## 🎉 **Step 4: Deploy!**

1. Click **"Deploy"**
2. Wait 2-3 minutes while Vercel builds your site
3. You'll see a **"Congratulations!"** screen
4. Your site is LIVE! 🚀

---

## 🌐 **Step 5: Access Your Live Website**

Your site will be available at:
```
https://teddy-decor.vercel.app
```
or
```
https://teddy-decor-[random].vercel.app
```

Click **"Visit"** to see your live website!

---

## 🎨 **Step 6: Customize Your URL (Optional)**

### Change Project Name:
1. Go to **Settings** → **General**
2. Under **"Project Name"**, change it to `teddy-decor`
3. Your URL becomes: `https://teddy-decor.vercel.app`

### Add Custom Domain (e.g., teddydecor.com):
1. Go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `teddydecor.com`
4. Follow the DNS instructions from Vercel
5. Your site will be live at your custom domain!

---

## 🔄 **Automatic Updates**

Every time you push changes to GitHub:
1. Vercel automatically detects the changes
2. Builds a new version
3. Deploys it live
4. Takes 2-3 minutes

**Example Workflow:**
```bash
# Make changes locally
git add .
git commit -m "Updated homepage images"
git push origin main

# Vercel automatically deploys! 🚀
```

---

## 🔧 **Adding Environment Variables Later**

If you want to add Supabase or Web3Forms later:

1. Go to your project dashboard
2. Click **Settings** → **Environment Variables**
3. Add your variables:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co`
   - Click **"Save"**
4. **Important:** Redeploy for changes to take effect:
   - Go to **Deployments**
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

---

## 📊 **Monitoring Your Site**

### View Analytics:
1. Go to **Analytics** tab
2. See page views, visitors, and performance

### Check Build Logs:
1. Go to **Deployments** tab
2. Click on any deployment
3. View **"Building"** logs to see details

### Domain Settings:
1. Go to **Settings** → **Domains**
2. Manage all your domains and SSL certificates

---

## 🛡️ **Security & Performance**

✅ **Automatic HTTPS** - Free SSL certificate
✅ **DDoS Protection** - Built-in security
✅ **Global CDN** - Fast loading worldwide
✅ **Edge Network** - Optimized delivery
✅ **Automatic Compression** - Smaller file sizes

---

## ✨ **Testing Your Deployment**

After deployment, test these features:

1. **Homepage** - Check all images load
2. **Services Page** - Click through all service cards
3. **Booking Form** - Submit a test booking
4. **Contact Form** - Submit a test inquiry
5. **Admin Login** - Try logging in (admin@teddydecor.com / admin123)
6. **Gallery** - Check images display correctly
7. **Mobile View** - Test on your phone

---

## 🆘 **Troubleshooting**

### Build Failed?
- Check the build logs in Vercel
- Look for error messages
- Common fixes:
  - Make sure all dependencies are in `package.json`
  - Check for TypeScript errors (already disabled)

### Images Not Loading?
- Make sure image URLs are accessible
- Check browser console for CORS errors
- Verify `next.config.js` has `images.unoptimized: true`

### Forms Not Submitting?
- Without Supabase: Data saves to localStorage (works offline)
- With Supabase: Check environment variables are set correctly

### Environment Variables Not Working?
- Make sure they start with `NEXT_PUBLIC_`
- Redeploy after adding new variables
- Check spelling and formatting

---

## 📞 **Need Help?**

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs

---

## 🎉 **You're All Set!**

Your Teddy Decor website is now live on Vercel!

**What's Next?**
- ✅ Test all features on the live site
- ✅ Share the URL with clients
- ✅ Set up Supabase database (optional - see SUPABASE_SETUP.md)
- ✅ Connect custom domain (optional)
- ✅ Update contact info and images as needed

---

## 🌟 **Pro Tips**

1. **Preview Deployments:** Every branch gets its own preview URL
2. **Rollback:** Click on any previous deployment to rollback instantly
3. **Custom Headers:** Add security headers in `next.config.js`
4. **Edge Functions:** Vercel supports serverless functions out of the box
5. **Team Collaboration:** Invite team members from Settings

Enjoy your live website! 🚀✨
