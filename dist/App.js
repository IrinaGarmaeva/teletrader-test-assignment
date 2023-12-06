import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./context/AuthContext";
import Header from './components/layout/Header/Header';
import { ProtectedRoute } from "./components/layout/ProtectedRoute/ProtectedRoute";
import Home from "./components/pages/Home/Home";
import Details from "./components/pages/Details/Details";
import Favourites from "./components/pages/Favourites/Favourites";
import Footer from "./components/layout/Footer/Footer";
import { LocalStorage } from "./common/localStorage";
function App() {
    var _a = useAuth(), isLoggedIn = _a.isLoggedIn, setIsLoggedIn = _a.setIsLoggedIn;
    var navigate = useNavigate();
    var location = useLocation();
    useEffect(function () {
        var isLoggedIn = LocalStorage.getFromLocalStorage('isLoggedIn');
        if (isLoggedIn) {
            setIsLoggedIn(true);
            navigate(location.pathname);
        }
        else {
            setIsLoggedIn(false);
        }
    }, []);
    return (React.createElement("div", { className: "root gradient__bg" },
        React.createElement("div", { className: "page" },
            React.createElement(Header, null),
            React.createElement("main", { className: "main" },
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
                    React.createElement(Route, { path: "/details/:symbol", element: React.createElement(Details, null) }),
                    React.createElement(Route, { path: "/favorites", element: React.createElement(ProtectedRoute, { element: React.createElement(Favourites, null), isLoggedIn: isLoggedIn }) }))),
            React.createElement(Footer, null)),
        React.createElement(ToastContainer, null)));
}
export default App;
