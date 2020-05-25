// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const setupStripe = require("stripe")
const { STRIPEKEY } = process.env
const stripe = setupStripe(STRIPEKEY)

exports.handler = async (request, _, callback) => {
  const amount = request.queryStringParameters.amount * 100 || 1000
  const giftaid = request.queryStringParameters.giftaid || "no"
  const massIntentions = request.queryStringParameters.massIntentions || ""
  const receipt_email = request.queryStringParameters.email || ""
  const title = request.queryStringParameters.title || ""
  const firstName = request.queryStringParameters.firstName || ""
  const surname = request.queryStringParameters.surname || ""
  const address = request.queryStringParameters.address || ""

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "gbp",
    receipt_email,

    // Verify your integration in this guide by including this parameter
    metadata: {
      giftaid,
      title,
      first_name: firstName,
      surname,
      mass_intentions: massIntentions,
      address,
    },
  })

  callback(null, {
    statusCode: 200,
    body: paymentIntent.client_secret,
  })
}
