// Netlify Function: Sync Airbnb Calendar
// Fetches and parses Airbnb iCal feed to get booked dates

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const airbnbIcalUrl = process.env.AIRBNB_ICAL_URL;

        if (!airbnbIcalUrl) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Airbnb iCal URL not configured',
                    bookedDates: []
                })
            };
        }

        // Fetch the iCal feed
        const response = await fetch(airbnbIcalUrl);
        const icalData = await response.text();

        // Parse iCal data (simple parser - for production use a library like node-ical)
        const bookedDates = parseICalDates(icalData);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
            },
            body: JSON.stringify({ bookedDates })
        };

    } catch (error) {
        console.error('Error syncing calendar:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to sync calendar',
                bookedDates: []
            })
        };
    }
};

// Simple iCal parser - extracts dates between DTSTART and DTEND
function parseICalDates(icalData) {
    const bookedDates = [];
    const events = icalData.split('BEGIN:VEVENT');

    for (let i = 1; i < events.length; i++) {
        const event = events[i];

        // Extract DTSTART and DTEND
        const dtStartMatch = event.match(/DTSTART;VALUE=DATE:(\d{8})/);
        const dtEndMatch = event.match(/DTEND;VALUE=DATE:(\d{8})/);

        if (dtStartMatch && dtEndMatch) {
            const startDate = parseICalDate(dtStartMatch[1]);
            const endDate = parseICalDate(dtEndMatch[1]);

            // Add all dates in the range
            const currentDate = new Date(startDate);
            while (currentDate < endDate) {
                bookedDates.push(formatDate(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    }

    return bookedDates;
}

// Parse iCal date format (YYYYMMDD) to Date object
function parseICalDate(dateStr) {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return new Date(`${year}-${month}-${day}`);
}

// Format date as YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
