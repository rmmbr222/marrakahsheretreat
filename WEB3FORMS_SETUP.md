# Web3Forms Setup Instructions

Your booking form is now configured to use Web3Forms instead of Netlify Forms. This will work perfectly on Vercel!

## Step 1: Get Your Free Web3Forms Access Key

1. Go to https://web3forms.com
2. Click "Get Started Free" or "Create Access Key"
3. Enter your email address (where you'll receive form submissions)
4. Verify your email
5. Copy your Access Key (it will look like: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`)

## Step 2: Update Your Site

1. Open `index.html`
2. Find this line (around line 480):
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE">
   ```
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual access key

## Step 3: Update the Redirect URL

1. In the same file, find this line (around line 483):
   ```html
   <input type="hidden" name="redirect" value="https://yourdomain.com/success.html">
   ```
2. Replace `https://yourdomain.com` with your actual Vercel domain
   - After deploying to Vercel, you'll get a URL like `https://yourproject.vercel.app`
   - Update this to: `https://yourproject.vercel.app/success.html`

## Step 4: Test Your Form

1. Deploy your site to Vercel
2. Fill out and submit a test booking request
3. Check your email - you should receive the form submission
4. Verify the redirect to success.html works

## What You Get with Web3Forms (Free Plan)

✓ Unlimited form submissions
✓ Email notifications for each submission
✓ Spam protection built-in
✓ Works on any platform (Vercel, Netlify, etc.)
✓ No backend code required
✓ GDPR compliant

## Email Format

You'll receive emails with all the booking details:
- Check-in and Check-out dates
- Number of guests
- Season pricing
- Total nights
- Total price
- Guest name, email, phone
- Special requests
- Whether they're bringing pets

## Need Help?

- Web3Forms Documentation: https://docs.web3forms.com
- Support: support@web3forms.com
