/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import { useStaticQuery, graphql } from 'gatsby';

const MenuItem = ({ title, url }) => (
    <li>
        <a href={url}>{title}</a>
    </li>
)

const Sidebar = () => {
    const data = useStaticQuery(graphql`
        query {
            menu: allMarkdownRemark(filter: {frontmatter: {type: {eq: "hidden"}, title: { eq: "Menu" }}}) {
                edges {
                    node {
                        frontmatter {
                            items {
                                title
                                url
                            }
                        }
                    }
                }
            }
        }
    `);

    const menu = data && data.menu.edges[0].node.frontmatter.items;

    return (
        <div css={css`
            width: 25%;
            float: right;

            @media (max-width: 990px) {
                width: auto;
                float: none;
            }
        `}>
            <ul>
                {menu.map(({ title, url }) => (
                    <MenuItem key={url} title={title} url={url} />
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;