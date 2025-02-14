import React, { useState,useEffect } from "react";
import "./styling/Login.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const API_URL = process.env.REACT_APP_API_URL_UR || "https://sf-backend-1v1r.onrender.com";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
          // //test 
          // console.log("Form component rendered");
          // useEffect(() => {
           
          //   console.log("API URL on mount:", API_URL);
          // }, [API_URL]);
          
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        navigate("/home");
        
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="login-page">
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
