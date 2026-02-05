// api/create-payment.js
// This runs on Vercel's servers (not in the browser) so your secret key stays safe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, description } = req.body;

    // Safety check: make sure amount is valid
    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create a PaymentIntent — this tells Stripe "someone wants to pay $X"
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,               // Amount in CENTS (e.g., 2000 = $20.00)
      currency: 'usd',
      description: description || 'Ecom Websites - Store Activation',
      // This lets us charge the same card later for upsells
      setup_future_usage: 'off_session',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Send back the secret token that the frontend needs
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
