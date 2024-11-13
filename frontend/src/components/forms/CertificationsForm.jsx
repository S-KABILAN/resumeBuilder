const CertificationsForm = ({
  formData,
  onFormChange,
  addCertification,
  removeCertification,
  onSubmit,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Certifications</h2>
      {formData.map((certificationEntry, index) => (
        <div key={index} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm">Certification Name</label>
            <input
              type="text"
              value={certificationEntry.certificationName}
              onChange={(e) =>
                onFormChange(
                  "certifications",
                  "certificationName",
                  e.target.value,
                  index
                )
              }
              placeholder="Enter certification name"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Issuing Organization</label>
            <input
              type="text"
              value={certificationEntry.issuingOrganization}
              onChange={(e) =>
                onFormChange(
                  "certifications",
                  "issuingOrganization",
                  e.target.value,
                  index
                )
              }
              placeholder="Enter issuing organization"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Date Obtained</label>
            <input
              type="date"
              value={certificationEntry.dateObtained}
              onChange={(e) =>
                onFormChange(
                  "certifications",
                  "dateObtained",
                  e.target.value,
                  index
                )
              }
              placeholder="Enter the date obtained"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Certification ID</label>
            <input
              type="text"
              value={certificationEntry.certificationId}
              onChange={(e) =>
                onFormChange(
                  "certifications",
                  "certificationId",
                  e.target.value,
                  index
                )
              }
              placeholder="Enter certification ID"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Remove Certification button */}
          <button
            type="button"
            onClick={() => removeCertification(index)}
            className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md"
          >
            Remove Certification
          </button>
        </div>
      ))}

      {/* Add Certification button */}
      <button
        type="button"
        onClick={addCertification}
        className="mt-6 px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        Add Another Certification
      </button>
      <button
        type="button"
        onClick={onSubmit} // Trigger onSubmit when clicked
        className="mt-6 px-4 py-2 text-white bg-green-500 rounded-md"
      >
        Submit Certifications
      </button>
    </div>
  );
};

export default CertificationsForm;
