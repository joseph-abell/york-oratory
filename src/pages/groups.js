/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const GroupsItem = ({ node, group }) => (
    <div>
        <h2
            css={css`
                margin-bottom: ${rhythm(1 / 4)};
            `}
        >
            <Link style={{ boxShadow: `none` }} to={`/${group.urlSlug}`}>
                {group.title}
            </Link>
        </h2>
        <p
            dangerouslySetInnerHTML={{
                __html: group.description || node.excerpt,
            }}
        />
        {group.primaryImage && (
            <Link to={node.fields.slug}>
                <img src={group.primaryImage} alt='' />
            </Link>
        )}
    </div>
);

class Groups extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const groups = data.groups.edges[0].node.frontmatter.groups;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Groups" />
                <div css={css`margin-bottom: ${rhythm(2)};`}>
                    <h1>Groups</h1>

                    {groups.map((group) => (
                        <GroupsItem
                            key={group.title}
                            node={data.groups.edges[0].node}
                            group={group}
                        />
                    ))}
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
        groups: allMarkdownRemark(filter: {frontmatter: {title: {eq: "Groups"}}}) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
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
