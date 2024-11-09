// CreateResume.js
import { useState } from "react";
import TopNav from "./ui/topnav";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import ResumePreview from "./ResumePreview";

const CreateResume = () => {
  const [activeSection, setActiveSection] = useState("Education");
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

  const handleFormChange = (section, field, value, index = null) => {
    if (section === "education" && index !== null) {
      const updatedEducation = [...formData.education];
      updatedEducation[index] = { ...updatedEducation[index], [field]: value };
      setFormData({ ...formData, education: updatedEducation });
    } else {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    }
  };

  const renderResumeSectionForm = () => {
    switch (activeSection) {
      case "Education":
        return (
          <EducationForm
            formData={formData.education}
            onFormChange={handleFormChange}
          />
        );
      case "Experience":
        return (
          <ExperienceForm
            formData={formData.experience}
            onFormChange={(field, value) =>
              handleFormChange("experience", field, value)
            }
          />
        );
      case "Skills":
        return (
          <SkillsForm
            formData={formData.skills}
            onFormChange={(field, value) =>
              handleFormChange("skills", field, value)
            }
          />
        );
      case "Projects":
        return (
          <ProjectsForm
            formData={formData.projects}
            onFormChange={(field, value) =>
              handleFormChange("projects", field, value)
            }
          />
        );
      case "Certifications":
        return (
          <CertificationsForm
            formData={formData.certifications}
            onFormChange={(field, value) =>
              handleFormChange("certifications", field, value)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <TopNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex mt-6">
        <div className="w-1/2 pr-6">{renderResumeSectionForm()}</div>
        <div className="w-1/2 pl-6 border-l border-gray-300">
          <ResumePreview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
