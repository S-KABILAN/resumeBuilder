import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaGlobeAmericas, FaCheck } from "react-icons/fa";
import {
  FormContainer,
  FormSection,
  FormGrid,
  FormField,
  EntryCard,
  FormFooter,
} from "./FormStyles";

const LanguagesForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
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
    <FormContainer title="Languages">
      {/* Current languages list */}
      {formData.languages && formData.languages.length > 0 && (
        <FormSection
          title="Your Languages"
          description="Manage your language proficiencies"
        >
          <div className="space-y-2">
            {formData.languages.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border border-gray-200 rounded-md bg-gray-50"
              >
                <div className="flex items-center">
                  <FaGlobeAmericas className="text-indigo-500 mr-2" size={12} />
                  <div>
                    <div className="font-medium text-xs">{item.language}</div>
                    <div className="text-xs text-gray-500">
                      {item.proficiency}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={item.isVisible}
                      onChange={() => handleCheckboxChange(index)}
                      className="h-3 w-3 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-1 text-xs text-gray-600">Show</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none text-xs"
                    title="Remove language"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </FormSection>
      )}

      {/* Add new language form */}
      <EntryCard title="Add New Language">
        <FormSection>
          <FormGrid columns={2}>
            {/* Language name input */}
            <FormField
              label="Language"
              name="newLanguage"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="e.g. Spanish, French, German"
              icon={<FaGlobeAmericas className="text-gray-400" size={11} />}
            />

            {/* Proficiency select */}
            <div className="relative">
              <label
                htmlFor="newProficiency"
                className="block text-xs font-medium text-gray-700 mb-1 flex items-center"
              >
                Proficiency Level
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <FaCheck className="text-gray-400" size={11} />
                </div>
                <select
                  id="newProficiency"
                  value={newProficiency}
                  onChange={(e) => setNewProficiency(e.target.value)}
                  className="w-full pl-7 pr-2.5 py-1.5 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                >
                  {proficiencyLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </FormGrid>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleAddLanguage}
              className="inline-flex items-center px-3 py-1.5 text-xs bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
              disabled={!newLanguage.trim()}
            >
              <FaPlus className="mr-1" size={10} />
              Add Language
            </button>
          </div>
        </FormSection>
      </EntryCard>

      <FormFooter onSubmit={onSubmit} />
    </FormContainer>
  );
};

LanguagesForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default LanguagesForm;
