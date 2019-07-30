/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from "react"

import { rhythm } from "../utils/typography"
import Header from './header';
import Footer from './footer';
import Menu from './menu';
import Clearfix from './clearfix';


class Layout extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <div css={css`
        margin-left: auto;
        margin-right: auto;
        max-width: ${rhythm(40)};
        padding: ${rhythm(1.5)} ${rhythm(3 / 4)}
      `}>
        <Header title={title} />
        <Menu />
        <main css={css`
          width: 75%;
          float: left;
          padding-right: ${rhythm(1.5)};
          min-height: 60vh;
        `}>
          {children}
        </main>
        <Clearfix />
        <Footer />
      </div>
    )
  }
}

export default Layout
