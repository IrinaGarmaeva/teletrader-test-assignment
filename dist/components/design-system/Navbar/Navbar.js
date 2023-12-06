import Button from "../Button/Button";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { LocalStorage } from "../../../common/localStorage";
import { SUCCESS_LOGIN_MESSAGE } from "../../../common/consts";
var Navbar = function () {
    var location = useLocation();
    var _a = useAuth(), isLoggedIn = _a.isLoggedIn, setIsLoggedIn = _a.setIsLoggedIn;
    var handleLogin = function () {
        setIsLoggedIn(true);
        LocalStorage.saveToLocalStorage('isLoggedIn', true);
        toast.success(SUCCESS_LOGIN_MESSAGE);
    };
    return (React.createElement("nav", { className: "nav" },
        React.createElement(Link, { to: "/", className: "nav__link ".concat(location.pathname === '/' ? 'nav__link_active' : '') }, "Home"),
        isLoggedIn ? (React.createElement(Link, { to: "/favorites", className: "nav__link ".concat(location.pathname === '/favorites' ? 'nav__link_active' : '') }, "Favourites")) : (React.createElement(Button, { className: "navbar__button", type: "button", text: "Login", onClick: handleLogin }))));
};
export default Navbar;
