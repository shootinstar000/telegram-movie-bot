import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="app-name">og bratflix
        </Link>
      </div>
    </header>
  );
};

export default Header;
