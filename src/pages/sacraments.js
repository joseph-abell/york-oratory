/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const SacramentsItem = ({ node, title, primaryImage }) => (
  <div
    css={css`
      border-bottom: 1px solid #eee;
      margin-bottom: 20px;
      padding-bottom: 30px;

      &:last-of-type {
        border-bottom: 0;
      }
    `}
  >
    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
      <h2
        css={css`
          margin-bottom: ${rhythm(1 / 4)};
        `}
      >
        {title}
      </h2>

      <small
        css={css`
          margin-bottom: ${rhythm(1 / 4)};
          display: block;
          color: rgba(0, 0, 0, 0.7);
        `}
      >
        {node.frontmatter.date}
      </small>
      <p
        dangerouslySetInnerHTML={{
          __html: node.frontmatter.description || node.excerpt,
        }}
        css={css`
          color: hsla(0, 0%, 0%, 0.8);
        `}
      />
      {primaryImage && <img src={primaryImage} alt="" />}

      <button>More Info</button>
    </Link>
  </div>
)

class Sacraments extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const sacraments = data.sacraments.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Sacraments" />
        <div
          css={css`
            margin-bottom: ${rhythm(2)};
          `}
        >
          <h1>Sacraments</h1>
          {sacraments.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const primaryImage = node.frontmatter.primaryImage

            return (
              <SacramentsItem
                node={node}
                key={node.fields.slug}
                title={title}
                primaryImage={primaryImage}
              />
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default Sacraments

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    sacraments: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "sacraments" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            primaryImage
            description
            type
          }
        }
      }
    }
  }
`
