const LanguagesForm = ({ formData, onFormChange }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Languages</h2>
      <form className="space-y-4 mt-4">
        {formData.languages.map((language, idx) => (
          <div key={idx}>
            <div>
              <label className="block text-sm">Language</label>
              <input
                type="text"
                value={language.name}
                onChange={(e) =>
                  onFormChange("languages", idx, "name", e.target.value)
                }
                placeholder="Enter language name"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm">Proficiency</label>
              <input
                type="text"
                value={language.proficiency}
                onChange={(e) =>
                  onFormChange("languages", idx, "proficiency", e.target.value)
                }
                placeholder="Enter proficiency level"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};
