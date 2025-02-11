import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './country.css'

const CountryCityDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [noCitiesAvailable, setNoCitiesAvailable] = useState(false);

  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
       
        const countryList = response.data.data.map((country) => ({
          value: country.iso2, // Country code (ISO 2)
          label: country.country,
          cities: country.cities, 
        }));
        setCountries(countryList);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  
  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);

    
    const country = countries.find((country) => country.value === countryCode);
    if (country && country.cities.length > 0) {
      setCities(country.cities);
      setNoCitiesAvailable(false);
    } else {
      setCities([]);
      setNoCitiesAvailable(true);
    }
  };

  return (
    <div className="form-header">
      {/* Country Dropdown */}
      <label htmlFor="country">Select your country:</label>
      <select 
        id="country" 
        name="country" 
        value={selectedCountry} 
        onChange={handleCountryChange} 
        required
      >
        <option value="">--Select a country--</option>
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      {selectedCountry && (
        <div>
          <label htmlFor="city">Select your city:</label>
          <select id="city" name="city" required>
            <option value="" required>--Select a city--</option>
            {cities.length > 0 ? (
              cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
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
