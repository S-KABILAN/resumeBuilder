import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaTrash,
  FaPlus,
  FaCode,
  FaProjectDiagram,
  FaCalendarAlt,
  FaLink,
  FaLaptopCode,
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

const PersonalProjectsForm = ({
  formData,
  onFormChange,
  onSubmit,
  errors = {},
}) => {
  // State to track which project entry is being edited
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize with default entries if none exist
  if (!formData.personalProjects || formData.personalProjects.length === 0) {
    const defaultProjects = [
      {
        title: "Personal Blog",
        technologies: "React, Node.js, MongoDB",
        startDate: "2022-01",
        endDate: "2022-03",
        description: "Created a personal blog to share my programming journey.",
        repoUrl: "https://github.com/username/blog",
        liveUrl: "https://myblog.example.com",
        isVisible: true,
      },
    ];

    onFormChange("personalProjects", defaultProjects);
  }

  // Handler for input changes
  const handleChange = (e, index = activeIndex) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.personalProjects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };

    onFormChange("personalProjects", updatedProjects);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e, index = activeIndex) => {
    const { name, checked } = e.target;
    const updatedProjects = [...formData.personalProjects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: checked };

    onFormChange("personalProjects", updatedProjects);
  };

  // Add new project entry
  const handleAddProject = () => {
    const newProject = {
      title: "",
      technologies: "",
      startDate: "",
      endDate: "",
      description: "",
      repoUrl: "",
      liveUrl: "",
      isVisible: true,
    };

    const updatedProjects = [...formData.personalProjects, newProject];
    onFormChange("personalProjects", updatedProjects);
    setActiveIndex(updatedProjects.length - 1);
  };

  // Remove project entry
  const handleRemoveProject = (index) => {
    if (formData.personalProjects.length <= 1) return;

    const updatedProjects = formData.personalProjects.filter(
      (_, i) => i !== index
    );
    onFormChange("personalProjects", updatedProjects);

    // Adjust active index if needed
    if (activeIndex >= updatedProjects.length) {
      setActiveIndex(updatedProjects.length - 1);
    }
  };

  // Helper to get field error
  const getFieldError = (field) => {
    return (
      errors.personalProjects &&
      errors.personalProjects[activeIndex] &&
      errors.personalProjects[activeIndex][field]
    );
  };

  // Toggle visibility
  const handleVisibilityChange = (e) => {
    handleCheckboxChange(
      { target: { name: "isVisible", checked: e.target.checked } },
      activeIndex
    );
  };

  return (
    <FormContainer>
      {formData.personalProjects && formData.personalProjects.length > 0 && (
        <>
          <EntryTabs
            entries={formData.personalProjects}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onAdd={handleAddProject}
            addButtonLabel="Add Personal Project"
            disableRemove={formData.personalProjects.length <= 1}
          />

          {formData.personalProjects[activeIndex] && (
            <EntryCard
              title={`Personal Project ${activeIndex + 1}`}
              onRemove={() => handleRemoveProject(activeIndex)}
              disableRemove={formData.personalProjects.length <= 1}
              isVisible={formData.personalProjects[activeIndex].isVisible}
              onVisibilityChange={handleVisibilityChange}
            >
              <FormField
                label="Project Title"
                name="title"
                value={formData.personalProjects[activeIndex].title || ""}
                onChange={(e) => handleChange(e, activeIndex)}
                placeholder="e.g., Personal Blog, Mobile Game, Utility App"
                error={getFieldError("title")}
                icon={<FaProjectDiagram size={12} className="text-gray-400" />}
              />

              <FormGrid>
                <FormField
                  label="Start Date"
                  name="startDate"
                  type="month"
                  value={formData.personalProjects[activeIndex].startDate || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  error={getFieldError("startDate")}
                  icon={<FaCalendarAlt size={12} className="text-gray-400" />}
                />

                <FormField
                  label="End Date"
                  name="endDate"
                  type="month"
                  value={formData.personalProjects[activeIndex].endDate || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  error={getFieldError("endDate")}
                  icon={<FaCalendarAlt size={12} className="text-gray-400" />}
                />
              </FormGrid>

              <FormGrid>
                <FormField
                  label="Repository URL"
                  name="repoUrl"
                  type="url"
                  value={formData.personalProjects[activeIndex].repoUrl || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  placeholder="https://github.com/username/project"
                  error={getFieldError("repoUrl")}
                  icon={<FaCode size={12} className="text-gray-400" />}
                />

                <FormField
                  label="Live Demo URL"
                  name="liveUrl"
                  type="url"
                  value={formData.personalProjects[activeIndex].liveUrl || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  placeholder="https://myproject.example.com"
                  error={getFieldError("liveUrl")}
                  icon={<FaLink size={12} className="text-gray-400" />}
                />
              </FormGrid>

              <FormField
                label="Technologies Used"
                name="technologies"
                value={
                  formData.personalProjects[activeIndex].technologies || ""
                }
                onChange={(e) => handleChange(e, activeIndex)}
                placeholder="e.g., React, Node.js, MongoDB, Flutter"
                error={getFieldError("technologies")}
                icon={<FaLaptopCode size={12} className="text-gray-400" />}
              />

              <FormTextArea
                label="Description"
                name="description"
                value={formData.personalProjects[activeIndex].description || ""}
                onChange={(e) => handleChange(e, activeIndex)}
                rows={3}
                placeholder="Describe the project, its purpose, challenges overcome, and key features"
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

PersonalProjectsForm.propTypes = {
  formData: PropTypes.shape({
    personalProjects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        technologies: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        description: PropTypes.string,
        repoUrl: PropTypes.string,
        liveUrl: PropTypes.string,
        isVisible: PropTypes.bool,
      })
    ),
  }).isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default PersonalProjectsForm;
