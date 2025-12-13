# 🎊 Teddy Decor - Event Planning Website

**Professional multi-page event decor and planning website with full admin dashboard**

---

## 🎯 Current Status

✅ **Website Complete** - All pages built and functional
✅ **Your Branding** - Exact logo with dark green + gold colors
✅ **Professional Design** - No watermarks, clean UI
⚠️ **Setup Required** - Need to configure Supabase + Web3Forms (40 minutes)

---

## 🚀 Quick Start

### For First-Time Setup:

1. **Read this first**: `YOUR_NEXT_STEPS.md` ← Action plan
2. **Then follow**: `COMPLETE_SETUP_CHECKLIST.md` ← Step-by-step guide
3. **Run deployment**: `./force-deploy.sh` (Mac/Linux) or `force-deploy.bat` (Windows)
4. **Test**: Visit https://teddydecor.com

### For Development:

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Deploy
git push  # Auto-deploys to Vercel
```

---

## 📁 Project Structure

```
teddy-decor/
├── src/
│   ├── app/              # Next.js pages
│   │   ├── page.tsx      # Homepage
│   │   ├── services/     # Services page
│   │   ├── gallery/      # Public gallery
│   │   ├── booking/      # Booking form
│   │   ├── contact/      # Contact form
│   │   ├── admin/        # Admin dashboard
│   │   └── api/          # API routes
│   ├── components/       # React components
│   └── lib/              # Supabase client
├── public/images/        # Images and assets
├── COMPLETE_SETUP_CHECKLIST.md  # Main setup guide ⭐
├── YOUR_NEXT_STEPS.md    # Action plan ⭐
├── SOLUTION_SUMMARY.md   # Troubleshooting guide
└── force-deploy.sh       # Deployment script
```

---

## ✨ Features

### Public Pages
- **Homepage** - Hero section with balloon decoration background
- **Services** - Event types (Weddings, Birthdays, Baby Showers, etc.)
- **Gallery** - Photo/video portfolio with category filters
- **Booking** - Comprehensive event booking form
- **Contact** - Quick contact form
- **Our Process** - How you work with clients
- **About** - Your story and team

### Admin Dashboard (Password Protected)
- **Gallery Management** - Upload/delete photos & videos
- **Bookings** - View and manage all bookings
- **Contact Inquiries** - View contact form submissions
- **Environment Diagnostics** - Check configuration status

### Backend Features
- **Supabase Integration** - Cloud database + storage
- **Web3Forms** - Email notifications
- **LocalStorage Fallback** - Works without cloud setup
- **Environment Diagnostics** - Built-in troubleshooting

---

## 🎨 Branding

- **Logo**: Your exact Teddy Decor logo (dark green + gold tent design)
- **Colors**: Pink/Rose (#E63462), Gold (#D4AF37), Dark Green (#1A4D2E)
- **Typography**: Professional, elegant fonts
- **Hero Image**: Professional balloon decorations (no watermarks)

---

## 🔧 Setup Requirements

### Required Accounts (Free):
1. **Web3Forms** - Email notifications
   - Create at: https://web3forms.com
   - Email: yonigoteddy@gmail.com
   - Time: 10 minutes

2. **Supabase** - Database + Storage
   - Create at: https://supabase.com
   - Region: US West (or closest)
   - Time: 15 minutes

3. **Vercel** - Hosting (already set up)
   - Domain: https://teddydecor.com
   - Custom domain configured

### Environment Variables Needed:
```bash
NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

**📋 See `COMPLETE_SETUP_CHECKLIST.md` for complete instructions**

---

## 📧 Contact

- **Website**: www.teddydecor.com
- **Email**: yonigoteddy@gmail.com
- **Phone**: (206) 739-2365

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **YOUR_NEXT_STEPS.md** | What to do next (start here!) |
| **COMPLETE_SETUP_CHECKLIST.md** | Complete setup guide |
| **SOLUTION_SUMMARY.md** | Troubleshooting environment variables |
| **FORCE_FRESH_DEPLOYMENT.md** | How to trigger deployment |
| **SUPABASE_SETUP.md** | Detailed Supabase instructions |
| **HOW_TO_ADD_YOUR_LOGO.md** | Logo customization guide |

---

## 🎯 Next Steps

**👉 Open `YOUR_NEXT_STEPS.md` to begin!**

1. Set up Web3Forms (10 min)
2. Set up Supabase (15 min)
3. Add environment variables to Vercel (5 min)
4. Force fresh deployment (2 min)
5. Test everything (5 min)

**Total time: ~40 minutes**

---

## 🚀 Deployment

### Automatic Deployment:
- Every `git push` automatically deploys to Vercel
- Production URL: https://teddydecor.com
- Build time: ~2-5 minutes

### Manual Deployment:
```bash
# Use deployment script
./force-deploy.sh          # Mac/Linux
force-deploy.bat           # Windows

# Or manual
git add .
git commit -m "Your message"
git push
```

---

## 🆘 Support

If you get stuck:
1. Check `COMPLETE_SETUP_CHECKLIST.md` → Troubleshooting
2. Check browser console (F12) for errors
3. Verify environment variables in Vercel
4. Contact Same support with screenshots

---

## 📄 License

© 2025 Teddy Decor. All rights reserved.
**Creating unforgettable moments, one detail at a time.**

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, Supabase, and Vercel**
