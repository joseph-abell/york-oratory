/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import { useStaticQuery, graphql } from 'gatsby';

const MenuItem = ({ title, url, newTab = false }) => (
    <li css={css`list-style: none; margin-right: 20px; justify-content: space-evenly; flex: auto;`}>
        <a href={url} target={newTab ? '_blank' : '_self'}>{title}</a>
    </li>
)

const Menu = () => {
    const data = useStaticQuery(graphql`
        query {
            menu: allMarkdownRemark(filter: {frontmatter: {type: {eq: "hidden"}, title: { eq: "Menu" }}}) {
                edges {
                    node {
                        frontmatter {
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
    `);

    const menu = data && data.menu.edges[0].node.frontmatter.items;

    return (
        <div>
            <ul css={css`margin: 0 0 20px; padding: 0; display: flex; max-width: 35vw;`}>
                {menu.map(({ title, url, newTab }) => (
                    <MenuItem key={url} title={title} url={url} newTab={newTab} />
                ))}
            </ul>
        </div>
    );
};

export default Menu;