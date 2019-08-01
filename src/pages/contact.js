/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class Contact extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const contact = data.contact.edges
        console.log(contact);
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Events" />
                <div css={css`margin-bottom: ${rhythm(2)};`}>
                    <h1>Contact</h1>


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
        contact: allMarkdownRemark(filter: { frontmatter: { type: { eq: "contact" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`
