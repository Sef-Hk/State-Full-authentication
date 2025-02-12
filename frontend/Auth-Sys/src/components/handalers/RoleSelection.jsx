import React from 'react';
import './role.css';

const RoleSelection = ({ value, onChange }) => {
  return (
    <div className="form-header">
      <label htmlFor="role">You're creating an account as?</label>
      <div className="box-top">
        <label className="box-form">
          <input
            type="radio"
            name="role"
            value="designer"
            checked={value === "designer"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="custom-radio"></span>
          <p>As a Designer</p>
        </label>
        <label className="box-form">
          <input
            type="radio"
            name="role"
            value="developer"
            checked={value === "developer"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="custom-radio"></span>
          <p>As a Developer</p>
        </label>
      </div>
    </div>
  );
};

export default RoleSelection;
