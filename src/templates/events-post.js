/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

class EventsPostTemplate extends React.Component {
	render() {
		const post = this.props.data.markdownRemark;
		const siteTitle = this.props.data.site.siteMetadata.title;
		const { previous, next } = this.props.pageContext;

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
				<p
					css={css`
						${scale(-1 / 5)} display: block;
						margin-bottom: ${rhythm(0.7)};
						color: rgba(0, 0, 0, 0.7);
					`}
				>
					{post.frontmatter.eventDate}
				</p>
				<div dangerouslySetInnerHTML={{ __html: post.html }} />

				<ul
					css={css`
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						list-style: none;
						padding: 0;
					`}
				>
					<li>
						{previous && (
							<Link to={previous.fields.slug} rel='prev'>
								← {previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						{next && (
							<Link to={next.fields.slug} rel='next'>
								{next.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
			</Layout>
		);
	}
}

export default EventsPostTemplate;

export const pageQuery = graphql`
	query EventsPostBySlug($slug: String!) {
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
				eventDate(formatString: "MMMM DD, YYYY")
				description
			}
		}
	}
`;
