/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import { useStaticQuery, graphql } from 'gatsby';

const SidebarItem = ({ text, url, newTab = false }) => (
    <li css={css`list-style: none; line-height: 1.5em; margin-bottom: 0;`}>
        <a href={url} target={newTab ? '_blank' : '_self'}>{text}</a>
    </li>
)

const SidebarGroup = ({ title, items }) => (
    <div>
        <h3>{title}</h3>
        <ul css={css`display: block; margin: 0; border: 1px solid #eee; border-radius: 3px; padding: 10px;`}>
            {items.map(({ text, url, newTab }) => (
                <SidebarItem key={url} text={text} url={url} newTab={newTab} />
            ))}
        </ul>
    </div>
);

const Sidebar = () => {
    const data = useStaticQuery(graphql`
        query {
            sidebar: allMarkdownRemark(limit: 3, filter: {frontmatter: {type: {eq: "hidden"}, title: {eq: "Sidebar"}}}) {
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
        <div css={css`
            @media (min-width: 700px) {
                float: right;
                width: 30%;
            }
        `}>
            <ul
                css={css`
                    margin: 0 0 20px; 
                    padding: 0;
                `}
            >
                {sidebar.map(({ title, items }) => <SidebarGroup key={JSON.stringify(items)} title={title} items={items} />)}
            </ul>
        </div>
    );
};

export default Sidebar;