/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import { graphql } from "gatsby"
import Markdown from "markdown-to-jsx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class Contact extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const {
      parishPriest,
      provost,
      address,
      telephone,
      directions,
      description,
    } = data.contact.edges[0].node.frontmatter

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Contact" />
        <div
          css={css`
            margin-bottom: ${rhythm(2)};
          `}
        >
          <h1>Contact</h1>
          <Markdown>{description}</Markdown>
          <div>
            <h2>Parish Priest:</h2>
            <p>{parishPriest}</p>
          </div>

          <div>
            <h2>Provost:</h2>
            <p>{provost}</p>
          </div>
          <div>
            <h2>Address:</h2>
            <Markdown
              css={css`
                white-space: pre-wrap;
              `}
            >
              {address}
            </Markdown>
          </div>
          <div>
            <h2>Telephone:</h2>
            <p>{telephone}</p>
          </div>
          <div>
            <h2>Directions:</h2>
            <Markdown
              css={css`
                white-space: pre-wrap;
              `}
            >
              {directions}
            </Markdown>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    contact: allMarkdownRemark(
      filter: { frontmatter: { title: { eq: "Contact" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            parishPriest
            provost
            address
            telephone
            directions
            description
          }
        }
      }
    }
  }
`
