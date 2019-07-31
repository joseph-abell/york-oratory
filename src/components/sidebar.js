/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import { useStaticQuery, graphql } from 'gatsby';

const SidebarItem = ({ title, url, newTab = false }) => (
    <li css={css`list-style: none; margin-right: 20px; display: inline-block;`}>
        <a href={url} target={newTab ? '_blank' : '_self'}>{title}</a>
    </li>
)

const SidebarGroup = ({ title, items }) => (
    <div>
        <h3>{title}</h3>
        <ul>
            {items.map(({ title, url, newTab }) => (
                <SidebarItem key={url} title={title} url={url} newTab={newTab} />
            ))}
        </ul>
    </div>
);

const Sidebar = () => {
    const data = useStaticQuery(graphql`
        query {
            sidebar: allMarkdownRemark(filter: {frontmatter: {type: {eq: "hidden"}, title: { eq: "Sidebar" }}}) {
                edges {
                    node {
                        frontmatter {
                            groups {
                                title
                                items {
                                    title
                                    url
                                    newTab
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const sidebar = data && data.sidebar.edges[0].node.frontmatter.groups;

    console.log(sidebar);

    return (
        <div>
            <ul css={css`margin: 0 0 20px; padding: 0;`}>
                {sidebar.map(({ title, items }) => (
                    <SidebarGroup
                        key={JSON.stringify(items)}
                        title={title}
                        items={items}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;