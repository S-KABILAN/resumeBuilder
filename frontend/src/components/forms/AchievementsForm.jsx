import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaTrash, FaPlus } from "react-icons/fa";

const AchievementsForm = ({
  formData,
  onFormChange,
  onSubmit,
  errors = {},
}) => {
  // State to track which achievement entry is being edited
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize with default entries if none exist
  if (!formData.achievements || formData.achievements.length === 0) {
    const defaultAchievements = [
      {
        title: "Best Employee of the Year",
        issuer: "XYZ Corporation",
        date: "2022-05",
        description: "Recognized for exceptional performance and leadership.",
        isVisible: true,
      },
    ];

    onFormChange("achievements", defaultAchievements);
  }

  // Handler for input changes
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [name]: value,
    };

    onFormChange("achievements", updatedAchievements);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e, index) => {
    const { name, checked } = e.target;
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [name]: checked,
    };

    onFormChange("achievements", updatedAchievements);
  };

  // Add new achievement entry
  const handleAddAchievement = () => {
    const newAchievement = {
      title: "",
      issuer: "",
      date: "",
      description: "",
      isVisible: true,
    };

    const updatedAchievements = [...formData.achievements, newAchievement];
    onFormChange("achievements", updatedAchievements);
    setActiveIndex(updatedAchievements.length - 1);
  };

  // Remove achievement entry
  const handleRemoveAchievement = (index) => {
    if (formData.achievements.length <= 1) return;

    const updatedAchievements = formData.achievements.filter(
      (_, i) => i !== index
    );
    onFormChange("achievements", updatedAchievements);

    // Adjust active index if needed
    if (activeIndex >= updatedAchievements.length) {
      setActiveIndex(updatedAchievements.length - 1);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Achievements & Awards
      </h2>

      {/* Tab navigation for multiple achievement entries */}
      {formData.achievements && formData.achievements.length > 0 && (
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {formData.achievements.map((_, index) => (
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
            onClick={handleAddAchievement}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            title="Add Achievement"
          >
            <FaPlus />
          </button>
        </div>
      )}

      {/* Achievement Form Fields */}
      {formData.achievements &&
        formData.achievements.length > 0 &&
        formData.achievements[activeIndex] && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Achievement #{activeIndex + 1}
              </h3>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="isVisible"
                    checked={
                      formData.achievements[activeIndex].isVisible || false
                    }
                    onChange={(e) => handleCheckboxChange(e, activeIndex)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Show</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(activeIndex)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                  title="Remove achievement"
                  disabled={formData.achievements.length <= 1}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Achievement Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.achievements[activeIndex].title || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Employee of the Month, Excellence Award"
                />
              </div>

              {/* Issuer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  name="issuer"
                  value={formData.achievements[activeIndex].issuer || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ABC Company, IEEE"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Received
                </label>
                <input
                  type="month"
                  name="date"
                  value={formData.achievements[activeIndex].date || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.achievements[activeIndex].description || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what this achievement was for and its significance"
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">
                  Note: Only the description will be displayed in the resume
                  templates
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

AchievementsForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default AchievementsForm;
