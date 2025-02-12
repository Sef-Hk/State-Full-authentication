import React, { useState } from "react";
import "./password.css";

const PasswordInput = ({ value, onChange }) => {
  const [error, setError] = useState("");

  const validatePassword = (value) => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const digit = /\d/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(value)) {
      return "Password must be at least 8 characters long.";
    }
    if (!uppercase.test(value)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!lowercase.test(value)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!digit.test(value)) {
      return "Password must contain at least one digit.";
    }
    if (!specialChar.test(value)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setError(validatePassword(newPassword));
    onChange(newPassword); // Send the value to the parent
  };

  return (
    <div className="form-header">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={value} // Controlled by the parent
        onChange={handleChange}
        required
        placeholder="Enter your password"
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PasswordInput;
