# Netlify Forms Email Setup Guide

Your booking form is now integrated with Netlify Forms! You'll receive email notifications for every booking request.

## ✅ What's Been Set Up

1. **Form Integration** - Added `data-netlify="true"` to the booking form
2. **Spam Protection** - Added honeypot field to prevent spam submissions
3. **Hidden Fields** - Season, nights, and total are automatically captured
4. **Validation** - Minimum stay requirements are checked before submission
5. **Success Redirect** - Guests are redirected to success.html after submitting

## 📧 Getting Email Notifications

After you redeploy to Netlify:

### Step 1: Deploy Your Site
Upload your updated `direct-booking-site` folder to Netlify (drag & drop)

### Step 2: Configure Email Notifications
1. Go to your Netlify dashboard
2. Click on **"warm-strudel-ddec90"** (your site)
3. Go to **"Forms"** in the left sidebar
4. You should see **"booking-request"** form listed
5. Click on it

### Step 3: Set Up Notifications
1. Click **"Settings & usage"**
2. Under **"Form notifications"**, click **"Add notification"**
3. Select **"Email notification"**
4. Enter your email address (where you want to receive booking requests)
5. Choose **"New form submission"**
6. Save

### Step 4: Test It
1. Go to your live site
2. Fill out the booking form with test data
3. Click **"Submit Booking Request"**
4. Check your email - you should receive a notification with all the booking details!

## 📋 What You'll Receive in Email

Every booking request email will include:

- **Check-in Date**
- **Check-out Date**
- **Number of Guests**
- **Guest Name**
- **Guest Email**
- **Guest Phone**
- **Special Requests** (if any)
- **Bringing Pets** (yes/no)
- **Season** (Peak/Fall/Winter/Off)
- **Number of Nights**
- **Total Price**

## 🎯 Managing Submissions

### View All Submissions:
1. Netlify Dashboard → Your Site → **Forms**
2. Click on **"booking-request"**
3. See all submissions with date/time stamps

### Export Submissions:
- Click **"Export as CSV"** to download all booking requests

### Spam Protection:
- Netlify automatically filters spam using the honeypot field
- Verified submissions show in your dashboard

## 💡 Email Response Template

When you receive a booking request, reply with:

```
Hi [Guest Name],

Thank you for your booking request for Marrakahshe Retreat!

I'm pleased to confirm that we have availability for:
- Check-in: [Date] at 4:00 PM (flexible in non-peak season)
- Check-out: [Date] at 11:00 AM
- [Number] guests for [Number] nights
- Season: [Peak/Fall/Winter/Off]

Your total is $[Amount] (including 13% HST and cleaning fee).

To confirm your reservation, please send payment via:
[Your payment method - e-transfer, bank transfer, etc.]

Account details:
[Your payment information]

Once payment is received, I'll send you:
- Full check-in instructions
- Property access details
- Contact information
- Pre-arrival guide

Looking forward to hosting you!

Best regards,
[Your Name]
Marrakahshe Retreat
```

## ⚙️ Advanced Settings (Optional)

### Custom Success Message:
Edit `success.html` to customize the thank you page guests see

### Email Template Customization:
In Netlify Forms settings, you can customize the email format

### Webhook Integration:
Connect to Zapier or other services for automated workflows

### Form Spam Filtering:
Netlify includes Akismet spam filtering (upgrade to enable)

## 🔧 Troubleshooting

### Not Receiving Emails?
1. Check your spam folder
2. Verify email address in Netlify Forms settings
3. Make sure form has `data-netlify="true"` attribute
4. Check that form name is `booking-request`

### Form Not Showing in Dashboard?
1. Redeploy your site
2. Submit a test form after deployment
3. Netlify detects forms on first submission

### Validation Errors?
1. Make sure all required fields are filled
2. Check date selection is valid
3. Verify minimum stay requirements are met

## 📊 Free Tier Limits

Netlify Forms Free Tier includes:
- **100 form submissions per month**
- **10 MB file upload limit per submission**
- **Email notifications**
- **Spam filtering**

If you exceed 100 submissions/month, upgrade to Netlify Pro for $19/month.

## 🚀 You're All Set!

After redeploying:
1. ✅ Guests can submit booking requests
2. ✅ You receive email notifications
3. ✅ All submissions are saved in Netlify dashboard
4. ✅ Guests see a success confirmation page
5. ✅ You respond within 24 hours and manage bookings manually

This gives you full control over your bookings while making it easy for guests to request dates!

---

**Questions?** Check Netlify Forms documentation: https://docs.netlify.com/forms/setup/
