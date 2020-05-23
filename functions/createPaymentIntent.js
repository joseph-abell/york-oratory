// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const setupStripe = require("stripe")
const { STRIPE_KEY } = process.env
const stripe = setupStripe(STRIPE_KEY)

exports.handler = async (event, context, callback) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "gbp",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  })

  callback(null, {
    statusCode: 200,
    body: paymentIntent.client_secret,
  })
}
