import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const MenuItem = ({ title, url }) => (
    <li>
        <a href={url}>{title}</a>
    </li>
)

const MenuGroup = ({ title, items }) => (
    <div>
        {title && (<h3>{title}</h3>)}
        <ul>
            {items && items.map(item => (<MenuItem title={item.title} key={item.url} url={item.url} />))}
        </ul>
    </div>
);

const Sidebar = () => {
    const data = useStaticQuery(graphql`
        query {
            menu: allMarkdownRemark(filter: {frontmatter: {type: {eq: "menu"}}}) {
                edges {
                    node {
                        frontmatter {
                            groups {
                                title
                                items {
                                    title
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
    `);
    const menu = data && data.menu.edges[0].node.frontmatter.groups;

    return (
        <div>
            {menu.map(({ title, items }) => (
                <MenuGroup key={JSON.stringify(items)} title={title} items={items} />
            ))}
        </div>
    );
};

export default Sidebar;