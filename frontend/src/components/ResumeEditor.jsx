import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

// Form components
import PersonalInfoForm from "./forms/PersonalInfoForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import AchievementsForm from "./forms/AchievementsForm";
import CustomSectionForm from "./forms/CustomSectionForm";

// Preview components
import ResumePreviewLayout1 from "./ResumePreviewLayout1";
import ResumePreviewLayout2 from "./ResumePreviewLayout2";
import ResumePreviewLayout3 from "./ResumePreviewLayout3";
import ATSOptimizedLayout from "./ATSOptimizedLayout";
import MinimalistATSLayout from "./MinimalistATSLayout";
import ATSTwoColumnLayout1 from "./ATSTwoColumnLayout1";
import ATSTwoColumnLayout2 from "./ATSTwoColumnLayout2";

// UI components
import { Tabs, TabList, Tab, TabPanel } from "./ui/tabs";
import SectionControls from "./SectionControls";

const ResumeEditor = ({
  formData,
  setFormData,
  templateSettings,
  setTemplateSettings,
  sectionConfig,
  setSectionConfig,
  selectedLayout,
  setSelectedLayout,
  onSave,
  onDownload,
}) => {
  const [activeSection, setActiveSection] = useState("personal");
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [splitView, setSplitView] = useState(true);
  const [previewScale, setPreviewScale] = useState(0.8);
  const [formErrors, setFormErrors] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Debounced save function for auto-save
  const debouncedSave = useCallback(
    debounce(() => {
      if (autoSaveEnabled && unsavedChanges) {
        onSave();
        setUnsavedChanges(false);
      }
    }, 2000),
    [autoSaveEnabled, unsavedChanges, onSave]
  );

  // Auto-save effect
  useEffect(() => {
    if (unsavedChanges) {
      debouncedSave();
    }
    return () => debouncedSave.cancel();
  }, [unsavedChanges, debouncedSave]);

  // Update section order when drag and drop happens
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sectionConfig);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSectionConfig(items);
    setUnsavedChanges(true);
  };

  // Generic form change handler
  const handleFormChange = (section, field, value, index = null) => {
    let updatedFormData = { ...formData };

    if (section === "personal") {
      updatedFormData.personal = {
        ...updatedFormData.personal,
        [field]: value,
      };
    } else if (Array.isArray(updatedFormData[section]) && index !== null) {
      updatedFormData[section] = updatedFormData[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
    } else if (typeof updatedFormData[section] === "object" && index === null) {
      updatedFormData[section] = {
        ...updatedFormData[section],
        [field]: value,
      };
    }

    setFormData(updatedFormData);
    setUnsavedChanges(true);
    validateField(section, field, value);
  };

  // Validation logic
  const validateField = (section, field, value) => {
    let errors = { ...formErrors };

    // Email validation
    if (field === "email" && section === "personal") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[`${section}.${field}`] = "Please enter a valid email address";
      } else {
        delete errors[`${section}.${field}`];
      }
    }

    // Required field validation
    if ((field === "name" || field === "phone") && section === "personal") {
      if (!value || value.trim() === "") {
        errors[`${section}.${field}`] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else {
        delete errors[`${section}.${field}`];
      }
    }

    setFormErrors(errors);
  };

  // Add item to array sections
  const handleAddItem = (section) => {
    const defaultItems = {
      education: {
        institution: "University/College Name",
        degree: "Degree Title",
        fieldOfStudy: "Field of Study",
        startDate: "",
        endDate: "",
        isCurrentlyStudying: false,
        location: "City, Country",
        gpa: "3.5/4.0",
        activities: "",
        description:
          "Brief description of your coursework, achievements, or relevant academic experiences.",
        isVisible: true,
      },
      experience: {
        company: "Company Name",
        position: "Job Title",
        startDate: "",
        endDate: "",
        isCurrentlyWorking: false,
        location: "City, Country",
        description:
          "• Describe your responsibilities and achievements\n• Use bullet points for better readability\n• Quantify results whenever possible",
        isVisible: true,
      },
      skills: {
        name: "Enter a skill (e.g., JavaScript, Project Management)",
        category: "Choose a category (e.g., Technical, Soft Skills)",
        proficiencyLevel: 3,
        isVisible: true,
      },
      achievements: {
        description: "Describe your achievement",
        date: "",
        isVisible: true,
      },
      projects: {
        title: "Project Title",
        role: "Your Role (e.g., Developer, Team Lead)",
        organization: "Organization/Client Name",
        startDate: "",
        endDate: "",
        isCurrentProject: false,
        location: "",
        description: "Describe the project, your contribution, and its impact.",
        url: "",
        technologies: [],
        isVisible: true,
      },
      certifications: {
        certificationName: "Certification Title",
        issuingOrganization: "Issuing Organization",
        dateObtained: "",
        certificationId: "",
        isVisible: true,
      },
    };

    setFormData({
      ...formData,
      [section]: [...(formData[section] || []), defaultItems[section]],
    });

    setUnsavedChanges(true);
  };

  // Remove item from array sections
  const handleRemoveItem = (section, index) => {
    setFormData({
      ...formData,
      [section]: formData[section].filter((_, i) => i !== index),
    });

    setUnsavedChanges(true);
  };

  // Toggle section visibility
  const toggleSectionVisibility = (sectionId) => {
    setSectionConfig(
      sectionConfig.map((section) =>
        section.id === sectionId
          ? { ...section, enabled: !section.enabled }
          : section
      )
    );

    setUnsavedChanges(true);
  };

  // Add custom section
  const handleAddCustomSection = (newSection) => {
    // Update form data with new custom section
    setFormData({
      ...formData,
      customSections: [...(formData.customSections || []), newSection],
    });

    // Update section config to include the new section
    setSectionConfig([
      ...sectionConfig,
      {
        id: newSection.id,
        type: "custom",
        label: newSection.title,
        enabled: true,
      },
    ]);

    setUnsavedChanges(true);
  };

  // Remove custom section
  const handleRemoveCustomSection = (sectionId) => {
    // Remove from form data
    setFormData({
      ...formData,
      customSections: (formData.customSections || []).filter(
        (section) => section.id !== sectionId
      ),
    });

    // Remove from section config
    setSectionConfig(
      sectionConfig.filter((section) => section.id !== sectionId)
    );

    setUnsavedChanges(true);
  };

  // Render the active form section
  const renderActiveForm = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoForm
            formData={formData.personal || {}}
            onFormChange={(field, value) =>
              handleFormChange("personal", field, value)
            }
            errors={formErrors}
          />
        );
      case "education":
        return (
          <EducationForm
            items={formData.education || []}
            onItemAdd={(item) => {
              const updatedEducation = [...(formData.education || []), item];
              setFormData({ ...formData, education: updatedEducation });
              setUnsavedChanges(true);
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedEducation = [...(formData.education || [])];
              updatedEducation[index] = updatedItem;
              setFormData({ ...formData, education: updatedEducation });
              setUnsavedChanges(true);
            }}
            onItemRemove={(index) => handleRemoveItem("education", index)}
            onItemReorder={() => {}}
            errors={formErrors}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            items={formData.experience || []}
            onItemAdd={(item) => {
              const updatedExperience = [...(formData.experience || []), item];
              setFormData({ ...formData, experience: updatedExperience });
              setUnsavedChanges(true);
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedExperience = [...(formData.experience || [])];
              updatedExperience[index] = updatedItem;
              setFormData({ ...formData, experience: updatedExperience });
              setUnsavedChanges(true);
            }}
            onItemRemove={(index) => handleRemoveItem("experience", index)}
            onItemReorder={() => {}}
            errors={formErrors}
          />
        );
      case "skills":
        return (
          <SkillsForm
            items={formData.skills || []}
            onItemAdd={(item) => {
              const updatedSkills = [...(formData.skills || []), item];
              setFormData({ ...formData, skills: updatedSkills });
              setUnsavedChanges(true);
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedSkills = [...(formData.skills || [])];
              updatedSkills[index] = updatedItem;
              setFormData({ ...formData, skills: updatedSkills });
              setUnsavedChanges(true);
            }}
            onItemRemove={(index) => handleRemoveItem("skills", index)}
            onItemReorder={() => {}}
            errors={formErrors}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            items={formData.projects || []}
            onItemAdd={(item) => {
              const updatedProjects = [...(formData.projects || []), item];
              setFormData({ ...formData, projects: updatedProjects });
              setUnsavedChanges(true);
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedProjects = [...(formData.projects || [])];
              updatedProjects[index] = updatedItem;
              setFormData({ ...formData, projects: updatedProjects });
              setUnsavedChanges(true);
            }}
            onItemRemove={(index) => handleRemoveItem("projects", index)}
            onItemReorder={() => {}}
            errors={formErrors}
          />
        );
      case "certifications":
        return (
          <CertificationsForm
            items={formData.certifications || []}
            onItemAdd={(item) => {
              const updatedCertifications = [
                ...(formData.certifications || []),
                item,
              ];
              setFormData({
                ...formData,
                certifications: updatedCertifications,
              });
              setUnsavedChanges(true);
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedCertifications = [
                ...(formData.certifications || []),
              ];
              updatedCertifications[index] = updatedItem;
              setFormData({
                ...formData,
                certifications: updatedCertifications,
              });
              setUnsavedChanges(true);
            }}
            onItemRemove={(index) => handleRemoveItem("certifications", index)}
            onItemReorder={() => {}}
            errors={formErrors}
          />
        );
      case "achievements":
        return (
          <AchievementsForm
            items={formData.achievements || []}
            onItemAdd={(item) => {
              const updatedAchievements = [
                ...(formData.achievements || []),
                item,
              ];
              setFormData({ ...formData, achievements: updatedAchievements });
              setUnsavedChanges(true);
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedAchievements = [...(formData.achievements || [])];
              updatedAchievements[index] = updatedItem;
              setFormData({ ...formData, achievements: updatedAchievements });
              setUnsavedChanges(true);
            }}
            onItemRemove={(index) => handleRemoveItem("achievements", index)}
            onItemReorder={() => {}}
            errors={formErrors}
          />
        );
      case "customSections":
        return (
          <CustomSectionForm
            items={formData.customSections || []}
            onItemAdd={(item) => {
              const updatedCustomSections = [
                ...(formData.customSections || []),
                item,
              ];
              setFormData({
                ...formData,
                customSections: updatedCustomSections,
              });
              setUnsavedChanges(true);
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedCustomSections = [
                ...(formData.customSections || []),
              ];
              updatedCustomSections[index] = updatedItem;
              setFormData({
                ...formData,
                customSections: updatedCustomSections,
              });
              setUnsavedChanges(true);
            }}
            onItemRemove={(index) => {
              // Keep backward compatibility with the id-based removal
              const sectionToRemove = formData.customSections[index];
              if (sectionToRemove && sectionToRemove.id) {
                handleRemoveCustomSection(sectionToRemove.id);
              } else {
                handleRemoveItem("customSections", index);
              }
            }}
            onItemReorder={() => {}}
            errors={formErrors}
          />
        );
      case "sectionControl":
        return (
          <SectionControls
            sections={sectionConfig}
            onToggleVisibility={toggleSectionVisibility}
            onReorder={handleDragEnd}
          />
        );
      default:
        return null;
    }
  };

  // Render the resume preview based on selected layout
  const renderPreview = () => {
    switch (selectedLayout) {
      case "Layout1":
        return (
          <ResumePreviewLayout1
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "Layout2":
        return (
          <ResumePreviewLayout2
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "Layout3":
        return (
          <ResumePreviewLayout3
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "ATSOptimized":
        return (
          <ATSOptimizedLayout
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "MinimalistATS":
        return (
          <MinimalistATSLayout
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "ATSTwoColumnLayout1":
        return (
          <ATSTwoColumnLayout1
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "ATSTwoColumnLayout2":
        return (
          <ATSTwoColumnLayout2
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      default:
        return (
          <ResumePreviewLayout1
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header with controls */}
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onSave()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={Object.keys(formErrors).length > 0}
          >
            Save Resume
          </button>
          <button
            onClick={() => onDownload()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            disabled={Object.keys(formErrors).length > 0}
          >
            Download PDF
          </button>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoSaveEnabled}
              onChange={() => setAutoSaveEnabled(!autoSaveEnabled)}
              className="mr-2"
            />
            Auto-save
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label className="mr-2 text-sm">Layout:</label>
            <select
              value={selectedLayout}
              onChange={(e) => setSelectedLayout(e.target.value)}
              className="p-1 border rounded"
            >
              <option value="Layout1">Modern</option>
              <option value="Layout2">Professional</option>
              <option value="Layout3">ATS-Friendly</option>
              <option value="ATSOptimized">Maximum ATS Compatibility</option>
              <option value="MinimalistATS">Minimalist ATS</option>
              <option value="ATSTwoColumnLayout1">ATS Two-Column Modern</option>
              <option value="ATSTwoColumnLayout2">
                ATS Two-Column Compact
              </option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2 text-sm">View:</label>
            <button
              onClick={() => setSplitView(!splitView)}
              className={`p-1 border rounded ${
                splitView ? "bg-blue-100" : "bg-white"
              }`}
            >
              Split
            </button>
          </div>
          <div className="flex items-center">
            <label className="mr-2 text-sm">Preview:</label>
            <input
              type="range"
              min="0.5"
              max="1"
              step="0.1"
              value={previewScale}
              onChange={(e) => setPreviewScale(parseFloat(e.target.value))}
              className="w-20"
            />
          </div>
        </div>
      </div>

      {/* Main Editor UI */}
      <div className="flex flex-grow overflow-hidden">
        {/* Section Tabs & Form Area */}
        <div
          className={`${
            splitView ? "w-1/2" : "w-full"
          } overflow-y-auto transition-all duration-300`}
        >
          <Tabs selectedTabId={activeSection} onChange={setActiveSection}>
            <TabList className="bg-gray-50 p-2 flex overflow-x-auto space-x-2">
              <Tab tabId="personal">Personal</Tab>
              <Tab tabId="education">Education</Tab>
              <Tab tabId="experience">Experience</Tab>
              <Tab tabId="skills">Skills</Tab>
              <Tab tabId="projects">Projects</Tab>
              <Tab tabId="certifications">Certifications</Tab>
              <Tab tabId="achievements">Achievements</Tab>
              <Tab tabId="customSections">Custom</Tab>
              <Tab tabId="sectionControl">Manage Sections</Tab>
            </TabList>

            <div className="p-4">
              <TabPanel>{renderActiveForm()}</TabPanel>
            </div>
          </Tabs>
        </div>

        {/* Resume Preview Area */}
        {splitView && (
          <div className="w-1/2 border-l border-gray-200 overflow-y-auto bg-gray-50 flex flex-col">
            <div className="text-center pt-2 px-4">
              <h3 className="text-sm font-medium text-gray-500">
                Resume Preview{" "}
                {previewScale < 1
                  ? `(${Math.round(previewScale * 100)}% zoom)`
                  : ""}
              </h3>
              <p className="text-xs text-gray-400 mb-2">
                The final PDF will use the full page without extra margins
              </p>
            </div>
            <div className="flex justify-center px-1">
              <div
                className="print:m-0 print:p-0 transition-all duration-300 w-full max-w-[210mm] print-exact bg-white shadow-sm border border-gray-200"
                style={{
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top center",
                  minHeight: `calc(280mm * ${previewScale})`,
                  overflow: "hidden",
                  marginBottom: "1rem",
                }}
              >
                {renderPreview()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with validation warnings */}
      {Object.keys(formErrors).length > 0 && (
        <div className="bg-red-50 p-2 border-t border-red-200">
          <p className="text-red-600 text-sm">
            Please fix the following errors before saving:
          </p>
          <ul className="text-red-600 text-xs list-disc pl-5">
            {Object.entries(formErrors).map(([key, error]) => (
              <li key={key}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

ResumeEditor.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  templateSettings: PropTypes.object.isRequired,
  setTemplateSettings: PropTypes.func.isRequired,
  sectionConfig: PropTypes.array.isRequired,
  setSectionConfig: PropTypes.func.isRequired,
  selectedLayout: PropTypes.string.isRequired,
  setSelectedLayout: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default ResumeEditor;
