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
      return res.status(500).send('Internal Server Error');
    }

    // Directly access the patients array
    const patients = data.patients;

    // Send the patients data
    res.json(patients);
  });
};


// Get patients by ID
export const getPatientById = (req, res) => {
  const { id } = req.params;
  console.log("Requested Patient ID:", id); 

  readDataFromFile((err, data) => {
    if (err) {
      console.error("Error reading data file:", err);
      return res.status(500).send('Internal Server Error');
    }

    
    console.log("Data read from file:", JSON.stringify(data, null, 2));

    
    const patient = data.patients.find(patient => patient.patient_id === id);
    
    if (patient) {
      console.log("Patient found:", patient);
      res.json(patient);
    } else {
      console.warn("Patient not found for ID:", id);
      res.status(404).send('Patient not found');
    }
  });
};

// Get all services
export const getAllServices = (req, res) => {
  readDataFromFile((err, data) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    // Ensure services array exists and is populated
    if (!data || !data.services) {
      return res.status(404).send('No services found');
    }

    
    const services = data.services;

    
    res.json(services);
  });
};



// Sample medical reports
const sampleMedicalReports = [
  {
    date: "2024-07-15",
    complete_blood_count: {
      RBC: "4.8",
      Hb: "13.8",
      HCT: "42.0",
      WBC: "6.9"
    },
    basic_metabolic_panel: {
      glucose: "85",
      calcium: "9.0",
      sodium: "138",
      potassium: "4.0",
      bicarbonate: "22",
      chloride: "100",
      BUN: "13",
      creatinine: "0.9"
    },
    comprehensive_metabolic_panel: {
      total_protein: "6.8",
      albumin: "4.3",
      AST: "21",
      ALT: "29",
      alkaline_phosphatase: "64"
    },
    lipid_panel: {
      total_cholesterol: "180",
      LDL: "110",
      HDL: "65",
      triglycerides: "90"
    },
    thyroid_function_tests: {
      TSH: "1.8",
      Free_T4: "1.1",
      Free_T3: "3.0"
    },
    hemoglobin_a1c: "5.4"
  },
  {
    date: "2024-08-15",
    complete_blood_count: {
      RBC: "4.9",
      Hb: "13.9",
      HCT: "42.5",
      WBC: "7.0"
    },
    basic_metabolic_panel: {
      glucose: "86",
      calcium: "9.1",
      sodium: "139",
      potassium: "4.1",
      bicarbonate: "23",
      chloride: "101",
      BUN: "14",
      creatinine: "1.0"
    },
    comprehensive_metabolic_panel: {
      total_protein: "6.9",
      albumin: "4.4",
      AST: "22",
      ALT: "30",
      alkaline_phosphatase: "65"
    },
    lipid_panel: {
      total_cholesterol: "185",
      LDL: "115",
      HDL: "66",
      triglycerides: "95"
    },
    thyroid_function_tests: {
      TSH: "1.9",
      Free_T4: "1.2",
      Free_T3: "3.1"
    },
    hemoglobin_a1c: "5.5"
  }
];
const sampleheartRate= "76";
const samplebloodPressure = "120"

export const SignUp = (req, res) => {
  console.log("Incoming signup data:", req.body);
  const {
    firstName, lastName, dateOfBirth, phoneNumber, email,
    address, city, postalCode, password, height, weight, gender, maritalStatus
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const jsonData = JSON.parse(data);

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
        height,
        weight,
        heartRate: sampleheartRate, 
        bloodPressure: samplebloodPressure, 
        gender,
        maritalStatus,
        medical_reports: sampleMedicalReports,
        appointments: []
      };

      // Add the new patient to the patients array
      jsonData.patients.push(newPatient);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(201).json({ message: 'User signed up successfully' });
      });
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

// Sign in user
export const SignIn = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  readDataFromFile((err, data) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    const user = data.patients.find(patient => patient.email === email);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.password !== password) {
      return res.status(401).send('Incorrect password');
    }

    // Successfully authenticated, return patient ID
    res.json({ success: true, patient_id: user.patient_id });
  });
};

// Sign Out user
export const SignOut = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Successfully signed out' });
  });
};

// Get doctors for a specific service
export const getDoctorsForService = (req, res) => {
  const serviceId = req.params.id;

  readDataFromFile((err, data) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    // Find doctors that offer the requested service
    const doctors = data.doctors.filter(doctor => 
      doctor.services.includes(serviceId)
    );

    if (doctors.length === 0) {
      return res.status(404).send('No doctors found for this service');
    }

    res.json(doctors);
  });
};

export { readDataFromFile, writeDataToFile };
