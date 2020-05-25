import React, { useState, useEffect } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import NumberFormat from "react-number-format"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

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
const StyledForm = styled.form`
  button {
    margin-right: 20px;
  }

  input[type="text"] {
    padding: 10px;
  }
  input[type="email"] {
    padding: 10px;
  }
`

const CardSection = () => (
  <label htmlFor="cardElement">
    <p>
      <strong>Card details</strong>
    </p>
    <div style={{ marginBottom: "30px" }}>
      <StyledCardElement>
        <CardElement id="cardElement" options={CARD_ELEMENT_OPTIONS} />
      </StyledCardElement>
    </div>
  </label>
)

const CheckoutForm = () => {
  const data = useStaticQuery(graphql`
    query {
      giftaid: markdownRemark(frontmatter: { title: { eq: "Gift Aid" } }) {
        frontmatter {
          amounts {
            amount
          }
          deck
          noDeck
          yesDeck
        }
      }
    }
  `)
  const { deck, noDeck, yesDeck } = data?.giftaid?.frontmatter
  const amounts = data?.giftaid?.frontmatter?.amounts?.map(a => a.amount)

  const minAmount = 10

  const stripe = useStripe()
  const elements = useElements()

  const [paymentSecret, setPaymentSecret] = useState(null)

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const [amount, setAmount] = useState(minAmount)
  const [numberError, setNumberError] = useState()
  const [giftaid, setGiftaid] = useState("no")
  const [massIntentions, setMassIntentions] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [showGiftAidOptions, setShowGiftAidOptions] = useState(false)

  useEffect(() => {
    if (amount < minAmount) return
    fetch(
      `/.netlify/functions/createPaymentIntent?amount=${amount}&giftaid=${giftaid}&massIntentions=${massIntentions}&email=${email}&name=${name}`
    )
      .then(r => r.text())
      .then(secret => setPaymentSecret(secret))
  }, [amount, giftaid, email, massIntentions, name])

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
      <div style={{ marginBottom: "20px" }}>
        Your payment has gone through. Thank you for your donation.
      </div>
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
  }

  const onShowGiftAidOptionsClick = () => setShowGiftAidOptions(true)
  const onSetAmountClick = a => setAmount(a)
  const onGiftAidChange = e => setGiftaid(e.target.value)
  const onMassIntentionsChange = e => setMassIntentions(e.target.value)
  const onEmailChange = e => setEmail(e.target.value)
  const onNameChange = e => setName(e.target.value)

  const isDisabled = !stripe || !paymentSecret || numberError

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <div>
          <p>
            <label htmlFor="name">Name</label>
          </p>
          <p>
            <input type="text" id="name" value={name} onChange={onNameChange} />
          </p>
        </div>

        <div>
          <p>
            <label htmlFor="email">Email</label>
          </p>
          <div>Used to send a receipt of your donation.</div>
          <p>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onEmailChange}
            />
          </p>
        </div>

        <p>
          <label htmlFor="amount">
            <strong>Amount to Donate</strong>
          </label>
        </p>

        <p>
          {amounts?.map(a => (
            <button type="button" onClick={() => onSetAmountClick(a)}>
              £{a}
            </button>
          ))}
        </p>

        <p>Or set your own custom amount (min £10)</p>

        <p>
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
        </p>
      </div>

      {numberError && <div>{numberError}</div>}

      <div>
        <CardSection />
      </div>

      <div>
        <p>
          <strong>Gift Aid for UK Donors</strong>
        </p>

        <p>{deck}</p>

        <p>
          <button type="button" onClick={onShowGiftAidOptionsClick}>
            Show Gift Aid Options
          </button>
        </p>

        {showGiftAidOptions && (
          <div>
            <p>
              <input
                type="radio"
                name="giftAid"
                value="yes"
                checked={giftaid === "yes"}
                onChange={onGiftAidChange}
                id="giftAidYes"
              />

              <label htmlFor="giftAidYes">{yesDeck}</label>
            </p>

            <p>
              <input
                type="radio"
                name="giftAid"
                value="no"
                checked={giftaid === "no"}
                onChange={onGiftAidChange}
                id="giftAidNo"
              />
              <label htmlFor="giftAidYes">{noDeck}</label>
            </p>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="massIntentions">Mass Intentions</label>
        <textarea
          id="massIntentions"
          value={massIntentions}
          onChange={onMassIntentionsChange}
        />
      </div>

      <div>
        <button type="submit" disabled={isDisabled}>
          Confirm order
        </button>
      </div>
    </StyledForm>
  )
}

export default CheckoutForm
