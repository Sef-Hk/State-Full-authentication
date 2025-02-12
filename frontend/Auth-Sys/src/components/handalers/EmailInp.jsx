import React, { useState } from "react";
import "./email.css";

const EmailInp = ({ value, onChange }) => {
  const [error, setError] = useState("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;

    // Validate email format
    if (!emailRegex.test(inputEmail)) {
      setError("Invalid email format.");
    } else {
      setError("");
    }

    onChange(inputEmail); // Send the value to the parent component
  };

  return (
    <div className="form-header">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={value} // Controlled by parent
        onChange={handleEmailChange}
        required
        placeholder="Enter your email"
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EmailInp;
