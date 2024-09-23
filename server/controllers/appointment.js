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
    return data ? JSON.parse(data) : { doctors: [], patients: [] };
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
const findAvailableSlots = (doctor, patients, date) => {
  const allPossibleTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const takenTimes = new Set();

  // Collect all taken times for the given date from all patients
  patients.forEach(patient => {
    patient.medical_reports.forEach(report => {
      if (report.appointmentdate === date && report.appointmentdoctor === doctor.name) {
        takenTimes.add(report.appointmenttime);
      }
    });
  });

  // Filter available slots by excluding taken times
  return allPossibleTimes.filter(time => !takenTimes.has(time));
};

// Endpoint to get available dates and times for a specific doctor
export const getAvailableDatesAndTimes = async (req, res) => {
  const { doctorId } = req.query;
  if (!doctorId) {
    return res.status(400).send('Doctor ID is required');
  }

  try {
    const data = await readDataFromFile();
    const doctor = data.doctors.find(doc => doc.doctor_id === doctorId);
    if (!doctor) {
      return res.status(404).send('Doctor not found');
    }

    const availableDates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
      const availableSlots = findAvailableSlots(doctor, data.patients, dateString);
      if (availableSlots.length > 0) {
        availableDates.push({ date: dateString, availableSlots });
      }
    }

    res.json({ availableDates });
  } catch (error) {
    console.error('Error getting available dates and times:', error);
    res.status(500).send('Internal server error');
  }
};

// Get all services from doctors
export const getAllServices = async (req, res) => {
  try {
    const data = await readDataFromFile();
    const servicesSet = new Set();

    data.doctors.forEach(doctor => {
      doctor.services.forEach(service => servicesSet.add(service));
    });

    const services = Array.from(servicesSet).map(service => ({ service_name: service }));
    res.json(services);
  } catch (error) {
    console.error('Error getting services:', error);
    res.status(500).send('Internal server error');
  }
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const data = await readDataFromFile();

    // Check if the doctors array exists and is an array
    if (!data.doctors || !Array.isArray(data.doctors)) {
      return res.status(404).json({ message: 'No doctors found' });
    }

    // Return the doctors data, including their IDs
    return res.status(200).json(data.doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get doctor by ID
export const getDoctorById = async (req, res) => {
  const { doctorId } = req.params; 
  if (!doctorId) {
      return res.status(400).json({ error: 'Doctor ID is required' });
  }

  try {
      const data = await readDataFromFile(); 
      const doctor = data.doctors.find(doc => doc.id === doctorId); 
      if (!doctor) {
          return res.status(404).json({ error: 'Doctor not found' });
      }
      res.status(200).json(doctor);
  } catch (error) {
      console.error('Error fetching doctor:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


export const scheduleAppointment = async (req, res) => {
  console.log(req.body); 

  const { date, time, service, id, patientName } = req.body;

  // Check for all required fields
  if (!date || !time || !service || !id || !patientName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const data = await readDataFromFile();

    // Check if the doctor exists using the id
    const doctor = data.doctors.find(doc => doc.id === id);
    if (!doctor) {
      return res.status(404).json({ error: `Doctor not found: ${id}` });
    }

    // Check if the patient exists
    const patientData = data.patients.find(p => p.name === patientName);
    if (!patientData) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check for existing appointments
    const existingAppointment = patientData.medical_reports.find(appointment =>
      appointment.appointmentdate === date && appointment.appointmenttime === time
    );

    if (existingAppointment) {
      return res.status(409).json({ error: 'This patient already has an appointment at this time.' });
    }

    // Create new appointment object
    const newAppointment = {
      appointmentId: uuidv4(),
      appointmentdate: date,
      appointmenttime: time,
      appointmentservice: service,
      appointmentdoctor: doctor.name,
      patient: patientName
    };

    // Add the new appointment to the patient's records
    patientData.medical_reports.push(newAppointment);

    // Write updated data back to the file
    await writeDataToFile(data);
    
    // Respond with success message
    res.status(201).json({ message: 'Appointment scheduled successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

