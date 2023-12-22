import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';

const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <a href="/order">Order</a>
                <a href="home">Home</a>
                <a href="curt">Curt</a>
                <a href="login">Login</a>
            </div>
        </nav>
    );
};

export default Header;