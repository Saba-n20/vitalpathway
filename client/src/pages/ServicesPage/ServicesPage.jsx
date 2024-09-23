import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import Services from "../../assets/images/services.jpg";
import "./ServicesPage.scss";

const ServicesPage = () => {
  const services = [
    "Preventive Care",
    "Chronic Disease Management",
    "Specialized Treatments",
    "Mental Health Services",
    "Women’s Health",
    "Men’s Health",
    "Pediatric Care",
    "Urgent Care Services",
    "Telehealth Services"
  ];

  return (
    <div className="services">
      <Header />
      <div className="services__title-info">
        <h1 className="services__title">VitalPathway Services</h1>
        <div className="services__info">
          At VitalPathway, we offer a holistic range of healthcare services
          designed to empower you on your wellness journey. Our dedicated team
          combines expertise and compassion to provide personalized care
          tailored to your unique needs. From preventive health screenings and
          comprehensive assessments to specialized treatments and chronic
          disease management, we focus on enhancing your quality of life.
          Explore our services to see how we can partner with you in achieving
          your health goals and fostering a brighter, healthier future.
        </div>
      </div>
      <div className="services__list-image">
      <ol className="services__list">
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ol>
      <img src={Services } alt="Services" className="services__img" />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
