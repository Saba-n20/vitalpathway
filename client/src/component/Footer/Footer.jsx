import React from "react";
import { Link } from "react-router-dom";
import location from "../../assets/icons/location.svg";
import phone from "../../assets/icons/phone.svg";
import email from "../../assets/icons/email.svg";
import facebook from "../../assets/icons/Icon-facebook.svg";
import instagram from "../../assets/icons/Icon-instagram.svg";
import twitter from "../../assets/icons/Icon-twitter.svg";
import "./Footer.scss";
import logo from "../../assets/logo/logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo-des">
        <p className="footer__des">
          Vitalpathway always tries to provide the most common care for proper
          Healthcare Treatment.
        </p>
        <Link to="/">
          <img className="footer__logo-icon" src={logo} alt="Vitalpathway Logo" />
        </Link>
      </div>
      <div className="footer__information">
        <p className="footer__information-title">Information:</p>
        <div className="footer__details">
          <ul className="footer__list">
            <li className="footer__items">
              <Link to="/about-us">About Us</Link>
            </li>
            <li className="footer__items">
              <Link to="/medical-reports">Medical Reports</Link>
            </li>
            <li className="footer__items">
              <Link to="/doctors">Doctors</Link>
            </li>
            <li className="footer__items">
              <Link to="/services">Services</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__contact-media">
        <div className="footer__contact">
        <div className="footer__contact-details">
        <p className="footer__contact-title">Contact Us:</p>
          <div className="footer__contact-location">
            <img src={location} alt="Location" className="footer__icon" />
            <div className="footer__location">: 123 Maple Street, Toronto, ON M5A 1A1</div>
          </div>
          <div className="footer__contact-phone">
            <img src={phone} alt="Phone" className="footer__icon" />
            <div className="footer__phone">: (416) 555-1234</div>
          </div>
          <div className="footer__contact-email">
            <img src={email} alt="Email" className="footer__icon" />
            <div className="footer__email">
            <a href="mailto@vitalpathway.com">: info@vitalpathway.com</a></div>
          </div>
        </div>
          <div className="footer__media">
            <div className="footer__media-instagram">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" className="footer__icon" />
              </a>
            </div>
            <div className="footer__media-facebook">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" className="footer__icon" />
              </a>
            </div>
            <div className="footer__media-twitter">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" className="footer__icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
