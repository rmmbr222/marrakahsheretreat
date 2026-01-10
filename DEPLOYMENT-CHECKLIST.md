# Deployment Checklist

Use this checklist to ensure your direct booking site is ready to launch!

## Pre-Launch Checklist

### Content Updates
- [ ] Updated nightly rate in `js/booking.js`
- [ ] Updated cleaning fee in `js/booking.js`
- [ ] Updated discount percentage in `js/booking.js`
- [ ] Updated contact email in `index.html` (search for "info@marrakahshe")
- [ ] Updated phone number in `index.html`
- [ ] Updated bedroom/bathroom count if different from 3/2
- [ ] Added current booked dates to `js/calendar.js`
- [ ] Reviewed and updated amenities list
- [ ] Added real guest reviews (optional but recommended)

### Technical Setup
- [ ] Tested site locally by opening `index.html` in browser
- [ ] All photos loading correctly
- [ ] Booking calendar displaying properly
- [ ] Price calculator working when dates selected
- [ ] Mobile menu working on small screens
- [ ] Gallery lightbox functioning

## Deployment

### Choose Your Platform
- [ ] Selected hosting platform (Netlify/Vercel/GitHub Pages)
- [ ] Created account on chosen platform
- [ ] Deployed site successfully
- [ ] Received deployment URL
- [ ] Tested deployed site works correctly

### Domain Setup (Optional but Recommended)
- [ ] Purchased custom domain
- [ ] Connected domain to hosting platform
- [ ] SSL certificate active (should be automatic)
- [ ] Site accessible via custom domain

## Payment Integration (When Ready)

### Stripe Setup
- [ ] Created Stripe account
- [ ] Completed Stripe verification
- [ ] Retrieved publishable and secret API keys
- [ ] Added keys to environment variables
- [ ] Uncommented payment code in `js/booking.js`
- [ ] Added Stripe.js script to `index.html`
- [ ] Tested payment flow in Stripe test mode
- [ ] Activated Stripe live mode
- [ ] Updated to live API keys

### Backend Functions (Netlify)
- [ ] Installed dependencies: `npm install`
- [ ] Set environment variables in Netlify dashboard
- [ ] Tested create-booking-session function
- [ ] Payment processing working end-to-end

## Calendar Management

### Manual Updates
- [ ] Process for updating booked dates established
- [ ] Know how to edit `js/calendar.js`

### Auto-Sync (Optional)
- [ ] Retrieved Airbnb iCal URL
- [ ] Added iCal URL to environment variables
- [ ] Tested calendar sync function
- [ ] Verified dates syncing correctly

## Marketing & Promotion

### Website Visibility
- [ ] Added site to Instagram bio
- [ ] Added site to Facebook page
- [ ] Updated other social media profiles
- [ ] Created QR code for physical materials

### Guest Communication
- [ ] Drafted message for past Airbnb guests
- [ ] Added direct booking mention to Airbnb listing (if allowed)
- [ ] Prepared welcome message mentioning direct booking

### SEO (Optional)
- [ ] Added Google Analytics tracking code
- [ ] Submitted sitemap to Google Search Console
- [ ] Added meta descriptions
- [ ] Verified site shows correctly in search results

## Post-Launch

### Testing
- [ ] Made test booking yourself
- [ ] Verified confirmation email received (if email setup)
- [ ] Tested on mobile device
- [ ] Tested on different browsers (Chrome, Safari, Firefox)
- [ ] Asked friend/family to test booking flow

### Monitoring
- [ ] Set up system for checking new bookings
- [ ] Email notifications working (if configured)
- [ ] Payment deposits reaching bank account
- [ ] No error messages in browser console

### Ongoing Maintenance
- [ ] Process for weekly calendar updates
- [ ] Regular price updates (seasonal rates, etc.)
- [ ] Photo updates (seasonal photos)
- [ ] Review collection from guests

## Emergency Contacts

### Technical Issues
- Hosting Support: [Your platform's support link]
- Stripe Support: https://support.stripe.com
- Domain Registrar: [Your domain provider]

### Important Files
- Stripe API keys: Stripe Dashboard
- Domain DNS settings: Domain registrar account
- Site files: [Your repository/backup location]

## Quick Reference

### Update Prices
File: `js/booking.js` lines 2-6

### Update Booked Dates
File: `js/calendar.js` lines 126-135

### Update Contact Info
File: `index.html` search for current email/phone

### Check Payment Settings
Netlify Dashboard → Environment Variables

---

## You're Ready to Launch! 🚀

Once you've completed these items, your direct booking site is ready to start saving you money and building direct guest relationships!

### Success Metrics to Track

- Number of direct bookings per month
- Money saved on platform fees
- Percentage of repeat guests
- Average booking value
- Website traffic (if using Analytics)

### Typical Results

Hosts using direct booking sites typically see:
- 20-40% of bookings coming direct within 6 months
- Thousands saved in platform fees annually
- Higher guest satisfaction due to direct communication
- Better reviews and repeat bookings

Good luck! 🏡✨
