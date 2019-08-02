/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class GroupsPostTemplate extends React.Component {
    render() {
        const post = this.props.data.groups.edges[0].node.frontmatter.groups.find(i => i.urlSlug === this.props.pageContext.slug);
        const siteTitle = this.props.data.site.siteMetadata.title;

        const { previous, next } = this.props.pageContext

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO
                    title={post.title}
                    description={post.description || post.excerpt}
                />
                <h1
                    css={css`
                        margin-top: ${rhythm(1)};
                        margin-bottom: ${rhythm(0.7)};
                    `}
                >
                    {post.title}
                </h1>

                <div dangerouslySetInnerHTML={{ __html: post.body }} />

                <ul
                    css={css`
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        list-style: none;
                        padding: 0,
                    `}
                >
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </Layout>
        )
    }
}

export default GroupsPostTemplate

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
                author
            }
        }
        groups: allMarkdownRemark (filter: {frontmatter: {type: {eq: "groups"}}}) {
            edges {
                node {
                    frontmatter {
                        title
                        type
                        groups {
                            title
                            urlSlug
                            body
                            groupType
                            primaryImage
                        }
                    }
                }
            }
        }
    }
`
