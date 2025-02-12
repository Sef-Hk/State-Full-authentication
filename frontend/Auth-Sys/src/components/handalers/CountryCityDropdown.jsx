import React, { useState, useEffect } from "react";
import axios from "axios";
import "./country.css";

const CountryCityDropdown = ({ country, city, onChange }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [noCitiesAvailable, setNoCitiesAvailable] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries");

        const countryList = response.data.data.map((country) => ({
          value: country.iso2, // Country code (ISO 2)
          label: country.country,
          cities: country.cities,
        }));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    onChange("country", countryCode); // Update parent state

    const countryData = countries.find((c) => c.value === countryCode);
    if (countryData && countryData.cities.length > 0) {
      setCities(countryData.cities);
      setNoCitiesAvailable(false);
    } else {
      setCities([]);
      setNoCitiesAvailable(true);
    }
  };

  const handleCityChange = (event) => {
    onChange("city", event.target.value); // Update parent state
  };

  return (
    <div className="form-header">
      {/* Country Dropdown */}
      <label htmlFor="country">Select your country:</label>
      <select id="country" name="country" value={country} onChange={handleCountryChange} required>
        <option value="">--Select a country--</option>
        {countries.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      {country && (
        <div>
          <label htmlFor="city">Select your city:</label>
          <select id="city" name="city" value={city} onChange={handleCityChange} required>
            <option value="">--Select a city--</option>
            {cities.length > 0 ? (
              cities.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))
            ) : noCitiesAvailable ? (
              <option>No cities available</option>
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>
      )}
    </div>
  );
};

export default CountryCityDropdown;
