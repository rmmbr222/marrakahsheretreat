// Configuration File for Marrakahshe Retreat Booking Site
// Edit this file to customize your site without digging through code

const SITE_CONFIG = {
    // Property Information
    property: {
        name: "Marrakahshe Retreat",
        tagline: "A Curated Lakeside Experience",
        description: "230 feet of private lakefront on stunning Kahshe Lake",
        location: "Gravenhurst, Ontario, Canada",
        maxGuests: 7,
        bedrooms: 3,
        bathrooms: 2,
        rating: 4.93,
        reviewCount: 148
    },

    // Pricing
    pricing: {
        nightlyRate: 450,        // Base rate per night (in dollars)
        cleaningFee: 150,        // One-time cleaning fee
        discountPercent: 15,     // Direct booking discount %
        currency: "CAD",         // Currency code
        minNights: 2,            // Minimum stay in nights
        maxNights: 30            // Maximum stay in nights
    },

    // Contact Information
    contact: {
        email: "info@marrakahsheretreat.com",
        phone: "(555) 123-4567",
        instagram: "@marrakahshe",     // Optional
        facebook: "marrakahsheretreat" // Optional
    },

    // Check-in/Check-out
    booking: {
        checkInTime: "3:00 PM",
        checkOutTime: "11:00 AM",
        checkInInstructions: "Self check-in with lockbox"
    },

    // House Rules (add or remove as needed)
    houseRules: [
        "No smoking inside the property",
        "Pets allowed with prior approval",
        "Quiet hours: 10 PM - 8 AM",
        "Maximum 7 guests",
        "No parties or events without permission",
        "Respect the neighbors and natural environment"
    ],

    // Cancellation Policy
    cancellation: {
        policy: "flexible", // Options: flexible, moderate, strict
        description: "Free cancellation up to 48 hours before check-in. Cancel before check-in for a 50% refund."
    },

    // Stripe Configuration (for payment processing)
    stripe: {
        publishableKey: "pk_test_YOUR_KEY_HERE", // Replace with your Stripe publishable key
        // Secret key should NEVER be in frontend code - keep it on your backend
    },

    // Calendar Sync
    calendar: {
        airbnbIcalUrl: "", // Your Airbnb calendar export URL (optional)
        autoSync: false,    // Set to true to enable automatic sync
        syncIntervalHours: 6 // How often to sync (if autoSync is true)
    },

    // SEO Settings
    seo: {
        title: "Marrakahshe Retreat - Luxury Lakeside Cottage | Book Direct & Save",
        description: "Book your luxury lakeside retreat on Kahshe Lake directly and save 15%. 230 feet of private waterfront, sauna, glamping yurt, and more. Gravenhurst, Ontario.",
        keywords: "muskoka cottage rental, kahshe lake, luxury cottage, lakefront rental, gravenhurst, ontario cottage, direct booking",
        ogImage: "https://a0.muscache.com/im/pictures/miso/Hosting-52464158/original/19fc7ee2-08bc-432b-b78d-80968d0405a0.jpeg"
    },

    // Social Media Links
    social: {
        instagram: "https://instagram.com/marrakahshe",
        facebook: "https://facebook.com/marrakahsheretreat",
        twitter: "",
        airbnb: "https://www.airbnb.ca/rooms/52464158"
    },

    // Features & Amenities (set to true/false)
    amenities: {
        // Waterfront
        privateLakefront: true,
        beach: true,
        dock: true,
        kayaks: true,
        paddleboards: true,
        canoe: false,

        // Outdoor
        firepit: true,
        bbqGrill: true,
        outdoorDining: true,
        glamping: true,

        // Wellness
        sauna: true,
        hotTub: true,

        // Indoor
        homeTheatre: true,
        wifi: true,
        kitchen: true,
        airConditioning: true,
        heating: true,
        washerDryer: true,
        dishwasher: true,

        // Parking & Access
        freeParking: true,
        evCharger: false,
        wheelchairAccessible: false,

        // Family
        familyFriendly: true,
        crib: true,
        highChair: true,

        // Pets
        petsAllowed: true,

        // Work
        workspace: true,
        monitor: false
    },

    // Google Analytics (optional)
    analytics: {
        enabled: false,
        trackingId: "G-XXXXXXXXXX" // Replace with your GA4 tracking ID
    }
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.SITE_CONFIG = SITE_CONFIG;
}

// For Node.js environments (backend)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}
