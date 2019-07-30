import React from 'react';
import { Link } from 'gatsby';

const Header = ({ title }) => (
    <header>
        <h1><Link to="/">{title}</Link></h1>
    </header>
);

export default Header;