// api/create-payment.js
// This runs on Vercel's servers so your secret key stays safe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, description } = req.body;

    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create a customer so we can charge their card again for upsells
    const customer = await stripe.customers.create({
      description: 'Ecom Websites Quiz Funnel Customer',
    });

    // Create PaymentIntent tied to that customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      description: description || 'Ecom Websites - Store Activation',
      customer: customer.id,
      setup_future_usage: 'off_session',
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
    });

  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

