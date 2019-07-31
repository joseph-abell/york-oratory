/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const EventsItem = ({ node, title }) => (
    <div>
        <h3
            css={css`
        margin-bottom: ${rhythm(1 / 4)};
      `}
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
        >{node.frontmatter.eventDate}</small>
        <p
            dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
            }}
        />
    </div>
);

class Events extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const events = data.events.edges

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Events" />
                <div css={css`margin-bottom: ${rhythm(2)};`}>
                    <h2>Events</h2>
                    {events.map(({ node }) => {
                        const title = node.frontmatter.title || node.fields.slug;

                        return (
                            <EventsItem node={node} key={node.fields.slug} title={title} />
                        )
                    })}
                </div>
            </Layout>
        )
    }
}

export default Events

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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
