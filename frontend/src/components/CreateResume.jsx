// CreateResume.js
import { useState, useEffect } from "react";
import TopNav from "./ui/topnav";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import ResumePreview from "./ResumePreview";
import {
  FaRegSave,
  FaRegEye,
  FaChevronRight,
  FaChevronLeft,
  FaLightbulb,
  FaDownload,
  FaCheck,
  FaClock,
  FaMagic,
  FaExclamationTriangle,
  FaBook,
  FaRandom,
  FaTimes,
  FaWindowMaximize,
  FaCopy,
  FaUndo,
  FaClipboardCheck,
  FaFileExport,
  FaLayerGroup,
} from "react-icons/fa";
import { motion } from "framer-motion";

const CreateResume = () => {
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [previewMode, setPreviewMode] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [completionStatus, setCompletionStatus] = useState({
    PersonalInfo: 0,
    Education: 0,
    Experience: 0,
    Skills: 0,
    Languages: 0,
    Achievements: 0,
    Projects: 0,
    Certifications: 0,
  });
  const [totalCompletion, setTotalCompletion] = useState(0);
  const [autosaved, setAutosaved] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSectionGuide, setShowSectionGuide] = useState(false);
  const [themeColor, setThemeColor] = useState("indigo");

  const [formData, setFormData] = useState({
    education: [{ degree: "", institution: "", graduationYear: "" }],
    experience: [
      { jobTitle: "", companyName: "", yearsOfExperience: "", description: "" },
    ],
    skills: { skill: "", skillLevel: "" },
    projects: { title: "", description: "", technologies: "" },
    certifications: {
      certificationName: "",
      issuingOrganization: "",
      dateObtained: "",
      certificationId: "",
    },
  });

  // Section tips to guide users
  const sectionTips = {
    PersonalInfo: [
      "Use a professional email address based on your name",
      "Include a LinkedIn profile URL or professional website",
      "Write a concise professional summary (3-4 sentences)",
      "Consider adding a headline that describes your expertise",
    ],
    Education: [
      "List education in reverse chronological order (most recent first)",
      "Include GPA if it's above 3.5",
      "Highlight relevant coursework or academic achievements",
      "Include study abroad experiences if relevant",
    ],
    Experience: [
      "Use action verbs to start each bullet point",
      "Quantify your achievements with numbers when possible",
      "Focus on results and accomplishments rather than responsibilities",
      "Include 3-5 bullet points per position",
    ],
    Skills: [
      "Group skills by category (technical, soft skills, languages)",
      "List the most relevant skills for your target position first",
      "Include proficiency levels for languages and technical skills",
      "Focus on skills mentioned in job descriptions you're targeting",
    ],
    Projects: [
      "Describe the problem each project solved",
      "Mention technologies and methodologies used",
      "Include measurable outcomes or results if available",
      "Add links to GitHub repositories or live demos if possible",
    ],
    Certifications: [
      "Include the issuing organization and date obtained",
      "List certifications relevant to your target position",
      "Mention if certifications are in progress with expected completion date",
      "Include certification numbers for verification if applicable",
    ],
  };

  // Top navigation component for section selection
  const TopNav = ({ activeSection, onSectionChange }) => {
    const sections = [
      "PersonalInfo",
      "Education",
      "Experience",
      "Skills",
      "Projects",
      "Certifications",
    ];

    return (
      <div className="overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                ${
                  activeSection === section
                    ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-500"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
            >
              {section === "PersonalInfo" ? "Personal Info" : section}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResumeSectionForm = () => {
    switch (activeSection) {
      case "Education":
        return (
          <EducationForm
            items={formData.education || []}
            onItemAdd={(item) => {
              const updatedEducation = [...(formData.education || []), item];
              setFormData({ ...formData, education: updatedEducation });
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedEducation = [...(formData.education || [])];
              updatedEducation[index] = updatedItem;
              setFormData({ ...formData, education: updatedEducation });
            }}
            onItemRemove={(index) => {
              const updatedEducation = formData.education.filter(
                (_, i) => i !== index
              );
              setFormData({ ...formData, education: updatedEducation });
            }}
            onItemReorder={() => {}}
            errors={{}}
          />
        );
      case "Experience":
        return (
          <ExperienceForm
            items={formData.experience || []}
            onItemAdd={(item) => {
              const updatedExperience = [...(formData.experience || []), item];
              setFormData({ ...formData, experience: updatedExperience });
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedExperience = [...(formData.experience || [])];
              updatedExperience[index] = updatedItem;
              setFormData({ ...formData, experience: updatedExperience });
            }}
            onItemRemove={(index) => {
              const updatedExperience = formData.experience.filter(
                (_, i) => i !== index
              );
              setFormData({ ...formData, experience: updatedExperience });
            }}
            onItemReorder={() => {}}
            errors={{}}
          />
        );
      case "Skills":
        return (
          <SkillsForm
            items={formData.skills || []}
            onItemAdd={(item) => {
              const updatedSkills = [...(formData.skills || []), item];
              setFormData({ ...formData, skills: updatedSkills });
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedSkills = [...(formData.skills || [])];
              updatedSkills[index] = updatedItem;
              setFormData({ ...formData, skills: updatedSkills });
            }}
            onItemRemove={(index) => {
              const updatedSkills = formData.skills.filter(
                (_, i) => i !== index
              );
              setFormData({ ...formData, skills: updatedSkills });
            }}
            onItemReorder={() => {}}
            errors={{}}
          />
        );
      case "Projects":
        return (
          <ProjectsForm
            items={
              Array.isArray(formData.projects)
                ? formData.projects
                : [formData.projects]
            }
            onItemAdd={(item) => {
              let updatedProjects;
              if (Array.isArray(formData.projects)) {
                updatedProjects = [...formData.projects, item];
              } else {
                updatedProjects = [formData.projects, item].filter(Boolean);
              }
              setFormData({ ...formData, projects: updatedProjects });
            }}
            onItemUpdate={(index, updatedItem) => {
              let updatedProjects;
              if (Array.isArray(formData.projects)) {
                updatedProjects = [...formData.projects];
                updatedProjects[index] = updatedItem;
              } else {
                updatedProjects = [updatedItem];
              }
              setFormData({ ...formData, projects: updatedProjects });
            }}
            onItemRemove={(index) => {
              const updatedProjects = Array.isArray(formData.projects)
                ? formData.projects.filter((_, i) => i !== index)
                : [];
              setFormData({ ...formData, projects: updatedProjects });
            }}
            onItemReorder={() => {}}
            errors={{}}
          />
        );
      case "Certifications":
        return (
          <CertificationsForm
            items={
              Array.isArray(formData.certifications)
                ? formData.certifications
                : [formData.certifications]
            }
            onItemAdd={(item) => {
              let updatedCertifications;
              if (Array.isArray(formData.certifications)) {
                updatedCertifications = [...formData.certifications, item];
              } else {
                updatedCertifications = [formData.certifications, item].filter(
                  Boolean
                );
              }
              setFormData({
                ...formData,
                certifications: updatedCertifications,
              });
            }}
            onItemUpdate={(index, updatedItem) => {
              let updatedCertifications;
              if (Array.isArray(formData.certifications)) {
                updatedCertifications = [...formData.certifications];
                updatedCertifications[index] = updatedItem;
              } else {
                updatedCertifications = [updatedItem];
              }
              setFormData({
                ...formData,
                certifications: updatedCertifications,
              });
            }}
            onItemRemove={(index) => {
              const updatedCertifications = Array.isArray(
                formData.certifications
              )
                ? formData.certifications.filter((_, i) => i !== index)
                : [];
              setFormData({
                ...formData,
                certifications: updatedCertifications,
              });
            }}
            onItemReorder={() => {}}
            errors={{}}
          />
        );
      default:
        return null;
    }
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Calculate completion percentage based on filled fields
  useEffect(() => {
    // Calculate completion status for each section
    const calculateSectionCompletion = () => {
      const newStatus = { ...completionStatus };

      // Education completion
      if (formData.education && formData.education.length > 0) {
        const eduFields = formData.education.map((edu) => {
          const fields = [edu.institution, edu.degree, edu.graduationYear];
          const filledFields = fields.filter(
            (field) => field && field.trim() !== ""
          ).length;
          return filledFields / fields.length;
        });
        newStatus.Education = Math.round(
          (eduFields.reduce((a, b) => a + b, 0) / eduFields.length) * 100
        );
      }

      // Experience completion
      if (formData.experience && formData.experience.length > 0) {
        const expFields = formData.experience.map((exp) => {
          const fields = [exp.jobTitle, exp.companyName, exp.description];
          const filledFields = fields.filter(
            (field) => field && field.trim() !== ""
          ).length;
          return filledFields / fields.length;
        });
        newStatus.Experience = Math.round(
          (expFields.reduce((a, b) => a + b, 0) / expFields.length) * 100
        );
      }

      // Skills completion (simplified)
      if (formData.skills) {
        newStatus.Skills = formData.skills.length > 0 ? 100 : 0;
      }

      // Projects completion
      if (Array.isArray(formData.projects) && formData.projects.length > 0) {
        const projectFields = formData.projects.map((project) => {
          const fields = [project.title, project.description];
          const filledFields = fields.filter(
            (field) => field && field.trim() !== ""
          ).length;
          return filledFields / fields.length;
        });
        newStatus.Projects = Math.round(
          (projectFields.reduce((a, b) => a + b, 0) / projectFields.length) *
            100
        );
      }

      // Calculate total completion (average of all sections)
      const sections = Object.values(newStatus).filter((val) => val !== null);
      const totalComp = Math.round(
        sections.reduce((a, b) => a + b, 0) / sections.length
      );

      setCompletionStatus(newStatus);
      setTotalCompletion(totalComp);
    };

    calculateSectionCompletion();
  }, [formData]);

  // Handle autosave
  useEffect(() => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    const timer = setTimeout(() => {
      // Save form data to localStorage
      localStorage.setItem("resumeFormData", JSON.stringify(formData));
      setAutosaved(true);

      // Reset autosave notification after 3 seconds
      setTimeout(() => setAutosaved(false), 3000);
    }, 2000);

    setSaveTimeout(timer);

    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, [formData]);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeFormData");
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error loading saved resume data", e);
      }
    }
  }, []);

  // Mobile-friendly progress bar component
  const ProgressBar = ({ progress }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${progress}%`,
            backgroundColor: "var(--theme-color, #4f46e5)",
          }}
        ></div>
      </div>
    );
  };

  // Calculate progress percentage based on filled sections
  const calculateProgress = () => {
    const totalSections = 6; // Total number of main sections
    const filledSections = Object.keys(formData).filter(
      (section) =>
        section !== "theme" &&
        formData[section] &&
        Object.keys(formData[section]).length > 0
    ).length;

    return Math.round((filledSections / totalSections) * 100);
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 ${
        themeColor === "purple"
          ? "theme-purple"
          : themeColor === "blue"
          ? "theme-blue"
          : "theme-indigo"
      }`}
    >
      {/* Header with progress */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-extrabold gradient-text">
                Create Your Resume
              </h1>

              {/* Theme selector - small dots for choosing theme color */}
              <div className="hidden md:flex ml-6 space-x-2">
                <button
                  onClick={() => handleChangeTheme("indigo")}
                  className={`w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 ${
                    themeColor === "indigo"
                      ? "ring-2 ring-offset-2 ring-indigo-500"
                      : ""
                  }`}
                  aria-label="Indigo theme"
                />
                <button
                  onClick={() => handleChangeTheme("purple")}
                  className={`w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 ${
                    themeColor === "purple"
                      ? "ring-2 ring-offset-2 ring-purple-500"
                      : ""
                  }`}
                  aria-label="Purple theme"
                />
                <button
                  onClick={() => handleChangeTheme("blue")}
                  className={`w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 ${
                    themeColor === "blue"
                      ? "ring-2 ring-offset-2 ring-blue-500"
                      : ""
                  }`}
                  aria-label="Blue theme"
                />
              </div>
            </div>

            {/* Progress indicator */}
            <div className="hidden md:flex items-center">
              <div className="w-40 bg-gray-200 rounded-full h-2.5 mr-2">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                  style={{ width: `${totalCompletion}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500">
                {totalCompletion}% complete
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-3">
              {autosaved && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-600 font-medium flex items-center"
                >
                  <FaCheck className="mr-1" /> Autosaved
                </motion.div>
              )}

              <button
                onClick={handleSaveResume}
                className="btn btn-secondary btn-sm flex items-center"
              >
                <FaRegSave className="mr-1.5" />
                <span>Save</span>
              </button>

              <button
                id="download-btn"
                onClick={handleDownloadPDF}
                className="btn btn-primary btn-sm flex items-center"
              >
                <FaDownload className="mr-1.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar for mobile */}
        <div className="md:hidden w-full bg-gray-200 h-1">
          <div
            className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600"
            style={{ width: `${totalCompletion}%` }}
          ></div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Section navigation */}
        <div className="card bg-white p-4 mb-6 sticky top-16 z-10">
          <TopNav
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        <div
          className={`grid ${
            previewMode ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-5"
          } gap-6`}
        >
          {/* Sidebar with section completion status */}
          {!previewMode && (
            <div className="lg:col-span-1 hidden lg:block">
              <div className="card bg-white p-5 sticky top-36">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Progress Tracker
                </h3>
                <ul className="space-y-3">
                  {Object.entries(completionStatus).map(
                    ([section, percentage]) => (
                      <li key={section} className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className={`text-sm ${
                              activeSection === section
                                ? "font-medium text-indigo-600"
                                : "text-gray-600"
                            } cursor-pointer hover:text-indigo-600`}
                            onClick={() => setActiveSection(section)}
                          >
                            {section.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="text-xs font-medium text-gray-500">
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              percentage === 100
                                ? "bg-green-500"
                                : percentage > 66
                                ? "bg-indigo-500"
                                : percentage > 33
                                ? "bg-yellow-500"
                                : "bg-gray-300"
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </li>
                    )
                  )}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Quick Tips
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <FaCheck className="text-green-500 mt-0.5 mr-1.5 shrink-0" />
                      <span>Fill out all sections for best results</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="text-green-500 mt-0.5 mr-1.5 shrink-0" />
                      <span>
                        Focus on achievements rather than responsibilities
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="text-green-500 mt-0.5 mr-1.5 shrink-0" />
                      <span>
                        Use action verbs to make your resume stand out
                      </span>
                    </li>
                  </ul>

                  <button
                    onClick={() => setShowSectionGuide(!showSectionGuide)}
                    className="w-full btn btn-secondary btn-sm mt-4 flex items-center justify-center"
                  >
                    <FaBook className="mr-1.5" />
                    <span>Resume Guide</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Editor Section */}
          <div
            className={`${
              previewMode ? "col-span-1" : "lg:col-span-4"
            } animate-fade-in`}
          >
            <div className="card bg-white p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {activeSection.replace(/([A-Z])/g, " $1").trim()}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {activeSection === "Education"
                      ? "Add your educational background and qualifications"
                      : activeSection === "Experience"
                      ? "List your work experience and achievements"
                      : activeSection === "Skills"
                      ? "Showcase your professional skills and competencies"
                      : activeSection === "Projects"
                      ? "Highlight projects that demonstrate your capabilities"
                      : activeSection === "Certifications"
                      ? "Add professional certifications and credentials"
                      : "Complete this section to enhance your resume"}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowTips(!showTips)}
                    className="btn btn-secondary btn-sm flex items-center"
                  >
                    <FaLightbulb
                      className={
                        showTips
                          ? "text-yellow-500 mr-1.5"
                          : "text-gray-400 mr-1.5"
                      }
                    />
                    <span>{showTips ? "Hide Tips" : "Show Tips"}</span>
                  </button>

                  <button
                    onClick={togglePreviewMode}
                    className="btn btn-primary btn-sm flex items-center"
                  >
                    <FaRegEye className="mr-1.5" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {/* Section navigation buttons (only visible on mobile/tablet) */}
              <div className="flex justify-between mb-6 lg:hidden">
                <button
                  onClick={goToPrevSection}
                  className="btn btn-secondary btn-sm"
                  disabled={activeSection === "PersonalInfo"}
                >
                  <FaChevronLeft className="mr-1" /> Previous
                </button>
                <button
                  onClick={goToNextSection}
                  className="btn btn-secondary btn-sm"
                  disabled={activeSection === "Certifications"}
                >
                  Next <FaChevronRight className="ml-1" />
                </button>
              </div>

              {/* Tips section */}
              {showTips && sectionTips[activeSection] && (
                <div className="bg-indigo-50 p-4 rounded-xl mb-6 border-l-4 border-indigo-500">
                  <h3 className="text-sm font-semibold text-indigo-700 mb-2 flex items-center">
                    <FaLightbulb className="mr-2 text-indigo-500" />
                    Expert Tips for{" "}
                    {activeSection.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <ul className="text-xs text-indigo-800 space-y-2 list-disc list-inside">
                    {sectionTips[activeSection].map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-indigo-500 mt-0.5 mr-1.5 shrink-0 -ml-1" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>

                  {/* AI suggestion button */}
                  <button className="mt-3 text-xs font-medium text-indigo-700 flex items-center hover:text-indigo-800">
                    <FaMagic className="mr-1.5" />
                    <span>Get AI suggestions for this section</span>
                  </button>
                </div>
              )}

              {/* Actual form section */}
              <div className="bg-white rounded-xl">
                {renderResumeSectionForm()}
              </div>

              {/* Next/Previous buttons for section navigation - desktop version */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={goToPrevSection}
                  className={`btn btn-secondary ${
                    activeSection === "PersonalInfo"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={activeSection === "PersonalInfo"}
                >
                  <FaChevronLeft className="mr-2" /> Previous Section
                </button>
                <button
                  onClick={goToNextSection}
                  className={`btn btn-primary ${
                    activeSection === "Certifications"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={activeSection === "Certifications"}
                >
                  Next Section <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section - Shown as modal in full screen when preview mode is on */}
        {previewMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center overflow-y-auto"
          >
            <div className="m-4 sm:m-6 md:m-10 w-full max-w-6xl max-h-full flex flex-col">
              <div className="bg-white rounded-t-xl p-4 flex justify-between items-center shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800">
                  Resume Preview
                </h2>
                <div className="flex space-x-3">
                  <button className="btn btn-secondary btn-sm flex items-center space-x-2">
                    <FaCopy className="mr-1" />
                    <span>Copy Text</span>
                  </button>
                  <button
                    id="preview-download-btn"
                    onClick={handleDownloadPDF}
                    className="btn btn-primary btn-sm flex items-center space-x-2"
                  >
                    <FaFileExport className="mr-1" />
                    <span>Export PDF</span>
                  </button>
                  <button
                    onClick={togglePreviewMode}
                    className="btn btn-danger btn-sm flex items-center space-x-2"
                  >
                    <FaTimes className="mr-1" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 flex-1 overflow-y-auto p-8 rounded-b-xl">
                <div className="bg-white shadow-xl mx-auto rounded-lg overflow-hidden max-w-4xl">
                  <ResumePreview formData={formData} />
                          </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile floating action button for preview */}
      {!previewMode && (
        <div className="fixed bottom-6 right-6 md:hidden">
          <button
            onClick={togglePreviewMode}
            className="btn btn-primary rounded-full shadow-lg p-4 flex items-center space-x-2"
          >
            <FaRegEye />
            <span>Preview</span>
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Section guide modal */}
      {showSectionGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Resume Section Guide
                </h2>
                <button
                  onClick={() => setShowSectionGuide(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Personal Information
                </h3>
                <p className="text-sm text-gray-600">
                  Include your name, contact information, and professional
                  summary. Make sure your email and phone number are up to date.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Education</h3>
                <p className="text-sm text-gray-600">
                  List your educational background in reverse chronological
                  order. Include degree, institution name, location, and
                  graduation date.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Experience
                </h3>
                <p className="text-sm text-gray-600">
                  Detail your work history, focusing on achievements rather than
                  day-to-day responsibilities. Use action verbs and quantify
                  results whenever possible.
                </p>
              </div>

              {/* More sections would go here */}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowSectionGuide(false)}
                className="btn btn-primary"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Autosave indicator */}
      <div
        className={`fixed bottom-4 left-4 transition-opacity duration-300 ${
          autosaved ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-lg shadow-md flex items-center">
          <FaCheck className="mr-2" />
          <span className="text-sm font-medium">
            Changes saved automatically
          </span>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800">
            {getNavigationTitle(activeSection)}
          </h2>
          <span className="text-sm text-gray-600">
            {calculateProgress()}% complete
          </span>
        </div>
        <ProgressBar progress={calculateProgress()} />
        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              handleSectionChange(getPreviousSection(activeSection))
            }
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700"
            disabled={activeSection === "personalInfo"}
          >
            Previous
          </button>
          <button
            onClick={() => handleSectionChange(getNextSection(activeSection))}
            className="px-4 py-2 bg-indigo-600 rounded-md text-white"
            disabled={activeSection === "theme"}
          >
            {activeSection === "theme" ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper functions for navigation
function getNavigationTitle(section) {
  const titles = {
    personalInfo: "Personal Information",
    education: "Education",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    theme: "Theme & Styling",
  };
  return titles[section] || "Resume Builder";
}

function getNextSection(currentSection) {
  const sections = [
    "personalInfo",
    "education",
    "experience",
    "skills",
    "projects",
    "certifications",
    "theme",
  ];
  const currentIndex = sections.indexOf(currentSection);
  return currentIndex < sections.length - 1
    ? sections[currentIndex + 1]
    : currentSection;
}

function getPreviousSection(currentSection) {
  const sections = [
    "personalInfo",
    "education",
    "experience",
    "skills",
    "projects",
    "certifications",
    "theme",
  ];
  const currentIndex = sections.indexOf(currentSection);
  return currentIndex > 0 ? sections[currentIndex - 1] : currentSection;
}

export default CreateResume;
