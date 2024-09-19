import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header/Header.jsx";
import Footer from "../../component/Footer/Footer.jsx";
import MedicalReports from "../../component/MedicalReports/MedicalReports.jsx";
import "./PatientDashbord.scss";

const PatientDashbord = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/patients/${patientId}`
        );
        if (response.ok) {
          const data = await response.json();
          setPatient(data);
        } else {
          setError("Failed to fetch patient data.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      }
    };

    if (patientId) {
      fetchPatientData();
    } else {
      setError("Patient ID is missing.");
    }
  }, [patientId]);

  return (
    <div className="dashbord">
      <Header />
      <div className="dashbord__title-info">
        <h1 className="dashbord__title">Welcome to Your Patient Dashboard!</h1>
        <p className="dashbord__info">
          Here, you can easily access your health information, schedule
          appointments, and manage your wellness journey. We’re committed to
          providing you with the tools and support you need to stay informed and
          engaged in your care. Explore your medical records, review upcoming
          appointments, and find resources tailored to your health needs. Your
          health is our priority, and we’re here to help you every step of the
          way!
        </p>
      </div>
      {error && <div className="error">{error}</div>}
      {patient && <MedicalReports patient={patient} />}
      <Footer />
    </div>
  );
};

export default PatientDashbord;
