import React from "react";
import medicalReport from "../../assets/images/medical-report.jpg";
import generalHealth from "../../assets/images/general-health.jpg";
import appointment from "../../assets/images/appointment.jpg";
import report from "../../assets/images/report.png";
import "./MedicalReports.scss";

const MedicalReports = ({ patient }) => {
  const calculateBMI = (weight, height) => {
    const heightInMeters = parseInt(height) / 100; // Convert cm to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
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

  const bmi = React.useMemo(
    () => calculateBMI(parseFloat(weight), height),
    [weight, height]
  );

  return (
    <div className="herosection">
      <div className="herosection__personal-img">
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
      <div className="herosection__personal-info-name">
        <label htmlFor="name" className="herosection__personal-info-label">
          Name:
        </label>
        <div id="name" className="herosection__personal-info-data">
          {name}
        </div>
      </div>
      <div className="herosection__personal-info">
        <div className="herosection__personal-info-phone-email-dob-marital">
          <div className="herosection__personal-info-phone">
            <label htmlFor="phone" className="herosection__personal-info-label">
              Phone Number:
            </label>
            <div id="phone" className="herosection__personal-info-data">
              {phoneNumber}
            </div>
          </div>
          <div className="herosection__personal-info-email">
            <label htmlFor="phone" className="herosection__personal-info-label">
              Email:
            </label>
            <div id="phone" className="herosection__personal-info-data">
              {email}
            </div>
          </div>
          <div className="herosection__personal-info-dob">
            <label
              htmlFor="address"
              className="herosection__personal-info-label"
            >
              Date Of Birth:
            </label>
            <div id="address" className="herosection__personal-info-data">
              {dateOfBirth}
            </div>
          </div>
          <div className="herosection__personal-info-marital">
            <label
              htmlFor="marital-status"
              className="herosection__personal-info-label"
            >
              Marital Status:
            </label>
            <div
              id="marital-status"
              className="herosection__personal-info-data"
            >
              {maritalStatus}
            </div>
          </div>
        </div>
        <div className="herosection__personal-info-gender-address-city-pc">
          <div className="herosection__personal-info-gender">
            <label
              htmlFor="gender"
              className="herosection__personal-info-label"
            >
              Gender:
            </label>
            <div id="gender" className="herosection__personal-info-data">
              {gender}
            </div>
          </div>
          <div className="herosection__personal-info-address">
            <label
              htmlFor="address"
              className="herosection__personal-info-label"
            >
              Address:
            </label>
            <div id="address" className="herosection__personal-info-data">
              {address}
            </div>
          </div>
          <div className="herosection__personal-info-address">
            <label
              htmlFor="address"
              className="herosection__personal-info-label"
            >
              City:
            </label>
            <div id="address" className="herosection__personal-info-data">
              {city}
            </div>
          </div>
          <div className="herosection__personal-info-pc">
            <label
              htmlFor="postalCode"
              className="herosection__personal-info-label"
            >
              Postal Code:
            </label>
            <div id="address" className="herosection__personal-info-data">
              {postalCode}
            </div>
          </div>
        </div>
      </div>
      <div className="generalPart">
        <div className="generalPart__img-title">
          <img
            className="generalPart__image"
            src={generalHealth}
            alt="General Health"
          />
          <h3 className="generalPart__title">General Health:</h3>
        </div>
        <div className="generalPart__info">
          <div className="generalPart__bmi-h-w">
            <div className="generalPart__height">
              <label className="generalPart__label">Height:</label>
              <div className="generalPart__num">{height} Kg</div>
            </div>
            <div className="generalPart__weight">
              <label className="generalPart__label">Weight:</label>
              <div className="generalPart__num">{weight} Cm</div>
            </div>
            <div className="generalPart__bmi">
              <label className="generalPart__label">
                Body Mass Index (BMI):
              </label>
              <div className="generalPart__num">{bmi}</div>
            </div>
          </div>
          <div className="generalPart__heart-blood">
            <div className="generalPart__normalpart-heartrate">
              <div className="generalPart__heart">
                <label className="generalPart__label">Heart Rate:</label>
                <div className="generalPart__num">{heartRate}</div>
              </div>
              <div className="generalPart__normal-part">
                <label className="generalPart__normal-part-label">
                  Healthy Range
                </label>
                <div className="generalPart__normal-num">60 to 100 bpm</div>
              </div>
            </div>
            <div className="generalPart__normalpart-blood-pressure">
              <div className="generalPart__blood-pressure">
                <label className="generalPart__label">Blood Pressure:</label>
                <div className="generalPart__num">{bloodPressure}</div>
              </div>
              <div className="generalPart__normal-part">
                <label className="generalPart__normal-part-label">
                  Healthy Range
                </label>
                <div className="generalPart__normal-num">
                  Less that 120/80 mmHg
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="appointments">
        <img
          src={appointment}
          alt="Appointments"
          className="appointments__image"
        />
        <h3 className="appointments__title">All Appointments:</h3>
      </div>
      <table className="appointments__table">
        <thead>
          <tr>
            <th className="appointments__th">Date</th>
            <th className="appointments__th">Time</th>
            <th className="appointments__th">Service</th>
            <th className="appointments__th">Doctor</th>
          </tr>
        </thead>
        <tbody>
          {medical_reports.length > 0 ? (
            medical_reports.map((report, index) => (
              <tr key={`appointment-${index}`}>
                <td className="appointments__td">{report.appointmentdate}</td>
                <td className="appointments__td">{report.appointmenttime}</td>
                <td className="appointments__td">
                  {report.appointmentservice}
                </td>
                <td className="appointments__td">{report.appointmentdoctor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="appointments__td" colSpan="4">
                No appointments available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="medicalreports">
        <img
          src={report}
          alt="Appointments"
          className="medicalreports__image"
        />
        <h3 className="medicalreports__title">Medical Reports:</h3>
      </div>
      <table className="medicalreports__table">
        <thead className="medicalreports__thead">
          <tr>
            <th className="medicalreports__th">Date</th>
            <th className="medicalreports__th">Complete Blood Count</th>
            <th className="medicalreports__th">Basic Metabolic Panel</th>
            <th className="medicalreports__th">Lipid Panel</th>
            <th className="medicalreports__th">Thyroid Function Tests</th>
          </tr>
        </thead>
        <tbody>
          {medical_reports.length > 0 ? (
            medical_reports.map((report, index) => (
              <tr key={`medicalreport-${index}`} className="medicalreports__tr">
                <td className="medicalreports__td">{report.date}</td>
                <td className="medicalreports__td">
                  {report.complete_blood_count &&
                    `RBC: ${report.complete_blood_count.RBC}, Hb: ${report.complete_blood_count.Hb}, HCT: ${report.complete_blood_count.HCT}, WBC: ${report.complete_blood_count.WBC}`}
                </td>
                <td className="medicalreports__td">
                  {report.basic_metabolic_panel &&
                    `Glucose: ${report.basic_metabolic_panel.glucose}, Calcium: ${report.basic_metabolic_panel.calcium}, Sodium: ${report.basic_metabolic_panel.sodium}`}
                </td>
                <td className="medicalreports__td">
                  {report.lipid_panel &&
                    `Total Cholesterol: ${report.lipid_panel.total_cholesterol}, LDL: ${report.lipid_panel.LDL}, HDL: ${report.lipid_panel.HDL}`}
                </td>
                <td className="medicalreports__td">
                  {report.thyroid_function_tests &&
                    `TSH: ${report.thyroid_function_tests.TSH}, Free T4: ${report.thyroid_function_tests.Free_T4}`}
                </td>
              </tr>
            ))
          ) : (
            <tr className="medicalreports__tr">
              <td className="medicalreports__td" colSpan="5">
                No medical reports available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalReports;
