import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaGlobeAmericas, FaTimes } from "react-icons/fa";
import {
  FormContainer,
  FormSection,
  FormFooter,
  EntryCard,
} from "./FormStyles";
import { Checkbox } from "./FormComponents";

const LanguagesForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
  const [newLanguage, setNewLanguage] = useState("");
  const [newProficiency, setNewProficiency] = useState("Intermediate");
  const [isVisible, setIsVisible] = useState(true);

  // Log initial form data for debugging
  console.log("LanguagesForm rendered with formData:", formData);

  // Initialize with default entries if none exist
  if (!formData.languages || formData.languages.length === 0) {
    const defaultLanguages = [
      {
        language: "English",
        proficiency: "Native",
        isVisible: true,
      },
    ];

    console.log("Initializing with default languages:", defaultLanguages);
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

    // Get the selected proficiency value
    const proficiency = newProficiency || "Intermediate";

    console.log("Adding new language with proficiency:", proficiency);

    // Add the new language directly to the formData
    const languageEntry = {
      language: newLanguage,
      proficiency: proficiency,
      isVisible: isVisible,
    };

    console.log("New language entry:", languageEntry);

    const updatedLanguages = [...(formData.languages || []), languageEntry];

    // First update the form data
    onFormChange("languages", updatedLanguages);

    // Only reset the form after the data has been updated
    setTimeout(() => {
      setNewLanguage("");
      setNewProficiency("Intermediate"); // Reset to default
      setIsVisible(true);
      console.log("Form reset complete");
    }, 100);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { value } = e.target;
    console.log("Input changing:", value);
    setNewLanguage(value);
  };

  // Handle key press for input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newLanguage.trim()) {
        handleAddLanguage();
      }
    }
  };

  // Remove language
  const handleRemoveLanguage = (index) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index);
    onFormChange("languages", updatedLanguages);
  };

  // Get a color class for proficiency level badges
  const getProficiencyColorClass = (proficiency) => {
    switch (proficiency) {
      case "Native":
        return "bg-green-100 text-green-800";
      case "Proficient":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-indigo-100 text-indigo-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Elementary":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <FormContainer title="Languages">
      {/* Current languages list */}
      {formData.languages && formData.languages.length > 0 ? (
        <FormSection
          title="Your Languages"
          description="Manage your language proficiencies"
        >
          <div className="space-y-3">
            {formData.languages.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <FaGlobeAmericas className="text-indigo-600" size={14} />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-800">
                      {item.language}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs ${getProficiencyColorClass(
                          item.proficiency
                        )}`}
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
                      className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-1 text-xs text-gray-600">Show</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none text-xs font-medium flex items-center"
                    title="Remove language"
                  >
                    <FaTimes className="mr-1" size={12} />
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddLanguage();
            }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Language
                </label>
                <input
                  type="text"
                  value={newLanguage}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder="e.g. English, Spanish, etc."
                  className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  autoComplete="off"
                />
                {errors.language?.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.language.message}
                  </p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Proficiency
                </label>
                <select
                  value={newProficiency}
                  onChange={(e) => {
                    console.log("Direct select change:", e.target.value);
                    setNewProficiency(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  name="proficiency"
                >
                  <option value="Native">Native</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Elementary">Elementary</option>
                </select>
                {/* Debug display */}
                <div className="text-xs text-gray-500 mt-1">
                  Current selection: {newProficiency}
                </div>
              </div>
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

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newLanguage.trim()}
              >
                <FaPlus className="mr-2" size={12} />
                Add Language
              </button>
            </div>
          </form>
        </FormSection>
      </EntryCard>

      <FormFooter onSubmit={onSubmit} />

      {/* Debug section */}
      <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
        <details>
          <summary className="cursor-pointer">Debug Info</summary>
          <div className="mt-2">
            <p>Current proficiency state: {newProficiency}</p>
            <p className="mt-1">Languages in formData:</p>
            <pre className="mt-1 bg-gray-200 p-1 rounded overflow-auto">
              {JSON.stringify(formData.languages, null, 2)}
            </pre>
          </div>
        </details>
      </div>
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
