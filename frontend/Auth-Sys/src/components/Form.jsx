import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import SkillsForm from './handalers/SkillsForm'
import CountryCityDropdown from './handalers/CountryCityDropdown'
import DateOfBirth from './handalers/DateOfBirth'
import PhoneNumberInput from './handalers/PhoneNumberInput'
import EmailInp from './handalers/EmailInp'
import PasswordInput from './handalers/PasswordInput'
import RoleSelection from './handalers/RoleSelection'
import { useNavigate } from "react-router";
import './styling/Form.css'
function Form() {
  const navigate = useNavigate();
  const [skillsError, setSkillsError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [loading, setLoading] = useState(false); // <-- new loading state
  const API_URL = process.env.REACT_APP_API_URL_UR || "https://sf-backend-1v1r.onrender.com";
  
  const [ageError, setAgeError] = useState("");
  const [formData, setFormData] = useState({
    role: "",
    full_name: "",
    email: "",
    password: "",
    skills: [],
    country: "",
    city: "",
    date_of_birth: "",
    phone_number: ""
  });

  useEffect(() => {
    console.log("process.env:", process.env);
    console.log("API URL on mount:", API_URL);
  }, [API_URL]);

  // Helper function to calculate user age
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle input changes
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Validate age if date_of_birth changes
    if (key === "date_of_birth") {
      const age = calculateAge(value);
      if (age < 18) {
        setAgeError("You must be at least 18 years old to sign up.");
      } else {
        setAgeError("");
      }
    }
  };

  // Submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Early client-side validations
    if (formData.skills.length === 0) {
      setSkillsError(true);
      return;
    } else {
      setSkillsError(false);
    }
    if (ageError) {
      alert("You must be at least 18 years old to sign up.");
      return;
    }
    if (!formData.role) {
      setRoleError(true);
      return;
    } else {
      setRoleError(false);
    }

    // Prevent multiple clicks by setting loading state
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        // Handle various errors
        if (response.status === 409) {
          alert("Email already registered. Please use a different email.");
        } else if (response.status === 400) {
          alert("Invalid request. Please fill in all fields correctly.");
        } else {
          alert(data.error || "Something went wrong!");
        }
      } else {
        // Success
        console.log("User registered successfully:", data);
        alert("Registration successful!");
        // Reset the form
        setFormData({
          role: "",
          full_name: "",
          email: "",
          password: "",
          skills: [],
          country: "",
          city: "",
          date_of_birth: "",
          phone_number: "",
        });
        navigate('/login');
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className='form-container'>
      <div className='the-head'> 
         <h1>Create your account with us below</h1>
         <p>Already have an account?<a href="/login"> Login</a></p>
      </div>
      <form onSubmit={handleSubmit} className='form-form'>
        <div className='form-header'>
          <RoleSelection
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            error={roleError}
          />
        </div>

        <div className='input-box'>
          <div className='form-header'>
            <label htmlFor="full_name">Full Name</label>
            <input 
              type="text" 
              id="full_name"
              value={formData.full_name}
              required 
              minLength={2} 
              maxLength={50} 
              onChange={(e) => handleChange("full_name", e.target.value)}
              disabled={loading} // disable while loading
            />
          </div> 

          <div className='form-skills'>
            <EmailInp
              value={formData.email}
              onChange={(val) => handleChange("email", val)}
              disabled={loading} // disable while loading
            />
          </div>
          <div className='form-skills'>
            <PasswordInput
              value={formData.password}
              onChange={(val) => handleChange("password", val)}
              disabled={loading} // disable while loading
            />
          </div>
          <div className='form-skills'>
            <SkillsForm
              value={formData.skills}
              onChange={(val) => handleChange("skills", val)}
              error={skillsError}
              disabled={loading} // disable while loading
            />
          </div>
          <div className='form-skills'>
            <CountryCityDropdown
              country={formData.country}
              city={formData.city}
              onChange={handleChange}
              disabled={loading} // disable while loading
            />
          </div>
          <div className='form-skills'>
            <DateOfBirth 
              value={formData.date_of_birth}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className='form-skills'>
            <PhoneNumberInput
              value={formData.phone_number}
              onChange={(val) => handleChange("phone_number", val)}
              disabled={loading} // disable while loading
            />
          </div>

          {/* Submit button */}
          <button
            type='submit'
            className='submit-button'
            disabled={loading} // disable click while loading
          >
            {loading ? "Submitting..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
