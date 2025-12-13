# 📧 Email Notifications Setup Guide

Get instant email notifications when customers book events or contact you!

---

## ✅ **What You'll Get:**

- ✉️ **Instant Email Alerts** - Get notified immediately when someone submits a form
- 📋 **All Form Details** - Receive complete booking/contact information
- 🆓 **100% FREE** - Up to 250 submissions per month (more than enough!)
- ⚡ **No Coding Required** - Just add one API key
- 📱 **Works Everywhere** - Desktop, mobile, all browsers

**Emails will be sent to:** yonigoteddy@gmail.com

---

## 🚀 **Step 1: Get Your Free Web3Forms API Key (2 minutes)**

1. Go to: **https://web3forms.com**
2. Click **"Get Started for Free"**
3. Enter your email: **yonigoteddy@gmail.com**
4. Click **"Create Access Key"**
5. **Check your email** for the verification link
6. Click the verification link
7. You'll see your **Access Key** - it looks like this:
   ```
   a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```
8. **Copy this key** - you'll need it in Step 2!

---

## 🔧 **Step 2: Add API Key to Vercel (1 minute)**

### **After you deploy to Vercel:**

1. Go to your **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your **teddy-decor** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Fill in:
   - **Key**: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - **Value**: (paste your Web3Forms access key from Step 1)
   - **Environment**: Select all (Production, Preview, Development)
6. Click **"Save"**

### **Important: Redeploy Your Site**
1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes for the deployment to complete

---

## 📬 **What Emails Will You Receive?**

### **Booking Form Submissions:**
You'll receive an email with:
- Customer's full name
- Email address
- Phone number
- Event type (Wedding, Birthday, etc.)
- Event date and time
- Guest count
- Venue information
- Meeting preference (online or in-person)
- Budget range
- Color scheme and theme
- Special requests
- How they heard about you

### **Contact Form Submissions:**
You'll receive an email with:
- Customer's name
- Email address
- Phone number
- Event type
- Proposed event date
- Their message/vision

---

## ✨ **Email Template Example:**

```
Subject: New Event Booking: Wedding Decor - Sarah Johnson

From: Teddy Decor Website

---

NEW BOOKING REQUEST

Personal Information:
• Name: Sarah Johnson
• Email: sarah@email.com
• Phone: (206) 555-1234

Event Details:
• Type: Wedding Decor
• Date: June 15, 2025
• Time: 4:00 PM
• Guests: 150

Venue:
• Name: The Grand Ballroom
• Address: 123 Main St, Seattle, WA 98101

Meeting Preference:
• Preferred: In-Person Meeting
• Date: May 1, 2025
• Time: 2:00 PM

Budget & Style:
• Budget: $5,000 - $10,000
• Colors: Blush pink and gold
• Theme: Romantic garden

Special Requests:
"We'd love to incorporate lots of flowers and candlelight..."

How They Found You: Instagram

---
Submitted at: April 28, 2025 at 10:30 AM
```

---

## 🧪 **Step 3: Test Your Email Notifications**

After redeploying with the API key:

1. Go to your live website
2. Fill out the **Booking Form** or **Contact Form**
3. Use your own email for testing
4. Submit the form
5. **Check your inbox** (yonigoteddy@gmail.com)
6. You should receive the notification within seconds!

**Tip:** Check your spam folder if you don't see it immediately.

---

## 🔒 **Security & Privacy**

✅ **Safe & Secure:**
- Web3Forms is GDPR compliant
- No data is stored on their servers
- Emails are sent directly to you
- Your API key is kept private in Vercel

✅ **What Happens to Form Data:**
1. Customer submits form on your website
2. Data is saved to localStorage (backup)
3. Data is sent to Supabase (if configured)
4. Email notification sent to you via Web3Forms
5. Customer redirected to thank you page

---

## 📊 **Web3Forms Dashboard**

You can track your submissions:

1. Go to: https://web3forms.com/dashboard
2. Login with your email
3. See statistics:
   - Total submissions this month
   - Remaining quota
   - Recent submissions
   - Success/failure rates

---

## 🎯 **Free Plan Limits**

- ✅ **250 submissions/month** (resets monthly)
- ✅ Unlimited email recipients
- ✅ Custom email templates
- ✅ Spam filtering included
- ✅ File attachments (up to 5MB)

**Need more?** Upgrade to Pro for $5/month (1,000 submissions)

---

## 🆘 **Troubleshooting**

### **Not Receiving Emails?**

1. **Check Spam/Junk Folder**
   - Web3Forms emails might go to spam initially
   - Mark as "Not Spam" to train your email filter

2. **Verify Email Address**
   - Make sure you verified your email with Web3Forms
   - Check the verification email from Web3Forms

3. **Check API Key**
   - Go to Vercel → Settings → Environment Variables
   - Make sure `NEXT_PUBLIC_WEB3FORMS_KEY` is correct
   - No extra spaces or quotes

4. **Redeploy After Adding Key**
   - Changes only take effect after redeployment
   - Go to Deployments → Redeploy

5. **Test the API Key**
   - Visit: https://web3forms.com/dashboard
   - Check if submissions are being logged

### **Emails Going to Spam?**

- Add `notifications@web3forms.com` to your contacts
- Create a filter rule to always inbox Web3Forms emails
- This is common for the first few emails

### **Want to Change Notification Email?**

1. Go to Web3Forms dashboard
2. Update your account email
3. Or create a new access key with different email

---

## 🌟 **Pro Tips**

### **Multiple Email Recipients:**
Want notifications sent to multiple emails? Add this to your booking form:

1. Your main email: yonigoteddy@gmail.com
2. A team member or assistant
3. A backup email

Just add multiple emails separated by commas in the Web3Forms dashboard.

### **Custom Reply-To:**
The customer will receive an auto-reply confirmation (optional):
- Set this up in Web3Forms dashboard
- Customize the message
- Include next steps

### **Email Filtering:**
Create email filters to organize bookings:
- Filter by subject: "Wedding Decor" → Wedding folder
- Filter by subject: "Birthday Party" → Birthday folder
- Never miss an important booking!

---

## 📱 **Mobile Notifications**

Want push notifications on your phone?

1. **Gmail App:**
   - Enable notifications for yonigoteddy@gmail.com
   - Get instant alerts on your phone

2. **IFTTT Integration:**
   - Connect Web3Forms to IFTTT
   - Send SMS when form is submitted
   - Create custom automations

---

## ✅ **Quick Setup Summary**

1. ✉️ Get Web3Forms key from https://web3forms.com
2. 🔧 Add key to Vercel environment variables
3. 🚀 Redeploy your site
4. 🧪 Test by submitting a form
5. 📬 Receive email at yonigoteddy@gmail.com

**Time Required:** 5 minutes total!

---

## 🎉 **You're All Set!**

Once configured, you'll receive instant email notifications for every:
- 📅 Event booking request
- 💬 Contact form submission
- 📝 Customer inquiry

Never miss a potential client again! 🚀

---

## 📞 **Need Help?**

- Web3Forms Docs: https://docs.web3forms.com
- Web3Forms Support: support@web3forms.com
- Test Your Setup: https://web3forms.com/playground

---

**Happy booking! Your customers will love how professional and responsive you are!** ✨
