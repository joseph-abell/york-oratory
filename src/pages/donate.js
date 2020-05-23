import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "../components/checkoutForm.js"

const stripePromise = loadStripe("sk_test_6sv9ejFmdNPctBPizKicJVQ0005hgqzcNn")

const Donate = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
)

export default Donate
