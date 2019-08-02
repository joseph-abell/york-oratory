/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const GroupsItem = ({ node, title, primaryImage }) => (
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
            {node.frontmatter.eventDate}
        </small>
        <p
            dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
            }}
        />
        {primaryImage && (
            <Link to={node.fields.slug}>
                <img src={primaryImage} alt='' />
            </Link>
        )}
    </div>
);

class Groups extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const groups = data.groups.edges

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Groups" />
                <div css={css`margin-bottom: ${rhythm(2)};`}>
                    <h1>Groups</h1>

                    {groups.map(({ node }) => {
                        const title = node.frontmatter.title || node.fields.slug;
                        const primaryImage = node.frontmatter.primaryImage;
                        return (
                            <GroupsItem node={node} key={node.fields.slug} title={title} primaryImage={primaryImage} />
                        )
                    })}
                </div>
            </Layout>
        )
    }
}

export default Groups

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        groups: allMarkdownRemark(filter: { frontmatter: { type: { eq: "groups" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        primaryImage
                    }
                }
            }
        }
    }
`
