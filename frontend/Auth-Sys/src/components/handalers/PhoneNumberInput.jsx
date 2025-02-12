import React, { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "./phone.css";

const PhoneNumberInput = ({ value, onChange }) => {
  const [error, setError] = useState("");

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;

    // Validate phone number
    const phoneNumber = parsePhoneNumberFromString(inputPhone, "ALG"); // Default country

    if (!phoneNumber || !phoneNumber.isValid()) {
      setError("Invalid phone number. Please enter a valid number with country code.");
    } else {
      setError("");
    }

    onChange(inputPhone); // Calls parent `onChange` with the new phone value
  };

  return (
    <div className="form-header">
      <label htmlFor="phone">Phone Number (Required):</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={value} // Controlled component using parent's state
        onChange={handlePhoneChange}
        required
        placeholder="+213 500000000"
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;
