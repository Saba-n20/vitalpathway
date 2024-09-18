import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header/Header.jsx";
import Footer from "../../component/Footer/Footer.jsx";
import AppointmentForm from "../../component/AppointmentForm/AppointmentForm.jsx";
import appointment from "../../assets/images/appointment.jpg";
import "./ScheduleAppointmentPage.scss";

const ScheduleAppointmentPage = () => {

  return (
    <div className="appointmentpage">
      <Header />
      <div className="appointmentpage__title-info">
        <h1 className="appointmentpage__title">Schedule An Appointment</h1>
        <p className="appointmentpage__subtitle">
          Easily Schedule Your Appointments 📅
        </p>
      </div>
      <div className="appointmentpage__des-image">
        <img
          className="appointmentpage__img"
          src={appointment}
          alt="Schedule Appointment"
        />
        <div className="appointmentpage__des">
          <h3 className="appointmentpage__des-title">
            How to Schedule an Appointment:
          </h3>
          <ol className="appointmentpage__list">
            <h5 className="appointmentpage__list-title">To schedule an appointment, please follow these simple steps:</h5>
            <li className="appointmentpage__items">
              Select a Date and Time: Choose the preferred date and time for
              your appointment from the available options. We have specific time
              slots for each day to ensure that you can find a time that suits
              your schedule.
            </li>
            <li className="appointmentpage__items">
              Choose a Service: Select the type of service you need from our
              list of available options. This helps us ensure that you are
              matched with the appropriate specialist or service provider.
            </li>
            <li className="appointmentpage__items">
              Pick a Doctor: If applicable, choose a doctor or specialist from
              the list of available practitioners. If you have a preferred
              doctor or specialist, you can select them based on their
              availability.
            </li>
            <li className="appointmentpage__items">
              Confirm Your Appointment: Review the details of your appointment,
              including the date, time, service, and doctor. Once you’re
              satisfied, confirm your appointment. If you need to make any
              changes or cancel, there will be options to do so.
            </li>
            <li className="appointmentpage__items">
              Receive Confirmation: After confirming your appointment, you will
              receive a confirmation message or email with all the details. If
              you have any questions or need further assistance, feel free to
              contact us.
            </li>
          </ol>
        </div>
      </div>
      <div className="appointmentpage__form">
        <AppointmentForm />
      </div>
      <Footer />
    </div>
  );
};

export default ScheduleAppointmentPage;
