# Seasonal Pricing Configuration

Your direct booking site now has 4-season pricing that automatically adjusts based on booking dates!

## Pricing Structure

### Peak Season (June 15 - September 15)
- **Dates:** Mid-June through Mid-September
- **Nightly Rate:** $1,500/night
- **Cleaning Fee:** $250
- **Pet Fee:** $50 (max 2 dogs)
- **Minimum Stay:** 7 nights
- **HST:** 13% (added to subtotal + cleaning + pet fee)
- **Example 7-night booking:**
  - Subtotal: $10,500 (7 × $1,500)
  - Cleaning: $250
  - HST (13%): $1,398
  - **Total: $12,148**
  - Airbnb fee savings: ~$1,613
  - **With pets: $12,204** (includes $50 pet fee)

### Fall Season (September 16 - October 31)
- **Dates:** Mid-September through October
- **Nightly Rate:** $1,125/night
- **Cleaning Fee:** $250
- **Pet Fee:** $50 (max 2 dogs)
- **Minimum Stay:** 2 nights
- **HST:** 13% (added to subtotal + cleaning + pet fee)
- **Example 3-night booking:**
  - Subtotal: $3,375 (3 × $1,125)
  - Cleaning: $250
  - HST (13%): $471
  - **Total: $4,096**
  - Airbnb fee savings: ~$544
  - **With pets: $4,153** (includes $50 pet fee)

### Winter Season (November 1 - April 30)
- **Dates:** November through April
- **Nightly Rate:** $925/night
- **Cleaning Fee:** $250
- **Pet Fee:** $50 (max 2 dogs)
- **Minimum Stay:** 2 nights
- **HST:** 13% (added to subtotal + cleaning + pet fee)
- **Example 3-night booking:**
  - Subtotal: $2,775 (3 × $925)
  - Cleaning: $250
  - HST (13%): $393
  - **Total: $3,418**
  - Airbnb fee savings: ~$454
  - **With pets: $3,474** (includes $50 pet fee)

### Spring Season (May 1 - June 14)
- **Dates:** May through mid-June
- **Nightly Rate:** $1,150/night
- **Cleaning Fee:** $250
- **Pet Fee:** $50 (max 2 dogs)
- **Minimum Stay:** 2 nights
- **HST:** 13% (added to subtotal + cleaning + pet fee)
- **Example 3-night booking:**
  - Subtotal: $3,450 (3 × $1,150)
  - Cleaning: $250
  - HST (13%): $481
  - **Total: $4,181**
  - Airbnb fee savings: ~$555
  - **With pets: $4,238** (includes $50 pet fee)

## How It Works

### Automatic Season Detection
The booking system automatically:
1. Detects which season the booking dates fall into
2. Applies the correct nightly rate and cleaning fee
3. Enforces the season's minimum night requirement
4. Calculates HST at 13%
5. Shows estimated Airbnb fee savings (~15%)

### Mixed Season Bookings
If a booking spans multiple seasons (e.g., October 25 - November 5):
- **Highest season pricing applies** to the entire stay
- This prevents rate arbitrage and keeps things simple
- The system checks every night in the date range and uses the highest rate

### Pet-Friendly
- **$50 flat fee per stay** (not per dog, not per night)
- Maximum 2 dogs allowed
- Guest checks a box if bringing pets
- Pet fee is automatically added to the total

### What Guests See

**In the Price Breakdown:**
- ✓ Season indicator (Peak, Fall, Winter, or Off Season)
- ✓ Minimum night requirement for that season
- ✓ Per-night rate for that season
- ✓ Number of nights × nightly rate
- ✓ Cleaning fee ($250)
- ✓ Pet fee ($50) - only if bringing pets
- ✓ HST (13%) on all fees
- ✓ Total price
- ✓ Estimated Airbnb fee savings (~15%)

**Example Display:**
```
Fall Season: 2-night minimum • $1,125/night

× 3 nights              $3,375
Cleaning Fee               $250
Pet Fee (max 2 dogs)        $50
HST (13%)                  $478
─────────────────────────────
Total                   $4,153

💰 You save vs. Airbnb fees  ~$554
```

## Benefits Over Airbnb

### For Guests:
- **No Airbnb Service Fees** (~15% savings)
- **Same great property** at a better price
- **Direct communication** with the host
- **Transparent pricing** with HST included

### For You:
- **No Airbnb Host Fees** (typically 3%)
- **Full control** over rates and bookings
- **Request-based system** - you approve all bookings
- **Calendar sync** prevents double-bookings

## Changing Rates

To update rates in the future, edit `js/booking.js`:

```javascript
const PRICING = {
    peak: {
        name: 'Peak Season',
        nightlyRate: 1500,     // Change this
        cleaningFee: 250,      // Change this
        minNights: 7,          // Change this
        hstRate: 0.13          // Update if HST changes
    },
    fall: {
        name: 'Fall Season',
        nightlyRate: 1125,     // Change this
        cleaningFee: 250,      // Change this
        minNights: 2,          // Change this
        hstRate: 0.13
    },
    winter: {
        name: 'Winter Season',
        nightlyRate: 925,      // Change this
        cleaningFee: 250,      // Change this
        minNights: 2,          // Change this
        hstRate: 0.13
    },
    offSeason: {
        name: 'Off Season',
        nightlyRate: 1150,     // Change this
        cleaningFee: 250,      // Change this
        minNights: 2,          // Change this
        hstRate: 0.13
    },
    petFee: 50                 // Change this
};
```

## Testing Different Seasons

To test the pricing:

**Test Peak Season (June 15 - Sept 15):**
1. Select check-in: July 1, 2026
2. Select check-out: July 8, 2026
3. Should show: Peak Season, $1,500/night, 7-night minimum

**Test Fall Season (Sept 16 - Oct 31):**
1. Select check-in: October 10, 2026
2. Select check-out: October 13, 2026
3. Should show: Fall Season, $1,125/night, 2-night minimum

**Test Winter Season (Nov 1 - Apr 30):**
1. Select check-in: December 20, 2026
2. Select check-out: December 23, 2026
3. Should show: Winter Season, $925/night, 2-night minimum

**Test Off Season (May 1 - June 14):**
1. Select check-in: May 15, 2026
2. Select check-out: May 18, 2026
3. Should show: Off Season, $1,150/night, 2-night minimum

**Test Pet Fee:**
1. Select any dates
2. Check the "Bringing pets?" checkbox
3. Pet fee row should appear with $50

## Important Notes

- ✅ HST (13%) is automatically calculated and added
- ✅ Minimum stays are enforced (7 nights peak, 2 nights off-season)
- ✅ Airbnb calendar sync still works perfectly
- ✅ All bookings still require your manual approval
- ✅ Guests submit requests, you respond within 24 hours
- ✅ You can manually adjust pricing in your email response if needed

## Marketing Messaging

The site now emphasizes:
- **"Save Airbnb Fees"** instead of "Save 15%"
- More accurate since you're not discounting, guests are avoiding platform fees
- Makes it clear they're getting the same property at a better price
- Builds trust with transparent pricing

---

Your direct booking site is now set up with professional seasonal pricing that matches your Airbnb strategy while saving guests money!
