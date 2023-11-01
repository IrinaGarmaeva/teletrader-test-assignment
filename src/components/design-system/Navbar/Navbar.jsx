import Button from "../Button/Button";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ handleLogin, isLoggedIn }) => {
  const location = useLocation();

  return (
    <nav className="nav">
      <Link to="/" className={`nav__link ${location.pathname === '/' ? 'nav__link_active' : ''}`}>
        Home
      </Link>
      {isLoggedIn ? (
        <Link to="/favorites" className={`nav__link ${location.pathname === '/favorites' ? 'nav__link_active' : ''}`}>
          Favorites
        </Link>
      ) : (
        <Button
        className={"navbar__button"}
        type={"button"}
        text={"Login"}
        onClick={handleLogin}
      />
      )}
    </nav>
  );
};

export default Navbar;
