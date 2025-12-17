# 🎨 How to Add Your Custom Teddy Decor Logo

Your navigation has been updated to display your beautiful logo! Here's how to add your logo file:

## 📋 Quick Steps:

### Step 1: Save Your Logo File
1. Take the logo image you shared (the tent with "TEDDY DECOR" text)
2. Save it as a **PNG file** with a transparent background if possible
3. Name it exactly: `teddy-decor-logo.png`

### Step 2: Add to Your Project

#### Option A: Through File Manager (Easiest)
1. Open your project folder: `teddy-decor`
2. Navigate to: `public/images/`
3. Drag and drop your `teddy-decor-logo.png` file into this folder
4. Done! Refresh your browser to see it

#### Option B: Through Terminal
```bash
# Navigate to images folder
cd teddy-decor/public/images/

# Copy your logo file here (adjust path to your logo file)
cp ~/Desktop/teddy-decor-logo.png ./

# Or download if you have a URL
curl -o teddy-decor-logo.png "YOUR_LOGO_URL_HERE"
```

### Step 3: Verify
1. Start or restart your dev server: `bun run dev`
2. Open http://localhost:3000
3. You should see your logo in the top left corner!

---

## 📐 Logo Specifications

**Recommended Dimensions:**
- Width: 400-800px
- Height: 400-800px
- Format: PNG with transparent background
- File size: Under 500KB for fast loading

**Your Logo Will Display As:**
- Desktop: 48x48px in the navigation
- Mobile: 40x40px in the navigation
- Scales automatically to fit

---

## 🎨 Current Setup

The navigation now shows:
- ✅ Your logo image (when file is added)
- ✅ "Teddy Decor" text next to logo
- ✅ "Creating Unforgettable Moments" tagline (desktop only)
- ✅ Smooth hover animation
- ✅ Responsive design for mobile

---

## 🔄 If Logo Doesn't Show

If your logo doesn't appear after adding the file:

1. **Check filename exactly matches:** `teddy-decor-logo.png` (lowercase, with dash)
2. **Check location:** File must be in `public/images/` folder
3. **Hard refresh browser:** Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. **Check browser console:** Press F12, look for any image loading errors
5. **Restart dev server:** Stop and run `bun run dev` again

---

## 💡 Pro Tips

**Want to use a different filename?**
Edit `src/components/navigation.tsx` and change line with:
```typescript
src="/images/teddy-decor-logo.png"
```
to your filename.

**Want a bigger or smaller logo?**
Edit the same file and change:
```typescript
className="relative w-12 h-12 flex-shrink-0"
```
Numbers like `w-12` and `h-12` control size (in Tailwind, 12 = 48px)

**Remove the text and keep only logo?**
Delete or comment out the text div in `navigation.tsx`

---

## 📁 File Location

Your logo file goes here:
```
teddy-decor/
└── public/
    └── images/
        └── teddy-decor-logo.png  ← Put your logo here!
```

---

**Your navigation is ready to shine with your custom branding!** ✨
