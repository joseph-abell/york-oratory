import React, { useState, useEffect } from "react"
import { PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js"

const CheckoutForm = () => {
  const stripe = useStripe()
  const [paymentRequest, setPaymentRequest] = useState(null)
  const [paymentSecret, setPaymentSecret] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        currency: "gbp",
        country: "GB",
        total: {
          label: "Test Donation",
          amount: 1000,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      })

      pr.canMakePayment().then(() => setPaymentRequest(pr))
    }
  }, [stripe])

  useEffect(() => {
    fetch("https://yorkoratory.com/.netlify/functions/createPaymentIntent")
      .then(r => r.text())
      .then(secret => setPaymentSecret(secret))
  }, [])

  useEffect(() => {
    if (paymentRequest && paymentSecret) setLoading(false)
  }, [paymentRequest, paymentSecret])

  if (loading) return <div>Payment not ready</div>
  console.log(paymentRequest)
  paymentRequest.on("paymentmethod", async ev => {
    // Confirm the PaymentIntent without handling potential next actions (yet).
    const { error: confirmError } = await stripe.confirmCardPayment(
      paymentSecret,
      { payment_method: ev.paymentMethod.id },
      { handleActions: false }
    )

    if (confirmError) {
      // Report to the browser that the payment failed, prompting it to
      // re-show the payment interface, or show an error message and close
      // the payment interface.
      ev.complete("fail")
    } else {
      // Report to the browser that the confirmation was successful, prompting
      // it to close the browser payment method collection interface.
      ev.complete("success")
      // Let Stripe.js handle the rest of the payment flow.
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentSecret
      )
      if (error) {
        // The payment failed -- ask your customer for a new payment method.
        console.log(error)
      } else {
        // The payment has succeeded.
        console.log(paymentIntent)
      }
    }
  })
  return <PaymentRequestButtonElement options={{ paymentRequest }} />
}

export default CheckoutForm
