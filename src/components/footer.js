/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';

const Footer = () => {
    const data = useStaticQuery(graphql`
		query {
			markdownRemark(frontmatter: { title: { eq: "Footer" } }) {
				frontmatter {
					middlesboroughCharityNumber
					credits
				}
			}
		}
	`);

    const { yorkCharityNumber, middlesboroughCharityNumber, credits } = data.markdownRemark.frontmatter;

    return (
        <footer
            css={css`
				text-align: center;
				border-top: 1px solid #f4f4f4;
				padding-top: ${rhythm(1.5)};
				line-height: ${rhythm(0.5)};

				p,
				div {
					line-height: 1.5em;
					margin-bottom: 1em;
					color: rgba(0, 0, 0, 0.7);
				}

				span {
					color: #8c181f;
					text-shadow: rgba(150, 0, 0, 0.5) 0px 1px 2px;
				}
			`}
        >
            {yorkCharityNumber && (
                <p>
                    <small>{yorkCharityNumber}</small>
                </p>
            )}
            {middlesboroughCharityNumber && (
                <p>
                    <small>{middlesboroughCharityNumber}</small>
                </p>
            )}
            {credits && (
                <p>
                    <small dangerouslySetInnerHTML={{ __html: credits }} />
                </p>
            )}
        </footer>
    );
};

export default Footer;
