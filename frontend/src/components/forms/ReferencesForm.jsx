const ReferencesForm = ({ formData, onFormChange }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">References</h2>
      <form className="space-y-4 mt-4">
        {formData.references.map((reference, idx) => (
          <div key={idx}>
            <div>
              <label className="block text-sm">Name</label>
              <input
                type="text"
                value={reference.name}
                onChange={(e) =>
                  onFormChange("references", idx, "name", e.target.value)
                }
                placeholder="Enter reference name"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm">Relationship</label>
              <input
                type="text"
                value={reference.relationship}
                onChange={(e) =>
                  onFormChange(
                    "references",
                    idx,
                    "relationship",
                    e.target.value
                  )
                }
                placeholder="Enter relationship"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm">Contact</label>
              <input
                type="text"
                value={reference.contact}
                onChange={(e) =>
                  onFormChange("references", idx, "contact", e.target.value)
                }
                placeholder="Enter contact information"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};


export default ReferencesForm