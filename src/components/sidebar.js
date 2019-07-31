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
    return (
        <div>
            <ul css={css`margin: 0 0 20px; padding: 0;`}>

            </ul>
        </div>
    );
};

export default Sidebar;