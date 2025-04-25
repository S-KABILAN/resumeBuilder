// CreateResume.js
import { useState } from "react";
import TopNav from "./ui/topnav";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import LanguagesForm from "./forms/LanguagesForm";

const CreateResume = () => {
  const [activeSection, setActiveSection] = useState("PersonalInfo");

  const [formData, setFormData] = useState({
    personal: { name: "", email: "", phone: "", location: "" },
    education: [{ degree: "", institution: "", graduationYear: "" }],
    experience: [
      {
        position: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    skills: [{ name: "", level: "" }],
    projects: [{ title: "", description: "", technologies: "" }],
    certifications: [
      {
        certificationName: "",
        issuingOrganization: "",
        dateObtained: "",
        certificationId: "",
      },
    ],
    languages: [],
  });

  // Save resume data
  const saveResume = () => {
    console.log("Saving resume data...", formData);
    // Actual save implementation would go here
  };

  const renderResumeSectionForm = () => {
    switch (activeSection) {
      case "Education":
        return (
          <EducationForm
            formData={formData}
            onFormChange={(field, value) =>
              setFormData({ ...formData, [field]: value })
            }
            onSubmit={saveResume}
            errors={{}}
          />
        );
      case "Experience":
        return (
          <ExperienceForm
            formData={formData}
            onFormChange={(field, value) =>
              setFormData({ ...formData, [field]: value })
            }
            onSubmit={saveResume}
            errors={{}}
          />
        );
      case "Skills":
        return (
          <SkillsForm
            formData={formData}
            onFormChange={(field, value) =>
              setFormData({ ...formData, [field]: value })
            }
            onSubmit={saveResume}
            errors={{}}
          />
        );
      case "Languages":
        return (
          <LanguagesForm
            formData={formData}
            onFormChange={(field, value) =>
              setFormData({ ...formData, [field]: value })
            }
            onSubmit={saveResume}
            errors={{}}
          />
        );
      case "Projects":
        return (
          <ProjectsForm
            formData={formData}
            onFormChange={(field, value) =>
              setFormData({ ...formData, [field]: value })
            }
            onSubmit={saveResume}
            errors={{}}
          />
        );
      case "Certifications":
        return (
          <CertificationsForm
            formData={formData}
            onFormChange={(field, value) =>
              setFormData({ ...formData, [field]: value })
            }
            onSubmit={saveResume}
            errors={{}}
          />
        );
      default:
        return <div className="p-4">Select a section to edit</div>;
    }
  };

  // Main render function
  return (
    <div className="flex flex-col h-full">
      <div className="py-4">
        <TopNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      <div className="flex-grow p-4">{renderResumeSectionForm()}</div>
    </div>
  );
};

export default CreateResume;
