import Button from "../Button/Button";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { saveToLocalStorage } from "../../../common/localSrorageFunctions";

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogin = () => {
    setIsLoggedIn(true)
    saveToLocalStorage('isLoggedIn', true);
  }

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
