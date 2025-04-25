import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaGraduationCap, FaCalendarAlt, FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
import {
  FormContainer,
  FormSection,
  FormGrid,
  FormField,
  FormTextArea,
  FormCheckbox,
  EntryTabs,
  EntryCard,
  FormFooter
} from "./FormStyles";

const EducationForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
  // State to track which education entry is being edited
  const [activeIndex, setActiveIndex] = useState(0);

  // Get error for a specific field
  const getFieldError = (field, index = activeIndex) => {
    const errorKey = `education[${index}].${field}`;
    return errors[errorKey] || "";
  };

  // Effect to separate combined degree and field of study if needed
  useEffect(() => {
    if (formData.education && formData.education.length > 0) {
      const currentEntry = formData.education[activeIndex];

      // Check if degree contains comma, "in", or "-" and field of study is empty
      if (
        currentEntry.degree &&
        (!currentEntry.fieldOfStudy || currentEntry.fieldOfStudy.trim() === "")
      ) {
        let degree = currentEntry.degree;
        let fieldOfStudy = "";

        // Case 1: Contains comma (B.Tech, Computer Science)
        if (currentEntry.degree.includes(",")) {
          [degree, fieldOfStudy] = currentEntry.degree
            .split(",", 2)
            .map((part) => part.trim());
        }
        // Case 2: Contains "in" (Bachelor of Science in Computer Science)
        else if (currentEntry.degree.toLowerCase().includes(" in ")) {
          [degree, fieldOfStudy] = currentEntry.degree
            .split(/\s+in\s+/i, 2)
            .map((part) => part.trim());
        }
        // Case 3: Contains hyphen with spaces (B.Tech - Computer Science)
        else if (currentEntry.degree.includes(" - ")) {
          [degree, fieldOfStudy] = currentEntry.degree
            .split(" - ", 2)
            .map((part) => part.trim());
        }

        if (degree && fieldOfStudy) {
          // Create updated education with separated values
          const updatedEducation = [...formData.education];
          updatedEducation[activeIndex] = {
            ...updatedEducation[activeIndex],
            degree: degree,
            fieldOfStudy: fieldOfStudy,
          };

          // Update the form data
          onFormChange("education", updatedEducation);
        }
      }
    }
  }, [activeIndex, formData.education, onFormChange]);

  // Initialize with a default entry if none exists
  if (!formData.education || formData.education.length === 0) {
    const defaultEducation = [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        location: "San Francisco, CA",
        startDate: "2018-09",
        endDate: "2022-05",
        graduationYear: "2022",
        gpa: "3.8/4.0",
        description:
          "Graduated with honors. Participated in the Computer Science Club.",
        isVisible: true,
        useYearOnly: false,
        isCurrentlyStudying: false,
      },
    ];

    onFormChange("education", defaultEducation);
  }

  // Ensure GPA values are properly formatted
  useEffect(() => {
    if (formData.education && formData.education.length > 0) {
      const currentEducation = formData.education[activeIndex];
      if (
        currentEducation.gpa &&
        !currentEducation.gpa.includes("/") &&
        !currentEducation.gpa.includes("%")
      ) {
        const formattedGPA = formatGPAValue(currentEducation.gpa);
        if (formattedGPA !== currentEducation.gpa) {
          const updatedEducation = [...formData.education];
          updatedEducation[activeIndex] = {
            ...updatedEducation[activeIndex],
            gpa: formattedGPA,
          };
          onFormChange("education", updatedEducation);
        }
      }
    }
  }, [activeIndex, formData.education]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handler for input changes
  const handleChange = (e, index = activeIndex) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];

    // Special handling for degree input to detect if it contains degree and field of study
    if (name === "degree" && value.includes(",") && !e.target.manuallyEntered) {
      const [degree, fieldOfStudy] = value
        .split(",")
        .map((part) => part.trim());
      if (degree && fieldOfStudy) {
        updatedEducation[index] = {
          ...updatedEducation[index],
          degree: degree,
          fieldOfStudy: fieldOfStudy || updatedEducation[index].fieldOfStudy,
        };
      } else {
        updatedEducation[index] = { ...updatedEducation[index], [name]: value };
      }
    } else {
      updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    }

    // If changing end date, update graduation year accordingly
    if (name === "endDate" && value) {
      const yearFromEndDate = value.split("-")[0];
      if (yearFromEndDate) {
        updatedEducation[index].graduationYear = yearFromEndDate;
      }
    }

    // If changing graduation year manually, and using year only mode, we might want to sync with end date
    if (
      name === "graduationYear" &&
      updatedEducation[index].useYearOnly &&
      value
    ) {
      // Create an end date with May of the graduation year (typical graduation month)
      if (value.length === 4 && !isNaN(parseInt(value))) {
        updatedEducation[index].endDate = `${value}-05`;
      }
    }

    onFormChange("education", updatedEducation);
  };

  // Handle percentage/GPA format standardization
  const formatGPAValue = (value) => {
    if (!value) return "";

    // If value is not a string, convert it
    const strValue = String(value).trim();

    // If it's already in a proper format, return as is
    if (strValue.includes("/") || strValue.includes("%")) return strValue;

    // If it's a number, determine if it's a GPA or percentage
    const numValue = parseFloat(strValue);
    if (!isNaN(numValue)) {
      // Handle Indian percentage format (could be around 80-95%)
      if (numValue > 10 && numValue <= 100) {
        return `${numValue}%`;
      }
      // Handle GPA in 10-point scale (common in many countries)
      else if (numValue <= 10) {
        return `${numValue}/10`;
      }
      // Handle GPA in 4-point scale (US system)
      else if (numValue <= 4) {
        return `${numValue}/4.0`;
      }
      // Default to percentage for other numbers
      else {
        return `${numValue}%`;
      }
    }

    return strValue;
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e, index = activeIndex) => {
    const { name, checked } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [name]: checked };

    // If changing to Year Only format, set the graduation year from the end date if available
    if (name === "useYearOnly" && checked) {
      if (updatedEducation[index].endDate) {
        const endDateParts = updatedEducation[index].endDate.split("-");
        if (endDateParts.length > 0) {
          updatedEducation[index].graduationYear = endDateParts[0];
        }
      }
    }

    // Special handling for isCurrentlyStudying checkbox
    if (name === "isCurrentlyStudying") {
      if (checked) {
        // If checked, clear the end date
        updatedEducation[index].endDate = "";
      }
    }

    onFormChange("education", updatedEducation);
  };

  // Add new education entry
  const handleAddEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      graduationYear: "",
      gpa: "",
      description: "",
      isVisible: true,
      useYearOnly: false,
      isCurrentlyStudying: false,
    };

    const updatedEducation = [...formData.education, newEducation];
    onFormChange("education", updatedEducation);

    // Select the newly added entry
    setActiveIndex(updatedEducation.length - 1);
  };

  // Format all GPA values
  const formatAllGPAValues = () => {
    if (formData.education && formData.education.length > 0) {
      const updatedEducation = formData.education.map((edu) => {
        if (edu.gpa) {
          return {
            ...edu,
            gpa: formatGPAValue(edu.gpa),
          };
        }
        return edu;
      });

      if (
        JSON.stringify(updatedEducation) !== JSON.stringify(formData.education)
      ) {
        onFormChange("education", updatedEducation);
      }
    }
  };

  // Remove an education entry
  const handleRemoveEducation = (index) => {
    if (formData.education.length <= 1) return;

    const updatedEducation = formData.education.filter((_, i) => i !== index);
    onFormChange("education", updatedEducation);

    // Adjust active index if needed
    if (activeIndex >= updatedEducation.length) {
      setActiveIndex(updatedEducation.length - 1);
    }
  };

  // Clear current entry fields
  const clearCurrentEntry = () => {
    if (!formData.education || !formData.education[activeIndex]) return;

    const updatedEducation = [...formData.education];
    updatedEducation[activeIndex] = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      graduationYear: "",
      gpa: "",
      description: "",
      isVisible: updatedEducation[activeIndex].isVisible,
      useYearOnly: false,
      isCurrentlyStudying: false,
    };

    onFormChange("education", updatedEducation);
  };

  // Current education entry
  const currentEducation = formData.education?.[activeIndex] || {};

  return (
    <FormContainer title="Education">
      {formData.education && formData.education.length > 0 && (
        <EntryTabs
          entries={formData.education}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onAdd={handleAddEducation}
          onRemove={() => handleRemoveEducation(activeIndex)}
          addButtonLabel="Add Education"
          addButtonIcon={<FaPlus size={10} />}
        />
      )}

      {formData.education && formData.education.length > 0 && (
        <EntryCard
          title={`Education #${activeIndex + 1}`}
          onRemove={() => handleRemoveEducation(activeIndex)}
          disableRemove={formData.education.length <= 1}
          isVisible={currentEducation.isVisible}
          onVisibilityChange={(e) =>
            handleCheckboxChange({
              target: { name: "isVisible", checked: e.target.checked },
            })
          }
        >
          <FormSection>
            <FormGrid columns={2}>
              {/* Institution/School */}
              <FormField
                label="Institution/School"
                name="institution"
                value={currentEducation.institution || ""}
                onChange={(e) => handleChange(e)}
                placeholder="e.g. Harvard University"
                error={getFieldError("institution")}
                icon={<FaUniversity className="text-gray-400" size={11} />}
              />

              {/* Location */}
              <FormField
                label="Location"
                name="location"
                value={currentEducation.location || ""}
                onChange={(e) => handleChange(e)}
                placeholder="e.g. Cambridge, MA"
                error={getFieldError("location")}
                icon={<FaMapMarkerAlt className="text-gray-400" size={11} />}
              />
            </FormGrid>

            <FormGrid columns={2}>
              {/* Degree */}
              <FormField
                label="Degree"
                name="degree"
                value={currentEducation.degree || ""}
                onChange={(e) => handleChange(e)}
                placeholder="e.g. Bachelor of Science"
                error={getFieldError("degree")}
                icon={<FaGraduationCap className="text-gray-400" size={11} />}
              />

              {/* Field of Study */}
              <FormField
                label="Field of Study"
                name="fieldOfStudy"
                value={currentEducation.fieldOfStudy || ""}
                onChange={(e) => handleChange(e)}
                placeholder="e.g. Computer Science"
                error={getFieldError("fieldOfStudy")}
              />
            </FormGrid>

            {/* Date Inputs */}
            <FormSection>
              <div className="flex items-center mb-1">
                <FormCheckbox
                  label="Currently studying here"
                  name="isCurrentlyStudying"
                  checked={currentEducation.isCurrentlyStudying || false}
                  onChange={(e) => handleCheckboxChange(e)}
                />
              </div>

              <FormGrid columns={currentEducation.useYearOnly ? 1 : 2}>
                {!currentEducation.useYearOnly ? (
                  <>
                    {/* Start Date - month and year */}
                    <FormField
                      label="Start Date"
                      name="startDate"
                      type="month"
                      value={currentEducation.startDate || ""}
                      onChange={(e) => handleChange(e)}
                      error={getFieldError("startDate")}
                      icon={
                        <FaCalendarAlt className="text-gray-400" size={11} />
                      }
                    />

                    {/* End Date - month and year, unless currently studying */}
                    {!currentEducation.isCurrentlyStudying && (
                      <FormField
                        label="End Date"
                        name="endDate"
                        type="month"
                        value={currentEducation.endDate || ""}
                        onChange={(e) => handleChange(e)}
                        error={getFieldError("endDate")}
                        icon={
                          <FaCalendarAlt className="text-gray-400" size={11} />
                        }
                      />
                    )}
                  </>
                ) : (
                  <FormField
                    label="Graduation Year"
                    name="graduationYear"
                    value={currentEducation.graduationYear || ""}
                    onChange={(e) => handleChange(e)}
                    placeholder="e.g. 2022"
                    error={getFieldError("graduationYear")}
                    icon={<FaCalendarAlt className="text-gray-400" size={11} />}
                  />
                )}
              </FormGrid>

              <div className="mt-1">
                <FormCheckbox
                  label="Use year only (no months)"
                  name="useYearOnly"
                  checked={currentEducation.useYearOnly || false}
                  onChange={(e) => handleCheckboxChange(e)}
                  helpText="E.g. '2018 - 2022' instead of 'Sep 2018 - May 2022'"
                />
              </div>
            </FormSection>

            <FormGrid columns={1}>
              {/* GPA */}
              <FormField
                label="GPA or Grade"
                name="gpa"
                value={currentEducation.gpa || ""}
                onChange={(e) => handleChange(e)}
                placeholder="e.g. 3.8/4.0 or 85%"
                error={getFieldError("gpa")}
                helpText="Format will be auto-corrected on save"
              />
            </FormGrid>

            {/* Description */}
            <FormTextArea
              label="Additional Information"
              name="description"
              value={currentEducation.description || ""}
              onChange={(e) => handleChange(e)}
              placeholder="Honors, activities, relevant coursework..."
              rows={3}
              error={getFieldError("description")}
              helpText="Include details such as honors, scholarships, relevant coursework, etc."
            />
          </FormSection>
        </EntryCard>
      )}

      <FormFooter
        onSubmit={onSubmit}
        secondaryAction={
          <button
            type="button"
            onClick={clearCurrentEntry}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
          >
            Clear Entry
          </button>
        }
      />
    </FormContainer>
  );
};

EducationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default EducationForm;
