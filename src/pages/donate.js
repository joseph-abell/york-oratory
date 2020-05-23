import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "../components/checkoutForm.js"

const stripePromise = loadStripe("pk_test_D536cfQ6cBIIt068VreBlu0700fXOMit0K")

const Donate = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
)

export default Donate
