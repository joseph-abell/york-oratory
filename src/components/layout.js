import React from "react"

import { rhythm } from "../utils/typography"
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';

class Layout extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header title={title} />
        <main>{children}</main>
        <Sidebar />
        <Footer />
      </div>
    )
  }
}

export default Layout
