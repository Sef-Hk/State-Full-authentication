import React, { useState } from 'react';
import './dob.css'

const DateOfBirth = () => {
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const handleDobChange = (e) => {
    const selectedDob = e.target.value;
    setDob(selectedDob);

    // Validate if the user is 18 or older
    const age = calculateAge(selectedDob);
    if (age < 18) {
      setError('You must be at least 18 years old to sign up.');
    } else {
      setError('');
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

  
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="form-header">
      <label htmlFor="dob">Date of Birth (required):</label>
      <input 
        type="date" 
        id="dob" 
        name="dob" 
        value={dob} 
        onChange={handleDobChange} 
        required 
        max={new Date().toISOString().split("T")[0]}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DateOfBirth;
