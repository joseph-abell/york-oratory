import React, { useState, useEffect } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import NumberFormat from "react-number-format"
import styled from "styled-components"

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

const StyledCardElement = styled.div`
  .StripeElement {
    height: 40px;
    padding: 10px 12px;
    width: 100%;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
`

const CardSection = () => (
  <label htmlFor="cardElement">
    Card details
    <StyledCardElement>
      <CardElement id="cardElement" options={CARD_ELEMENT_OPTIONS} />
    </StyledCardElement>
  </label>
)

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentSecret, setPaymentSecret] = useState(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()
  const minAmount = 10
  const [amount, setAmount] = useState(minAmount)
  const [numberError, setNumberError] = useState()

  useEffect(() => {
    if (amount < minAmount) return
    fetch(`/.netlify/functions/createPaymentIntent?amount=${amount}`)
      .then(r => r.text())
      .then(secret => setPaymentSecret(secret))
  }, [amount])

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements || !paymentSecret || amount < minAmount) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.confirmCardPayment(paymentSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    if (result.error) {
      setError(result.error.message)
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.

        setSuccess(true)
      }
    }
  }

  if (success) {
    return (
      <div>Your payment has gone through. Thank you for your donation.</div>
    )
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <p>Reload the page to try again.</p>
      </div>
    )
  }

  const onNumberFormatChange = e => {
    const v = e.floatValue
    setAmount(v)

    if (e.floatValue < minAmount) {
      setNumberError(`Value must be at least £${minAmount}`)
    } else if (numberError) {
      setNumberError()
    }
    console.log(e)
  }

  console.log(numberError)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Amount to Donate</label>

        <NumberFormat
          value={amount}
          onValueChange={onNumberFormatChange}
          decimalScale={0}
          allowNegative={false}
          allowEmptyFormatting={false}
          allowLeadingZeros={false}
          prefix="£"
          type="text"
        />
      </div>

      {numberError && <div>{numberError}</div>}

      <div>
        <CardSection />
      </div>

      <div>
        <button disabled={!stripe || !paymentSecret || !numberError}>
          Confirm order
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
