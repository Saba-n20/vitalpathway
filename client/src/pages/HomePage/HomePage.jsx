import React from "react";
import Header from "../../component/Header/Header";
import doctors from "../../assets/images/result.png";
import "../HomePage/HomePage.scss";
import Footer from "../../component/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="herosection">
        <div className="herosection__details">
          <div className="herosection__details-partone">
            <div className="herosection__title">
              <h1>Welcom to the VitalPathway</h1>
            </div>
            <div className="herosection__second-title">
              <h3>Your health journey, simplified. </h3>
            </div>
            <div className="herosection__info">
              <p>
                At VitalPathway, we’re dedicated to making your healthcare
                experience seamless and efficient. Manage appointments, access
                medical records, and communicate with your healthcare provider
                all in one secure place. We put your health first and ensure you
                have the tools for better care and peace of mind.
              </p>
            </div>
          </div>
          <div className="herosection__imagepart">
            <img src={doctors} alt="Doctors" className="herosection__img" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
