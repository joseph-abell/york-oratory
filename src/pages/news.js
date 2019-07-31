/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const NewsItem = ({ node, title }) => (
    <div>
        <h3
            style={{
                marginBottom: rhythm(1 / 4),
            }}
        >
            <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
            </Link>
        </h3>
        <small
            css={css`
        margin-bottom: ${rhythm(1 / 4)};
        display: block;
      `}
        >{node.frontmatter.date}</small>
        <p
            dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
            }}
        />
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
                    <h2>News</h2>
                    {news.map(({ node }) => {
                        const title = node.frontmatter.title || node.fields.slug;

                        return (
                            <NewsItem node={node} key={node.fields.slug} title={title} />
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
            description
            type
          }
        }
      }
    }
  }
`
