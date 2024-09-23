# VitalPathway

![alt text](logo.jpeg)

**VitalPathway** is a comprehensive healthcare management system designed to streamline patient care, improve access to medical services, and enhance communication between patients and healthcare providers.

## Overview

VitalPathway addresses common challenges in managing healthcare information by providing an integrated system that simplifies appointment scheduling, medical record tracking. It aims to reduce inefficiencies, and provide better patient care.

## Problem

Managing healthcare information can be challenging for both patients and healthcare providers. Patients often struggle with:
- Scheduling appointments
- Tracking their medical history
- Accessing their health records

Healthcare providers face difficulties with:
- Managing patient records
- Managing their time

The lack of an integrated system often results in inefficiencies, miscommunication, and suboptimal patient care.

## User Profile

### Patients
- **Looking to**:
  - Schedule and manage medical appointments
  - Access and track their medical records and history

### Healthcare Providers
- **Need to**:
  - Access patient medical records and appointments
  - Access the number of their patient

## Features

### For Patients
- Sign In and Sign Up
- Access and view personal medical records and history
- Make appointment

### For Doctors
- Sign In and Sign Up
- View the number of patients
- Access patient medical records

### For Nurses
- Sign In and Sign Up
- View the number of patients

### Common Features
- User account creation and management
- Mobile-friendly interface for easy access

## Tech Stack

### Frontend
- **React**
- **JavaScript**

### Backend
- **Node.js**
- **Express**

### Client Libraries
- `react-router`
- `axios`


## APIs

No external APIs will be used for the initial implementation.

## Sitemap

- **Home Page**
- **About Us**
- **Sign Up Page**
- **Sign In Page**
- **Schedule Appointment Page**
- **View Medical Records Page**

## Mockups

- **Home Page**
![alt text](<Home Page.png>)

- **About Us**
![alt text](<About Us.png>)

- **Schedule Appointment**
![alt text](<Make Appointment.png>)

- **View Medical Records**
![alt text](Medical-reports.png)

- **Sign Up**
![alt text](<Sign Up.png>)

- **Sign In**
![alt text](<Sign In.png>)

# API Documentation

## Doctor Endpoints

### Get All Doctors
- **Endpoint**: `GET /doctors`
- **Description**: Retrieve a list of all doctors.
- **Response**:
  ```json
  [
    {
      "doctor_id": "D78910",
      "name": "Dr. Emily Johnson",
      "email": "emily.johnson@example.com",
      "number_of_patients": 30
    },
    {
      "doctor_id": "D98765",
      "name": "Dr. Sarah Lee",
      "email": "sarah.lee@example.com",
      "number_of_patients": 25
    }
  ]

#### `Get Doctor by ID`
- **Endpoint**: `GET /doctors/{doctor_id}`
- **Description**: Retrieve details of a specific doctor by ID.
- **Response**:
  ```json
  [
    {
      "doctor_id": "D78910",
      "name": "Dr. Emily Johnson",
      "email": "emily.johnson@example.com",
      "number_of_patients": 30,
      "patients": [
        {
          "patient_id": "P123456",
          "name": "John Doe"
          // other patient details
        }
      ]
    }
  ]


#### `Create a New Doctor`
- **Endpoint**: `POST /doctors`
- **Description**: Create a new doctor.
- **Request Body**:
  - `name`: "DR. New Doctor"
  - `email`: "new.doctor@example.com"
  - `password`: "securePassword123"
- **Response**:
  ```json
  [
    {
      "doctor_id": "D123456",
      "name": "Dr. New Doctor",
      "email": "new.doctor@example.com",
      "number_of_patients": 0
     }
  ]


#### `Get All Patients for a Doctor`
- **Endpoint**: `GET /doctors/{doctor_id}/patients`
- **Description**: Retrieve a list of all patients for a specific doctor.
- **Response**:
  ```json
  [
    {
      "patient_id": "P123456",
      "name": "John Doe"
      // other patient details
    }
  ]



#### `Get Patient by ID`
- **Endpoint**: `GET /patients/{patient_id}`
- **Description**: Retrieve details of a specific patient by ID.
- **Response**:
  ```json
  [
    {
      "patient_id": "P123456",
      "name": "John Doe",
      "medical_reports": [
        {
          "date": "2024-07-11",
          "complete_blood_count": {
            "RBC": "5.1",
            "Hb": "14.2",
            "HCT": "44.5",
            "WBC": "7.5"
          },
          "basic_metabolic_panel": {
            "glucose": "88",
            "calcium": "9.1",
            "sodium": "139",
            "potassium": "4.1",
            "bicarbonate": "23",
            "chloride": "101",
            "BUN": "14",
            "creatinine": "1.0"
          },
          // other report details
        }
      ]
    }
    ]


### Roadmap

**Create Client**:
    - Set up a React project with routing and basic pages

**Create Server**:
    - Set up an Express server with routing and placeholder responses

**Gather Sample Data**:
    - Create sample patient and provider data

**Implement Features**:
    - Schedule appointments
    - Access and view medical records
    - User registration and login

**Bug Fixes and Testing**:
    - Perform bug fixes and thorough testing

**DEMO DAY**:
    - Present the final project


### Nice-to-Haves
**JWT Authentication**:
    - Use JWT tokens to secure API endpoints
    - Store JWT in localStorage; remove upon logout
    - Implement login and registration for secure access

**Integration with External APIs**:
    - Integrate with healthcare APIs for additional functionality

**Forgot Password Functionality**:
    - Allow users to recover their accounts

**Appointment Reminders**:
    - Send automated reminders for upcoming appointments

**Enhanced User Profiles**:
    - Add more details to user profiles, including medical history and preferences

**Advanced Communication Tools**:
    - Implement video consultation features


### Contact
- For any questions feel free to communicate with me
    - Saba Namdari
    - sabanamdari20@gmail.com
