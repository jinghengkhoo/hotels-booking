import stripeModule from 'stripe';

const stripe = stripeModule(process.env.STRIPE_SECRET_KEY);

export const payment = async (req, res) => {
  try {
    const { amount, currency, payment_method } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method,
      return_url: "http://localhost:5173/",
      confirm: true,
    });
    res.status(200).json(paymentIntent);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "An error occurred" });
  }
}