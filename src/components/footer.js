/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';

const Footer = () => {
	const data = useStaticQuery(graphql`
		query {
			markdownRemark(frontmatter: { title: { eq: "Footer" } }) {
				frontmatter {
					copyright
					oxfordCharityNumber
					middlesboroughCharityNumber
				}
			}
		}
	`);

	const { copyright, oxfordCharityNumber, middlesboroughCharityNumber } = data.markdownRemark.frontmatter;

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
					color: #a00;
					text-shadow: rgba(150, 0, 0, 0.5) 0px 1px 2px;
				}
			`}
		>
			{copyright && (
				<p>
					<small>{copyright}</small>
				</p>
			)}
			{oxfordCharityNumber && (
				<p>
					<small>{oxfordCharityNumber}</small>
				</p>
			)}
			{middlesboroughCharityNumber && (
				<p>
					<small>{middlesboroughCharityNumber}</small>
				</p>
			)}
		</footer>
	);
};

export default Footer;
