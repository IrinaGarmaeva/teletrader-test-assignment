import React, { type ChangeEvent, useState, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import { PATTERN_EMAIL, VALIDATION_MESSAGES } from 'common/emailValidationConstants';
import { COMPANY_URL, AUTHOR_GITHUB_LINK } from 'common/consts';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const currentYear = new Date().getFullYear();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!PATTERN_EMAIL.test(e.target.value)) {
      setError(VALIDATION_MESSAGES.invalidEmail);
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError(VALIDATION_MESSAGES.emptyEmail);
      return;
    }
    setEmail('');
    toast.success(VALIDATION_MESSAGES.validEmail, { position: toast.POSITION.BOTTOM_LEFT });
  };

  return (
    <footer className="footer">
      <div className="footer__block">
        <ul className="footer__list">
          <li className="footer__list-item">
            <a
              href="COMPANY_URL"
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
            {' '}
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
        >
          <button type="submit" className="footer__arrow-icon button">&#x2192;</button>
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
          &copy;
          {' '}
          {currentYear}
          {' '}
          Teletrader. All rights reserved
        </p>
      </div>
      <div className="footer__nav">
        <ul className="footer__links">
          <li className="footer__link link">
            <a
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              About us
            </a>
          </li>
          <li className="footer__link link">
            <a
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Projects
            </a>
          </li>
          <li className="footer__link link">
            <a
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Team
            </a>
          </li>
          <li className="footer__link link">
            <a
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Careers
            </a>
          </li>
          <li className="footer__link link">
            <a
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contacts
            </a>
          </li>
        </ul>
        <a
          href={AUTHOR_GITHUB_LINK}
          className="footer__author"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Irina Garmaeva
        </a>
      </div>
    </footer>
  );
}

export default Footer;
