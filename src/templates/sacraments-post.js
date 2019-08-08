/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

class SacramentsPostTemplate extends React.Component {
	render() {
		const post = this.props.data.markdownRemark;
		const siteTitle = this.props.data.site.siteMetadata.title;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
				<h1
					css={css`
						margin-top: ${rhythm(1)};
						margin-bottom: ${rhythm(0.7)};
					`}
				>
					{post.frontmatter.title}
				</h1>
				<Markdown>{post.html}</Markdown>
			</Layout>
		);
	}
}

export default SacramentsPostTemplate;

export const pageQuery = graphql`
	query SacramentsPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				description
			}
		}
	}
`;
