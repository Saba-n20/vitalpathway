import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as controller from '../controllers/controllers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Serve the signup form
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

// Handle sign-up form submission
router.post('/signup', controller.SignUp);

// Route to get all patients
router.get('/patients', controller.getAllPatients);

// Route to get patient by ID
router.get('/patients/:id', controller.getPatientById);

export default router;
