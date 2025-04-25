import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaTrash,
  FaPlus,
  FaCode,
  FaProjectDiagram,
  FaCalendarAlt,
  FaLink,
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

const ProjectsForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
  // State to track which project entry is being edited
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize with default entries if none exist
  if (!formData.projects || formData.projects.length === 0) {
    const defaultProjects = [
      {
        title: "Portfolio Website",
        role: "Developer",
        startDate: "2022-01",
        endDate: "2022-03",
        description:
          "Created a responsive portfolio website using React and Tailwind CSS.",
        technologiesUsed: "React, Tailwind CSS, JavaScript",
        url: "https://example.com",
        isVisible: true,
      },
    ];

    onFormChange("projects", defaultProjects);
  }

  // Handler for input changes
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };

    onFormChange("projects", updatedProjects);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e, index) => {
    const { name, checked } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: checked };

    onFormChange("projects", updatedProjects);
  };

  // Add new project entry
  const handleAddProject = () => {
    const newProject = {
      title: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      technologiesUsed: "",
      url: "",
      isVisible: true,
    };

    const updatedProjects = [...formData.projects, newProject];
    onFormChange("projects", updatedProjects);
    setActiveIndex(updatedProjects.length - 1);
  };

  // Remove project entry
  const handleRemoveProject = (index) => {
    if (formData.projects.length <= 1) return;

    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    onFormChange("projects", updatedProjects);

    // Adjust active index if needed
    if (activeIndex >= updatedProjects.length) {
      setActiveIndex(updatedProjects.length - 1);
    }
  };

  // Helper to get field error
  const getFieldError = (field) => {
    return (
      errors.projects &&
      errors.projects[activeIndex] &&
      errors.projects[activeIndex][field]
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
    <FormContainer title="Projects">
      {formData.projects && formData.projects.length > 0 && (
        <>
          <EntryTabs
            entries={formData.projects}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onAdd={handleAddProject}
            addButtonLabel="Add Project"
            disableRemove={formData.projects.length <= 1}
          />

          {formData.projects[activeIndex] && (
            <EntryCard
              title={`Project ${activeIndex + 1}`}
              onRemove={() => handleRemoveProject(activeIndex)}
              disableRemove={formData.projects.length <= 1}
              isVisible={formData.projects[activeIndex].isVisible}
              onVisibilityChange={handleVisibilityChange}
            >
              <FormGrid>
                <FormField
                  label="Project Title"
                  name="title"
                  value={formData.projects[activeIndex].title || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  placeholder="e.g., E-commerce Website, Mobile App"
                  error={getFieldError("title")}
                  icon={
                    <FaProjectDiagram size={12} className="text-gray-400" />
                  }
                />

                <FormField
                  label="Your Role"
                  name="role"
                  value={formData.projects[activeIndex].role || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  placeholder="e.g., Developer, Team Lead, Designer"
                  error={getFieldError("role")}
                />
              </FormGrid>

              <FormGrid>
                <FormField
                  label="Start Date"
                  name="startDate"
                  type="month"
                  value={formData.projects[activeIndex].startDate || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  error={getFieldError("startDate")}
                  icon={<FaCalendarAlt size={12} className="text-gray-400" />}
                />

                <FormField
                  label="End Date"
                  name="endDate"
                  type="month"
                  value={formData.projects[activeIndex].endDate || ""}
                  onChange={(e) => handleChange(e, activeIndex)}
                  error={getFieldError("endDate")}
                  icon={<FaCalendarAlt size={12} className="text-gray-400" />}
                />
              </FormGrid>

              <FormField
                label="Project URL"
                name="url"
                type="url"
                value={formData.projects[activeIndex].url || ""}
                onChange={(e) => handleChange(e, activeIndex)}
                placeholder="https://example.com"
                error={getFieldError("url")}
                icon={<FaLink size={12} className="text-gray-400" />}
              />

              <FormField
                label="Technologies Used"
                name="technologiesUsed"
                value={formData.projects[activeIndex].technologiesUsed || ""}
                onChange={(e) => handleChange(e, activeIndex)}
                placeholder="e.g., React, Node.js, MongoDB"
                error={getFieldError("technologiesUsed")}
                icon={<FaCode size={12} className="text-gray-400" />}
              />

              <FormTextArea
                label="Description"
                name="description"
                value={formData.projects[activeIndex].description || ""}
                onChange={(e) => handleChange(e, activeIndex)}
                rows={3}
                placeholder="Describe the project, its objectives, and your contributions"
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

ProjectsForm.propTypes = {
  formData: PropTypes.shape({
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        role: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        description: PropTypes.string,
        technologiesUsed: PropTypes.string,
        url: PropTypes.string,
        isVisible: PropTypes.bool,
      })
    ),
  }).isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default ProjectsForm;
