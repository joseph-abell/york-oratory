/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { rhythm } from '../utils/typography';

const MenuItem = ({ title, url, newTab = false }) => {
    const isPdf = url.includes('.pdf');

    return (
        <li
            css={css`
                list-style: none;
                margin-right: 20px;
                display: inline-block;
            `}
        >
            {isPdf && (
                <a href={url} target={newTab ? '_blank' : '_self'}>
                    {title}
                </a>
            )}

            {!isPdf && (
                <Link to={url} target={newTab ? '_blank' : '_self'}>
                    {title}
                </Link>
            )}
        </li>
    );
};

const Footer = () => {
    const data = useStaticQuery(graphql`
		query {
			markdownRemark(frontmatter: { title: { eq: "Footer" } }) {
				frontmatter {
					middlesboroughCharityNumber
					credits
                    menu {
                        linkToDifferentSite
                        newTab
                        title
                        url
                    }
				}
			}
		}
	`);

    const { yorkCharityNumber, middlesboroughCharityNumber, credits, menu = [] } = data.markdownRemark.frontmatter;

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
            {menu && menu.length > 0 && (
                <ul>
                    {menu.map(({ title, url, newTab }) => (
                        <MenuItem
                            key={url}
                            title={title}
                            url={url}
                            newTab={newTab}
                        />
                    ))}
                </ul>
            )}
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
