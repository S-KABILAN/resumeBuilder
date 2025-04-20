import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaTrash, FaPlus } from "react-icons/fa";

const SkillsForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
  // State to track which skill entry is being edited
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize with default entries if none exist
  if (!formData.skills || formData.skills.length === 0) {
    const defaultSkills = [
      {
        skillType: "Programming Languages",
        skillName: "JavaScript, TypeScript, Python, Java",
        isVisible: true,
      },
      {
        skillType: "Frontend",
        skillName: "React, Angular, Vue.js, HTML5, CSS3",
        isVisible: true,
      },
      {
        skillType: "Backend",
        skillName: "Node.js, Express, Django, Spring Boot",
        isVisible: true,
      },
      {
        skillType: "Databases",
        skillName: "MongoDB, PostgreSQL, MySQL, Redis",
        isVisible: true,
      },
      {
        skillType: "Tools & Others",
        skillName: "Git, Docker, AWS, CI/CD, Agile",
        isVisible: true,
      },
    ];

    onFormChange("skills", defaultSkills);
  }

  // Handler for input changes
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [name]: value };

    onFormChange("skills", updatedSkills);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e, index) => {
    const { name, checked } = e.target;
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [name]: checked };

    onFormChange("skills", updatedSkills);
  };

  // Add new skill entry
  const handleAddSkill = () => {
    const newSkill = {
      skillType: "",
      skillName: "",
      isVisible: true,
    };

    const updatedSkills = [...formData.skills, newSkill];
    onFormChange("skills", updatedSkills);
    setActiveIndex(updatedSkills.length - 1);
  };

  // Remove skill entry
  const handleRemoveSkill = (index) => {
    if (formData.skills.length <= 1) return;

    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    onFormChange("skills", updatedSkills);

    // Adjust active index if needed
    if (activeIndex >= updatedSkills.length) {
      setActiveIndex(updatedSkills.length - 1);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>

      {/* Tab navigation for multiple skill entries */}
      {formData.skills && formData.skills.length > 0 && (
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {formData.skills.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 rounded-md ${
                activeIndex === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            title="Add Skill"
          >
            <FaPlus />
          </button>
        </div>
      )}

      {/* Skill Form Fields */}
      {formData.skills &&
        formData.skills.length > 0 &&
        formData.skills[activeIndex] && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Skill #{activeIndex + 1}</h3>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="isVisible"
                    checked={formData.skills[activeIndex].isVisible || false}
                    onChange={(e) => handleCheckboxChange(e, activeIndex)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Show</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(activeIndex)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                  title="Remove skill"
                  disabled={formData.skills.length <= 1}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Skill Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Category
                </label>
                <input
                  type="text"
                  name="skillType"
                  value={formData.skills[activeIndex].skillType || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Programming Languages, Tools, Soft Skills"
                />
              </div>

              {/* Skill Name/Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <input
                  type="text"
                  name="skillName"
                  value={formData.skills[activeIndex].skillName || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., JavaScript, React, Node.js"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Tip: Separate multiple skills with commas for better
                  formatting
                </p>
              </div>
            </div>
          </div>
        )}

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

SkillsForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default SkillsForm;
