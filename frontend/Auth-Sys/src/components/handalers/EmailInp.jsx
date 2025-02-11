import React, { useState } from 'react';
import './email.css'
const EmailInp = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Validate email format
    if (!emailRegex.test(inputEmail)) {
      setError('Invalid email format.');
    } else {
      setError('');
    }
  };

  return (
    <div className="form-header">
      <label htmlFor="email">Email:</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        value={email} 
        onChange={handleEmailChange} 
        required 
        placeholder="Enter your email"
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EmailInp;
