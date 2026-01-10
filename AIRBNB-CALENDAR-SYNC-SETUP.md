# Airbnb Calendar Sync Setup Guide

Your direct booking site now syncs automatically with your Airbnb calendar to prevent double-bookings!

## How It Works

1. **Airbnb iCal Feed**: Airbnb provides a special URL that lists all your booked dates
2. **Serverless Function**: Your website fetches this feed every hour and parses the blocked dates
3. **Auto-Update**: The booking calendar automatically shows Airbnb bookings as unavailable
4. **Fallback**: If the sync fails, it uses backup dates so your calendar still works

## Setup Instructions

### Step 1: Get Your Airbnb iCal URL

1. Log into **Airbnb** and go to your listing
2. Click on the **Calendar** tab
3. Click **"Availability settings"** (or "Availability")
4. Scroll to **"Calendar sync"** section
5. Click **"Export calendar"**
6. **Copy the iCal link** - it will look like:
   ```
   https://www.airbnb.com/calendar/ical/52464158.ics?s=abc123xyz456...
   ```

⚠️ **IMPORTANT**: Keep this URL private! Anyone with this link can see your bookings.

### Step 2: Deploy to Netlify (Recommended)

#### A. Sign up for Netlify (if you haven't already)
1. Go to [https://www.netlify.com](https://www.netlify.com)
2. Sign up with GitHub, GitLab, or email
3. Free tier is perfect for this site

#### B. Deploy Your Site

**Option 1: Drag and Drop (Easiest)**
1. Open Netlify dashboard
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag your entire `direct-booking-site` folder onto the upload area
4. Wait for deployment to complete

**Option 2: Connect to Git (Recommended)**
1. Push your code to GitHub/GitLab
2. In Netlify, click **"Add new site"** → **"Import an existing project"**
3. Connect your repository
4. Netlify will auto-deploy on every push

#### C. Add Your Airbnb iCal URL
1. In Netlify dashboard, go to your site
2. Click **"Site configuration"** → **"Environment variables"**
3. Click **"Add a variable"**
4. Add:
   - **Key**: `AIRBNB_ICAL_URL`
   - **Value**: [Paste your Airbnb iCal link]
5. Click **"Save"**
6. Click **"Trigger deploy"** to redeploy with the new variable

### Step 3: Test It

1. Open your deployed site
2. Navigate to the booking calendar
3. Open browser console (F12 → Console tab)
4. Look for message: `Calendar synced with Airbnb: X blocked dates`
5. Verify that your Airbnb bookings show as unavailable

**If you don't see the message:**
- Check that the environment variable is set correctly
- Check that your iCal URL is valid
- The calendar will use fallback dates if sync fails

### Step 4: Verify Sync is Working

1. Go to your **Airbnb calendar**
2. Note which dates are currently booked
3. Go to your **direct booking site calendar**
4. Verify those same dates show as **unavailable (gray)**

## Alternative: Deploy to Vercel

If you prefer Vercel over Netlify:

1. Sign up at [https://vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your repository or upload files
4. Go to **"Settings"** → **"Environment Variables"**
5. Add `AIRBNB_ICAL_URL` with your iCal link
6. Redeploy

**Note**: The serverless function works on both platforms with no changes needed!

## How Often Does It Sync?

- The calendar syncs **every time a visitor loads the booking page**
- Results are **cached for 1 hour** on the server
- This means new Airbnb bookings appear on your site within 1 hour

## Preventing Double-Bookings

Since this is a **request-based booking system**, you have built-in protection:

1. ✅ Calendar shows Airbnb dates as blocked
2. ✅ Guest submits request for available dates
3. ✅ You manually check both calendars before approving
4. ✅ You approve or decline within 24 hours

**Best Practice**: Always check your Airbnb calendar before approving a direct booking request, even though the sync is automatic.

## Two-Way Sync (Optional)

Want Airbnb to also block dates when you get direct bookings?

### Option A: Manual Calendar Update
- When you approve a direct booking, manually block those dates in Airbnb

### Option B: Generate Your Own iCal Feed
You'd need to:
1. Store approved bookings in a database
2. Create a serverless function that generates an iCal feed from your bookings
3. Import that feed into Airbnb's calendar sync

This requires more setup. Let me know if you want help with this!

## Troubleshooting

### "Calendar synced with Airbnb: 0 blocked dates"

**Possible causes:**
- Your Airbnb listing has no current bookings (this is normal!)
- The iCal URL is incorrect
- The iCal URL has expired (Airbnb regenerates them periodically)

**Fix:**
1. Check your Airbnb calendar has bookings
2. Get a fresh iCal URL from Airbnb
3. Update the environment variable in Netlify/Vercel
4. Redeploy

### "Could not fetch blocked dates from API"

**Possible causes:**
- Running the site locally (serverless functions only work when deployed)
- Environment variable not set
- Function deployment failed

**Fix:**
- If testing locally, the calendar will use fallback dates (this is fine)
- If deployed, check environment variables are set
- Check function logs in Netlify/Vercel dashboard

### Calendar shows wrong dates

**Possible causes:**
- Cache not cleared
- Timezone differences

**Fix:**
1. Wait 1 hour for cache to expire
2. Hard refresh your browser (Cmd+Shift+R or Ctrl+Shift+R)
3. Check that dates in iCal feed match your timezone

## Updating Your iCal URL Later

If you need to change your iCal URL (Airbnb regenerates them periodically):

### On Netlify:
1. Go to **Site configuration** → **Environment variables**
2. Edit **AIRBNB_ICAL_URL**
3. Paste new URL
4. Save and redeploy

### On Vercel:
1. Go to **Settings** → **Environment Variables**
2. Edit **AIRBNB_ICAL_URL**
3. Paste new URL
4. Redeploy

## Files Created for This Feature

- ✅ `netlify/functions/get-blocked-dates.js` - Serverless function that fetches and parses iCal
- ✅ `js/calendar.js` - Updated to fetch dates from the API
- ✅ `.env.example` - Template with instructions for the iCal URL
- ✅ `netlify.toml` - Already configured for serverless functions

## Next Steps

1. ✅ Get your Airbnb iCal URL
2. ✅ Deploy to Netlify or Vercel
3. ✅ Add the iCal URL as environment variable
4. ✅ Test the calendar sync
5. ⏭️ Set up email notifications for booking requests
6. ⏭️ Set up payment processing

---

**Questions or Issues?**

The calendar will always work even if sync fails - it just uses fallback dates. Your request-based booking system gives you full control, so you can always manually verify availability before approving any booking!
