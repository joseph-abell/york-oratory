/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

class NewsPostTemplate extends React.Component {
	render() {
		const post = this.props.data.markdownRemark;
		const siteTitle = this.props.data.site.siteMetadata.title;

		return (
            <Layout
                location={this.props.location}
                title={siteTitle}
            >
				<SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
				<h1
					css={css`
						margin-top: ${rhythm(1)};
						margin-bottom: ${rhythm(0.8)};
					`}
				>
					{post.frontmatter.title}
				</h1>
				<p
					css={css`
						${scale(-1 / 5)} display: block;
						margin-bottom: ${rhythm(1)};
						color: rgba(0, 0, 0, 0.7);
					`}
				>
					{post.frontmatter.date}
				</p>
                <div css={css`
                    img {
                        width: 80%;
                    }
                `}>
                    <Markdown>{post.html}</Markdown>
                </div>
			</Layout>
		);
	}
}

export default NewsPostTemplate;

export const pageQuery = graphql`
	query NewsPostBySlug($slug: String!) {
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
				date(formatString: "MMMM DD, YYYY")
				description
			}
		}
	}
`;
