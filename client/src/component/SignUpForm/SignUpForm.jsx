import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpForm.scss";

const SignUpForm = () => {
  const navigate = useNavigate();
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
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1").toUpperCase()} is required`;
      }
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (formData.postalCode && !/[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d/.test(formData.postalCode)) {
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
      console.error("There was an error!", error.response?.data || error.message);
      setErrors({ global: "Error signing up. Please try again." });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const FormInput = ({ name, type = "text", placeholder, pattern, minLength, required }) => (
    <div className="form__label-txt">
      <label className="form__label">{`${name.replace(/([A-Z])/g, ' $1').toUpperCase()}:`}</label>
      <input
        className={`form__txt ${name === 'address' ? 'form__txt-address' : ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        pattern={pattern}
        minLength={minLength}
        required={required}
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="form">
      <form onSubmit={handleSubmit} className="form__container">
        <div className="form__part-one">
          <div className="form__name">
            <FormInput name="firstName" placeholder="First Name" required />
            <FormInput name="lastName" placeholder="Last Name" required />
          </div>
          <div className="form__dob-email">
            <FormInput name="dateOfBirth" type="date" required />
            <FormInput name="email" type="email" placeholder="Email" required />
          </div>
        </div>
        <div className="form__address">
          <FormInput name="address" placeholder="Address" type="text" />
        </div>
        <div className="form__part-two">
          <div className="form__phone-city">
            <FormInput name="phoneNumber" type="tel" placeholder="4375572526" pattern="\d{10}" />
            <FormInput name="city" placeholder="Toronto" />
          </div>
          <div className="form__post-pass">
            <FormInput name="postalCode" placeholder="M5P 0E2" pattern="[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d" />
            <FormInput name="password" type="password" placeholder="More than 8 characters" minLength="8" />
          </div>
        </div>
        {errors.global && <div className="error">{errors.global}</div>}
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
