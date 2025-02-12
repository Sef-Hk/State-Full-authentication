import React from 'react'
import { useState } from 'react'
import SkillsForm from './handalers/SkillsForm'
import CountryCityDropdown from './handalers/CountryCityDropdown'
import DateOfBirth from './handalers/DateOfBirth'
import PhoneNumberInput from './handalers/PhoneNumberInput'
import EmailInp from './handalers/EmailInp'
import PasswordInput from './handalers/PasswordInput'
import RoleSelection from './handalers/RoleSelection'
import { useNavigate } from "react-router";
import './styling/form.css'
function Form() {
      const navigate = useNavigate();
      
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

          const handleChange = (key, value) => {
            setFormData((prev) => ({ ...prev, [key]: value }));
          };
        
      //     const handleSubmit = async (e) => {
      //       e.preventDefault();
      //       console.log("Sending data:", formData);
      //     };
      const handleSubmit = async (e) => {
            e.preventDefault();
          
            try {
              const response = await fetch("http://localhost:8080/register", {
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
                console.error("Error:", data.error);
                alert(data.error || "Something went wrong!");
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
            <label htmlFor="">You're creating an account as?</label>
            <RoleSelection value={formData.role} onChange={(val) => handleChange("role", val)} />

        </div>
        <div className='input-box'>
                 <div className='form-input'>
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
                       <SkillsForm value={formData.skills} onChange={(val) => handleChange("skills", val)}/>
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