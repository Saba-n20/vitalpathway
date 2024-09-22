import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AppointmentForm.scss";

const fetchDoctors = async () => {
  try {
    const response = await fetch("http://localhost:8080/doctors");
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
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
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(""); // Keep as is for local state
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const fetchedDoctors = await fetchDoctors();
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const handleDoctorChange = (event) => {
    const doctorName = event.target.value;
    setSelectedDoctor(doctorName);
    
    // Find the doctor based on the selected name
    const selectedDoc = doctors.find((doctor) => doctor.name === doctorName);
    
    // Log the selected doctor object for debugging
    console.log("Selected Doctor Object:", selectedDoc);
    
    if (selectedDoc) {
      setSelectedDoctorId(selectedDoc.id); // Change to 'id'
      console.log("Selected Doctor ID:", selectedDoc.id); // Log the ID
      setServices(selectedDoc.services || []);
      setAvailableDates(selectedDoc.availability || []);
      setDate(""); // Reset date and time selections
      setTime("");
      setAvailableTimes([]);
    } else {
      console.log("No doctor found with the name:", doctorName);
    }
  };
  
  

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);

    const selectedDoc = doctors.find((doc) => doc.name === selectedDoctor);
    if (selectedDoc) {
      const availabilityForDate = selectedDoc.availability.find(
        (availability) => availability.dates.includes(selectedDate)
      );

      if (availabilityForDate) {
        setAvailableTimes(availabilityForDate.time);
      } else {
        setAvailableTimes([]);
      }
    }
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleConfirm = async () => {
    const appointmentData = {
      date,
      time,
      service: selectedService,
      doctor_id: selectedDoctorId, // Change to doctor_id
      patientName,
    };

    console.log("Payload being sent:", appointmentData); // Log the data
    
    // Check if any field is empty
    if (!date || !time || !selectedService || !selectedDoctorId || !patientName) {
      console.log("One or more fields are empty.");
      console.log(`Date: ${date}, Time: ${time}, Service: ${selectedService}, DoctorId: ${selectedDoctorId}, Patient Name: ${patientName}`);
      setConfirmationMessage("All fields are required.");
      return;
    }
  
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
  
      setConfirmationMessage("Appointment scheduled successfully!");
      // Clear form after successful scheduling
      setDate("");
      setTime("");
      setSelectedService("");
      setSelectedDoctor("");
      setPatientName("");
      setAvailableTimes([]);
      setAvailableDates([]);
      setServices([]);
      setSelectedDoctorId("");
    } catch (error) {
      console.error("Error during appointment scheduling:", error);
      setConfirmationMessage("Failed to schedule appointment. Please check your details and try again.");
    }
  };

  const handleCancel = () => {
    // Clear all fields when canceling
    setDate("");
    setTime("");
    setSelectedService("");
    setSelectedDoctor("");
    setPatientName("");
    setAvailableTimes([]);
    setAvailableDates([]);
    setServices([]);
    setConfirmationMessage("");
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="appointment">
      <form className="appointment__form">
        <div className="appointment__form-group">
          <label className="appointment__form-label">Doctor:</label>
          <select
            className="appointment__selection"
            value={selectedDoctor}
            onChange={handleDoctorChange}
          >
            <option value="" disabled>Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctor_id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="appointment__form-group">
          <label className="appointment__form-label">Date:</label>
          <select
            className="appointment__selection"
            value={date}
            onChange={handleDateChange}
            disabled={!selectedDoctor}
          >
            <option value="" disabled>Select a date</option>
            {availableDates.length > 0 ? (
              availableDates.map((availability) =>
                availability.dates.map((dateOption) => (
                  <option key={dateOption} value={dateOption}>
                    {dateOption}
                  </option>
                ))
              )
            ) : (
              <option value="" disabled>No available dates</option>
            )}
          </select>
        </div>

        <div className="appointment__form-group">
          <label className="appointment__form-label">Time:</label>
          <select
            className="appointment__selection"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!date}
          >
            <option value="" disabled>Select a time</option>
            {availableTimes.length > 0 ? (
              availableTimes.map((timeOption) => (
                <option key={timeOption} value={timeOption}>
                  {timeOption}
                </option>
              ))
            ) : (
              <option value="" disabled>No available times</option>
            )}
          </select>
        </div>
        <div className="appointment__form-group">
          <label className="appointment__form-label">Service:</label>
          <select
            className="appointment__selection"
            value={selectedService}
            onChange={handleServiceChange}
            disabled={!selectedDoctor}
          >
            <option value="" disabled>Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
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
            required
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
            disabled={!selectedService || !selectedDoctor || !time || !patientName}
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
