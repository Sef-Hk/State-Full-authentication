import React, { useState } from "react";
import "./styling/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const API_URL = process.env.REACT_APP_API_URL_UR || "https://sf-backend-1v1r.onrender.com";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <-- Loading state

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",  // Needed so cookies can be sent/received
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        // Navigate to home on successful login
        navigate("/home");
      } else {
        // Display error from server
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>

          {/* Show any error messages */}
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
              disabled={loading} // Disable input while loading
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
              disabled={loading} // Disable input while loading
            />
          </div>

          {/* Disable the button and change text while loading */}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
