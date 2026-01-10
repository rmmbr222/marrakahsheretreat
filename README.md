# Marrakahshe Retreat - Direct Booking Website

A beautiful, professional direct booking website for your luxury lakeside cottage. Save on platform fees and build direct relationships with your guests!

## Features

- **Photo Gallery**: Lightbox gallery with all 8 photos from your Airbnb listing
- **Booking Calendar**: Interactive calendar showing availability
- **Price Calculator**: Automatic price calculation with 15% direct booking discount
- **Payment Processing**: Ready for Stripe integration
- **Mobile Responsive**: Works perfectly on all devices
- **SEO Optimized**: Better search engine visibility
- **Professional Design**: Modern, luxury aesthetic

## Quick Start

### Option 1: Deploy to Netlify (Recommended - FREE)

1. Create a free account at [Netlify](https://www.netlify.com)
2. Drag and drop the `direct-booking-site` folder into Netlify
3. Your site is live! You'll get a URL like `https://your-site-name.netlify.app`
4. Optional: Connect your own domain (e.g., `marrakahsheretreat.com`)

### Option 2: Deploy to Vercel (FREE)

1. Create a free account at [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm install -g vercel`
3. In the `direct-booking-site` folder, run: `vercel`
4. Follow the prompts to deploy

### Option 3: Deploy to GitHub Pages (FREE)

1. Create a GitHub account if you don't have one
2. Create a new repository
3. Upload all files from `direct-booking-site` folder
4. Go to Settings > Pages
5. Select main branch as source
6. Your site will be live at `https://yourusername.github.io/repository-name`

## Customization

### Update Property Information

Edit `index.html` to update:

- **Bedrooms/Bathrooms**: Line 79-101 (Quick Info Bar section)
- **Contact Information**: Line 459-465 (Footer section)
- **Amenities**: Line 236-297 (add/remove amenities as needed)
- **Reviews**: Line 413-444 (add real reviews from guests)

### Update Pricing

Edit `js/booking.js`, lines 2-6:

```javascript
const PRICING = {
    nightlyRate: 450,      // Change to your nightly rate
    cleaningFee: 150,      // Change to your cleaning fee
    discountPercent: 15    // Change discount percentage
};
```

### Update Booked Dates

Edit `js/calendar.js`, lines 126-135:

```javascript
const bookedDates = [
    '2024-12-25',  // Add your booked dates here
    '2024-12-26',
    // Add more dates...
];
```

**Better Option**: Set up automatic calendar sync with Airbnb (see "Calendar Synchronization" below)

### Change Colors and Branding

Edit `css/styles.css`, lines 11-18:

```css
:root {
    --primary-color: #2c5f5d;      /* Main brand color */
    --secondary-color: #d4af37;    /* Accent/button color */
    --accent-color: #c17d5c;       /* Additional accent */
}
```

## Setting Up Real Payments with Stripe

Currently, the site shows a demo confirmation. To accept real payments:

### Step 1: Create Stripe Account

1. Sign up at [Stripe](https://stripe.com)
2. Complete account verification
3. Get your API keys from Dashboard > Developers > API keys

### Step 2: Set Up Backend

You'll need a simple backend to process payments securely. Options:

**Option A: Use Netlify Functions (Recommended)**

Create `netlify/functions/create-booking-session.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    const bookingData = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Marrakahshe Retreat Booking',
                        description: `${bookingData.nights} nights: ${bookingData.checkIn} to ${bookingData.checkOut}`,
                    },
                    unit_amount: bookingData.total * 100, // Stripe uses cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.URL}/#booking`,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ id: session.id }),
    };
};
```

**Option B: Use Firebase Functions**
**Option C: Use your own backend (Node.js, Python, PHP, etc.)**

### Step 3: Update Frontend

In `js/booking.js`, uncomment lines 85-113 and add your Stripe publishable key.

### Step 4: Add Stripe Script

In `index.html`, add before closing `</body>` tag:

```html
<script src="https://js.stripe.com/v3/"></script>
```

## Calendar Synchronization with Airbnb

To automatically sync your Airbnb bookings:

### Step 1: Get Airbnb iCal Link

1. Go to your Airbnb listing calendar
2. Click "Availability" > "Sync calendars"
3. Copy the "Export calendar" iCal link

### Step 2: Set Up Sync Function

Create a backend function that:
1. Fetches the iCal feed from Airbnb
2. Parses booked dates
3. Returns them to your calendar

Example using Netlify Functions:

```javascript
const fetch = require('node-fetch');
const ical = require('node-ical');

exports.handler = async () => {
    const airbnbIcal = 'YOUR_AIRBNB_ICAL_URL';
    const response = await fetch(airbnbIcal);
    const data = await response.text();
    const events = ical.parseICS(data);

    const bookedDates = [];
    for (let k in events) {
        if (events[k].type === 'VEVENT') {
            const start = events[k].start;
            const end = events[k].end;
            // Add all dates between start and end
            // ... date iteration logic
            bookedDates.push(/* dates */);
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(bookedDates)
    };
};
```

### Step 3: Update Frontend

Modify `js/calendar.js` to fetch booked dates from your backend:

```javascript
async function loadBookedDates() {
    const response = await fetch('/api/sync-calendar');
    const bookedDates = await response.json();
    return bookedDates;
}
```

## Email Notifications

To send booking confirmations and notifications:

### Option 1: Use Netlify Forms + Zapier (Easiest)

1. Sign up for [Zapier](https://zapier.com)
2. Create a Zap: Netlify Form → Gmail/Email
3. Add form to your booking

### Option 2: Use SendGrid (Professional)

1. Sign up at [SendGrid](https://sendgrid.com)
2. Get API key
3. Create function to send emails on booking

### Option 3: Use Email Services (Mailgun, AWS SES, etc.)

## Connecting a Custom Domain

### If Using Netlify:
1. Go to Domain Settings in Netlify
2. Add custom domain
3. Update DNS records at your domain registrar
4. Netlify provides free SSL certificate

### If Using Vercel:
1. Go to Project Settings > Domains
2. Add your domain
3. Update DNS records
4. Automatic SSL included

### Recommended Domain Registrars:
- Namecheap
- Google Domains
- Cloudflare

## SEO and Marketing Tips

1. **Google My Business**: List your property
2. **Social Media**: Instagram, Facebook with direct booking link
3. **Email List**: Collect emails for repeat bookings
4. **Google Analytics**: Track visitors (add tracking code to site)
5. **Special Offers**: Promote your 15% direct booking discount
6. **Photography**: Your Airbnb photos are great! Consider adding more seasonal shots

## File Structure

```
direct-booking-site/
├── index.html              # Main website page
├── css/
│   └── styles.css         # All styling
├── js/
│   ├── script.js          # Gallery & general functionality
│   ├── calendar.js        # Booking calendar
│   └── booking.js         # Booking form & payment
└── README.md              # This file
```

## Updating Content

### Add More Photos
1. Upload images to your hosting (Netlify, Cloudflare Images, etc.)
2. Add to gallery in `index.html` (line 95-130)
3. Update image array in `js/script.js`

### Change House Rules
Edit `index.html`, footer section (line 476)

### Update Cancellation Policy
Edit `index.html`, footer section (line 477)

## Important Notes

### Legal Requirements
- Include privacy policy (especially if collecting emails)
- Terms and conditions
- Cancellation policy
- House rules

### Insurance
- Ensure your property insurance covers direct bookings
- Consider liability insurance

### Taxes
- Collect and remit occupancy taxes as required
- Keep records of all bookings

### Maintenance
- Update booked dates regularly (or set up auto-sync)
- Respond to inquiries promptly
- Keep prices current

## Support and Customization

Need help? Here are your options:

1. **Simple changes**: Edit the HTML directly (property info, pricing, etc.)
2. **Styling**: Modify `css/styles.css` for colors, fonts, layout
3. **Functionality**: Edit JavaScript files for behavior changes
4. **Advanced features**: Consider hiring a developer for:
   - Backend setup for payments
   - Calendar auto-sync
   - Email automation
   - Multi-property support

## Cost Breakdown

**Hosting**: FREE (Netlify/Vercel/GitHub Pages)
**Domain**: ~$12/year (optional but recommended)
**Stripe Fees**: 2.9% + $0.30 per transaction (only when you get paid!)
**Email Service**: FREE for low volume (SendGrid, etc.)

**Compare to Airbnb**:
- Airbnb Host Fee: 3% (but guests pay 14%+ in fees)
- Your savings: Offer 15% discount and still make more!

## Next Steps

1. ✅ Deploy to Netlify/Vercel (5 minutes)
2. ✅ Update property details and pricing
3. ✅ Test the booking form
4. ⏭️ Set up Stripe for payments
5. ⏭️ Connect custom domain
6. ⏭️ Add to your social media bios
7. ⏭️ Tell Airbnb guests about direct booking option

## Example Promotion Strategy

**On Airbnb**: After guests book, send message:
"Thanks for booking! For future stays, book directly at marrakahsheretreat.com and save 15%!"

**Social Media**:
"Skip the fees! Book direct at [yoursite.com] and save 15% 🏡💰"

**Email Signature**:
"Book your next Muskoka getaway at marrakahsheretreat.com"

## Questions?

Common questions:

**Q: How do I prevent double bookings?**
A: Either manually update booked dates or set up calendar sync with Airbnb

**Q: Can I still use Airbnb?**
A: Yes! Many hosts use both. Just sync calendars to prevent double bookings

**Q: Is this legal?**
A: Yes, you can offer direct bookings. Just follow local regulations and tax laws

**Q: How do I get more direct bookings?**
A: Promote to existing guests, use social media, SEO, and offer the discount incentive

**Q: Can guests pay later?**
A: With Stripe, you can require payment upfront or send payment links later

---

## Your Direct Booking Site is Ready! 🎉

You now have a professional booking website that will help you:
- Save on platform fees
- Build direct relationships with guests
- Increase your revenue
- Control your brand

Deploy it, customize it, and start promoting your direct booking discount!

For technical issues, check the browser console for errors. Most common issues are:
- File paths (make sure all files are in correct folders)
- Date formats
- Missing configuration values

Good luck with your direct bookings! 🏡✨
