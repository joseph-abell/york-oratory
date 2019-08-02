/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import { rhythm } from '../utils/typography';
import Header from './header';
import Footer from './footer';
import Menu from './menu';
import Sidebar from './sidebar';
import Clearfix from './clearfix';

class Layout extends React.Component {
	render() {
		const { title, image, children } = this.props;
		return (
			<div
				css={css`
					margin-left: auto;
					margin-right: auto;
					max-width: ${rhythm(40)};
					padding: 1.45rem ${rhythm(3 / 4)};
				`}
			>
				<Header title={title} image={image} />
				<Menu />
				<main
					css={css`
						margin-right: 20px;

						@media (min-width: 767px) {
							min-height: 60vh;
							float: left;
							width: 65%;
							margin-right: 5%;
						}
					`}
				>
					{children}
				</main>
				<Sidebar />
				<Clearfix />
				<Footer />
			</div>
		);
	}
}

export default Layout;
