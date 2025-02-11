import React, { useState } from 'react';
import './skills.css'; // Make sure your CSS file is linked

const SkillsForm = () => {
  const allSkills = ['JavaScript', 'Python', 'React', 'Go', 'Node.js', 'CSS']; // Example skills
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter skills based on the search term
  const filteredSkills = allSkills.filter(skill => 
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle adding/removing skills
  const handleSkillChange = (event) => {
    const selectedOption = event.target.value;
    if (!selectedSkills.includes(selectedOption)) {
      setSelectedSkills([...selectedSkills, selectedOption]);
    }
    setSearchTerm(''); // Clear the search field once a skill is selected
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter(item => item !== skill));
  };

  return (
    <div className="form-input">
      <label htmlFor="skills">Search skills here:</label>
      <input 
        id="skills" 
        type="text" 
        placeholder="Search skills here" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        required
      />

      {searchTerm && (
        <div className="skills-dropdown">
          {filteredSkills.length > 0 ? (
            filteredSkills.map(skill => (
              <div 
                key={skill} 
                className="dropdown-option" 
                onClick={() => handleSkillChange({ target: { value: skill } })}
              >
                {skill}
              </div>
            ))
          ) : (
            <div className="no-results">No skills found</div>
          )}
        </div>
      )}

      <div>
        
        <ul>
        <div className="selected-skills">
  {selectedSkills.map(skill => (
    <div key={skill} className="skill-tag">
      {skill} <span className="remove-skill" onClick={() => handleRemoveSkill(skill)}>✖</span>
    </div>
  ))}
</div>

        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;
