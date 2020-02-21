/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { Link } from 'gatsby';
import { Boring } from 'react-burgers';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import MobileMenu from './mobile-menu';
import Clearfix from './clearfix';

const Header = ({ title }) => {
    const data = useStaticQuery(graphql`
		query {
			header: markdownRemark(frontmatter: {title: {eq: "Header"}}) {
				frontmatter {
					headerImage
                    subtitle
				}
			},
            image: imageSharp(fluid: {originalName: {eq: "oratory_banner.jpg"}}) {
                id
                fluid(maxWidth: 1200) {
                    ...GatsbyImageSharpFluid
                }
            }
		}
    `);

    const image = data.header.frontmatter.headerImage;
    const subtitle = data.header.frontmatter.subtitle;
    const fluid = data.image.fluid;

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
            <Link to='/'>
                <Img
                    fluid={fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    css={css`
                        display: none;
                        height: 60vh;
                        background: #8c181f;

                        @media (min-width: 767px) {
                            display: block;
                        }
                    `}
                />
                <h1
                    css={css`
                        color: #fff;
                        text-shadow: rgba(0, 0, 0, 0.5) 2px 1px 1px;
                        font-size: 2rem;
                        padding-left: 20px;
                        margin-top: 30px;
                        display: inline-block;
                        line-height: 1rem;
                        text-transform: uppercase;

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
                >
                    {title}
                </h1>

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

                <h2
                    css={css`
                        color: #fff;
                        text-shadow: rgba(0, 0, 0, 0.8) 2px 1px 1px;
                        display: none;
                        padding-left: 20px;
                        margin-top: 30px;
                        line-height: 1rem;
                        text-transform: uppercase;

                        @media (min-width: 767px) {
                            display: block;
                            text-align: center;
                            font-size: 1.6rem;
                            line-height: 2rem;
                            width: 767px;
                            margin: 240px auto 0;
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                        }
					`}
                >
                    {subtitle}
                </h2>
            </Link>
            <Clearfix />
            <MobileMenu visible={menuActive} onMenuCloseClick={onMobileNavClick} />
        </div>
    );
};

export default Header;
