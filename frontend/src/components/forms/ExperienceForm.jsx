const ExperienceForm = ({
  formData,
  onFormChange,
  addExperience,
  removeExperience,
  onSubmit,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Experience</h2>
      {formData.map((experience, index) => (
        <div key={index} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm">Job Title</label>
            <input
              type="text"
              value={experience.jobTitle}
              onChange={(e) =>
                onFormChange("experience", "jobTitle", e.target.value, index)
              }
              placeholder="Enter your job title"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Company Name</label>
            <input
              type="text"
              value={experience.companyName}
              onChange={(e) =>
                onFormChange("experience", "companyName", e.target.value, index)
              }
              placeholder="Enter your company name"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Years of Experience</label>
            <input
              type="number"
              value={experience.yearsOfExperience}
              onChange={(e) =>
                onFormChange(
                  "experience",
                  "yearsOfExperience",
                  e.target.value,
                  index
                )
              }
              placeholder="Enter number of years"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Description</label>
            <textarea
              value={experience.description}
              onChange={(e) =>
                onFormChange("experience", "description", e.target.value, index)
              }
              placeholder="Describe your role and responsibilities"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Remove button */}
          <button
            type="button"
            onClick={() => removeExperience(index)}
            className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md"
          >
            Remove Experience
          </button>
        </div>
      ))}

      {/* Add Experience button */}
      <button
        type="button"
        onClick={addExperience}
        className="mt-6 px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        Add Another Experience
      </button>

      <button
        type="button"
        onClick={onSubmit} // Trigger onSubmit when clicked
        className="mt-6 px-4 py-2 text-white bg-green-500 rounded-md"
      >
        Submit Experiences
      </button>
    </div>
  );
};

export default ExperienceForm;
