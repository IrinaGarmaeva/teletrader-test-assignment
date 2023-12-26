import React from 'react';
import { COMPANY_URL } from 'common/consts';
import Navbar from '../../design-system/Navbar/Navbar';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" className="header__logo">TeleTrader</a>
      <Navbar />
    </header>
  );
}

export default Header;
