# 🧪 COMPLETE TESTING GUIDE

Test everything to make sure your Teddy Decor website is fully functional!

---

## ✅ CHECKLIST

### Part 1: Image Storage & Display
- [ ] Images upload to cloud
- [ ] Images appear in admin gallery
- [ ] Images appear on public gallery page
- [ ] Images are clear (not blurry)
- [ ] Images load on mobile
- [ ] Images load on tablet
- [ ] Images load on desktop

### Part 2: Bookings
- [ ] Booking form submits successfully
- [ ] Booking saves to Supabase database
- [ ] Booking appears in Admin → Bookings
- [ ] Email notification sent (if Web3Forms configured)

### Part 3: Contact Form
- [ ] Contact form submits successfully
- [ ] Contact saves to Supabase database
- [ ] Email notification sent

### Part 4: Admin Features
- [ ] Admin login works
- [ ] Dashboard shows stats
- [ ] Gallery upload works
- [ ] Gallery delete works
- [ ] Bookings page loads
- [ ] Logo upload works
- [ ] Password change works

---

## 🖼️ TEST 1: IMAGE UPLOAD & CLARITY

### Upload a Test Image:

1. **Go to: https://teddydecor.com/admin/login**
2. **Login** with your admin credentials
3. **Click "Gallery"** in the sidebar
4. **Click "Upload Images"**
5. **Select a HIGH-QUALITY image** (at least 1920x1080px)
6. **Wait for upload to complete**
7. **Look for the success message:**
   - ✅ Should say: **"Uploaded to cloud! ✨"**
   - ❌ Should NOT say: "Uploaded locally!"

### Verify Image Appears in Admin:

1. **Stay on Admin → Gallery page**
2. **You should see your uploaded image**
3. **Click the image** to preview full size
4. **Check if it's clear** (not blurry)

### Verify Image Appears on Public Gallery:

1. **Open a new tab**
2. **Go to: https://teddydecor.com/gallery**
3. **Your uploaded image should appear**
4. **Click on it** to view full size
5. **Check clarity**

### Test on Mobile Device:

1. **Open your phone**
2. **Go to: https://teddydecor.com/gallery**
3. **Images should load** (might take a few seconds)
4. **Check if they're clear**

**✅ PASS if:**
- Image uploads with "Uploaded to cloud!" message
- Image appears in both admin and public gallery
- Image is clear on all devices
- Image loads on mobile/tablet

---

## 📝 TEST 2: BOOKING SUBMISSION

### Submit a Test Booking:

1. **Go to: https://teddydecor.com/booking**
2. **Fill out the form with test data:**
   - Name: `Test User`
   - Email: `test@example.com`
   - Phone: `(555) 123-4567`
   - Event Type: `Birthday Party Decor`
   - Event Date: (pick a future date)
   - Guest Count: `50`
   - Budget: `$1,000 - $2,500`
3. **Click "Submit Booking Request"**
4. **You should be redirected to Thank You page**

### Verify in Supabase:

1. **Go to Supabase Dashboard**
2. **Click "Table Editor"**
3. **Click on `bookings` table**
4. **You should see your test booking!**
   - Name: Test User
   - Email: test@example.com
   - Event Type: Birthday Party Decor

### Verify in Admin Panel:

1. **Go to: https://teddydecor.com/admin/bookings**
2. **You should see your test booking** in the table
3. **Press F12** (open console)
4. **Look for:** `Bookings loaded: From Supabase: 1`

**✅ PASS if:**
- Form submits successfully
- Redirected to Thank You page
- Booking appears in Supabase Table Editor
- Booking appears in Admin → Bookings
- Console shows booking loaded from Supabase

---

## 📧 TEST 3: EMAIL NOTIFICATIONS (Optional)

**Only if you've set up Web3Forms:**

1. **Submit another test booking**
2. **Check your email:** `yonigoteddy@gmail.com`
3. **You should receive an email** with booking details
4. **Check spam folder** if not in inbox

**✅ PASS if:**
- Email arrives within 1 minute
- Email contains all booking details
- Reply-to address is the customer's email

---

## 💬 TEST 4: CONTACT FORM

1. **Go to: https://teddydecor.com/contact**
2. **Fill out the form:**
   - Name: `Test Contact`
   - Email: `contact@example.com`
   - Phone: `(555) 999-8888`
   - Event Type: `Wedding Decor`
   - Message: `This is a test message`
3. **Click "Send Message"**
4. **Should see success message**

### Verify in Supabase:

1. **Go to Supabase → Table Editor**
2. **Click `contact_inquiries` table**
3. **Your message should appear**

**✅ PASS if:**
- Form submits successfully
- Success message appears
- Entry appears in Supabase

---

## 📱 TEST 5: MOBILE RESPONSIVENESS

### Test on Mobile Device (or resize browser):

1. **Open https://teddydecor.com on your phone**
2. **Test these pages:**
   - ✅ Home page
   - ✅ Services page
   - ✅ Gallery page (images load?)
   - ✅ Booking page (form works?)
   - ✅ Contact page

**✅ PASS if:**
- All pages look good on mobile
- Images load properly
- Forms are easy to fill out
- Navigation menu works

---

## 🔐 TEST 6: ADMIN FEATURES

### Test Admin Login:

1. **Go to: https://teddydecor.com/admin/login**
2. **Enter your credentials**
3. **Click "Login"**
4. **Should redirect to dashboard**

### Test Gallery Management:

1. **Go to Admin → Gallery**
2. **Upload an image** (already tested above ✅)
3. **Click the eye icon** to preview
4. **Click the trash icon** to delete
5. **Confirm deletion**
6. **Image should disappear**

### Test Logo Upload:

1. **Go to Admin → Logo**
2. **Upload a test logo** (PNG with transparent background)
3. **Should see preview**
4. **Go to the home page** (open in new tab)
5. **Logo should appear in navigation**

### Test Password Change:

1. **Go to Admin → Settings**
2. **Click "Change Password"**
3. **Fill out the form:**
   - Current Password: (your current password)
   - New Password: (a new strong password)
   - Confirm Password: (same as new)
4. **Click "Change Password"**
5. **Should see success message**
6. **Logout and login with new password** to verify

**✅ PASS if:**
- All admin features work
- Changes are saved
- New password works

---

## 🌐 TEST 7: CROSS-BROWSER TESTING

Test on different browsers:

- [ ] Chrome
- [ ] Firefox
- [ ] Safari (Mac/iOS)
- [ ] Edge
- [ ] Mobile browser (Safari iOS / Chrome Android)

**✅ PASS if:**
- Site works on all browsers
- No console errors
- All features functional

---

## 🎯 FINAL VERIFICATION

### Open Console and Check:

1. **Go to: https://teddydecor.com/admin/bookings**
2. **Press F12** (open console)
3. **Look for these messages:**

✅ **Should see:**
```
🔍 Supabase Environment Check (Fresh Build):
Direct URL check: https://bqitnshpbeoofhgxtbgi.supabase.co
Direct Key check: eyJh...
✅ Supabase client initialized successfully!
Storage bucket: gallery
📊 Bookings loaded:
  - From Supabase: X
  - From localStorage: 0
  - Total real bookings: X
```

❌ **Should NOT see:**
```
❌ Supabase NOT configured
URL type: undefined
Key type: undefined
```

---

## 📊 SUCCESS SUMMARY

After all tests, you should have:

### ✅ Working Features:
- [x] Environment variables loading correctly
- [x] Supabase connection established
- [x] Image uploads to cloud storage
- [x] Images display on all devices (clear, not blurry)
- [x] Bookings save to database
- [x] Bookings appear in admin panel
- [x] Contact form works
- [x] Email notifications (if configured)
- [x] Admin features (gallery, logo, password)
- [x] Mobile responsive
- [x] Cross-browser compatible

### 📈 Database Status:
- `bookings` table: X entries
- `contact_inquiries` table: X entries
- `gallery` storage: X images

---

## 🆘 TROUBLESHOOTING

### Images are blurry:
- Upload higher resolution images (min 1920x1080)
- Check Supabase storage bucket policies
- Verify images are loading from Supabase URL (not localStorage)

### Bookings not appearing:
- Check Supabase Table Editor for entries
- Verify environment variables are set
- Check console for errors
- Make sure tables were created

### Images not loading on mobile:
- Check internet connection
- Wait longer (images from cloud take time)
- Verify storage bucket is public
- Check console errors on mobile

---

**Complete each test and check off the boxes!** Let me know if anything fails. 🧪
