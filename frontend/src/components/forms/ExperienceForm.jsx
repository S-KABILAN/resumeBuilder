import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  FormContainer,
  FormSection,
  FormGrid,
  FormField,
  FormTextArea,
  FormCheckbox,
  EntryTabs,
  EntryCard,
  FormFooter,
} from "./FormStyles";

const ExperienceForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
  // State to track which experience entry is being edited
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize with default entries if none exist
  if (!formData.experience || formData.experience.length === 0) {
    const defaultExperiences = [
      {
        company: "XYZ Tech Solutions",
        position: "Software Engineer",
        location: "San Francisco, CA",
        startDate: "2022-06",
        endDate: "",
        isCurrentlyWorking: true,
        description:
          "• Developed and maintained full-stack web applications using React, Node.js, and MongoDB\n• Collaborated with cross-functional teams to deliver features on time and within scope\n• Implemented automated testing procedures that improved code quality by 30%\n• Participated in code reviews and mentored junior developers",
        isVisible: true,
      },
      {
        company: "ABC Digital Agency",
        position: "Frontend Developer",
        location: "New York, NY",
        startDate: "2020-03",
        endDate: "2022-05",
        isCurrentlyWorking: false,
        description:
          "• Built responsive websites and applications for various clients using React, HTML, CSS, and JavaScript\n• Optimized website performance resulting in 40% faster load times\n• Implemented UI/UX designs according to client specifications\n• Worked with backend developers to integrate frontend with REST APIs",
        isVisible: true,
      },
    ];

    onFormChange("experience", defaultExperiences);
  }

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[activeIndex] = {
      ...updatedExperience[activeIndex],
      [name]: value,
    };

    onFormChange("experience", updatedExperience);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[activeIndex] = {
      ...updatedExperience[activeIndex],
      [name]: checked,
    };

    // If currently working is checked, clear the end date
    if (name === "isCurrentlyWorking" && checked) {
      updatedExperience[activeIndex].endDate = "";
    }

    onFormChange("experience", updatedExperience);
  };

  // Handler for visibility change
  const handleVisibilityChange = (e) => {
    handleCheckboxChange({
      target: { name: "isVisible", checked: e.target.checked },
    });
  };

  // Add new experience entry
  const handleAddExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrentlyWorking: false,
      description: "",
      isVisible: true,
    };

    const updatedExperience = [...formData.experience, newExperience];
    onFormChange("experience", updatedExperience);
    setActiveIndex(updatedExperience.length - 1);
  };

  // Remove experience entry
  const handleRemoveExperience = () => {
    if (formData.experience.length <= 1) return;

    const updatedExperience = formData.experience.filter(
      (_, i) => i !== activeIndex
    );
    onFormChange("experience", updatedExperience);

    // Adjust active index if needed
    if (activeIndex >= updatedExperience.length) {
      setActiveIndex(updatedExperience.length - 1);
    }
  };

  // Helper to get field error
  const getFieldError = (field) => {
    return (
      errors.experience &&
      errors.experience[activeIndex] &&
      errors.experience[activeIndex][field]
    );
  };

  return (
    <FormContainer>
      {formData.experience && formData.experience.length > 0 && (
        <>
          <EntryTabs
            entries={formData.experience}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onAdd={handleAddExperience}
            addButtonLabel="Add Experience"
            disableRemove={formData.experience.length <= 1}
          />

          {formData.experience[activeIndex] && (
            <EntryCard
              title={`Experience ${activeIndex + 1}`}
              onRemove={handleRemoveExperience}
              disableRemove={formData.experience.length <= 1}
              isVisible={formData.experience[activeIndex].isVisible}
              onVisibilityChange={handleVisibilityChange}
            >
              <FormGrid>
                <FormField
                  label="Company"
                  name="company"
                  value={formData.experience[activeIndex].company || ""}
                  onChange={handleChange}
                  placeholder="Company or Organization Name"
                  error={getFieldError("company")}
                  icon={<FaBuilding size={12} className="text-gray-400" />}
                  required
                />

                <FormField
                  label="Position"
                  name="position"
                  value={formData.experience[activeIndex].position || ""}
                  onChange={handleChange}
                  placeholder="Job Title or Role"
                  error={getFieldError("position")}
                  icon={<FaBriefcase size={12} className="text-gray-400" />}
                  required
                />
              </FormGrid>

              <FormField
                label="Location"
                name="location"
                value={formData.experience[activeIndex].location || ""}
                onChange={handleChange}
                placeholder="City, Country"
                error={getFieldError("location")}
                icon={<FaMapMarkerAlt size={12} className="text-gray-400" />}
              />

              <FormGrid>
                <FormField
                  label="Start Date"
                  name="startDate"
                  type="month"
                  value={formData.experience[activeIndex].startDate || ""}
                  onChange={handleChange}
                  error={getFieldError("startDate")}
                  icon={<FaCalendarAlt size={12} className="text-gray-400" />}
                  required
                />

                <div>
                  <FormField
                    label="End Date"
                    name="endDate"
                    type="month"
                    value={formData.experience[activeIndex].endDate || ""}
                    onChange={handleChange}
                    error={getFieldError("endDate")}
                    icon={<FaCalendarAlt size={12} className="text-gray-400" />}
                    disabled={
                      formData.experience[activeIndex].isCurrentlyWorking
                    }
                  />
                  <FormCheckbox
                    label="I currently work here"
                    name="isCurrentlyWorking"
                    checked={
                      formData.experience[activeIndex].isCurrentlyWorking ||
                      false
                    }
                    onChange={handleCheckboxChange}
                  />
                </div>
              </FormGrid>

              <FormTextArea
                label="Description"
                name="description"
                value={formData.experience[activeIndex].description || ""}
                onChange={handleChange}
                rows={5}
                placeholder="• Use bullet points to describe your responsibilities and achievements\n• Quantify your accomplishments with numbers when possible\n• Focus on results and impact rather than just listing duties"
                error={getFieldError("description")}
                helpText="Use bullet points starting with • for better formatting"
              />
            </EntryCard>
          )}
        </>
      )}

      <FormFooter onSubmit={onSubmit} />
    </FormContainer>
  );
};

ExperienceForm.propTypes = {
  formData: PropTypes.shape({
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        company: PropTypes.string,
        position: PropTypes.string,
        location: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        isCurrentlyWorking: PropTypes.bool,
        description: PropTypes.string,
        isVisible: PropTypes.bool,
      })
    ),
  }).isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default ExperienceForm;
