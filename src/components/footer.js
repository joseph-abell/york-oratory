/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import { rhythm, scale } from "../utils/typography"

const Footer = () => {
    const data = useStaticQuery(graphql`
        query {
            markdownRemark(frontmatter: {title: {eq: "Footer"}}) {
                frontmatter {
                    copyright
                    oxfordCharityNumber
                    middlesboroughCharityNumber
			        credits
                }
            }
        }
    `);

    const { copyright, oxfordCharityNumber, middlesboroughCharityNumber, credits } = data.markdownRemark.frontmatter;

    return (
        <footer css={css`
            text-align: center;
            border-top: 1px solid #f4f4f4;
            padding-top: ${rhythm(1.5)};
            line-height: ${rhythm(0.5)};

            p, div {
                line-height: 1.5em;
                margin-bottom: 1em;
                color: rgba(0, 0, 0, 0.7);
            }
        `}>
            {copyright && (<p><small>{copyright}</small></p>)}
            {oxfordCharityNumber && (<p><small>{oxfordCharityNumber}</small></p>)}
            {middlesboroughCharityNumber && (<p><small>{middlesboroughCharityNumber}</small></p>)}
            {credits && (
                <p><small dangerouslySetInnerHTML={{ __html: credits }} /></p>
            )}
        </footer>
    );
};

export default Footer;