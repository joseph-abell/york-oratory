/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const PoliciesItem = ({ node, title, primaryImage, policy, newTab }) => (
	<div css={css`
        border-bottom: 1px solid #eee;
        padding-bottom: 30px;
        margin-bottom: 20px;

        &:last-of-type {
            border-bottom: 0;
        }
    `}>
        <a href={policy} style={{ boxShadow: `none` }} target={newTab ? '_blank' : '_self'}>
		    <h2 css={css`margin-bottom: ${rhythm(1 / 4)};`}>
				{title}
		    </h2>
            <small
                css={css`
                    margin-bottom: ${rhythm(1 / 4)};
                    display: block;
                    color: rgba(0, 0, 0, 0.7);
                `}
            >
                {node.frontmatter.date}
            </small>
            <p
                dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt
                }}

                css={css`
                    color: hsla(0,0%,0%,0.8);
                `}
            />
            {primaryImage && (
                <img src={primaryImage} alt='' />
            )}
        </a>
	</div>
);

class Policies extends React.Component {
	render() {
		const { data } = this.props;
		const siteTitle = data.site.siteMetadata.title;
		const policies = data.policies.edges;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title='Policies' />
				<div css={css`margin-bottom: ${rhythm(2)};`}>
					<h1>Policies</h1>
					{policies.map(({ node }) => {
						const title = node.frontmatter.title || node.fields.slug;
						const primaryImage = node.frontmatter.primaryImage;

						return (
							<PoliciesItem
								node={node}
								key={node.fields.slug}
								title={title}
								primaryImage={primaryImage}
								policy={node.frontmatter.policy}
                                newTab={node.frontmatter.newTab}
							/>
						);
					})}
				</div>
			</Layout>
		);
	}
}

export default Policies;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		policies: allMarkdownRemark(
			filter: { frontmatter: { type: { eq: "policies" } } }
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
						policy
                        newTab
					}
				}
			}
		}
	}
`;
