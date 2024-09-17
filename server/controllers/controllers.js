import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/data.json');

// Helper function to read data from JSON file
const readDataFromFile = (callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      callback(err, null);
    } else {
      try {
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        callback(parseErr, null);
      }
    }
  });
};

// Helper function to write data to JSON file
const writeDataToFile = (data, callback) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', callback);
};

// Get all patients
export const getAllPatients = (req, res) => {
  readDataFromFile((err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const patients = data.doctors.flatMap(doctor => doctor.patients);
    res.json(patients);
  });
};

// Get patient by ID
export const getPatientById = (req, res) => {
  const { id } = req.params;
  readDataFromFile((err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const patient = data.doctors.flatMap(doctor => doctor.patients)
                                .find(patient => patient.patient_id === id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send('Patient not found');
    }
  });
};

// Sign up new user
export const SignUp = (req, res) => {
  const { firstName, lastName, dateOfBirth, phoneNumber, email, address, city, postalCode, password } = req.body;
  if (!firstName || !lastName || !dateOfBirth || !phoneNumber || !email || !address || !city || !postalCode || !password) {
    return res.status(400).send('All fields are required');
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format');
  }
  const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
  if (!postalCodeRegex.test(postalCode)) {
    return res.status(400).send('Invalid postal code format');
  }
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).send('Invalid phone number format');
  }
  readDataFromFile((err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const newPatient = {
      patient_id: uuidv4(),
      name: `${firstName} ${lastName}`,
      dateOfBirth,
      phoneNumber,
      email,
      address,
      city,
      postalCode,
      password,
      medical_reports: []
    };
    if (data.doctors.length > 0) {
      data.doctors[0].patients.push(newPatient);
      writeDataToFile(data, (writeErr) => {
        if (writeErr) {
          res.status(500).send('Error saving data');
        } else {
          res.status(201).send('User signed up successfully');
        }
      });
    } else {
      res.status(400).send('No doctors available to assign the patient');
    }
  });
};



export { readDataFromFile, writeDataToFile };
