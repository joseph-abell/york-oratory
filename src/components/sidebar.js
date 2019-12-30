/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStaticQuery, graphql, Link } from 'gatsby';

const SidebarItem = ({ text, url, newTab = false }) => {
    const isPdf = url.includes('.pdf');

    return (
        <li
            css={css`
                list-style: none;
                line-height: 1.5em;
                margin: 10px 0;

                &:first-of-type {
                    margin-top: 0;
                }
            `}
        >
            {isPdf && (
                <Link to={url} target={newTab ? '_blank' : '_self'}>
                    {text}
                </Link>
            )}

            {!isPdf && (
                <a href={url} target={newTab ? '_blank' : '_self'}>
                    {text}
                </a>
            )}
        </li>
    );
};

const SidebarGroup = ({ title, items }) => (
    <li css={css`list-style: none;`}>
        <div
            css={css`
				display: block;
				margin: 0;
				border: 1px solid #eee;
				border-radius: 3px;
				padding: 10px;
			`}
        >
            {title && (
                <p
                    css={css`
						border-bottom: 1px solid #eee;
						margin-left: -10px;
						margin-right: -10px;
						margin-bottom: 10px;
						padding: 0 10px 10px;
					`}
                >
                    {title}
                </p>
            )}
            <ul css={css`margin: 0;`}>
                {items.map(({ text, url, newTab }) => <SidebarItem key={url} text={text} url={url} newTab={newTab} />)}
            </ul>
        </div>
    </li>
);

const Sidebar = () => {
    const data = useStaticQuery(graphql`
		query {
			sidebar: allMarkdownRemark(limit: 3, filter: { frontmatter: { title: { eq: "Sidebar" } } }) {
				edges {
					node {
						frontmatter {
							groups {
								title
								items {
									text
									url
									newTab
								}
							}
						}
						html
					}
				}
			}
		}
	`);

    const sidebar = data && data.sidebar.edges[0].node.frontmatter.groups;

    return (
        <div
            css={css`
				display: none;
				float: right;
				width: 30%;

				@media (min-width: 767px) {
					display: block;
				}
			`}
        >
            <ul
                css={css`
					margin: 0 0 20px;
					padding: 0;
				`}
            >
                {sidebar.map(({ items, title }) => (
                    <SidebarGroup key={JSON.stringify(items)} items={items} title={title} />
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
