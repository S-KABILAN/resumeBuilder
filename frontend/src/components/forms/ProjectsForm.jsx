import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaTrash, FaPlus } from "react-icons/fa";

const ProjectsForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
  // State to track which project entry is being edited
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize with default entries if none exist
  if (!formData.projects || formData.projects.length === 0) {
    const defaultProjects = [
      {
        title: "Portfolio Website",
        role: "Developer",
        startDate: "2022-01",
        endDate: "2022-03",
        description:
          "Created a responsive portfolio website using React and Tailwind CSS.",
        technologiesUsed: "React, Tailwind CSS, JavaScript",
        url: "https://example.com",
        isVisible: true,
      },
    ];

    onFormChange("projects", defaultProjects);
  }

  // Handler for input changes
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };

    onFormChange("projects", updatedProjects);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e, index) => {
    const { name, checked } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: checked };

    onFormChange("projects", updatedProjects);
  };

  // Add new project entry
  const handleAddProject = () => {
    const newProject = {
      title: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      technologiesUsed: "",
      url: "",
      isVisible: true,
    };

    const updatedProjects = [...formData.projects, newProject];
    onFormChange("projects", updatedProjects);
    setActiveIndex(updatedProjects.length - 1);
  };

  // Remove project entry
  const handleRemoveProject = (index) => {
    if (formData.projects.length <= 1) return;

    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    onFormChange("projects", updatedProjects);

    // Adjust active index if needed
    if (activeIndex >= updatedProjects.length) {
      setActiveIndex(updatedProjects.length - 1);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>

      {/* Tab navigation for multiple project entries */}
      {formData.projects && formData.projects.length > 0 && (
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {formData.projects.map((_, index) => (
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
            onClick={handleAddProject}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            title="Add Project"
          >
            <FaPlus />
          </button>
        </div>
      )}

      {/* Project Form Fields */}
      {formData.projects &&
        formData.projects.length > 0 &&
        formData.projects[activeIndex] && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Project #{activeIndex + 1}
              </h3>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="isVisible"
                    checked={formData.projects[activeIndex].isVisible || false}
                    onChange={(e) => handleCheckboxChange(e, activeIndex)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Show</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveProject(activeIndex)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                  title="Remove project"
                  disabled={formData.projects.length <= 1}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.projects[activeIndex].title || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., E-commerce Website, Mobile App"
                />
              </div>

              {/* Your Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.projects[activeIndex].role || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Developer, Team Lead, Designer"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  name="startDate"
                  value={formData.projects[activeIndex].startDate || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  name="endDate"
                  value={formData.projects[activeIndex].endDate || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project URL
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.projects[activeIndex].url || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>

              {/* Technologies Used */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies Used
                </label>
                <input
                  type="text"
                  name="technologiesUsed"
                  value={formData.projects[activeIndex].technologiesUsed || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.projects[activeIndex].description || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the project, its objectives, and your contributions"
                ></textarea>
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

ProjectsForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default ProjectsForm;
