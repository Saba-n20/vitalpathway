import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appointmentsFilePath = path.join(__dirname, '../data/data.json');

// Helper function to read data from JSON file
const readDataFromFile = async () => {
  try {
    const data = await fs.promises.readFile(appointmentsFilePath, 'utf8');
    return data ? JSON.parse(data) : { doctors: [] };
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error('Unable to read data');
  }
};

// Helper function to write data to JSON file
const writeDataToFile = async (data) => {
  try {
    await fs.promises.writeFile(appointmentsFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing file:', error);
    throw new Error('Unable to save data');
  }
};

// Helper function to find available slots
const findAvailableSlots = (doctors, date) => {
  const slots = [];
  const allPossibleTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const takenTimes = new Set();

  doctors.forEach(doctor => {
    doctor.patients.forEach(patient => {
      patient.medical_reports.forEach(report => {
        if (report.date === date && report.time) {
          takenTimes.add(report.time);
        }
      });
    });
  });

  allPossibleTimes.forEach(time => {
    if (!takenTimes.has(time)) {
      slots.push(time);
    }
  });

  return slots;
};

// Endpoint to get available slots
export const getAvailableSlots = async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).send('Date is required');
  }

  try {
    const data = await readDataFromFile();
    const availableSlots = findAvailableSlots(data.doctors, date);
    res.json({ availableSlots });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Handle scheduling an appointment
export const scheduleAppointment = async (req, res) => {
  const { date, time, service, doctorName, patient } = req.body;

  if (!date || !time || !service || !doctorName || !patient) {
    return res.status(400).send('All fields are required');
  }

  try {
    const data = await readDataFromFile();
    
    const newAppointment = {
      id: uuidv4(),
      date,
      time,
      service,
      doctor: doctorName,
      patient
    };

    const doctor = data.doctors.find(doc => `${doc.first_name} ${doc.last_name}` === doctorName);
    if (!doctor) {
      return res.status(404).send('Doctor not found');
    }

    const patientData = doctor.patients.find(p => p.name === patient);
    if (!patientData) {
      return res.status(404).send('Patient not found');
    }

    const existingAppointment = patientData.medical_reports.find(appointment => 
      appointment.date === date && appointment.time === time
    );

    if (existingAppointment) {
      return res.status(409).send('This patient already has an appointment at this time.');
    }

    patientData.medical_reports.push(newAppointment);

    await writeDataToFile(data);
    res.status(201).json({ message: 'Appointment scheduled successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
