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
            <p className='header' css={css`font-style: italic; font-size: 2rem; font-weight: bold;`}><Link to="/">{title}</Link></p>
            <div css={css`
                position: absolute;
                right: 20px;
                top: 24px;
                display: block;

                @media (min-width: 767px) {
                    display: none;
                }

            `}><Boring onClick={onMobileNavClick} lineHeight={6} color='#a00' customProps={{ 'aria-label': "Mobile Menu" }} /></div>
            <MobileMenu visible={menuActive} onMenuCloseClick={onMobileNavClick} />
        </header>
    );
};

export default Header;