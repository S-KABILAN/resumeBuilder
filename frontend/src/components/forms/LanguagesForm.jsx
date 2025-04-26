import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaGlobeAmericas } from "react-icons/fa";
import {
  FormContainer,
  FormSection,
  FormFooter,
  EntryCard,
  FormField,
} from "./FormStyles";
import { Input, Select, Checkbox } from "./FormComponents";

const LanguagesForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
  const [newLanguage, setNewLanguage] = useState("");
  const [newProficiency, setNewProficiency] = useState("Intermediate");
  const [isVisible, setIsVisible] = useState(true);

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
      isVisible: isVisible,
    };

    const updatedLanguages = [...formData.languages, languageEntry];
    onFormChange("languages", updatedLanguages);

    // Reset the form
    setNewLanguage("");
    setNewProficiency("Intermediate");
    setIsVisible(true);
  };

  // Remove language
  const handleRemoveLanguage = (index) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index);
    onFormChange("languages", updatedLanguages);
  };

  return (
    <FormContainer title="Languages">
      {/* Current languages list */}
      {formData.languages && formData.languages.length > 0 ? (
        <FormSection
          title="Your Languages"
          description="Manage your language proficiencies"
        >
          <div className="space-y-2">
            {formData.languages.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <FaGlobeAmericas className="text-indigo-600" size={12} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">
                      {item.language}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                          item.proficiency === "Native" ||
                          item.proficiency === "Proficient"
                            ? "bg-green-100 text-green-800"
                            : item.proficiency === "Advanced"
                            ? "bg-blue-100 text-blue-800"
                            : item.proficiency === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.proficiency}
                      </span>
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
                    className="text-red-500 hover:text-red-700 focus:outline-none text-xs font-medium flex items-center"
                    title="Remove language"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 mr-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </FormSection>
      ) : (
        <div className="bg-blue-50 text-blue-800 p-4 mb-6 rounded-md border border-blue-100">
          <div className="flex items-center">
            <FaGlobeAmericas className="text-blue-500 mr-2" size={16} />
            <p className="text-sm font-medium">No languages added yet</p>
          </div>
          <p className="text-xs mt-1 ml-6">
            Add languages to enhance your resume and show your language
            proficiency.
          </p>
        </div>
      )}

      {/* Add new language form */}
      <EntryCard title="Add New Language">
        <FormSection>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Language"
              error={errors.language?.message}
              className="col-span-1"
            >
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="e.g. English, Spanish, etc."
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </FormField>

            <FormField label="Proficiency" className="col-span-1">
              <Select
                value={newProficiency}
                onChange={(e) => setNewProficiency(e.target.value)}
                className="w-full"
              >
                <option value="Native" className="text-green-700 font-medium">
                  Native
                </option>
                <option
                  value="Proficient"
                  className="text-blue-700 font-medium"
                >
                  Proficient
                </option>
                <option
                  value="Advanced"
                  className="text-purple-700 font-medium"
                >
                  Advanced
                </option>
                <option
                  value="Intermediate"
                  className="text-orange-700 font-medium"
                >
                  Intermediate
                </option>
              </Select>
            </FormField>
          </div>

          <div className="flex items-center mt-4">
            <Checkbox
              id="isVisible"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
            />
            <label
              htmlFor="isVisible"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Show on resume
            </label>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleAddLanguage}
              className="inline-flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newLanguage.trim()}
            >
              <FaPlus className="mr-2" size={12} />
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
  formData: PropTypes.shape({
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string,
        proficiency: PropTypes.string,
        isVisible: PropTypes.bool,
      })
    ),
  }).isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default LanguagesForm;
