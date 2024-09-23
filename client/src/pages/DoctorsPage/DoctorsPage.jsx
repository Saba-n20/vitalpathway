// src/pages/DoctorsPage.jsx
import React, { useEffect, useState } from "react";
import Header from "../../component/Header/Header.jsx";
import Footer from "../../component/Footer/Footer.jsx";
import DoctorsCard from "../../component/DoctorsCard/DoctorsCard.jsx";
import "./DoctorsPage.scss";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8080/doctors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoctors(data); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="doctors">
        <Header />
        <p>Loading...</p>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctors">
        <Header />
        <p>Error fetching data: {error.message}</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="doctors">
      <Header />
      <div className="doctors__title-info">
        <h1 className="doctors__title">OUR MEDICAL TEAM</h1>
        <div className="doctors__info">
          Welcome to our practice! We are proud to introduce our dedicated team
          of doctors, each bringing a wealth of knowledge and experience to
          ensure you receive the highest quality care. Our physicians are
          committed to not only diagnosing and treating your health concerns but
          also to fostering a compassionate environment where you feel heard and
          supported. With expertise across various specialties, our team
          collaborates to provide personalized treatment plans tailored to your
          unique needs. We look forward to partnering with you on your journey
          to better health!
        </div>
      </div>
      <div className="doctors__container">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorsCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <p>No doctors available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DoctorsPage;
