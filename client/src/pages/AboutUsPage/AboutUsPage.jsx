import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import recovered from "../../assets/icons/recovered.svg";
import happy from "../../assets/icons/happy-face.svg";
import aboutus from "../../assets/images/about-us.png";
import "../AboutUsPage/AboutUsPage.scss";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <div className="herosection">
        <div className="herosection__details">
          <div className="herosection__info-about">
            <div className="herosection__title">
              <h1>About Us</h1>
            </div>
              <p>
                At VitalPathway, we are committed to transforming your
                healthcare journey into a seamless and efficient experience. Our
                comprehensive platform empowers you to manage appointments,
                access your medical records, and communicate with your
                healthcare provider all in one secure location. We prioritize
                your well-being, offering a wide range of services including
                annual physicals, laboratory testing, vaccinations, and
                specialized care for conditions such as high cholesterol, high
                blood pressure, and diabetes. Whether you need care for minor
                symptoms, treatment for common illnesses, or management of
                certain injuries, we are here to provide the tools and support
                necessary for better care and peace of mind. At VitalPathway,
                your health is our top priority, and we are dedicated to
                delivering exceptional, personalized care every step of the way.
              </p>
            </div>
              <div className="herosection__why-info">
              <h1 className="herosection__second-title">Why choose us</h1>
              <p>
                At VitalPathway, we stand out as your trusted partner in
                healthcare because of our unwavering commitment to convenience,
                security, and personalized care. Our all-in-one platform
                simplifies your healthcare experience by allowing you to manage
                appointments, access your medical records, and communicate with
                your healthcare provider seamlessly. Our comprehensive range of
                services—from annual physicals and laboratory testing to
                vaccinations and chronic condition management—ensures that all
                your health needs are met under one roof. We focus on providing
                exceptional care for minor symptoms, common illnesses, and
                select injuries with a patient-centered approach. With a
                dedication to both your health and peace of mind, VitalPathway
                combines advanced technology with compassionate care to deliver
                an unparalleled healthcare experience. Choose us for a more
                streamlined, supportive, and effective approach to managing your
                health.
              </p>
              </div>
          </div>
        </div>
      <div className="services">
        <div className="services__details">
          <div className="services__detail">
            <img
              src={recovered}
              className="services__icon"
              alt="Recovered Patients"
            />
            <p>Recovered Patients</p>
          </div>
          <div className="services__detail">
            <img src={happy} className="services__icon" alt="Happy Face" />
            <p>Happy Faces</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
