/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import NewsItem from "../components/news-item"
import { rhythm } from "../utils/typography"
import Markdown from "markdown-to-jsx"

class Homepage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const news = data.news.edges
    const homepage = data.homepage
    const sundayMassTimes = homepage && homepage.frontmatter.sundayMassTimes

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Mass Times and News" />

        {sundayMassTimes && (
          <div
            css={css`
              border: 1px solid #eee;
              border-radius: 3px;
              padding: 10px;
              margin-bottom: 30px;

              p:last-of-type {
                margin-bottom: 0;
              }
            `}
          >
            <h2
              css={css`
                font-size: 2rem;
              `}
            >
              Sunday Mass Times
            </h2>
            <Markdown
              css={css`
                white-space: pre-wrap;
              `}
            >
              {sundayMassTimes}
            </Markdown>
          </div>
        )}

        <div
          css={css`
            margin-bottom: ${rhythm(2)};
          `}
        >
          <h2
            css={css`
              font-size: 2rem;
            `}
          >
            News
          </h2>
          {news.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const primaryImage = node.frontmatter.primaryImage

            return (
              <NewsItem
                node={node}
                key={node.fields.slug}
                title={title}
                primaryImage={primaryImage}
              />
            )
          })}
          <Link to="/news">View More News</Link>
        </div>
      </Layout>
    )
  }
}

export default Homepage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    homepage: markdownRemark(frontmatter: { title: { eq: "Homepage" } }) {
      html
      frontmatter {
        sundayMassTimes
      }
    }
    news: allMarkdownRemark(
      limit: 3
      filter: { frontmatter: { type: { eq: "news" } } }
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
            description
            primaryImage
            type
          }
        }
      }
    }
  }
`
