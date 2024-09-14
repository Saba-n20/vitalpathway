import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/logo/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="headr__logo">
        <Link to="/">
          <img className="header__logo-icon" src={logo} alt="vitalpathway" />
        </Link>
      </div>
      <div className="header__container">
        <div className="header__details">
          <div className="header__nav">
            <div className="header__list">
              <button className="header__items">
                <Link className="header__link" to="/">Home</Link>
              </button>
              <button className="header__items">
                <Link className="header__link" to="/about-us">About Us</Link>
              </button>
              <button className="header__items">
                <Link className="header__link" to="/medical-reports">Medical Reports</Link>
              </button>
              <button className="header__items">
                <Link  className="header__link" to="/doctors">Doctors</Link>
              </button>
              <button className="header__items">
                <Link className="header__link" to="/services">services</Link>
              </button>
              <button className="header__items">
                <Link className="header__link" to="/sign-in">Sign in/Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="header__appointment-part">
          <button className="header__appointment-btn" type="button">
            Appointment
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
