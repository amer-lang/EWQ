// api/charge-upsell.js
// Charges the card they already entered for one-click upsells

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, description, customerId, paymentMethodId } = req.body;

    if (!amount || !customerId || !paymentMethodId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Charge the saved card
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      description: description || 'Ecom Websites - Upsell',
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
    });

    res.status(200).json({
      success: true,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('Upsell charge error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
