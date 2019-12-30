/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import Markdown from 'markdown-to-jsx';

const NewsItem = ({ node, title, primaryImage }) => (
    <div>
        <h3
            css={css`
				font-size: 1.51572rem;
				margin-bottom: ${rhythm(1 / 4)};
			`}
        >
            <Link style={{ boxShadow: `none` }} to={`/${node.fields.slug}`}>
                {title}
            </Link>
        </h3>
        <small
            css={css`
				margin-bottom: ${rhythm(1 / 4)};
				display: block;
				color: rgba(0, 0, 0, 0.7);
			`}
        >
            {node.frontmatter.date}
        </small>
        {primaryImage && (
            <Link to={node.fields.slug}>
                <img src={primaryImage} alt='' />
            </Link>
        )}
        <p
            dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt
            }}
        />
    </div>
);

class Homepage extends React.Component {
    render() {
        const { data } = this.props;
        const siteTitle = data.site.siteMetadata.title;
        const news = data.news.edges;
        const homepage = data.homepage.edges[0].node;
        const description = homepage.html;
        const sundayMassTimes = homepage.frontmatter.sundayMassTimes;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title='Events and News' />

                {description && <div dangerouslySetInnerHTML={{ __html: description }} />}

                {sundayMassTimes && (
                    <div>
                        <h2>Sunday Mass Times</h2>
                        <Markdown css={css`white-space: pre-wrap;`}>{sundayMassTimes}</Markdown>
                    </div>
                )}

                <div css={css`margin-bottom: ${rhythm(2)};`}>
                    <h2 css={css`font-size: 2rem;`}>News</h2>
                    {news.map(({ node }) => {
                        const title = node.frontmatter.title || node.fields.slug;
                        const primaryImage = node.frontmatter.primaryImage;

                        return <NewsItem node={node} key={node.fields.slug} title={title} primaryImage={primaryImage} />;
                    })}
                    <Link to='/news'>View More News</Link>
                </div>
            </Layout>
        );
    }
}

export default Homepage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		homepage: allMarkdownRemark(filter: { frontmatter: { title: { eq: "Homepage" } } }) {
			edges {
				node {
					html
                    frontmatter {
                        sundayMassTimes
                    }
				}
			}
		}
		news: allMarkdownRemark(
			limit: 3
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
						description
                        primaryImage
						type
					}
				}
			}
		}
	}
`;
