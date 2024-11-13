const ProjectsForm = ({
  formData,
  onFormChange,
  addProject,
  removeProject,
  onSubmit,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Projects</h2>
      {formData.map((projectEntry, index) => (
        <div key={index} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm">Project Title</label>
            <input
              type="text"
              value={projectEntry.title}
              onChange={(e) =>
                onFormChange("projects", "title", e.target.value, index)
              }
              placeholder="Enter project title"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Description</label>
            <textarea
              value={projectEntry.description}
              onChange={(e) =>
                onFormChange("projects", "description", e.target.value, index)
              }
              placeholder="Enter project description"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Technologies Used</label>
            <input
              type="text"
              value={projectEntry.technologies}
              onChange={(e) =>
                onFormChange("projects", "technologies", e.target.value, index)
              }
              placeholder="Enter technologies used"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Remove Project button */}
          <button
            type="button"
            onClick={() => removeProject(index)}
            className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md"
          >
            Remove Project
          </button>
        </div>
      ))}

      {/* Add Project button */}
      <button
        type="button"
        onClick={addProject}
        className="mt-6 px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        Add Another Project
      </button>

      <button
        type="button"
        onClick={onSubmit} // Trigger onSubmit when clicked
        className="mt-6 px-4 py-2 text-white bg-green-500 rounded-md"
      >
        Submit Projects
      </button>
    </div>
  );
};

export default ProjectsForm;
