import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaTrash, FaPlus } from "react-icons/fa";

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

  // Ensure GPA values are properly formatted on mount and when activeIndex changes
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
  const handleChange = (e, index) => {
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
  const handleCheckboxChange = (e, index) => {
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
      } else if (!updatedEducation[index].graduationYear) {
        // If no end date but also no graduation year, use current year as fallback
        updatedEducation[index].graduationYear = new Date()
          .getFullYear()
          .toString();
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
    setActiveIndex(updatedEducation.length - 1);
  };

  // Format and update all GPA values in education entries
  const formatAllGPAValues = () => {
    if (formData.education && formData.education.length > 0) {
      const needsUpdate = formData.education.some(
        (edu) => edu.gpa && !edu.gpa.includes("/") && !edu.gpa.includes("%")
      );

      if (needsUpdate) {
        const updatedEducation = formData.education.map((edu) => ({
          ...edu,
          gpa: edu.gpa ? formatGPAValue(edu.gpa) : edu.gpa,
        }));
        onFormChange("education", updatedEducation);
        return true;
      }
    }
    return false;
  };

  // Ensure all GPA values are properly formatted when component mounts
  useEffect(() => {
    formatAllGPAValues();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Remove education entry
  const handleRemoveEducation = (index) => {
    if (formData.education.length <= 1) return;

    const updatedEducation = formData.education.filter((_, i) => i !== index);
    onFormChange("education", updatedEducation);

    // Adjust active index if needed
    if (activeIndex >= updatedEducation.length) {
      setActiveIndex(updatedEducation.length - 1);
    }
  };

  // Clear all fields in the current education entry
  const clearCurrentEntry = () => {
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
      isVisible: true,
      useYearOnly: false,
      isCurrentlyStudying: false,
    };
    onFormChange("education", updatedEducation);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>

      {/* Tab navigation for multiple education entries */}
      {formData.education && formData.education.length > 0 && (
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {formData.education.map((_, index) => (
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
            onClick={handleAddEducation}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            title="Add Education"
          >
            <FaPlus />
          </button>
        </div>
      )}

      {/* Education Form Fields */}
      {formData.education &&
        formData.education.length > 0 &&
        formData.education[activeIndex] && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Education #{activeIndex + 1}
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={clearCurrentEntry}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none text-sm"
                  title="Clear fields"
                >
                  Clear Fields
                </button>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="isVisible"
                    checked={formData.education[activeIndex].isVisible || false}
                    onChange={(e) => handleCheckboxChange(e, activeIndex)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Show</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveEducation(activeIndex)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                  title="Remove education"
                  disabled={formData.education.length <= 1}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Institution - Full width on all screens */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.education[activeIndex].institution || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className={`w-full px-3 py-2 border ${
                    getFieldError("institution")
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="E.g., Harvard University"
                  required
                />
                {getFieldError("institution") && (
                  <p className="mt-1 text-xs text-red-500">
                    {getFieldError("institution")}
                  </p>
                )}
              </div>

              {/* Degree and Field of Study in a grid */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Degree */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.education[activeIndex].degree || ""}
                      onChange={(e) => handleChange(e, activeIndex)}
                      className={`w-full px-3 py-2 border ${
                        getFieldError("degree")
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="E.g., Bachelor of Science, B.Tech"
                      required
                    />
                    {getFieldError("degree") && (
                      <p className="mt-1 text-xs text-red-500">
                        {getFieldError("degree")}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Enter only your degree (B.Tech, BSc, etc.)
                    </p>
                  </div>

                  {/* Field of Study */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field of Study <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fieldOfStudy"
                      value={formData.education[activeIndex].fieldOfStudy || ""}
                      onChange={(e) => handleChange(e, activeIndex)}
                      className={`w-full px-3 py-2 border ${
                        getFieldError("fieldOfStudy")
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="E.g., Computer Science, Information Technology"
                      required
                    />
                    {getFieldError("fieldOfStudy") && (
                      <p className="mt-1 text-xs text-red-500">
                        {getFieldError("fieldOfStudy")}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Enter your specialization or major
                    </p>
                  </div>

                  {/* Split Degree & Field Button */}
                  {formData.education[activeIndex].degree &&
                    formData.education[activeIndex].degree.includes(",") &&
                    !formData.education[activeIndex].fieldOfStudy && (
                      <div className="md:col-span-2 mt-1 mb-2">
                        <button
                          type="button"
                          onClick={() => {
                            const degree =
                              formData.education[activeIndex].degree;
                            const [degreePart, fieldPart] = degree
                              .split(",")
                              .map((part) => part.trim());

                            if (degreePart && fieldPart) {
                              const updatedEducation = [...formData.education];
                              updatedEducation[activeIndex] = {
                                ...updatedEducation[activeIndex],
                                degree: degreePart,
                                fieldOfStudy: fieldPart,
                              };
                              onFormChange("education", updatedEducation);
                            }
                          }}
                          className="py-1 px-3 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 border border-blue-200"
                        >
                          Split Degree & Field
                        </button>
                      </div>
                    )}

                  {/* Common quick-selection buttons for both fields */}
                  <div className="md:col-span-2">
                    <div className="flex flex-col space-y-3 p-3 bg-gray-50 rounded-md">
                      <div>
                        <span className="text-xs font-medium text-gray-500">
                          Common Degrees:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {[
                            "B.Tech",
                            "B.Sc",
                            "M.Tech",
                            "M.Sc",
                            "Ph.D.",
                            "MBA",
                          ].map((degree) => (
                            <button
                              key={degree}
                              type="button"
                              onClick={() => {
                                const syntheticEvent = {
                                  target: {
                                    name: "degree",
                                    value: degree,
                                    manuallyEntered: true,
                                  },
                                };
                                handleChange(syntheticEvent, activeIndex);
                              }}
                              className="text-xs bg-white hover:bg-gray-200 text-gray-800 py-1 px-2 rounded border border-gray-200"
                            >
                              {degree}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-medium text-gray-500">
                          Common Fields:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {[
                            "Computer Science",
                            "Information Technology",
                            "Electronics",
                            "Mechanical",
                            "Civil",
                            "Business",
                          ].map((field) => (
                            <button
                              key={field}
                              type="button"
                              onClick={() => {
                                const syntheticEvent = {
                                  target: {
                                    name: "fieldOfStudy",
                                    value: field,
                                    manuallyEntered: true,
                                  },
                                };
                                handleChange(syntheticEvent, activeIndex);
                              }}
                              className="text-xs bg-white hover:bg-gray-200 text-gray-800 py-1 px-2 rounded border border-gray-200"
                            >
                              {field}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location and GPA - Side by side */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.education[activeIndex].location || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g., Cambridge, MA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GPA/Percentage (Optional)
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="gpa"
                    value={formData.education[activeIndex].gpa || ""}
                    onChange={(e) => {
                      // Just store the raw input value first without formatting
                      const rawValue = e.target.value;
                      const syntheticEvent = {
                        target: {
                          name: "gpa",
                          value: rawValue,
                          manuallyEntered: true,
                        },
                      };
                      handleChange(syntheticEvent, activeIndex);
                    }}
                    onBlur={(e) => {
                      // Apply formatting on blur only if there's a value
                      if (e.target.value) {
                        const formattedValue = formatGPAValue(e.target.value);
                        const syntheticEvent = {
                          target: {
                            name: "gpa",
                            value: formattedValue,
                            manuallyEntered: true,
                          },
                        };
                        handleChange(syntheticEvent, activeIndex);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E.g., 3.8/4.0 or 85.5%"
                  />
                  {formData.education[activeIndex].gpa &&
                    !formData.education[activeIndex].gpa.includes("/") &&
                    !formData.education[activeIndex].gpa.includes("%") && (
                      <button
                        type="button"
                        onClick={() => {
                          const formattedValue = formatGPAValue(
                            formData.education[activeIndex].gpa
                          );
                          const syntheticEvent = {
                            target: {
                              name: "gpa",
                              value: formattedValue,
                              manuallyEntered: true,
                            },
                          };
                          handleChange(syntheticEvent, activeIndex);
                        }}
                        className="ml-2 py-1 px-2 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                      >
                        Format
                      </button>
                    )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter either GPA (3.8/4.0) or percentage (85.5%). It will
                  appear as &quot;| 85.5%&quot; in your resume.
                </p>
              </div>

              {/* Date display option */}
              <div className="md:col-span-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="useYearOnly"
                    checked={
                      formData.education[activeIndex].useYearOnly || false
                    }
                    onChange={(e) => handleCheckboxChange(e, activeIndex)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Show only year of completion (instead of specific dates)
                  </span>
                </label>
              </div>

              {/* Conditional date fields based on selected option */}
              {formData.education[activeIndex].useYearOnly ? (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Completion <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="graduationYear"
                    value={formData.education[activeIndex].graduationYear || ""}
                    onChange={(e) => handleChange(e, activeIndex)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E.g., 2022 or 2021-2025"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Enter a single year or a year range (e.g., &quot;2022&quot;
                    or &quot;2021-2025&quot;)
                  </p>
                </div>
              ) : (
                <>
                  {/* Start Date and End Date - Side by side */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      name="startDate"
                      value={formData.education[activeIndex].startDate || ""}
                      onChange={(e) => handleChange(e, activeIndex)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="isCurrentlyStudying"
                          checked={
                            formData.education[activeIndex]
                              .isCurrentlyStudying || false
                          }
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const updatedEducation = [...formData.education];

                            updatedEducation[activeIndex] = {
                              ...updatedEducation[activeIndex],
                              isCurrentlyStudying: checked,
                            };

                            // If checked, set end date to current month/year
                            if (checked) {
                              const today = new Date();
                              const year = today.getFullYear();
                              const month = String(
                                today.getMonth() + 1
                              ).padStart(2, "0");
                              updatedEducation[
                                activeIndex
                              ].endDate = `${year}-${month}`;
                            }

                            onFormChange("education", updatedEducation);
                          }}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-xs text-gray-600">
                          Currently Studying
                        </span>
                      </label>
                    </div>
                    <input
                      type="month"
                      name="endDate"
                      value={formData.education[activeIndex].endDate || ""}
                      onChange={(e) => handleChange(e, activeIndex)}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formData.education[activeIndex].isCurrentlyStudying
                          ? "bg-gray-100"
                          : ""
                      }`}
                      required
                      readOnly={
                        formData.education[activeIndex].isCurrentlyStudying
                      }
                    />
                    {formData.education[activeIndex].isCurrentlyStudying && (
                      <p className="mt-1 text-xs text-gray-500">
                        End date set to current date for &quot;Currently
                        Studying&quot;
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Description - Full width */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.education[activeIndex].description || ""}
                onChange={(e) => handleChange(e, activeIndex)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your educational experience, achievements, relevant coursework, etc."
              ></textarea>
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

EducationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default EducationForm;
