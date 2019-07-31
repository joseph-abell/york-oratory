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
            ${scale(-0.3)}
            line-height: ${rhythm(0.5)};

            p {
                line-height: 1.5em;
                margin-bottom: 1em;
            }
        `}>
            {copyright && (<p>{copyright}</p>)}
            {oxfordCharityNumber && (<p>{oxfordCharityNumber}</p>)}
            {middlesboroughCharityNumber && (<p>{middlesboroughCharityNumber}</p>)}
            {credits && (
                <div dangerouslySetInnerHTML={{ __html: credits }} />
            )}
        </footer>
    );
};

export default Footer;