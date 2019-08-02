/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState, Fragment } from 'react';
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

	const [ menuActive, setMenuActive ] = useState(false);

	const onMobileNavClick = () => {
		setMenuActive(!menuActive);
	};

	return (
		<Fragment>
			<p
				className='header'
				css={css`
					font-style: italic;
					font-size: 2rem;
					font-weight: bold;
					float: left;
					margin-bottom: 0;

					@media (min-width: 767px) {
						position: ${image ? 'absolute' : 'static'};
						left: 0;
						right: 0;
					}
				`}
			>
				<Link
					css={css`
						background: rgba(255, 255, 255, 0.5);
						display: block;
						color: rgba(0, 0, 0, 0.8);
						text-shadow: rgba(0, 0, 0, 0.3) 1px 1px 1px;

						@media (min-width: 767px) {
							font-size: ${image ? '4rem' : '2rem'};
							text-align: ${image ? 'center' : 'left'};
							line-height: 1.3em;
						}
					`}
					to='/'
				>
					{title}
				</Link>
			</p>
			<div
				css={css`
					float: right;
					display: block;
					margin-top: -5px;
					margin-right: -15px;

					@media (min-width: 767px) {
						display: none;
					}
				`}
			>
				<Boring
					onClick={onMobileNavClick}
					lineHeight={6}
					color='#a00'
					ustomProps={{ 'aria-label': 'Mobile Menu' }}
				/>
			</div>
			<Clearfix />
			<Link to='/'>
				<header
					css={css`
						background: ${image && `center no-repeat url(${image}), #ddd`};
						height: ${image ? '250px' : 'auto'};
						margin-bottom: ${image && '3rem'};

						@media (min-width: 767px) {
							height: ${image ? '350px' : 'auto'};
							margin-bottom: ${image && '1rem'};
						}
					`}
				/>
			</Link>
			<MobileMenu visible={menuActive} onMenuCloseClick={onMobileNavClick} />
		</Fragment>
	);
};

export default Header;
