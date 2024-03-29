import React from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthContext';
import LocalStorage from 'common/localStorage';
import { SUCCESS_LOGIN_MESSAGE } from 'common/consts';
import Button from '../Button/Button';

function Navbar() {
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogin = () => {
    setIsLoggedIn(true);
    LocalStorage.setItem('isLoggedIn', true);
    toast.success(SUCCESS_LOGIN_MESSAGE);
  };

  return (
    <nav className="nav">
      <Link to="/" className={`nav__link ${location.pathname === '/' ? 'nav__link_active' : ''}`}>
        Home
      </Link>
      {isLoggedIn ? (
        <Link to="/favorites" className={`nav__link ${location.pathname === '/favorites' ? 'nav__link_active' : ''}`}>
          Favourites
        </Link>
      ) : (
        <Button
          className="navbar__button button"
          type="button"
          text="Login"
          onClick={handleLogin}
        />
      )}
    </nav>
  );
}

export default Navbar;
