// Netlify Function: Create Stripe Checkout Session
// This function creates a payment session for booking

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const bookingData = JSON.parse(event.body);

        // Validate booking data
        if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.total) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required booking information' })
            };
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'cad', // Change to 'usd' if needed
                        product_data: {
                            name: 'Marrakahshe Retreat Booking',
                            description: `${bookingData.nights} nights: ${bookingData.checkIn} to ${bookingData.checkOut}`,
                            images: ['https://a0.muscache.com/im/pictures/miso/Hosting-52464158/original/19fc7ee2-08bc-432b-b78d-80968d0405a0.jpeg'],
                        },
                        unit_amount: Math.round(parseFloat(bookingData.total) * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.URL}/#booking`,
            customer_email: bookingData.email,
            metadata: {
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut,
                guests: bookingData.guests,
                name: bookingData.name,
                phone: bookingData.phone,
                message: bookingData.message || ''
            }
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                sessionId: session.id,
                url: session.url
            })
        };

    } catch (error) {
        console.error('Error creating checkout session:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
