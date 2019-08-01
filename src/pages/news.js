/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const NewsItem = ({ node, title, primaryImage }) => (
  <div>
    <h2
      css={css`
        margin-bottom: ${rhythm(1 / 4)};
      `}
    >
      <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
        {title}
      </Link>
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
    />
    {primaryImage && (
      <Link to={node.fields.slug}>
        <img src={primaryImage} alt="" />
      </Link>
    )}

  </div>
);

class News extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const news = data.news.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="News" />
        <div css={css`margin-bottom: ${rhythm(2)};`}>
          <h1>News</h1>
          {news.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            const primaryImage = node.frontmatter.primaryImage;
            return (
              <NewsItem node={node} key={node.fields.slug} title={title} primaryImage={primaryImage} />
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default News

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    news: allMarkdownRemark(filter: { frontmatter: { type: { eq: "news" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
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
