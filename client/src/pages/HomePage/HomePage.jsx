import React from "react";
import Header from "../../component/Header/Header";
import doctors from "../../assets/images/result.png";
import appointment from "../../assets/images/appointment.jpg";
import report from "../../assets/images/report.png";
import communicate from "../../assets/images/communicate.jpeg";
import recovered from "../../assets/images/recovered.jpeg";
import happy from "../../assets/images/happyface.jpeg";
import "../HomePage/HomePage.scss";
import Footer from "../../component/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/sign-up');
  };

  return (
    <>
      <Header />
      <div className="herosection">
        <div className="herosection__details">
          <div className="herosection__details-partone">
            <div className="herosection__title">
              <h1>Welcome to the VitalPathway</h1>
            </div>
            <div className="herosection__second-title">
              <h3>Your health journey, simplified.</h3>
            </div>
            <div className="herosection__info">
              <p>
                At VitalPathway, we’re dedicated to making your healthcare
                experience seamless and efficient. Manage appointments, access
                medical records, and communicate with your healthcare provider
                all in one secure place. We put your health first and ensure you
                have the tools for better care and peace of mind.
              </p>
              <div className="herosection__signin-part">
                <button className="herosection__signup-btn" type="button" onClick={handleOnClick}>
                  Create An Account
                </button>
              </div>
            </div>
          </div>
          <div className="herosection__imagepart">
            <img src={doctors} alt="Doctors" className="herosection__img" />
          </div>
        </div>
      </div>
      <div className="servicespart">
        <div className="servicespart__details">
          <img src={appointment} className="servicespart__image-appointment" alt="Appointment" />
          <Link to="/schedule-appointment">
            <p className="servicespart__des-appointment">Schedule Appointment</p>
          </Link>
        </div>
        <div className="servicespart__details">
          <img src={report} className="servicespart__images" alt="Medical Reports" />
          <Link to="/sign-in">
            <p className="servicespart__des-report">Medical Report</p>
          </Link>
        </div>
        <div className="servicespart__details">
          <img src={communicate} className="servicespart__images" alt="Communicate with Dr" />
          <Link to="/communicate">
            <p className="servicespart__des">Communicate with Dr</p>
          </Link>
        </div>
        <div className="servicespart__satisfaction">
          <div className="servicespart__satisfaction-recovered">
            <img src={recovered} className="servicespart__images" alt="Recovered Patients" />
          </div>
          <div className="servicespart__satisfaction-happy">
            <img src={happy} className="servicespart__images" alt="Happy face" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
