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
        total: {
          label: "Test Donation",
          amount: 1000,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      })

      pr.canMakeRequest().then(result => {
        if (result) {
          setPaymentRequest(pr)
        }
      })
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

  if (loading) {
    return <PaymentRequestButtonElement options={{ paymentRequest }} />
  }

  return <div>Payment not ready</div>
}

export default CheckoutForm
