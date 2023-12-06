import { useState } from "react";
import { toast } from 'react-toastify';
import { PATTERN_EMAIL, VALIDATION__MESSAGES } from "../../../common/emailValidationConstants";
import { COMPANY_URL, AUTHOR_GITHUB_LINK } from "../../../common/consts";
import ArrowRightIcon from "../../../assets/icons/arrow.svg";
import "./Footer.css";
var Footer = function () {
    var _a = useState(""), email = _a[0], setEmail = _a[1];
    var _b = useState(""), error = _b[0], setError = _b[1];
    var currentYear = new Date().getFullYear();
    var handleChangeEmail = function (e) {
        setEmail(e.target.value);
        if (!PATTERN_EMAIL.test(e.target.value)) {
            setError(VALIDATION__MESSAGES.invalidEmail);
        }
        else {
            setError("");
        }
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        setEmail("");
        toast.success(VALIDATION__MESSAGES.validEmail, { position: toast.POSITION.BOTTOM_LEFT });
    };
    return (React.createElement("footer", { className: "footer" },
        React.createElement("div", { className: "footer__block" },
            React.createElement("ul", { className: "footer__list" },
                React.createElement("li", { className: "footer__list-item" },
                    React.createElement("a", { href: "COMPANY_URL", target: "_blank", rel: "noopener noreferrer", className: "footer__logo" }, "TeleTrader")),
                React.createElement("li", { className: "footer__list-item" },
                    React.createElement("p", { className: "footer__slogan" }, "A STEP AHEAD OF MARKET")),
                React.createElement("li", { className: "footer__list-item" },
                    " ",
                    React.createElement("p", null, "Be the first to know about crypto news every day")),
                React.createElement("li", { className: "footer__list-item" },
                    React.createElement("p", null, "Get crypto analysis, news and updates right to your inbox! Sign up here"))),
            React.createElement("form", { className: "footer__subscribe-form", onSubmit: handleSubmit, noValidate: true },
                React.createElement("img", { src: ArrowRightIcon, alt: "arrow icon", className: "footer__arrow-icon", onClick: handleSubmit }),
                React.createElement("input", { type: "email", value: email, placeholder: "Email address", name: "email", onChange: handleChangeEmail, className: "footer__email", autoComplete: "off" }),
                React.createElement("span", { className: "footer__email-error" }, error)),
            React.createElement("p", { className: "footer__copyright" },
                "\u00A9 ",
                currentYear,
                " Teletrader. All rights reserved")),
        React.createElement("div", { className: "footer__nav" },
            React.createElement("ul", { className: "footer__links" },
                React.createElement("li", { className: "footer__link link" },
                    React.createElement("a", { href: COMPANY_URL, target: "_blank", rel: "noopener noreferrer" }, "About us")),
                React.createElement("li", { className: "footer__link link" },
                    React.createElement("a", { href: COMPANY_URL, target: "_blank", rel: "noopener noreferrer" }, "Projects")),
                React.createElement("li", { className: "footer__link link" },
                    React.createElement("a", { href: COMPANY_URL, target: "_blank", rel: "noopener noreferrer" }, "Team")),
                React.createElement("li", { className: "footer__link link" },
                    React.createElement("a", { href: COMPANY_URL, target: "_blank", rel: "noopener noreferrer" }, "Careers")),
                React.createElement("li", { className: "footer__link link" },
                    React.createElement("a", { href: COMPANY_URL, target: "_blank", rel: "noopener noreferrer" }, "Contacts"))),
            React.createElement("a", { href: AUTHOR_GITHUB_LINK, className: "footer__author", target: "_blank", rel: "noopener noreferrer" }, "Made by Irina Garmaeva"))));
};
export default Footer;
