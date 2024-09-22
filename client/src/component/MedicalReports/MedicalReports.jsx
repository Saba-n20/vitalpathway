import React, { useState } from "react";
import medicalReport from "../../assets/images/medical-report.jpg";
import generalHealth from "../../assets/images/general-health.jpg";
import appointment from "../../assets/images/appointment.jpg";
import report from "../../assets/images/report.png";
import Modal from "../Modals/Modals.jsx";
import "./MedicalReports.scss";

const MedicalReports = ({ patient }) => {
  const calculateBMI = (weight, height) => {
    const heightInMeters = parseInt(height) / 100; // Convert cm to meters
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    const category = getBmiCategory(bmiValue);
    return { bmiValue, category };
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return { label: "Underweight", color: "blue" };
    if (bmi >= 18.5 && bmi < 24.9) return { label: "Normal weight", color: "green" };
    if (bmi >= 25 && bmi < 29.9) return { label: "Overweight", color: "orange" };
    return { label: "Obesity", color: "red" };
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const signOut = async () => {
    try {
      const response = await fetch("http://localhost:8080/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      const data = await response.json();
      setModalMessage(data.message || "Signed out successfully");
      setModalOpen(true);
    } catch (error) {
      console.error("Error signing out:", error);
      setModalMessage("Error signing out, please try again");
      setModalOpen(true);
    }
  };

  const handleModalConfirm = () => {
    setModalOpen(false);
    window.location.href = "/sign-in"; // Redirect after closing the modal
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  const {
    name,
    height,
    weight,
    dateOfBirth,
    phoneNumber,
    postalCode,
    address,
    heartRate,
    bloodPressure,
    city,
    email,
    gender,
    maritalStatus,
    medical_reports = [],
  } = patient;

  const { bmiValue, category } = React.useMemo(
    () => calculateBMI(parseFloat(weight), height),
    [weight, height]
  );

  return (
    <div className="herosection">
      <div className="herosection__personal-img">
        <div className="herosection__img-btn">
          <img
            className="herosection__image"
            src={medicalReport}
            alt="Medical Report"
          />
          <div className="herosection__titles">
            <h2 className="herosection__title">Medical Report for {name}</h2>
            <h3 className="herosection__sub">Personal Information:</h3>
          </div>
        </div>
        <button className="herosection__btn-sign-out" onClick={signOut}>
          Sign Out
        </button>
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setModalOpen(false)}
          onConfirm={handleModalConfirm}
        />
      </div>
      <div className="personalinfo">
  <div className="personalinfo__details">
    <div className="personalinfo__detail">
      <span className="personalinfo__label">Name:</span>
      <span className="personal-info__value">{name}</span>
    </div>
    <div className="personalinfo__detail">
      <span className="personalinfo__label">Phone Number:</span>
      <span className="personalinfo__value">{phoneNumber}</span>
    </div>
    <div className="personalinfo__detail">
      <span className="personalinfo__label">Email:</span>
      <span className="personalinfo__value">{email}</span>
    </div>
    <div className="personalinfo__detail">
      <span className="personalinfo__label">Date of Birth:</span>
      <span className="personalinfo__value">{dateOfBirth}</span>
    </div>
    <div className="personalinfo__detail">
      <span className="personalinfo__label">Marital Status:</span>
      <span className="personalinfo__value">{maritalStatus}</span>
    </div>
    <div className="personalinfo__detail">
      <span className="personalinfo__label">Gender:</span>
      <span className="personalinfo__value">{gender}</span>
    </div>
    <div className="personalinfo__detail">
      <span className="personalinfo__label">Address:</span>
      <span className="personalinfo__value">{address}</span>
    </div>
    <div className="personalinfo__detail">
      <span className="personalinfo__label">City:</span>
      <span className="personalinfo__value">{city}</span>
    </div>
    <div className="personalinfo__detail">
      <span className="personalinfo__label">Postal Code:</span>
      <span className="personalinfo__value">{postalCode}</span>
    </div>
  </div>
</div>

      <div className="healthinfo">
        <div className="healthinfo__title-img">
          <img src={generalHealth} alt="General Health" className="healthinfo__image" />
  <h3 className="healthinfo__title">General Health</h3>
  </div>
  <div className="healthinfo__metrics">
    <div className="healthinfo__metric">
      <span className="healthinfo__label">Height:</span>
      <span className="healthinfo__value">{height} cm</span>
    </div>
    <div className="healthinfo__metric">
      <span className="healthinfo__label">Weight:</span>
      <span className="healthinfo__value">{weight} kg</span>
    </div>
    <div className="healthinfo__metric">
      <span className="healthinfo__label">BMI:</span>
      <span className="healthinfo__value" style={{ color: category.color }}>
        {category.label}: {bmiValue}
      </span>
    </div>
    <div className="healthinfo__metric">
      <span className="healthinfo__label">Heart Rate:</span>
      <span className="healthinfo__value">{heartRate} bpm</span>
    </div>
    <div className="healthinfo__metric">
      <span className="healthinfo__label">Blood Pressure:</span>
      <span className="healthinfo__value">{bloodPressure}</span>
    </div>
  </div>
</div>

      <div className="appointments">
        <div className="appointments__title-img">
          <img
            src={appointment}
            alt="Appointments"
            className="appointments__image"
          />
          <h3 className="appointments__title">All Appointments:</h3>
        </div>
        <div className="appointments__cards">
          {Array.isArray(medical_reports) && medical_reports.length > 0 ? (
            medical_reports.map(
              (report, index) =>
                report.appointmentdate &&
                report.appointmenttime &&
                report.appointmentservice &&
                report.appointmentdoctor && (
                  <div
                    className="appointments__card"
                    key={index} // Make sure to use a unique key if available
                  >
                    <div className="appointments__card-content">
                      <h4 className="appointments__card-title">
                        Appointment with Dr. {report.appointmentdoctor}
                      </h4>
                      <p className="appointments__card-date">
                        {report.appointmentdate} at {report.appointmenttime}
                      </p>
                      <p className="appointments__card-service">
                        Service: {report.appointmentservice}
                      </p>
                    </div>
                  </div>
                )
            )
          ) : (
            <div className="appointments__no-data">
              No appointments available.
            </div>
          )}
        </div>
      </div>
      <div className="medicalreports">
        <div className="medicalreports__title-img">
          <img
            src={report}
            alt="Medical Report"
            className="medicalreports__image"
          />
          <h3 className="medicalreports__title">Medical Reports</h3>
        </div>
      </div>
      {medical_reports && medical_reports.length > 0 ? (
        medical_reports.map(
          (report, index) =>
            report.date && ( // Ensure there is a date before rendering
              <div
                className="medicalreports__report-section"
                key={report.id || `report-${index}`} // Ensure a unique key
              >
                <h4 className="medicalreports__report-title">
                  Report from {report.date}
                </h4>
                <div className="medicalreports__details">
                  <div className="medicalreports__test-partone">
                    <div className="medicalreports__test">
                      <h5 className="medicalreports__test-title">
                        Complete Blood Count:
                      </h5>
                      <div className="medicalreports__test-value">
                        RBC: {report.complete_blood_count?.RBC || "N/A"}
                      </div>
                      <div className="medicalreports__test-value">
                        Hb: {report.complete_blood_count?.Hb || "N/A"}
                      </div>
                      <div className="medicalreports__test-value">
                        HCT: {report.complete_blood_count?.HCT || "N/A"}
                      </div>
                      <div className="medicalreports__test-value">
                        WBC: {report.complete_blood_count?.WBC || "N/A"}
                      </div>
                    </div>

                    <div className="medicalreports__test">
                      <h5 className="medicalreports__test-title">
                        Basic Metabolic Panel:
                      </h5>
                      <div className="medicalreports__test-value">
                        Glucose:{" "}
                        {report.basic_metabolic_panel?.glucose || "N/A"}
                      </div>
                      <div className="medicalreports__test-value">
                        Calcium:{" "}
                        {report.basic_metabolic_panel?.calcium || "N/A"}
                      </div>
                      <div className="medicalreports__test-value">
                        Sodium: {report.basic_metabolic_panel?.sodium || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="medicalreports__test-parttwo">
                    <div className="medicalreports__test">
                      <h5 className="medicalreports__test-title">
                        Lipid Panel:
                      </h5>
                      <div className="medicalreports__test-value">
                        Total Cholesterol:{" "}
                        {report.lipid_panel?.total_cholesterol || "N/A"}
                      </div>
                      <div className="medicalreports__test-value">
                        LDL: {report.lipid_panel?.LDL || "N/A"}
                      </div>
                      <div className="medicalreports__test-value">
                        HDL: {report.lipid_panel?.HDL || "N/A"}
                      </div>
                    </div>

                    <div className="medicalreports__test-thyroid">
                      <h5 className="medicalreports__test-title">
                        Thyroid Function Tests:
                      </h5>
                      <div className="medicalreports__test-value">
                        TSH: {report.thyroid_function_tests?.TSH || "N/A"}
                      </div>
                      <div className="medicalreports__test-value">
                        Free T4:{" "}
                        {report.thyroid_function_tests?.Free_T4 || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )
      ) : (
        <div className="medicalreports__no-data">
          No medical reports available.
        </div>
      )}
    </div>
  );
};

export default MedicalReports;
