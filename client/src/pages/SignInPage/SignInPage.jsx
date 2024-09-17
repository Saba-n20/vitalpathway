import React from "react";
import Header from "../../component/Header/Header.jsx";
import Footer from "../../component/Footer/Footer.jsx";
import SignInForm from "../../component/SignInForm/SignInForm.jsx";
import signin from "../../assets/images/sign-in.jpg"
import "./SignInPage.scss";

const SignInPage = () => {
  return (
    <div className="signin">
      <Header />
      <div className="signin__title-info">
          <h2 className="signin__title">Sign In</h2>
          <p className="signin__info">
            Welcome back! Please enter your email address and password to access
            your account. If you're not yet a member, you can easily create a
            new account by signing up. For any issues with signing in, such as
            forgetting your password, please reach out to our support team for
            assistance. We're here to help you get the most out of your
            experience with us.
          </p>
        </div>
        <div className="signin__image-form">
          <img  className="signin__img" src={signin} alt="Sign In" />
          <SignInForm />
        </div>
      <Footer />
    </div>
  );
};

export default SignInPage;
