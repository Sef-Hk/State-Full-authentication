import React, { useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import './phone.css'
const PhoneNumberInput = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    setPhone(inputPhone);

    // Validate phone number
    const phoneNumber = parsePhoneNumberFromString(inputPhone, 'ALG'); // Default country (Change as needed)
    
    if (!phoneNumber || !phoneNumber.isValid()) {
      setError('Invalid phone number. Please enter a valid number with country code.');
    } else {
      setError('');
    }
  };

  return (
    <div className="form-header">
      <label htmlFor="phone">Phone Number (Required):</label>
      <input 
        type="tel" 
        id="phone" 
        name="phone" 
        value={phone} 
        onChange={handlePhoneChange} 
        required 
        placeholder="+213 500000000"
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;
