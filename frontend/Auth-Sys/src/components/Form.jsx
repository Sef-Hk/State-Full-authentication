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
      const API_URL = process.env.BackEnd_URL
      const [ageError, setAgeError] = useState("");
      const [formData, setFormData] = useState({
            role:"",
            full_name:"",
            email: "",
            password: "",
            skills:[],
            country:"",
            city:"",
            date_of_birth:"",
            phone_number:""
          });
          //test 
          console.log("Form component rendered");
          useEffect(() => {
           
            console.log("API URL on mount:", API_URL);
          }, [API_URL]);


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
          const calculateAge = (dob) => {
            const birthDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            if (
              today.getMonth() < birthDate.getMonth() ||
              (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
            ) {
              age--;
            }
            return age;
          };
          
      //     const handleSubmit = async (e) => {
      //       e.preventDefault();
      //       console.log("Sending data:", formData);
      //     };
      const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(API_URL)
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
            try {
             
              const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });
          
              const data = await response.json();
          
              if (response.ok) {
                console.log("User registered successfully:", data);
                alert("Registration successful!");
                // Reset form after success
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
                navigate('/login')
              } else {
                if (response.status === 409) {
                  alert("Email already registered. Please use a different email.");
              } else if (response.status === 400) {
                  alert("Invalid request. Please fill in all fields correctly.");
              } else if (!response.ok) {
                  alert(data.error || "Something went wrong!");
              }
              }
            } catch (error) {
              console.error("Network error:", error);
              alert("Failed to connect to the server.");
            }
          };
   return (
    
    <div className='form-container'>
      <div className='the-head'> 
         <h1>Create your account with us below</h1>
         <p>Already have an account?<a href="#"> Login</a></p>
      </div>
      <form onSubmit={handleSubmit} className='form-form'>
        <div className='form-header'>
            
            <RoleSelection value={formData.role} onChange={(val) => handleChange("role", val)} error={roleError}  />

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
                       />
                 </div>     
                 <div className='form-skills'>
                       <EmailInp value={formData.email} onChange={(val) => handleChange("email", val)}/>
                 </div>
                 <div className='form-skills'>
                       <PasswordInput value={formData.password} onChange={(val) => handleChange("password", val)}/>
                 </div>
                 <div className='form-skills'>
                       <SkillsForm value={formData.skills} onChange={(val) => handleChange("skills", val)} error={skillsError}/>
                      
                 </div>
                 <div className='form-skills'>
                       <CountryCityDropdown 
                       country={formData.country}
                       city={formData.city}
                       onChange={handleChange}
                       
                       />
                 </div>
                 <div className='form-skills'>
                 <DateOfBirth value={formData.date_of_birth} onChange={handleChange} />
                 
                 </div>
                 <div className='form-skills'>
                 <PhoneNumberInput value={formData.phone_number} onChange={(val) => handleChange("phone_number", val)} />

                 </div>
                 
                

                 <button type='submit' className='submit-button'>Create Account</button>
         </div>       
      </form>
    </div>
  )
}

export default Form
