/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { Link } from 'gatsby';
import { Boring } from 'react-burgers';

import MobileMenu from './mobile-menu';

const Header = ({ title }) => {
    const [menuActive, setMenuActive] = useState(false);

    const onMobileNavClick = () => {
        setMenuActive(!menuActive);
    }

    return (
        <header>
            <h1><Link to="/">{title}</Link></h1>
            <div css={css`
                position: absolute;
                right: 20px;
                top: 24px;
                display: block;

                @media (min-width: 767px) {
                    display: none;
                }

            `}><Boring onClick={onMobileNavClick} lineHeight={6} color='#a00' /></div>
            <MobileMenu visible={menuActive} onMenuCloseClick={onMobileNavClick} />
        </header>
    );
};

export default Header;