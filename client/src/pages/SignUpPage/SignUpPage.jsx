import React from "react";
import SignUpForm from "../../component/SignUpForm/SignUpForm.jsx";
import Header from "../../component/Header/Header.jsx";
import Footer from "../../component/Footer/Footer.jsx";
import signup from "../../assets/images/signup.jpg";
import "./SignUpPage.scss";

const SignUpPage = () => {
  return (
    <div className="signup">
      <Header />
      <div className="signup__container">
        <h1 className="signup__title">Sign Up</h1>
        <div className="signup__des">
          Thank you for choosing to join us. By signing up, you’re taking the
          first step toward a more streamlined and efficient healthcare
          experience. Our platform lets you manage appointments, access your
          medical records, and communicate with your healthcare provider—all
          securely and conveniently. We’re here to put your health first and
          provide you with the tools and support you need for better care and
          peace of mind. Let’s get started on your journey to easier, more
          personalized healthcare!
        </div>
      </div>
      <div className="signup__instruction">
        <img className="signup__instruction"src={signup} alt="Sign Up" />
        <ul className="signup__instruction-list">
          <h3 className="signup__instruction-title">How to Sign Up</h3>
          <li className="signup__instruction-items">
            Fill Out Your Information: Complete the registration form with
            your basic details, including your name, email address, and a
            secure password. This information will help us create your
            personalized account.
          </li>
          <li className="signup__instruction-items">
            Verify Your Email: After submitting the form, you will receive a
            verification email. Click on the link in the email to confirm your
            account and ensure that your email address is accurate.
          </li>
          <li className="signup__instruction-items">
            Complete Your Profile: Log in to your new account and provide
            additional information, such as your contact details and medical
            history, to help us tailor our services to your needs.
          </li>
          <li className="signup__instruction-items">
            Set Up Your Preferences: Customize your notification preferences
            and communication settings to ensure you stay informed about your
            appointments, test results, and important updates.
          </li>
          <li className="signup__instruction-items">
            Explore Our Services: Once your profile is complete, you can start
            managing appointments, accessing your medical records, and
            connecting with your healthcare provider—all from one secure,
            easy-to-use platform.
          </li>
        </ul>
      </div>
      <SignUpForm />
      <Footer />
    </div>
  );
};

export default SignUpPage;
