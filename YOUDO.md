# ✅ WHAT YOU NEED TO DO (Only 2 Things!)

Everything else is done in Same. You just need to visit these 2 websites:

---

## 1️⃣ CREATE DATABASE TABLES (5 minutes)

**Link:** https://supabase.com/dashboard

**Steps:**
1. Click on your `teddy-decor` project
2. Click **SQL Editor** (left sidebar)
3. Click **+ New query**
4. Open the file `AVAILABILITY_CALENDAR_SETUP.sql` in your project
5. Copy ALL the SQL code
6. Paste it into the Supabase SQL Editor
7. Click **RUN** (or press F5)
8. You should see: ✅ "Success"

**What this does:**
- Creates the `availability_calendar` table (so you can control which dates are available)
- Creates the `booking_status_history` table (tracks all changes)
- Updates the `bookings` table (adds fields for your approval messages)

---

## 2️⃣ ADD EMAIL API KEY (3 minutes)

**Link 1:** https://web3forms.com (Get your key)
**Link 2:** https://vercel.com/dashboard (Add it to your project)

**Steps to get key:**
1. Go to https://web3forms.com
2. Click **"Get Started Free"**
3. Sign up with your email
4. Copy your **Access Key** (looks like: a1b2c3d4-e5f6...)

**Steps to add key to Vercel:**
1. Go to https://vercel.com/dashboard
2. Click your **teddy-decor** project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Fill in:
   - **Key:** `NEXT_PUBLIC_WEB3FORMS_KEY`
   - **Value:** (paste your access key from web3forms)
   - **Environments:** Check ALL THREE boxes (Production, Preview, Development)
6. Click **Save**

**What this does:**
- Allows your website to send beautiful confirmation emails to customers
- You'll get automatic emails when you approve/reject bookings

---

## ✅ THAT'S IT!

After you do those 2 things:

1. Your website will automatically redeploy (wait 2-3 minutes)
2. Then go to: **https://teddydecor.com/admin/availability**
3. You'll see a visual calendar
4. Click dates to open/close them for bookings
5. Go to **https://teddydecor.com/admin/bookings** to manage booking requests

---

## 🎯 WHAT YOU'LL HAVE:

### Availability Calendar
- Click any future date to open/close it
- Green = Available for bookings
- Red = Closed (customers can't book)
- Set max bookings per day
- Bulk edit multiple dates at once

### Booking Approval Workflow
- Customer submits booking → Goes to "Pending"
- You see it in admin panel → Click "Confirm" or "Reject"
- Add your personal message → System sends beautiful email
- Booking status updates automatically

### Professional Emails
- Customer gets HTML email with:
  - Their booking details
  - Your personal message highlighted
  - Your contact information
  - Professional Teddy Decor branding

---

## 📞 HELP

If something doesn't work:
1. Make sure you ran the SQL in Supabase (Step 1)
2. Make sure you added the Web3Forms key to Vercel (Step 2)
3. Wait 2-3 minutes for Vercel to redeploy
4. Refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

---

**Total time: 8 minutes to complete both steps** ⏱️

Then you're ready to start managing bookings like a pro! 🎉
