import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import "./SignUpForm.scss";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        newErrors[key] = `${key
          .replace(/([A-Z])/g, " $1")
          .toUpperCase()} is required`;
      }
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (
      formData.postalCode &&
      !/[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d/.test(formData.postalCode)
    ) {
      newErrors.postalCode = "Invalid postal code format";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/signup",
        formData
      );
      navigate('/medical-report');
    } catch (error) {
      console.error(
        "There was an error!",
        error.response?.data || error.message
      );
      alert("Error signing up");
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit} className="form__container">
        <div className="form__part-one">
          <div className="form__name">
            <div className="form__label-txt">
              <label className="form__label">First Name:</label>
              <input
                className="form__txt"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>

            <div className="form__label-txt">
              <label className="form__label">Last Name:</label>
              <input
                className="form__txt"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form__dob-email">
            <div className="form__label-txt">
              <label className="form__label">Date of Birth:</label>
              <input
                className="form__txt-dob"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
              {errors.dateOfBirth && (
                <span className="error">{errors.dateOfBirth}</span>
              )}
            </div>
            <div className="form__label-txt">
              <label className="form__label">Email:</label>
              <input
                className="form__txt"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>
        </div>
        <div className="form__address">
          <div className="form__label-txt-address">
            <label className="form__label">Address:</label>
            <input
              className="form__txt-address"
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
        </div>
        <div className="form__part-two">
          <div className="form__phone-city">
            <div className="form__label-txt">
              <label className="form__label">Phone Number:</label>
              <input
                className="form__txt"
                type="tel"
                name="phoneNumber"
                placeholder="4375572526"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern="\d{10}"
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber}</span>
              )}
            </div>

            <div className="form__label-txt">
              <label className="form__label">City:</label>
              <input
                className="form__txt"
                type="text"
                name="city"
                placeholder="Toronto"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
          </div>
          <div className="form__post-pass">
            <div className="form__label-txt">
              <label className="form__label">Postal Code:</label>
              <input
                className="form__txt"
                type="text"
                name="postalCode"
                placeholder="M5P 0E2"
                value={formData.postalCode}
                onChange={handleChange}
                required
                pattern="[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d"
              />
              {errors.postalCode && (
                <span className="error">{errors.postalCode}</span>
              )}
            </div>

            <div className="form__label-txt">
              <label className="form__label">Password:</label>
              <input
                className="form__txt"
                type="password"
                name="password"
                placeholder="More than 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>
        </div>
        <div className="form__btn">
          <button type="submit" className="form__btn-signup">
            Create An Account
          </button>
          <button
            type="button"
            className="form__btn-cancel"
            onClick={handleCancel}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
