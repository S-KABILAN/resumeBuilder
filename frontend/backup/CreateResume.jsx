// CreateResume.js
import { useState } from "react";
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
} from "react-icons/fa";

const CreateResume = () => {
  const [activeSection, setActiveSection] = useState("Education");
  const [previewMode, setPreviewMode] = useState(false);
  const [showTips, setShowTips] = useState(true);
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

  // Resume section tips
  const sectionTips = {
    Education: [
      "List your most recent education first",
      "Include relevant coursework and academic achievements",
      "Only include GPA if it's 3.5 or higher",
    ],
    Experience: [
      "Use action verbs to begin each bullet point",
      "Quantify your achievements with numbers when possible",
      "Focus on accomplishments rather than responsibilities",
    ],
    Skills: [
      "Include both technical and soft skills",
      "Group similar skills together",
      "Tailor skills to match the job description",
    ],
    Projects: [
      "Highlight projects that demonstrate relevant skills",
      "Include links to live projects or repositories",
      "Describe your role and the problem you solved",
    ],
    Certifications: [
      "Include date obtained and expiration if applicable",
      "List certifications most relevant to your target position",
      "Include certification ID if available",
    ],
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

  return (
    <div className="bg-slate-50 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Create Your Resume
        </h1>
        <p className="text-gray-600">
          Fill in your details below to create a professional resume
        </p>
      </div>

      <div className="card bg-white p-6 mb-6">
        <TopNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      <div className={`flex ${previewMode ? "flex-col" : "md:flex-row"} gap-6`}>
        {/* Editor Section */}
        <div className={`${previewMode ? "hidden" : "flex-1"} animate-fade-in`}>
          <div className="card bg-white p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeSection} Details
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTips(!showTips)}
                  className="btn btn-secondary flex items-center space-x-2 text-xs"
                >
                  <FaLightbulb
                    className={showTips ? "text-yellow-500" : "text-gray-400"}
                  />
                  <span>{showTips ? "Hide Tips" : "Show Tips"}</span>
                </button>
                <button
                  onClick={togglePreviewMode}
                  className="btn btn-primary flex items-center space-x-2 text-xs"
                >
                  <FaRegEye />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {showTips && sectionTips[activeSection] && (
              <div className="bg-indigo-50 p-4 rounded-lg mb-6 border-l-4 border-indigo-500">
                <h3 className="text-sm font-semibold text-indigo-700 mb-2 flex items-center">
                  <FaLightbulb className="mr-2 text-indigo-500" />
                  Tips for {activeSection}
                </h3>
                <ul className="text-xs text-indigo-800 space-y-1 list-disc list-inside">
                  {sectionTips[activeSection].map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>{renderResumeSectionForm()}</div>
          </div>
        </div>

        {/* Preview Section */}
        <div
          className={`${
            previewMode ? "w-full" : "hidden md:block md:w-5/12 lg:w-1/2"
          } animate-fade-in`}
        >
          <div className="card bg-white p-6 mb-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Resume Preview
              </h2>
              <div className="flex space-x-3">
                {previewMode && (
                  <button
                    onClick={togglePreviewMode}
                    className="btn btn-secondary flex items-center space-x-2 text-xs"
                  >
                    <FaChevronLeft />
                    <span>Back to Edit</span>
                  </button>
                )}
                <button className="btn btn-secondary flex items-center space-x-2 text-xs">
                  <FaRegSave />
                  <span>Save</span>
                </button>
                <button className="btn btn-primary flex items-center space-x-2 text-xs">
                  <FaDownload />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-inner overflow-hidden">
              <ResumePreview formData={formData} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Toggle */}
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
    </div>
  );
};

export default CreateResume;
