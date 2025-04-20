import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrash } from "react-icons/fa";

const LanguagesForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [newLanguage, setNewLanguage] = useState("");
  const [newProficiency, setNewProficiency] = useState("Intermediate");

  // Initialize with default entries if none exist
  if (!formData.languages || formData.languages.length === 0) {
    const defaultLanguages = [
      {
        language: "English",
        proficiency: "Native",
        isVisible: true,
      },
    ];

    onFormChange("languages", defaultLanguages);
  }

  // Handler for checkbox changes
  const handleCheckboxChange = (index) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      isVisible: !updatedLanguages[index].isVisible,
    };

    onFormChange("languages", updatedLanguages);
  };

  // Add new language
  const handleAddLanguage = () => {
    if (!newLanguage.trim()) return;

    const languageEntry = {
      language: newLanguage,
      proficiency: newProficiency,
      isVisible: true,
    };

    const updatedLanguages = [...formData.languages, languageEntry];
    onFormChange("languages", updatedLanguages);

    // Reset the form
    setNewLanguage("");
    setNewProficiency("Intermediate");
  };

  // Remove language
  const handleRemoveLanguage = (index) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index);
    onFormChange("languages", updatedLanguages);
  };

  // Get field error
  const getFieldError = (field) => {
    return errors[field] ? errors[field].message : "";
  };

  // Proficiency levels
  const proficiencyLevels = [
    "Beginner",
    "Elementary",
    "Intermediate",
    "Advanced",
    "Proficient",
    "Native",
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Languages</h2>

      {/* Current languages list */}
      {formData.languages && formData.languages.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-medium mb-4">Your Languages</h3>
          <div className="space-y-4">
            {formData.languages.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
              >
                <div className="flex-1">
                  <div className="font-medium">{item.language}</div>
                  <div className="text-sm text-gray-500">
                    {item.proficiency}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={item.isVisible}
                      onChange={() => handleCheckboxChange(index)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Show</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                    title="Remove language"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add new language form */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Add New Language</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Language name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Spanish"
            />
          </div>

          {/* Proficiency select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level
            </label>
            <select
              value={newProficiency}
              onChange={(e) => setNewProficiency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {proficiencyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddLanguage}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={!newLanguage.trim()}
          >
            <FaPlus className="mr-2" />
            Add Language
          </button>
        </div>
      </div>

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

LanguagesForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default LanguagesForm;
