import React, { useState, useEffect } from "react"
import { PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js"

const CheckoutForm = () => {
  const stripe = useStripe()
  const [paymentRequest, setPaymentRequest] = useState(null)

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

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{ paymentRequest }} />
  }

  return <div>Payment not ready</div>
}

export default CheckoutForm
