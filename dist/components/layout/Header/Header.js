import Navbar from '../../design-system/Navbar/Navbar';
import './Header.css';
import { COMPANY_URL } from '../../../common/consts';
var Header = function () {
    return (React.createElement("header", { className: 'header' },
        React.createElement("a", { href: COMPANY_URL, target: "_blank", rel: "noopener noreferrer", className: 'header__logo' }, "TeleTrader"),
        React.createElement(Navbar, null)));
};
export default Header;
