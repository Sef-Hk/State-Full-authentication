import React, { useState } from 'react';
import './skills.css'; 

const SkillsForm = ({ value, onChange }) => {
  const allSkills = ['JavaScript', 'Python', 'React', 'Go', 'Node.js', 'CSS'];
  const [searchTerm, setSearchTerm] = useState('');

  // Filter skills based on the search term
  const filteredSkills = allSkills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a skill
  const handleSkillChange = (skill) => {
    if (!value.includes(skill)) {
      onChange([...value, skill]); // Update parent state
    }
    setSearchTerm(''); // Clear the search field
  };

  // Handle removing a skill
  const handleRemoveSkill = (skill) => {
    onChange(value.filter(item => item !== skill)); // Update parent state
  };

  return (
    <div className="form-input">
      <label htmlFor="skills">Search skills here:</label>
      <input
        id="skills"
        type="text"
        placeholder="Search skills"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
      />

      {searchTerm && (
        <div className="skills-dropdown">
          {filteredSkills.length > 0 ? (
            filteredSkills.map(skill => (
              <div
                key={skill}
                className="dropdown-option"
                onClick={() => handleSkillChange(skill)}
              >
                {skill}
              </div>
            ))
          ) : (
            <div className="no-results">No skills found</div>
          )}
        </div>
      )}

      <div className="selected-skills">
        {value.map(skill => (
          <div key={skill} className="skill-tag">
            {skill}
            <span className="remove-skill" onClick={() => handleRemoveSkill(skill)}>✖</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
