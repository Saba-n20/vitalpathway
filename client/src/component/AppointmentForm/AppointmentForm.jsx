import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalError from '../../component/Modals/ModalError/ModalError.jsx';
import SuccessModal from '../../component/Modals/SuccessModal/SuccessModal.jsx'; 
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

const fetchDoctorById = async (doctorId) => {
  try {
    const response = await fetch(`http://localhost:8080/doctors/${doctorId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch doctor by ID");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    return null;
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
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
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

  const handleDoctorChange = async (event) => {
    const doctorName = event.target.value;
    setSelectedDoctor(doctorName);
    
    const selectedDoc = doctors.find((doctor) => doctor.name === doctorName);
    
    if (selectedDoc) {
      setSelectedDoctorId(selectedDoc.id);
      const doctorDetails = await fetchDoctorById(selectedDoc.id);

      if (doctorDetails) {
        setServices(doctorDetails.services || []);
        setAvailableDates(doctorDetails.availability || []);
      }
      resetAppointmentDetails();
    }
  };

  const resetAppointmentDetails = () => {
    setDate("");
    setTime("");
    setAvailableTimes([]);
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
        setAvailableTimes(availabilityForDate.time || []);
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
      id: selectedDoctorId,
      patientName,
    };

    console.log("Appointment Data:", appointmentData);

    // Check for empty fields
    if (!date || !time || !selectedService || !selectedDoctorId || !patientName) {
      setConfirmationMessage("All fields are required.");
      setShowErrorModal(true);
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

      const responseData = await response.json(); 
      if (!response.ok) {
        throw new Error(`Failed to schedule appointment: ${JSON.stringify(responseData)}`);
      }

      // Show success modal if successful
      setConfirmationMessage("Appointment scheduled successfully!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error during appointment scheduling:", error);
      setConfirmationMessage("Failed to schedule appointment. Please check your details and try again.");
      setShowErrorModal(true);
    }
  };

  const resetForm = () => {
    setDate("");
    setTime("");
    setSelectedService("");
    setPatientName("");
    setAvailableTimes([]);
    setAvailableDates([]);
    setServices([]);
    setSelectedDoctor("");
    setSelectedDoctorId("");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    resetForm();
    navigate("/sign-in"); // Navigate to the sign-in page after closing the modal
  };

  const handleCancel = () => {
    resetForm();
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
              <option key={doctor.id} value={doctor.name}>
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
              availableDates.flatMap((availability) =>
                availability.dates.map((dateOption) => (
                  <option key={`${availability.day}-${dateOption}`} value={dateOption}>
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
            {services.map((service, index) => (
              <option key={`${service}-${index}`} value={service}>
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

      <ModalError 
        isOpen={showErrorModal} 
        message={confirmationMessage} 
        onClose={handleCloseErrorModal} 
      />
      
      <SuccessModal 
        isOpen={showSuccessModal} 
        message="Your appointment has been booked successfully!" 
        onClose={handleCloseSuccessModal} 
      />
    </div>
  );
};

export default AppointmentForm;
