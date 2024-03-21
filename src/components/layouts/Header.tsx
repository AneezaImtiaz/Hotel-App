import React from 'react';
import './Header.css';
import { APP_TITLE, ROUTES } from '../../utils/Constants';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="title" >{APP_TITLE}</h1>
      <div className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item"><a href="/">{ROUTES.home}</a></li>
          {/* All other navigation items you want to add in header*/}
        </ul>
      </div>
    </header>
  );
};

export default Header;
