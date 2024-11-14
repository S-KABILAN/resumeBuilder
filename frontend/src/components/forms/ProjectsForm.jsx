import React from "react";
import { FaPlus, FaTrash, FaSave, FaProjectDiagram } from "react-icons/fa";

const ProjectsForm = ({
  formData,
  onFormChange,
  addProject,
  removeProject,
  onSubmit,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaProjectDiagram className="mr-2 text-blue-500" />
        Projects
      </h2>
      {formData.map((projectEntry, index) => (
        <div key={index} className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={projectEntry.title}
              onChange={(e) =>
                onFormChange("projects", "title", e.target.value, index)
              }
              placeholder="Enter project title"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={projectEntry.description}
              onChange={(e) =>
                onFormChange("projects", "description", e.target.value, index)
              }
              placeholder="Enter project description"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-24"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used
            </label>
            <input
              type="text"
              value={projectEntry.technologies}
              onChange={(e) =>
                onFormChange(
                  "projects",
                  "technologiesUsed",
                  e.target.value,
                  index
                )
              }
              placeholder="Enter technologies used (comma-separated)"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <button
            type="button"
            onClick={() => removeProject(index)}
            className="mt-2 px-4 py-2 text-sm text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition duration-200 flex items-center"
          >
            <FaTrash className="mr-2" />
            Remove Project
          </button>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={addProject}
          className="px-4 py-2 text-sm text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-200 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Another Project
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-200 flex items-center"
        >
          <FaSave className="mr-2" />
          Save Projects
        </button>
      </div>
    </div>
  );
};

export default ProjectsForm;
