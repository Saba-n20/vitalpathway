import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/logo/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/schedule-appointment');
  };

  return (
    <header className="header">
      <div className="header__logo">
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
                <Link className="header__link" to="/doctors">Doctors</Link>
              </button>
              <button className="header__items">
                <Link className="header__link" to="/services">Services</Link>
              </button>
              <button className="header__items">
                <Link className="header__link" to="/sign-in">Sign in/Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="header__appointment-part">
          <button className="header__appointment-btn" type="button" onClick={handleOnClick}>
            Appointment
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
