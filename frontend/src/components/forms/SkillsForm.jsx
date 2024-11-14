const SkillsForm = ({
  formData,
  onFormChange,
  addSkill,
  removeSkill,
  onSubmit,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Skills</h2>
      {formData.map((skillEntry, index) => (
        <div key={index} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm">Skill Type</label>
            <input
              type="text"
              value={skillEntry.skill}
              onChange={(e) =>
                onFormChange("skills", "skillType", e.target.value, index)
              }
              placeholder="Enter your skill"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Skill Name</label>
            <input
              type="text"
              value={skillEntry.skillLevel}
              onChange={(e) =>
                onFormChange("skills", "skillName", e.target.value, index)
              }
              placeholder="Enter your skill level (e.g., Beginner, Intermediate, Advanced)"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Remove Skill button */}
          <button
            type="button"
            onClick={() => removeSkill(index)}
            className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md"
          >
            Remove Skill
          </button>
        </div>
      ))}

      {/* Add Skill button */}
      <button
        type="button"
        onClick={addSkill}
        className="mt-6 px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        Add Another Skill
      </button>

      <button
        type="button"
        onClick={onSubmit} // Trigger onSubmit when clicked
        className="mt-6 px-4 py-2 text-white bg-green-500 rounded-md"
      >
        Submit Skills
      </button>
    </div>
  );
};

export default SkillsForm;
