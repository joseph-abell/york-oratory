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
    <small>{node.frontmatter.date}</small>
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
      style={{
        marginBottom: rhythm(1 / 4),
      }}
    >
      <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
        {title}
      </Link>
    </h3>
    <small>{node.frontmatter.date}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: node.frontmatter.description || node.excerpt,
      }}
    />
  </div>
);

const MenuItem = ({ title, url }) => (
  <li>
    <a href={url}>{title}</a>
  </li>
)

const MenuGroup = ({ title, items }) => (
  <div>
    {title && (<h3>{title}</h3>)}
    <ul>
      {items && items.map(item => (<MenuItem title={item.title} key={item.url} url={item.url} />))}
    </ul>
  </div>
);

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const news = data.news.edges
    const events = data.events.edges
    const menu = data.menu.edges[0].node.frontmatter.groups;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="News and Events" />
        <div>
          <h2>News</h2>
          {news.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;

            return (
              <NewsItem node={node} key={node.fields.slug} title={title} />
            )
          })}
        </div>
        <div>
          <h3>Events</h3>
          {events.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;

            return (
              <EventsItem node={node} key={node.fields.slug} title={title} />
            )
          })}
        </div>
        <div>
          {menu.map(({ title, items }) => (
            <MenuGroup key={JSON.stringify(items)} title={title} items={items} />
          ))}
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
    events: allMarkdownRemark(filter: { frontmatter: { type: { eq: "events" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
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
    menu: allMarkdownRemark(filter: {frontmatter: {type: {eq: "menu"}}}) {
      edges {
        node {
          frontmatter {
            groups {
              title
              items {
                title
                url
              }
            }
          }
        }
      }
    }
  }
`
