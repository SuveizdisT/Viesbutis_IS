import React from 'react';

const Navbar = () => {
  return (
    <nav className="nav">
        <a href="/" className="title">Viešbutis_IS</a>
        <ul>
            <li>
                <a href="/login">Login</a>
            </li>
            <li>
                <a href="/register">Register</a>
            </li>
        </ul>
    </nav>
  );
};

export default Navbar;