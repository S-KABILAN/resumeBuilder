import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaCertificate,
  FaBuilding,
  FaCalendarAlt,
  FaIdCard,
  FaLink,
  FaPlus,
} from "react-icons/fa";
import {
  FormContainer,
  FormSection,
  FormGrid,
  FormField,
  FormTextArea,
  EntryTabs,
  EntryCard,
  FormFooter,
} from "./FormStyles";

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
        url: "https://aws.amazon.com/certification/",
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
  const handleVisibilityChange = (e) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[activeIndex] = {
      ...updatedCertifications[activeIndex],
      isVisible: e.target.checked,
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
      url: "",
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
  const handleRemoveCertification = () => {
    if (formData.certifications.length <= 1) return;

    const updatedCertifications = formData.certifications.filter(
      (_, i) => i !== activeIndex
    );
    onFormChange("certifications", updatedCertifications);

    // Adjust active index if needed
    if (activeIndex >= updatedCertifications.length) {
      setActiveIndex(updatedCertifications.length - 1);
    }
  };

  // Get field error
  const getFieldError = (field) => {
    return (
      errors.certifications &&
      errors.certifications[activeIndex] &&
      errors.certifications[activeIndex][field]
    );
  };

  return (
    <FormContainer title="Certifications">
      {formData.certifications && formData.certifications.length > 0 && (
        <>
          <EntryTabs
            entries={formData.certifications}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onAdd={handleAddCertification}
            addButtonLabel="Add Certification"
            disableRemove={formData.certifications.length <= 1}
          />

          {formData.certifications[activeIndex] && (
            <EntryCard
              title={`Certification ${activeIndex + 1}`}
              onRemove={handleRemoveCertification}
              disableRemove={formData.certifications.length <= 1}
              isVisible={formData.certifications[activeIndex].isVisible}
              onVisibilityChange={handleVisibilityChange}
            >
              <FormGrid>
                <FormField
                  label="Certification Name"
                  name="certificationName"
                  value={
                    formData.certifications[activeIndex].certificationName || ""
                  }
                  onChange={handleChange}
                  placeholder="e.g., AWS Certified Solutions Architect"
                  error={getFieldError("certificationName")}
                  icon={<FaCertificate size={12} className="text-gray-400" />}
                  required
                />

                <FormField
                  label="Issuing Organization"
                  name="issuingOrganization"
                  value={
                    formData.certifications[activeIndex].issuingOrganization ||
                    ""
                  }
                  onChange={handleChange}
                  placeholder="e.g., Amazon Web Services"
                  error={getFieldError("issuingOrganization")}
                  icon={<FaBuilding size={12} className="text-gray-400" />}
                />
              </FormGrid>

              <FormGrid>
                <FormField
                  label="Date Obtained"
                  name="dateObtained"
                  type="month"
                  value={
                    formData.certifications[activeIndex].dateObtained || ""
                  }
                  onChange={handleChange}
                  error={getFieldError("dateObtained")}
                  icon={<FaCalendarAlt size={12} className="text-gray-400" />}
                />

                <FormField
                  label="Certification ID"
                  name="certificationId"
                  value={
                    formData.certifications[activeIndex].certificationId || ""
                  }
                  onChange={handleChange}
                  placeholder="e.g., AWS-12345"
                  error={getFieldError("certificationId")}
                  icon={<FaIdCard size={12} className="text-gray-400" />}
                />
              </FormGrid>

              <FormField
                label="URL"
                name="url"
                type="url"
                value={formData.certifications[activeIndex].url || ""}
                onChange={handleChange}
                placeholder="https://example.com/certification"
                error={getFieldError("url")}
                icon={<FaLink size={12} className="text-gray-400" />}
              />

              <FormTextArea
                label="Description (optional)"
                name="description"
                value={formData.certifications[activeIndex].description || ""}
                onChange={handleChange}
                rows={2}
                placeholder="Describe what this certification covers and why it's relevant"
                error={getFieldError("description")}
              />
            </EntryCard>
          )}
        </>
      )}

      <FormFooter onSubmit={onSubmit} />
    </FormContainer>
  );
};

CertificationsForm.propTypes = {
  formData: PropTypes.shape({
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        certificationName: PropTypes.string,
        issuingOrganization: PropTypes.string,
        dateObtained: PropTypes.string,
        certificationId: PropTypes.string,
        url: PropTypes.string,
        description: PropTypes.string,
        isVisible: PropTypes.bool,
      })
    ),
  }).isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default CertificationsForm;
