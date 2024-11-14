import React from "react";
import {
  FaCertificate,
  FaBuilding,
  FaCalendarAlt,
  FaIdCard,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const InputField = ({
  icon: Icon,
  label,
  type,
  value,
  onChange,
  placeholder,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
      />
    </div>
  </div>
);

const CertificationsForm = ({
  formData,
  onFormChange,
  addCertification,
  removeCertification,
  onSubmit,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications</h2>
      {formData.map((certificationEntry, index) => (
        <div key={index} className="mb-8 p-4 bg-gray-50 rounded-lg">
          <InputField
            icon={FaCertificate}
            label="Certification Name"
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
          />

          <InputField
            icon={FaBuilding}
            label="Issuing Organization"
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
          />

          <InputField
            icon={FaCalendarAlt}
            label="Date Obtained"
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
          />

          <InputField
            icon={FaIdCard}
            label="Certification ID"
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
          />

          <button
            type="button"
            onClick={() => removeCertification(index)}
            className="mt-2 flex items-center text-sm text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
          >
            <FaTrash className="mr-2" />
            Remove Certification
          </button>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={addCertification}
          className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          <FaPlus className="mr-2" />
          Add Another Certification
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Save Certifications
        </button>
      </div>
    </div>
  );
};

export default CertificationsForm;
