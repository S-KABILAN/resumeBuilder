import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaCertificate,
  FaBuilding,
  FaCalendarAlt,
  FaIdCard,
  FaTrash,
  FaPlus,
  FaGripLines,
} from "react-icons/fa";

const InputField = ({
  icon: Icon,
  label,
  type,
  value,
  onChange,
  placeholder,
  isRequired = false,
  error = null,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full pl-10 pr-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  </div>
);

const CertificationsForm = ({
  formData,
  onFormChange,
  onSubmit,
  errors = {},
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize with default entries if none exist
  if (!formData.certifications || formData.certifications.length === 0) {
    const defaultCertifications = [
      {
        certificationName: "AWS Certified Solutions Architect",
        issuingOrganization: "Amazon Web Services",
        dateObtained: "2023-05",
        certificationId: "AWS-12345",
        isVisible: true,
      },
    ];

    onFormChange("certifications", defaultCertifications);
  }

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[activeIndex] = {
      ...updatedCertifications[activeIndex],
      [name]: value,
    };

    onFormChange("certifications", updatedCertifications);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = () => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[activeIndex] = {
      ...updatedCertifications[activeIndex],
      isVisible: !updatedCertifications[activeIndex].isVisible,
    };

    onFormChange("certifications", updatedCertifications);
  };

  // Add new certification
  const handleAddCertification = () => {
    const newCertification = {
      certificationName: "",
      issuingOrganization: "",
      dateObtained: "",
      certificationId: "",
      isVisible: true,
    };

    const updatedCertifications = [
      ...formData.certifications,
      newCertification,
    ];
    onFormChange("certifications", updatedCertifications);
    setActiveIndex(updatedCertifications.length - 1);
  };

  // Remove certification
  const handleRemoveCertification = (index) => {
    if (formData.certifications.length <= 1) return;

    const updatedCertifications = formData.certifications.filter(
      (_, i) => i !== index
    );
    onFormChange("certifications", updatedCertifications);

    // Adjust active index if needed
    if (activeIndex >= updatedCertifications.length) {
      setActiveIndex(updatedCertifications.length - 1);
    }
  };

  // Get field error
  const getFieldError = (field) => {
    return errors[field] ? errors[field].message : "";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Certifications
      </h2>

      {/* Tab navigation for multiple certification entries */}
      {formData.certifications && formData.certifications.length > 0 && (
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {formData.certifications.map((_, index) => (
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
            onClick={handleAddCertification}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            title="Add Certification"
          >
            <FaPlus />
          </button>
        </div>
      )}

      {/* Certification Form Fields */}
      {formData.certifications &&
        formData.certifications.length > 0 &&
        formData.certifications[activeIndex] && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Certification #{activeIndex + 1}
              </h3>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      formData.certifications[activeIndex].isVisible || false
                    }
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Show</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveCertification(activeIndex)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                  title="Remove certification"
                  disabled={formData.certifications.length <= 1}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Certification Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification Name
                </label>
                <input
                  type="text"
                  name="certificationName"
                  value={
                    formData.certifications[activeIndex].certificationName || ""
                  }
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    getFieldError("certificationName")
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
                {getFieldError("certificationName") && (
                  <p className="mt-1 text-sm text-red-500">
                    {getFieldError("certificationName")}
                  </p>
                )}
              </div>

              {/* Issuing Organization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  name="issuingOrganization"
                  value={
                    formData.certifications[activeIndex].issuingOrganization ||
                    ""
                  }
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Amazon Web Services"
                />
              </div>

              {/* Issue Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Obtained
                </label>
                <input
                  type="month"
                  name="dateObtained"
                  value={
                    formData.certifications[activeIndex].dateObtained || ""
                  }
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Certification ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification ID
                </label>
                <input
                  type="text"
                  name="certificationId"
                  value={
                    formData.certifications[activeIndex].certificationId || ""
                  }
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., AWS-12345"
                />
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

CertificationsForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default CertificationsForm;
