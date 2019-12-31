/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import NewsItem from '../components/news-item';

class News extends React.Component {
	render() {
		const { data } = this.props;
		const siteTitle = data.site.siteMetadata.title;
		const news = data.news.edges;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title='News' />
				<div css={css`margin-bottom: ${rhythm(2)};`}>
					<h1>News</h1>
					{news.map(({ node }) => {
						const title = node.frontmatter.title || node.fields.slug;
						const primaryImage = node.frontmatter.primaryImage;
						return (
							<NewsItem node={node} key={node.fields.slug} title={title} primaryImage={primaryImage} />
						);
					})}
				</div>
			</Layout>
		);
	}
}

export default News;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		news: allMarkdownRemark(
			filter: { frontmatter: { type: { eq: "news" } } }
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						primaryImage
						description
						type
					}
				}
			}
		}
	}
`;
