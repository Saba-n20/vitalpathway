import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import ScheduleAppointmentPage from "./pages/ScheduleAppointmentPage/ScheduleAppointmentPage.jsx";
import ServicesPage from "./pages/ServicesPage/ServicesPage.jsx";
import PatientDashbord from "./pages/PatientDashbord/PatientDashbord.jsx";
import DoctorsPage from "./pages/DoctorsPage/DoctorsPage.jsx";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/dashboard/:patientId" element={<PatientDashbord />} />
            <Route path="/schedule-appointment" element={<ScheduleAppointmentPage />} />
          </Routes>
    </BrowserRouter>
  );
};

export default App;
