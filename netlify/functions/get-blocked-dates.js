// Netlify/Vercel serverless function to fetch Airbnb iCal and return blocked dates
// This function fetches your Airbnb calendar feed and parses booked dates

const https = require('https');
const http = require('http');

// Your Airbnb iCal URL - UPDATE THIS with your actual iCal link from Airbnb
const AIRBNB_ICAL_URL = process.env.AIRBNB_ICAL_URL || 'YOUR_AIRBNB_ICAL_URL_HERE';

// Simple iCal parser for VEVENT dates
function parseICalDates(icalData) {
    const bookedDates = [];
    const events = icalData.split('BEGIN:VEVENT');

    console.log(`Found ${events.length - 1} events in iCal feed`);

    events.forEach((event, index) => {
        if (!event.includes('END:VEVENT')) return;

        // Extract DTSTART and DTEND - support both formats
        const dtstart = event.match(/DTSTART[;:].*?(\d{8})/);
        const dtend = event.match(/DTEND[;:].*?(\d{8})/);

        if (dtstart && dtend) {
            const startDate = dtstart[1];
            const endDate = dtend[1];

            console.log(`Event ${index}: ${startDate} to ${endDate}`);

            // Convert YYYYMMDD to YYYY-MM-DD
            const start = `${startDate.substr(0,4)}-${startDate.substr(4,2)}-${startDate.substr(6,2)}`;
            const end = `${endDate.substr(0,4)}-${endDate.substr(4,2)}-${endDate.substr(6,2)}`;

            // Add all dates in the range including start date
            const startDateObj = new Date(start + 'T00:00:00Z');
            const endDateObj = new Date(end + 'T00:00:00Z');

            let currentDate = new Date(startDateObj);
            while (currentDate < endDateObj) {
                const dateStr = currentDate.toISOString().split('T')[0];
                if (!bookedDates.includes(dateStr)) {
                    bookedDates.push(dateStr);
                }
                currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            }
        }
    });

    console.log(`Total blocked dates: ${bookedDates.length}`);
    return bookedDates.sort();
}

// Fetch the iCal feed
function fetchICal(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        protocol.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(new Error(`Failed to fetch iCal: ${res.statusCode}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Netlify Function Handler
exports.handler = async function(event, context) {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Check if iCal URL is configured
    if (!AIRBNB_ICAL_URL || AIRBNB_ICAL_URL === 'YOUR_AIRBNB_ICAL_URL_HERE') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                error: 'iCal URL not configured',
                bookedDates: [],
                message: 'Please set AIRBNB_ICAL_URL environment variable'
            })
        };
    }

    try {
        console.log('Fetching iCal from:', AIRBNB_ICAL_URL.substring(0, 50) + '...');

        // Fetch and parse the iCal feed
        const icalData = await fetchICal(AIRBNB_ICAL_URL);
        console.log('iCal data fetched, length:', icalData.length);

        const bookedDates = parseICalDates(icalData);
        console.log('Parsed booked dates:', bookedDates.length);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                bookedDates: bookedDates,
                lastUpdated: new Date().toISOString(),
                source: 'airbnb',
                count: bookedDates.length
            })
        };
    } catch (error) {
        console.error('Error fetching iCal:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to fetch calendar',
                message: error.message,
                bookedDates: []
            })
        };
    }
};
