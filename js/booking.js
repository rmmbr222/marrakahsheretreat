// Booking Configuration
const PRICING = {
    peak: {
        name: 'Peak Season',
        nightlyRate: 1700,
        cleaningFee: 250,
        minNights: 7,
        hstRate: 0.13
    },
    fall: {
        name: 'Fall Season',
        nightlyRate: 1125,
        cleaningFee: 250,
        minNights: 2,
        hstRate: 0.13
    },
    winter: {
        name: 'Winter Season',
        nightlyRate: 925,
        cleaningFee: 250,
        minNights: 2,
        hstRate: 0.13
    },
    spring: {
        name: 'Spring Season',
        nightlyRate: 1150,
        cleaningFee: 250,
        minNights: 2,
        hstRate: 0.13
    },
    petFee: 50  // Per stay, max 2 dogs
};

// Determine which season a date falls into
function getSeason(date) {
    const month = date.getMonth();
    const day = date.getDate();

    // Peak: June 15 - September 15
    if (month === 5 && day >= 15) return PRICING.peak;  // June 15+
    if (month === 6 || month === 7) return PRICING.peak;  // July, August
    if (month === 8 && day <= 15) return PRICING.peak;  // September 1-15

    // Fall: September 16 - October 31
    if (month === 8 && day >= 16) return PRICING.fall;  // September 16+
    if (month === 9) return PRICING.fall;  // October

    // Winter: November 1 - April 30
    if (month >= 10 || month <= 3) return PRICING.winter;  // Nov-April

    // Spring: May 1 - June 14
    if (month === 4) return PRICING.spring;  // May
    if (month === 5 && day < 15) return PRICING.spring;  // June 1-14

    return PRICING.spring;
}

// Get pricing for date range (use highest rate if spans multiple seasons)
function getPricingForDates(checkIn, checkOut) {
    // Start by getting the season for check-in date
    const current = new Date(checkIn);
    let highestPricing = getSeason(current);
    let highestRate = highestPricing.nightlyRate;

    // Check each day in the range
    while (current < checkOut) {
        const seasonPricing = getSeason(current);
        if (seasonPricing.nightlyRate > highestRate) {
            highestPricing = seasonPricing;
            highestRate = seasonPricing.nightlyRate;
        }
        current.setDate(current.getDate() + 1);
    }

    return highestPricing;
}

// Price Calculation
window.calculatePrice = function() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');

    if (!checkInInput.value || !checkOutInput.value) {
        return;
    }

    // Parse dates in local timezone to avoid UTC conversion issues
    const [checkInYear, checkInMonth, checkInDay] = checkInInput.value.split('-').map(Number);
    const checkIn = new Date(checkInYear, checkInMonth - 1, checkInDay);

    const [checkOutYear, checkOutMonth, checkOutDay] = checkOutInput.value.split('-').map(Number);
    const checkOut = new Date(checkOutYear, checkOutMonth - 1, checkOutDay);

    // Calculate nights
    const diffTime = Math.abs(checkOut - checkIn);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
        return;
    }

    // Get pricing based on season
    const pricing = getPricingForDates(checkIn, checkOut);

    // Check if bringing pets
    const bringingPets = document.getElementById('bringing-pets')?.checked || false;
    const petFee = bringingPets ? PRICING.petFee : 0;

    // Calculate prices
    const subtotal = pricing.nightlyRate * nights;
    const cleaningFee = pricing.cleaningFee;
    const subtotalWithFees = subtotal + cleaningFee + petFee;

    // Add HST (13%)
    const hst = Math.round(subtotalWithFees * pricing.hstRate);
    const totalBeforeSavings = subtotalWithFees + hst;

    // Calculate Airbnb fee savings (approximately 15% that guests save)
    const airbnbFeeSavings = Math.round(subtotalWithFees * 0.15);

    const total = totalBeforeSavings;

    // Update display
    document.getElementById('nights-label').textContent = `× ${nights} night${nights > 1 ? 's' : ''}`;
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;

    // Update cleaning fee display
    document.getElementById('cleaning-fee').textContent = `$${cleaningFee}`;

    // Show/hide pet fee
    const petFeeRow = document.querySelector('.price-row.pet-fee');
    if (petFeeRow) {
        if (bringingPets) {
            petFeeRow.style.display = 'flex';
            petFeeRow.querySelector('span:last-child').textContent = `$${petFee}`;
        } else {
            petFeeRow.style.display = 'none';
        }
    }

    // Show HST
    const hstRow = document.querySelector('.price-row.hst');
    if (hstRow) {
        hstRow.querySelector('span:last-child').textContent = `$${hst.toLocaleString()}`;
    }

    // Show Airbnb savings instead of discount
    const savingsRow = document.querySelector('.price-row .savings');
    if (savingsRow) {
        savingsRow.parentElement.querySelector('.savings:last-child').textContent = `~$${airbnbFeeSavings.toLocaleString()}`;
    }

    document.getElementById('total-price').textContent = `$${total.toLocaleString()}`;

    // Show season info
    const seasonInfo = document.getElementById('season-info');
    if (seasonInfo) {
        seasonInfo.innerHTML = `<strong>${pricing.name}:</strong> ${pricing.minNights}-night minimum • $${pricing.nightlyRate.toLocaleString()}/night`;
        seasonInfo.style.display = 'block';
    }

    // Store pricing info for validation
    window.currentPricing = pricing;

    // Update hidden form fields for Netlify
    const formSeason = document.getElementById('form-season');
    const formNights = document.getElementById('form-nights');
    const formTotal = document.getElementById('form-total');

    if (formSeason) formSeason.value = pricing.name;
    if (formNights) formNights.value = nights;
    if (formTotal) formTotal.value = `$${total.toLocaleString()}`;
};

// Date input listeners
document.addEventListener('DOMContentLoaded', function() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    checkOutInput.setAttribute('min', today);

    checkInInput.addEventListener('change', function() {
        // Set check-out minimum to day after check-in
        const checkIn = new Date(this.value);
        checkIn.setDate(checkIn.getDate() + 1);
        const minCheckOut = checkIn.toISOString().split('T')[0];
        checkOutInput.setAttribute('min', minCheckOut);

        // Clear check-out if it's before new minimum
        if (checkOutInput.value && checkOutInput.value <= this.value) {
            checkOutInput.value = '';
        }

        calculatePrice();
    });

    checkOutInput.addEventListener('change', calculatePrice);

    // Pet checkbox listener
    const bringingPetsCheckbox = document.getElementById('bringing-pets');
    if (bringingPetsCheckbox) {
        bringingPetsCheckbox.addEventListener('change', calculatePrice);
    }

    // Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', function(e) {
        // Validate dates
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;

        if (!checkIn || !checkOut) {
            e.preventDefault();
            alert('Please select check-in and check-out dates.');
            return false;
        }

        // Validate minimum stay based on season
        // Parse dates in local timezone to avoid UTC conversion issues
        const [checkInYear, checkInMonth, checkInDay] = checkIn.split('-').map(Number);
        const checkInDate = new Date(checkInYear, checkInMonth - 1, checkInDay);

        const [checkOutYear, checkOutMonth, checkOutDay] = checkOut.split('-').map(Number);
        const checkOutDate = new Date(checkOutYear, checkOutMonth - 1, checkOutDay);

        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        // Get pricing to check minimum nights
        const pricing = window.currentPricing || getPricingForDates(checkInDate, checkOutDate);

        if (nights < pricing.minNights) {
            e.preventDefault();
            alert(`${pricing.name} minimum stay is ${pricing.minNights} nights. You selected ${nights} night${nights > 1 ? 's' : ''}.`);
            return false;
        }

        // Form is valid - let it submit to Netlify
        // Netlify will handle the submission and redirect to success.html
        return true;
    });
});

// Netlify Forms handles submission automatically
// Form will submit to Netlify and redirect to success.html

// Stripe Integration Setup (for real implementation)
// Uncomment and configure when you're ready to accept real payments

/*
// Load Stripe.js
const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');

async function processBooking(bookingData) {
    try {
        // 1. Send booking data to your backend
        const response = await fetch('/api/create-booking-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });

        const session = await response.json();

        // 2. Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}
*/

// Email notification helper (backend implementation needed)
/*
async function sendBookingNotification(bookingData) {
    await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: bookingData.email,
            subject: 'Booking Confirmation - Marrakahshe Retreat',
            booking: bookingData
        })
    });
}
*/

// iCalendar sync helper (for syncing with Airbnb calendar)
/*
async function syncWithAirbnbCalendar() {
    // This would fetch your Airbnb iCal feed and parse booked dates
    const response = await fetch('/api/sync-calendar');
    const bookedDates = await response.json();
    return bookedDates;
}
*/
