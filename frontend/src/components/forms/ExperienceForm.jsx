import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaTrash, FaPlus } from "react-icons/fa";

const ExperienceForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
  // State to track which experience entry is being edited
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize with default entries if none exist
  if (!formData.experience || formData.experience.length === 0) {
    const defaultExperiences = [
      {
        company: "XYZ Tech Solutions",
        position: "Software Engineer",
        location: "San Francisco, CA",
        startDate: "2022-06",
        endDate: "",
        isCurrentlyWorking: true,
        description:
          "• Developed and maintained full-stack web applications using React, Node.js, and MongoDB\n• Collaborated with cross-functional teams to deliver features on time and within scope\n• Implemented automated testing procedures that improved code quality by 30%\n• Participated in code reviews and mentored junior developers",
        isVisible: true,
      },
      {
        company: "ABC Digital Agency",
        position: "Frontend Developer",
        location: "New York, NY",
        startDate: "2020-03",
        endDate: "2022-05",
        isCurrentlyWorking: false,
        description:
          "• Built responsive websites and applications for various clients using React, HTML, CSS, and JavaScript\n• Optimized website performance resulting in 40% faster load times\n• Implemented UI/UX designs according to client specifications\n• Worked with backend developers to integrate frontend with REST APIs",
        isVisible: true,
      },
    ];

    onFormChange("experience", defaultExperiences);
  }

  // Handler for input changes
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: value };

    onFormChange("experience", updatedExperience);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e, index) => {
    const { name, checked } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: checked };

    // If currently working is checked, clear the end date
    if (name === "isCurrentlyWorking" && checked) {
      updatedExperience[index].endDate = "";
    }

    onFormChange("experience", updatedExperience);
  };

  // Add new experience entry
  const handleAddExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrentlyWorking: false,
      description: "",
      isVisible: true,
    };

    const updatedExperience = [...formData.experience, newExperience];
    onFormChange("experience", updatedExperience);
    setActiveIndex(updatedExperience.length - 1);
  };

  // Remove experience entry
  const handleRemoveExperience = (index) => {
    if (formData.experience.length <= 1) return;

    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    onFormChange("experience", updatedExperience);

    // Adjust active index if needed
    if (activeIndex >= updatedExperience.length) {
      setActiveIndex(updatedExperience.length - 1);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Work Experience
      </h2>

      {/* Tab navigation for multiple experience entries */}
      {formData.experience && formData.experience.length > 0 && (
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {formData.experience.map((_, index) => (
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
            onClick={handleAddExperience}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            title="Add Experience"
          >
            <FaPlus />
          </button>
        </div>
      )}

      {/* Experience Form Fields */}
      {formData.experience &&
        formData.experience.length > 0 &&
        formData.experience[activeIndex] && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Experience #{activeIndex + 1}
              </h3>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="isVisible"
                    checked={
                      formData.experience[activeIndex].isVisible || false
                    }
                    onChange={(e) => handleCheckboxChange(e, activeIndex)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Show</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(activeIndex)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                  title="Remove experience"
                  disabled={formData.experience.length <= 1}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.experience[activeIndex].company || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company or Organization Name"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.experience[activeIndex].position || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Job Title or Role"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.experience[activeIndex].location || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, Country"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="month"
                  name="startDate"
                  value={formData.experience[activeIndex].startDate || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* End Date / Currently Working */}
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="isCurrentlyWorking"
                      checked={
                        formData.experience[activeIndex].isCurrentlyWorking ||
                        false
                      }
                      onChange={(e) => handleCheckboxChange(e, activeIndex)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Currently Working
                    </span>
                  </label>
                </div>
                <input
                  type="month"
                  name="endDate"
                  value={formData.experience[activeIndex].endDate || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  disabled={formData.experience[activeIndex].isCurrentlyWorking}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formData.experience[activeIndex].isCurrentlyWorking
                      ? "bg-gray-100"
                      : ""
                  }`}
                />
              </div>

              {/* Description */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.experience[activeIndex].description || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Describe your responsibilities, achievements, and contributions."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Tip: Use bullet points by starting lines with • or - for
                  better formatting on your resume
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

ExperienceForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default ExperienceForm;
