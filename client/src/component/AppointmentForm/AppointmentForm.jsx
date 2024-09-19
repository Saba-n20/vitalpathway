import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AppointmentForm.scss";

// Fetch doctors from your backend
const fetchDoctors = async () => {
  try {
    const response = await fetch("http://localhost:8080/doctors");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return [];
  }
};

// Simulated API call for fetching services
const fetchServices = async () => {
  return ["General Checkup",
        "Dental Cleaning",
        "Eye Examination",
        "Vaccination",
        "Blood Test",
        "X-Ray",
        "Physiotherapy",
        "Nutritional Counseling",
        "Mental Health Evaluation",];
};

const fetchAvailableSlots = async (date) => {
  try {
    const response = await fetch(
      `http://localhost:8080/available-slots?date=${date}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch available slots:", error);
    return { availableSlots: [] }; // Default return value
  }
};

const AppointmentForm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientName, setPatientName] = useState("");
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const fetchedServices = await fetchServices();
        const fetchedDoctors = await fetchDoctors();
        console.log("Fetched doctors:", fetchedDoctors); // Debugging line
        setServices(fetchedServices);
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Error loading data:", error); // Log any errors
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleDateChange = async (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);

    if (selectedDate) {
      const result = await fetchAvailableSlots(selectedDate);
      setAvailableSlots(result.availableSlots);
    } else {
      setAvailableSlots([]);
    }
  };

  const handleConfirm = async () => {
    const appointmentData = {
      date,
      time,
      service: selectedService,
      doctorName: selectedDoctor,
      patient: patientName,
    };

    console.log("Sending appointment data:", appointmentData);

    try {
      const response = await fetch("http://localhost:8080/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to schedule appointment: ${errorText}`);
      }

      const data = await response.json();
      console.log("Appointment scheduled:", data);
      setConfirmationMessage("Appointment scheduled successfully!");
      // Optionally navigate to another page
      // navigate('/some-path');
    } catch (error) {
      console.error("Error during appointment scheduling:", error);
      setConfirmationMessage(
        "Failed to schedule appointment. Please check your details and try again."
      );
    }
  };

  const handleCancel = () => {
    setDate("");
    setTime("");
    setSelectedService("");
    setSelectedDoctor("");
    setPatientName("");
    setAvailableSlots([]);
    setConfirmationMessage("");
    navigate("/")
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="appointment">
      <form className="appointment__form">
        <div className="appointment__form-group">
          <label className="appointment__form-label">Date:</label>
          <input
            className="appointment__input"
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="appointment__form-group">
          <label className="appointment__form-label">Time:</label>
          <select
            className="appointment__selection"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="" disabled>
              Select a time
            </option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <div className="appointment__form-group">
          <label className="appointment__form-label">Service:</label>
          <select
            className="appointment__selection"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div className="appointment__form-group">
          <label className="appointment__form-label">Doctor:</label>
          <select
            className="appointment__selection"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="" disabled>
              Select a doctor
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="appointment__form-group">
          <label className="appointment__form-label">Patient Name:</label>
          <input
            className="appointment__input"
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient name"
          />
        </div>
        <div className="appointment__buttons">
          <button
            className="appointment__btn-cancel"
            type="button"
            onClick={handleCancel}
          >
            CANCEL
          </button>
          <button
            className="appointment__btn-confirm"
            type="button"
            onClick={handleConfirm}
            disabled={
              !selectedService || !selectedDoctor || !time || !patientName
            }
          >
            CONFIRM
          </button>
        </div>
      </form>
      {confirmationMessage && (
        <div className="appointment__message">{confirmationMessage}</div>
      )}
    </div>
  );
};

export default AppointmentForm;
