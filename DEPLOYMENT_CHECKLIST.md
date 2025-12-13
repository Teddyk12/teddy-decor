# 🚀 Teddy Decor - Complete Deployment Checklist

Follow this step-by-step guide to deploy your website to Vercel with custom domain and email notifications!

---

## 📋 **Pre-Deployment Checklist**

- ✅ Website built successfully (all 19 pages)
- ✅ All features tested locally
- ✅ Contact info updated (yonigoteddy@gmail.com, (206) 739-2365)
- ✅ About page shows "Teddy"
- ✅ Admin login credentials ready (admin@teddydecor.com / admin123)

---

## 🎯 **STEP 1: Deploy to Vercel** (5 minutes)

### 1.1 Sign Up for Vercel
- [ ] Go to: https://vercel.com
- [ ] Click **"Sign Up"**
- [ ] Choose **"Continue with GitHub"**
- [ ] Authorize Vercel to access your GitHub

### 1.2 Import Your Project
- [ ] Click **"Add New..."** → **"Project"**
- [ ] Find **"teddy-decor"** repository
- [ ] Click **"Import"**

### 1.3 Configure Project
- [ ] Verify settings (should auto-detect):
  - Framework Preset: **Next.js** ✅
  - Build Command: **npm run build** ✅
  - Output Directory: **.next** ✅
- [ ] Click **"Deploy"** (don't add environment variables yet)

### 1.4 Wait for Deployment
- [ ] Wait 2-3 minutes for build to complete
- [ ] You'll see "🎉 Congratulations!"
- [ ] Note your temporary URL: `https://teddy-decor-[random].vercel.app`
- [ ] Click **"Visit"** to see your live site!

**✅ Checkpoint:** Your website is now live!

---

## 📧 **STEP 2: Set Up Email Notifications** (5 minutes)

### 2.1 Get Web3Forms API Key
- [ ] Go to: https://web3forms.com
- [ ] Click **"Get Started for Free"**
- [ ] Enter email: **yonigoteddy@gmail.com**
- [ ] Click **"Create Access Key"**
- [ ] Check your email inbox
- [ ] Click the verification link
- [ ] Copy your Access Key (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### 2.2 Add API Key to Vercel
- [ ] Go back to Vercel dashboard
- [ ] Click on your **teddy-decor** project
- [ ] Go to **Settings** → **Environment Variables**
- [ ] Click **"Add New"**
- [ ] Enter:
  - **Key:** `NEXT_PUBLIC_WEB3FORMS_KEY`
  - **Value:** (paste your Web3Forms access key)
  - **Environment:** Select all (Production, Preview, Development)
- [ ] Click **"Save"**

### 2.3 Redeploy to Apply Changes
- [ ] Go to **Deployments** tab
- [ ] Click **"..."** on the latest deployment
- [ ] Click **"Redeploy"**
- [ ] Wait 2-3 minutes

**✅ Checkpoint:** Email notifications are now active! You'll receive emails at yonigoteddy@gmail.com

---

## 🌐 **STEP 3: Connect Custom Domain** (10 minutes)

### 3.1 Add Domain in Vercel
- [ ] In your Vercel project, go to **Settings** → **Domains**
- [ ] Click **"Add Domain"**
- [ ] Enter: **teddydecor.com**
- [ ] Click **"Add"**

### 3.2 Vercel will Show DNS Configuration
You'll see instructions like:

**For Root Domain (teddydecor.com):**
- Type: **A**
- Name: **@**
- Value: **76.76.21.21**

**For www Subdomain (www.teddydecor.com):**
- Type: **CNAME**
- Name: **www**
- Value: **cname.vercel-dns.com**

### 3.3 Update DNS Records (At Your Domain Registrar)

**Where you bought teddydecor.com (e.g., GoDaddy, Namecheap, Google Domains):**

- [ ] Log in to your domain registrar
- [ ] Find DNS Settings / DNS Management
- [ ] Add the A record:
  - Type: **A**
  - Host/Name: **@** (or leave blank)
  - Value/Points to: **76.76.21.21**
  - TTL: **Auto** or **3600**
- [ ] Add the CNAME record:
  - Type: **CNAME**
  - Host/Name: **www**
  - Value/Points to: **cname.vercel-dns.com**
  - TTL: **Auto** or **3600**
- [ ] Save changes

### 3.4 Wait for DNS Propagation
- [ ] Wait 5-30 minutes (usually takes ~10 minutes)
- [ ] Vercel will automatically detect when DNS is configured
- [ ] You'll see a green checkmark ✅ next to your domain

### 3.5 Set Primary Domain
- [ ] In Vercel → Domains
- [ ] Click **"..."** next to **teddydecor.com**
- [ ] Select **"Set as Primary Domain"**

**✅ Checkpoint:** Your website is now live at https://teddydecor.com! 🎉

---

## 🧪 **STEP 4: Test Everything** (10 minutes)

### 4.1 Test Homepage
- [ ] Visit: https://teddydecor.com
- [ ] Check hero image loads
- [ ] Check all 5 service cards display
- [ ] Verify "Teddy Decor" branding
- [ ] Test navigation menu
- [ ] Click "Book Now" button

### 4.2 Test Services Page
- [ ] Click **Services** in navigation
- [ ] Verify all service cards load
- [ ] Click on a service card
- [ ] Should navigate to booking form with pre-filled event type

### 4.3 Test Booking Form
- [ ] Go to booking page
- [ ] Fill out the form with test data:
  - Use your own email for testing
  - Select "Wedding Decor" or any event type
  - Fill in all required fields
  - Add some special requests
- [ ] Click **"Submit Booking Request"**
- [ ] Should redirect to Thank You page
- [ ] **Check your email (yonigoteddy@gmail.com)** within 30 seconds
- [ ] You should receive a formatted email with all booking details

### 4.4 Test Contact Form
- [ ] Click **Contact** or go to /contact
- [ ] Fill out the contact form with test data
- [ ] Submit the form
- [ ] Should redirect to Thank You page
- [ ] **Check your email** - should receive contact inquiry

### 4.5 Test Admin Dashboard
- [ ] Go to: https://teddydecor.com/admin/login
- [ ] Login with:
  - Email: **admin@teddydecor.com**
  - Password: **admin123**
- [ ] Should redirect to admin dashboard
- [ ] Check bookings page - your test booking should appear
- [ ] Test gallery manager
- [ ] Test all admin features

### 4.6 Test Gallery
- [ ] Visit Gallery page
- [ ] Verify all images load
- [ ] Test filter buttons (All, Weddings, Birthdays, etc.)
- [ ] Images should filter correctly

### 4.7 Test About Page
- [ ] Visit About page
- [ ] Verify it says **"Teddy"** (not "Yohannes")
- [ ] Check all content displays correctly
- [ ] Verify contact info shows yonigoteddy@gmail.com

### 4.8 Test Mobile Responsiveness
- [ ] Open site on your phone
- [ ] Or use Chrome DevTools (F12) → Toggle Device Toolbar
- [ ] Test all pages on mobile view
- [ ] Navigation menu should work
- [ ] Forms should be easy to fill out
- [ ] All buttons should be clickable

### 4.9 Test Email Notifications
- [ ] Submit 2-3 test bookings
- [ ] **Check spam folder** if emails don't arrive
- [ ] Add notifications@web3forms.com to contacts
- [ ] Mark emails as "Not Spam" if needed
- [ ] Future emails should go to inbox

**✅ Checkpoint:** All features working perfectly!

---

## 🎯 **STEP 5: Optional Enhancements**

### 5.1 Set Up Supabase Database (Optional)
- [ ] Follow: **SUPABASE_SETUP.md**
- [ ] Create free Supabase account
- [ ] Set up database tables
- [ ] Add Supabase env variables to Vercel
- [ ] Redeploy

### 5.2 SEO Optimization (Optional)
- [ ] Add meta descriptions
- [ ] Set up Google Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Verify with Google Search Console

### 5.3 Social Media (Optional)
- [ ] Update Instagram/Facebook links in footer
- [ ] Share your new website URL
- [ ] Add social sharing images

---

## 📊 **Post-Deployment Monitoring**

### Daily Tasks:
- [ ] Check email for new bookings
- [ ] Respond to inquiries within 24 hours
- [ ] Review admin dashboard for new submissions

### Weekly Tasks:
- [ ] Check Web3Forms dashboard for submission stats
- [ ] Review Vercel analytics
- [ ] Backup important bookings

### Monthly Tasks:
- [ ] Review and update gallery images
- [ ] Update service pricing if needed
- [ ] Check for any website errors

---

## 🆘 **Common Issues & Solutions**

### Issue: Emails Not Arriving
**Solution:**
- Check spam/junk folder
- Verify Web3Forms API key in Vercel
- Make sure you redeployed after adding key
- Add notifications@web3forms.com to contacts

### Issue: Domain Not Working
**Solution:**
- DNS takes 5-30 minutes to propagate
- Verify DNS records are correct at your registrar
- Check Vercel domains page for status
- Try clearing browser cache

### Issue: Forms Not Submitting
**Solution:**
- Check browser console for errors (F12)
- Verify internet connection
- Try different browser
- Check if localStorage is enabled

### Issue: Admin Login Not Working
**Solution:**
- Use correct credentials:
  - Email: admin@teddydecor.com
  - Password: admin123
- Clear browser cache and cookies
- Try incognito/private mode

---

## 🎉 **Success Checklist**

- ✅ Website live at https://teddydecor.com
- ✅ Email notifications working (yonigoteddy@gmail.com)
- ✅ All forms tested and working
- ✅ Admin dashboard accessible
- ✅ Mobile responsive
- ✅ Custom domain connected
- ✅ SSL certificate active (https)
- ✅ All 19 pages working perfectly

---

## 📞 **Support Resources**

- **Vercel Documentation:** https://vercel.com/docs
- **Web3Forms Support:** https://docs.web3forms.com
- **DNS Help:** https://vercel.com/docs/projects/domains
- **Email Setup:** See **EMAIL_NOTIFICATIONS_SETUP.md**
- **Database Setup:** See **SUPABASE_SETUP.md**

---

## 🌟 **Next Steps**

1. **Share Your Website:**
   - Post on social media
   - Update your business cards
   - Add to email signature
   - Tell your clients!

2. **Promote Your Business:**
   - Instagram: Share gallery photos
   - Facebook: Post event highlights
   - Google My Business: Update website URL

3. **Track Your Success:**
   - Monitor email notifications
   - Check booking requests daily
   - Respond quickly to inquiries
   - Build your portfolio

---

## 🎊 **Congratulations!**

Your Teddy Decor website is now:
- ✅ Live and professional
- ✅ Receiving bookings 24/7
- ✅ Sending you instant email notifications
- ✅ Accessible at your custom domain
- ✅ Ready to grow your business!

**You're all set! Start receiving bookings and growing your event decor business!** 🚀✨

---

**Deployment Date:** _______________
**Custom Domain:** https://teddydecor.com
**Email:** yonigoteddy@gmail.com
**Phone:** (206) 739-2365
