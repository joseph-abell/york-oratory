import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Footer = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
    `);

    console.log(data);

    return (
        <footer>
            Footer
        </footer>
    );
};

export default Footer;