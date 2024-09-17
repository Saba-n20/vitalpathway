import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInForm.scss";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignIn = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8080/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Handle successful sign-in (redirect to medical report page)
            navigate("/medical-reports");
          } else {
            // Handle sign-in errors returned by the server
            setErrors((prevErrors) => ({
              ...prevErrors,
              server:
                data.message ||
                "Sign-in failed. Please check your credentials and try again.",
            }));
          }
        } else {
          // Handle HTTP errors
          console.error("Sign-in failed: ", response.statusText);
          setErrors((prevErrors) => ({
            ...prevErrors,
            server:
              "An error occurred while signing in. Please try again later.",
          }));
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error: ", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          server:
            "A network error occurred. Please check your connection and try again.",
        }));
      }
    }
  };

  const handleCancel = () => {
    // Redirect to home page
    navigate("/");
  };

  const handleSignUp = () => {
    // Redirect to sign up page
    navigate("/sign-up");
  };

  return (
    <div className="form">
      <form id="signInForm">
        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email:
          </label>
          <input
            className="form__text"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="error">{errors.email}</span>
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            Password:
          </label>
          <input
            className="form__text"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="error">{errors.password}</span>
        </div>
        <div className="form__group-remembr">
          <input
            className="form__box-remember"
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="form__label-remember" htmlFor="rememberMe">
            Remember Me
          </label>
        </div>
        <div className="form__buttons">
          <button
            className="form__button-signin"
            type="button"
            id="signInButton"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button
            className="form__button-cancel"
            type="button"
            id="cancelButton"
            onClick={handleCancel}
          >
            Cancel
          </button>
          </div>
          <div className="form__signup-part">
          <button
            className="form__button-signup"
            type="button"
            id="signUpButton"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          </div>
        <div className="error">{errors.server}</div>
      </form>
    </div>
  );
};

export default SignInForm;
