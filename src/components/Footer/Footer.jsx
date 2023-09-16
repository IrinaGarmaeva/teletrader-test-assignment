import { useState } from "react";
import { year, PATTERN_EMAIL, VALIDATION__MESSAGES } from "../../utils/conts";
import arrow from "../../images/arrow.svg";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (!PATTERN_EMAIL.test(e.target.value)) {
      setError(VALIDATION__MESSAGES.invalidEmail);
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    window.alert(VALIDATION__MESSAGES.validEmail);
  };

  return (
    <footer className="footer">
      <div className="footer__block">
        <ul className="footer__list">
          <li className="footer__list-item">
            <a
              href="https://www.teletrader.rs/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__logo"
            >
              TeleTrader
            </a>
          </li>
          <li className="footer__list-item">
            <p className="footer__slogan">A STEP AHEAD OF MARKET</p>
          </li>
          <li className="footer__list-item">
            {" "}
            <p>Be the first to know about crypto news every day</p>
          </li>
          <li className="footer__list-item">
            <p>
              Get crypto analysis, news and updates right to your inbox! Sign up
              here
            </p>
          </li>
        </ul>
        <form
          className="footer__subscribe-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <img
            src={arrow}
            alt="arrow icon"
            className="footer__arrow-icon"
            onClick={handleSubmit}
          />
          <input
            type="email"
            value={email}
            placeholder="Email address"
            name="email"
            onChange={handleChangeEmail}
            className="footer__email"
            autoComplete="off"
          />
          <span className="footer__email-error">{error}</span>
        </form>
        <p className="footer__copyright">
          &copy; {year} Teletrader. All rights reserved
        </p>
      </div>
      <div className="footer__nav">
        <ul className="footer__links">
          <li className="footer__link link">
            <a
              href="https://www.teletrader.rs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              About us
            </a>
          </li>
          <li className="footer__link link">
            <a
              href="https://www.teletrader.rs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Projects
            </a>
          </li>
          <li className="footer__link link">
            <a
              href="https://www.teletrader.rs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Team
            </a>
          </li>
          <li className="footer__link link">
            <a
              href="https://github.com/IrinaGarmaeva"
              target="_blank"
              rel="noopener noreferrer"
            >
              Careers
            </a>
          </li>
          <li className="footer__link link">
            <a
              href="https://www.teletrader.rs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contacts
            </a>
          </li>
        </ul>
        <a
          href="https://github.com/IrinaGarmaeva"
          className="footer__author"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Irina Garmaeva
        </a>
      </div>
    </footer>
  );
};

export default Footer;
