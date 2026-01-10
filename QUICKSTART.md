# Quick Start Guide

Get your direct booking site live in 10 minutes!

## Step 1: Test Locally (Optional)

Open `index.html` in your web browser to preview the site.

## Step 2: Customize Your Site

### Essential Changes

1. **Update Pricing** - Edit `js/booking.js`:
   ```javascript
   const PRICING = {
       nightlyRate: 450,    // Your nightly rate
       cleaningFee: 150,    // Your cleaning fee
       discountPercent: 15  // Your discount
   };
   ```

2. **Update Contact Info** - Edit `index.html` (search for "info@marrakahshe"):
   - Email address
   - Phone number

3. **Add Booked Dates** - Edit `js/calendar.js` (line 126-135):
   ```javascript
   const bookedDates = [
       '2024-12-25',
       '2024-12-26',
       // Add your booked dates
   ];
   ```

### Recommended Changes

4. **Property Details** - Update in `index.html`:
   - Number of bedrooms/bathrooms (line 79-101)
   - Amenities list (line 236-297)

5. **Add Real Reviews** - Replace placeholder reviews in `index.html` (line 413-444)

## Step 3: Deploy Your Site (Choose One)

### Option A: Netlify (Recommended - Easiest)

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Drag and drop the entire `direct-booking-site` folder
3. Done! Your site is live at `https://random-name.netlify.app`

**To use a custom domain:**
1. In Netlify, go to Domain Settings
2. Click "Add custom domain"
3. Follow instructions to update your domain's DNS

### Option B: Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click "New Project"
3. Import your files
4. Deploy!

### Option C: GitHub Pages

1. Create a GitHub account
2. Create a new repository named `booking-site`
3. Upload all files from `direct-booking-site`
4. Go to Settings > Pages
5. Enable Pages with main branch
6. Site live at `https://yourusername.github.io/booking-site`

## Step 4: Promote Your Site

1. **Add to Instagram Bio**: "Book direct & save 15% → [your-link]"
2. **Add to Airbnb Description**: "Message me about direct booking discounts!"
3. **Message to Past Guests**: "Thanks for staying! Next time book direct at [your-link] and save 15%"
4. **Create QR Code**: Use [qr-code-generator.com](https://www.qr-code-generator.com/) to create a QR code for your site

## Step 5: Set Up Payments (When Ready)

The site currently shows a demo confirmation. To accept real payments:

1. **Create Stripe Account**: [stripe.com/register](https://stripe.com/register)
2. **Get API Keys**: Dashboard > Developers > API Keys
3. **Follow Payment Setup**: See README.md "Setting Up Real Payments" section

## Common Questions

**Q: How much does hosting cost?**
- Netlify/Vercel: FREE
- Custom domain: ~$12/year (optional)

**Q: Do I need to know how to code?**
- No! Just update the text in the files as shown above

**Q: Can I still use Airbnb?**
- Yes! Just sync your calendars to prevent double bookings

**Q: How do I update booked dates?**
- Edit `js/calendar.js` or set up auto-sync (see README.md)

**Q: How do I make changes after deploying?**
- Update the files and re-deploy (drag & drop again in Netlify)

## Need Help?

1. Check the full README.md for detailed instructions
2. Google error messages
3. Check the browser console for errors (F12 in Chrome)

## What's Next?

- [ ] Deploy site
- [ ] Update pricing and property details
- [ ] Add to social media
- [ ] Set up custom domain
- [ ] Configure Stripe for payments
- [ ] Tell past guests about direct booking option
- [ ] Set up Google Analytics (optional)

---

**You're all set!** Your direct booking site is ready to save you money and build direct relationships with guests.

Remember: Even a 15% discount means you make MORE money than Airbnb (since you avoid 3% host fees and guests avoid 14%+ fees).

Happy hosting! 🏡
