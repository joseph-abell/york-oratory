/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { Link } from 'gatsby';
import { Boring } from 'react-burgers';
import { useStaticQuery, graphql } from 'gatsby';

import MobileMenu from './mobile-menu';
import Clearfix from './clearfix';

const Header = ({ title }) => {
    const data = useStaticQuery(graphql`
		query {
			header: allMarkdownRemark(filter: { frontmatter: { title: { eq: "Header" } } }) {
				edges {
					node {
						frontmatter {
							headerImage
						}
					}
				}
			}
		}
	`);

    const image = data.header.edges[0].node.frontmatter.headerImage;

    const [menuActive, setMenuActive] = useState(false);

    const onMobileNavClick = () => {
        setMenuActive(!menuActive);
    };

    return (
        <div
            css={css`
                background: #8c181f;

                @media (min-width: 767px) {
                    height: ${image ? '60vh' : 'auto'};
                    position: relative;
                }
            `}
        >
            <div
                className='header'
                css={css`
                    @media (min-width: 767px) {
                        background-image: ${image ? `url('${image}')` : 'none'};
                        background-position: center;
                        background-repeat: no-repeat;

                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                    }
				`}
            >
                <Link
                    css={css`
                        color: #fff;
                        text-shadow: rgba(0, 0, 0, 0.35) 1px 1px 1px;
                        font-size: 2rem;
                        padding-left: 20px;
                        margin-top: 30px;
                        display: inline-block;
                        line-height: 1rem;

                        @media (min-width: 767px) {
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            text-align: center;
                            font-size: 5rem;
                            line-height: 7rem;
                            margin-top: 100px;
                        }
					`}
                    to='/'
                >
                    {title}
                </Link>
                <div
                    css={css`
                        float: right;
                        display: block;

                        @media (min-width: 767px) {
                            display: none;
                        }
                    `}
                >
                    <Boring
                        onClick={onMobileNavClick}
                        lineHeight={6}
                        color='#fff'
                        customProps={{ 'aria-label': 'Mobile Menu' }}
                    />
                </div>
            </div>
            <Clearfix />
            <MobileMenu visible={menuActive} onMenuCloseClick={onMobileNavClick} />
        </div>
    );
};

export default Header;
