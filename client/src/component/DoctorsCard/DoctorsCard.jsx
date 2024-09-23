import React from 'react';
import doctorpic from "../../assets/images/doctor.jpg";
import './DoctorsCard.scss';

const DoctorCard = ({ doctor }) => {
    return (
        <div className="doctorcard">
            <img className="doctorcard__img" src={doctorpic} alt={doctor.name} />
            <h3 className="doctorcard__title">{doctor.name}</h3>
            <p className="doctorcard__txt"><strong>Email:</strong> {doctor.email}</p>
            <p className="doctorcard__txt"><strong>Phone:</strong> {doctor.phoneNumber}</p> 
            <p className="doctorcard__txt"><strong>Specialty:</strong> {doctor.specialty}</p>
            <p className="doctorcard__txt"><strong>Services:</strong></p>
            <ul className="doctorcard__list">
                {doctor.services.map(service => (
                    <li  className="doctorcard__items" key={service}>{service}</li>
                ))}
            </ul>
            <div className="availability">
                <p className="availability__txt"><strong>Availability:</strong></p>
                {doctor.availability.map(slot => (
                    <div key={slot.day}>
                        <strong className="availability__day">{slot.day}:</strong>
                        <ul className="availability__list">
                            {slot.dates.map((date, index) => (
                                <li className="availability__items"key={index}>
                                    {date} at {slot.time.join(', ')}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorCard;
