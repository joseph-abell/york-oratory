/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

class Contact extends React.Component {
    render() {
        const { data } = this.props;
        const siteTitle = data.site.siteMetadata.title;
        const { parishPriest, address, telephone, email, directions } = data.contact.frontmatter;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title='Events' />
                <div css={css`margin-bottom: ${rhythm(2)};`}>
                    <h1>Contact</h1>
                    <div>
                        <h2>Parish Priest:</h2>
                        <p>{parishPriest}</p>
                    </div>
                    <div>
                        <h2>Address:</h2>
                        <Markdown css={css`white-space: pre-wrap;`}>{address}</Markdown>
                    </div>
                    <div>
                        <h2>Telephone:</h2>
                        <p>{telephone}</p>
                    </div>
                    <div>
                        <h2>Email:</h2>
                        <p>{email}</p>
                    </div>
                    <div>
                        <h2>Directions:</h2>
                        <Markdown css={css`white-space: pre-wrap;`}>{directions}</Markdown>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Contact;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		contact: markdownRemark(frontmatter: { title: { eq: "Contact" } }) {
            frontmatter {
                parishPriest
                address
                telephone
                email
                directions
            }
		}
	}
`;
