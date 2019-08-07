/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

class GroupsPostTemplate extends React.Component {
	render() {
		const post = this.props.data.groups.edges[0].node.frontmatter.groups.find(
			(i) => i.urlSlug === this.props.pageContext.slug
		);
		const siteTitle = this.props.data.site.siteMetadata.title;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title={post.title} description={post.description || post.excerpt} />
				<h1
					css={css`
						margin-top: ${rhythm(1)};
						margin-bottom: ${rhythm(0.7)};
					`}
				>
					{post.title}
				</h1>

				<Markdown>{post.body}</Markdown>
			</Layout>
		);
	}
}

export default GroupsPostTemplate;

export const pageQuery = graphql`
	{
		site {
			siteMetadata {
				title
				author
			}
		}
		groups: allMarkdownRemark(filter: { frontmatter: { type: { eq: "groups" } } }) {
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
`;
