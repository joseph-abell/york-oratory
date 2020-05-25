/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { rhythm } from "../utils/typography"
import Header from "./header"
import Footer from "./footer"
import Menu from "./menu"
import Sidebar from "./sidebar"
import Clearfix from "./clearfix"

const stripePromise = loadStripe("pk_test_D536cfQ6cBIIt068VreBlu0700fXOMit0K")

class Layout extends React.Component {
  render() {
    const { title, image, children } = this.props
    return (
      <Elements stripe={stripePromise}>
        <Header title={title} image={image} />
        <div
          css={css`
            margin-left: auto;
            margin-right: auto;
            max-width: ${rhythm(40)};
            padding: 1.45rem ${rhythm(3 / 4)};
          `}
        >
          <Menu />
          <main
            css={css`
              margin-right: 20px;

              @media (min-width: 767px) {
                min-height: 60vh;
                float: left;
                width: 65%;
                margin-right: 5%;
              }
            `}
          >
            {children}
          </main>
          <Sidebar />
          <Clearfix />
          <Footer />
        </div>
      </Elements>
    )
  }
}

export default Layout
