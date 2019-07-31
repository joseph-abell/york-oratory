/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby';
import { Boring } from 'react-burgers';
const MobileMenuItem = ({ text, url, newTab = false }) => (
    <li css={css`list-style: none; margin-right: 20px; display: inline-block;`}>
        <a href={url} target={newTab ? '_blank' : '_self'}>{text}</a>
    </li>
)

const MobileMenu = ({ visible = false, onMenuCloseClick = () => { } }) => {
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
            },
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
    const sidebarStructured = data.sidebar.edges[0].node.frontmatter.groups;
    const sidebarFlattened = sidebarStructured.map(i => i.items).flat();
    const menu = [
        ...data.menu.edges[0].node.frontmatter.items,
        ...sidebarFlattened
    ];
    const uniqueMenu = [
        ...new Set(menu.map(o => JSON.stringify({ text: o.title || o.text, url: o.url, newTab: o.newTab })))
    ].map(s => JSON.parse(s));
    return (
        <div css={css`
            position: fixed;
            right: ${ visible ? 0 : '-300px'};
            top: 0;
            width: 300px;
            background: white;
            border-left: 1px solid #eee;
            transition: all 0.2s ease-out;
            padding: 20px;
            height: 100vh;
            display: block;

            @media (min-width: 767px) {
                display: none;
            }

            li {
                display: block;
            }`}
        >
            <Boring active={true} onClick={onMenuCloseClick} lineHeight={6} color='#a00' />
            <ul>
                {uniqueMenu.map(({ text, url, newTab }) => (
                    <MobileMenuItem key={url} text={text} url={url} newTab={newTab} />
                ))}
            </ul>
        </div>

    );
};

export default MobileMenu;