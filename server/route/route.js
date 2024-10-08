import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as controller from '../controllers/controllers.js';
import * as appointment from '../controllers/appointment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Serve the signup form
router.get('/signup', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

// Handle sign-up form submission
router.post('/signup', controller.SignUp);

// Serve the sign-in form
router.get('/signin', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/signin.html'));
});

// Route to schedule an appointment
router.post('/schedule', appointment.scheduleAppointment);

// Endpoint to get available dates for a doctor
router.get('/available-dates-times', appointment.getAvailableDatesAndTimes);

// Handle sign-in form submission
router.post('/signin', controller.SignIn);

// Handle sign-out form submission
router.post('/signout', controller.SignOut);

// Route to get all patients
router.get('/patients', controller.getAllPatients);

// Route to get all doctors
router.get('/doctors', appointment.getAllDoctors);

router.get('/doctors/:doctorId', appointment.getDoctorById);

// Route to get patient by ID
router.get('/patients/:id', controller.getPatientById);

export default router;
