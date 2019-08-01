/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { rhythm } from "../utils/typography"

const NewsItem = ({ node, title }) => (
  <div>
    <h3
      css={css`
        font-size: 1.51572rem;
        margin-bottom: ${rhythm(1 / 4)};
      `}
    >
      <Link style={{ boxShadow: `none` }} to={`/${node.fields.slug}`}>
        {title}
      </Link>
    </h3>
    <small
      css={css`
        margin-bottom: ${rhythm(1 / 4)};
        display: block;
        color: rgba(0, 0, 0, 0.7);
      `}
    >{node.frontmatter.date}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: node.frontmatter.description || node.excerpt,
      }}
    />
  </div>
);

const EventsItem = ({ node, title }) => (
  <div>
    <h3
      css={css`
        margin-bottom: ${rhythm(1 / 4)};
        font-size: 1.51572rem;
      `}
    >
      <Link style={{ boxShadow: `none` }} to={`/${node.fields.slug}`}>
        {title}
      </Link>
    </h3>
    <small
      css={css`
        margin-bottom: ${rhythm(1 / 4)};
        display: block;
        color: rgba(0, 0, 0, 0.7);
      `}
    >{node.frontmatter.eventDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: node.frontmatter.description || node.excerpt,
      }}
    />
  </div>
);

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const news = data.news.edges
    const events = data.events.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <div css={css`margin-bottom: ${rhythm(2)};`}>
          <h2 css={css`font-size: 2rem;`}>Events</h2>
          {events.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;

            return (
              <EventsItem node={node} key={node.fields.slug} title={title} />
            )
          })}
          <Link to='/events'>View More Events</Link>
        </div>
        <div css={css`margin-bottom: ${rhythm(2)};`}>
          <h2>News</h2>
          {news.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;

            return (
              <NewsItem node={node} key={node.fields.slug} title={title} />
            )
          })}
          <Link to='/news'>View More News</Link>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    news: allMarkdownRemark(limit: 3, filter: { frontmatter: { type: { eq: "news" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
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
    events: allMarkdownRemark(limit: 3, filter: { frontmatter: { type: { eq: "events" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            eventDate(formatString: "MMMM DD, YYYY")
            title
            description
            type
          }
        }
      }
    }
  }
`
