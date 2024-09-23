import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    height: "",
    weight: "",
    gender: "",
    maritalStatus: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setServerError(""); // Clear any previous server errors
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1").toUpperCase()} is required`;
      }
    });

    // Additional validations
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
    // Check if height and weight are numbers
    if (formData.height && isNaN(formData.height)) {
      newErrors.height = "Height must be a number";
    }
    if (formData.weight && isNaN(formData.weight)) {
      newErrors.weight = "Weight must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    console.log("Form Data Submitted:", formData);

    try {
      await axios.post("http://localhost:8080/signup", formData);
      navigate("/sign-in");
    } catch (error) {
      console.error("There was an error!", error.response?.data || error.message);
      setServerError("Error signing up. Please try again."); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit} className="form__container">
        {serverError && <div className="error">{serverError}</div>} 
        
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
              {errors.firstName && <span className="error">{errors.firstName}</span>}
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
              {errors.lastName && <span className="error">{errors.lastName}</span>}
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
              {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
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
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
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
              {errors.postalCode && <span className="error">{errors.postalCode}</span>}
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
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
          </div>
        </div>

        <div className="form__part-three">
          <div className="form__height-weight">
            <div className="form__label-txt">
              <label className="form__label">Height:</label>
              <input
                className="form__txt"
                type="text"
                name="height"
                placeholder="e.g. 170 cm"
                value={formData.height}
                onChange={handleChange}
                required
              />
              {errors.height && <span className="error">{errors.height}</span>}
            </div>

            <div className="form__label-txt">
              <label className="form__label">Weight:</label>
              <input
                className="form__txt"
                type="text"
                name="weight"
                placeholder="e.g. 65 kg"
                value={formData.weight}
                onChange={handleChange}
                required
              />
              {errors.weight && <span className="error">{errors.weight}</span>}
            </div>
          </div>

          <div className="form__gen-marital">
            <div className="form__label-txt">
              <label className="form__label">Gender:</label>
              <select
                className="form__txt"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            <div className="form__label-txt">
              <label className="form__label">Marital Status:</label>
              <select
                className="form__txt"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Marital Status
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
              {errors.maritalStatus && <span className="error">{errors.maritalStatus}</span>}
            </div>
          </div>
        </div>

        <div className="form__btn">
          <button type="submit" className="form__btn-signup" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create An Account"}
          </button>
          <button
            type="button"
            className="form__btn-cancel"
            onClick={handleCancel}
            disabled={isLoading} 
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
