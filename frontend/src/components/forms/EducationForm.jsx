const EducationForm = ({
  formData,
  onFormChange,
  addEducation,
  removeEducation,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Education</h2>
      {formData.map((education, index) => (
        <div key={index} className="space-y-4 mt-4 border-b pb-4">
          <div>
            <label className="block text-sm">Degree</label>
            <input
              type="text"
              value={education.degree}
              onChange={(e) =>
                onFormChange("education", "degree", e.target.value, index)
              }
              placeholder="Enter your degree"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Institution</label>
            <input
              type="text"
              value={education.institution}
              onChange={(e) =>
                onFormChange("education", "institution", e.target.value, index)
              }
              placeholder="Enter your institution name"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Graduation Year</label>
            <input
              type="number"
              value={education.graduationYear}
              onChange={(e) =>
                onFormChange(
                  "education",
                  "graduationYear",
                  e.target.value,
                  index
                )
              }
              placeholder="Enter your graduation year"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {formData.length > 1 && (
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Another Education
      </button>
    </div>
  );
};

export default EducationForm;
