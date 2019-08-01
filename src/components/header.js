/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { Link } from 'gatsby';
import { Boring } from 'react-burgers';

import MobileMenu from './mobile-menu';

const Header = ({ title, image }) => {
    const [menuActive, setMenuActive] = useState(false);

    const onMobileNavClick = () => {
        setMenuActive(!menuActive);
    }

    return (
        <header css={css`
            @media (min-width: 767px) {
                background: ${image && `center no-repeat url(${image}), #ddd`};
                height: ${image ? '350px' : 'auto'};
            }            
        `}>
            <p className='header' css={css`
                font-style: italic;
                font-size: 2rem;
                font-weight: bold;
            `}>
                <Link
                    css={css`
                        background: rgba(255, 255, 255, 0.5);
                        display: block;
                        color: rgba(0, 0, 0, 0.8);
                        text-align: center;                        
                        text-shadow: rgba(0, 0, 0, 0.3) 1px 1px 1px;

                        @media (min-width: 767px) {
                            font-size: 4rem;
                        }
                    `}
                    to="/"
                >{title}</Link></p>
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