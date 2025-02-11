import React, { useState } from "react";
import './password.css'
const PasswordInput = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (value) => {
    const minLength = /.{8,}/; // At least 8 characters
    const uppercase = /[A-Z]/; // At least one uppercase letter
    const lowercase = /[a-z]/; // At least one lowercase letter
    const digit = /\d/; // At least one digit
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character

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
    const value = e.target.value;
    setPassword(value);
    setError(validatePassword(value));
  };

  return (
    <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handleChange}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PasswordInput;
