
import { useState } from "react"; 
import Sidebar from "../components/ui/sidebar";
import TopNav from "../components/ui/topnav";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import CertificationsForm from "../components/forms/CertificationsForm";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";

import ResumePreviewLayout1 from "../components/ResumePreviewLayout1";
import ResumePreviewLayout2 from "../components/ResumePreviewLayout2";
import ResumeTemplates from "../components/ResumeTemplates";


const Page = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [activeSection, setActiveSection] = useState("Education");
  const [selectedLayout, setSelectedLayout] = useState("Layout2");

  const [formData, setFormData] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
    },
    education: [{ degree: "", institution: "", graduationYear: "" }],
    experience: [
      {
        jobTitle: "",
        companyName: "",
        yearsOfExperience: "",
        description: "",
      },
    ],
    skills: [{ skill: "", skillLevel: "" }],
    projects: [{ title: "", description: "", technologies: "" }],
    certifications: [
      {
        certificationName: "",
        issuingOrganization: "",
        dateObtained: "",
        certificationId: "",
      },
    ],
  });

  const handleMenuClick = (item) => {
    setSelectedItem(item);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

const handleFormChange = (section, field, value, index = null) => {
  if (section === "personal") {
      setFormData({
        ...formData,
        personal: { ...formData.personal, [field]: value },
      });
    }
  else if (section === "education" && index !== null) {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setFormData({ ...formData, education: updatedEducation });
  } else if (section === "experience" && index !== null) {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    setFormData({ ...formData, experience: updatedExperience });
  } else if (section === "skills" && index !== null) {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setFormData({ ...formData, skills: updatedSkills });
  } else if (section === "projects" && index !== null) {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setFormData({ ...formData, projects: updatedProjects });
  } else if (section === "certifications" && index !== null) {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    setFormData({ ...formData, certifications: updatedCertifications });
  } else {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value },
    });
  }
};



  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", institution: "", graduationYear: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          jobTitle: "",
          companyName: "",
          yearsOfExperience: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

const addSkill = () => {
  setFormData({
    ...formData,
    skills: [...formData.skills, { skill: "", skillLevel: "" }],
  });
};

const removeSkill = (index) => {
  const updatedSkills = formData.skills.filter((_, i) => i !== index);
  setFormData({ ...formData, skills: updatedSkills });
};

const addProject = () => {
  setFormData({
    ...formData,
    projects: [
      ...formData.projects,
      { title: "", description: "", technologies: "" },
    ],
  });
};

const removeProject = (index) => {
  const updatedProjects = formData.projects.filter((_, i) => i !== index);
  setFormData({ ...formData, projects: updatedProjects });
};

const addCertification = () => {
  setFormData({
    ...formData,
    certifications: [
      ...formData.certifications,
      {
        certificationName: "",
        issuingOrganization: "",
        dateObtained: "",
        certificationId: "",
      },
    ],
  });
};

const removeCertification = (index) => {
  const updatedCertifications = formData.certifications.filter(
    (_, i) => i !== index
  );
  setFormData({ ...formData, certifications: updatedCertifications });
};

  const handleLayoutSelect = (layout) => {
    setSelectedLayout(layout);
    setSelectedItem("Create Resume"); // Redirect to "Create Resume" page
  };


  const renderContent = () => {
    switch (selectedItem) {
      case "Home":
        return <div>Welcome to the Home Page</div>;
      case "Create Resume":
        return (
          <div>
            <TopNav
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            <div className="flex mt-4 h-[90vh]">
              <div className="w-1/2 pr-6 overflow-y-auto h-full">
                {renderResumeSectionForm(activeSection)}
              </div>
              <div className="w-1/2 pl-6 border-l border-gray-300 overflow-y-auto h-full">
                {renderResumePreview()}
              </div>
            </div>
          </div>
        );
      case "Resume Templates":
        return (
          <ResumeTemplates
            onSelectTemplate={handleLayoutSelect}
            formData={formData}
          />
        );

      case "My Resumes":
        return <div>View your saved resumes</div>;
      case "Settings":
        return <div>Adjust your settings</div>;
      default:
        return <div>Home Page</div>;
    }
  };

  const renderResumeSectionForm = (section) => {
    switch (section) {
      case "PersonalInfo":
        return (
          <PersonalInfoForm
            formData={formData.personal}
            onFormChange={(field, value) =>
              handleFormChange("personal", field, value)
            }
          />
        );
      case "Education":
        return (
          <EducationForm
            formData={formData.education}
            onFormChange={handleFormChange}
            addEducation={addEducation}
            removeEducation={removeEducation}
          />
        );
      case "Experience":
        return (
          <ExperienceForm
            formData={formData.experience}
            onFormChange={handleFormChange}
            addExperience={addExperience}
            removeExperience={removeExperience}
          />
        );
      case "Skills":
        return (
          <SkillsForm
            formData={formData.skills}
            onFormChange={handleFormChange}
            addSkill={addSkill}
            removeSkill={removeSkill}
          />
        );
      case "Projects":
        return (
          <ProjectsForm
            formData={formData.projects}
            onFormChange={handleFormChange}
            addProject={addProject}
            removeProject={removeProject}
          />
        );
      case "Certifications":
        return (
          <CertificationsForm
            formData={formData.certifications}
            onFormChange={handleFormChange}
            addCertification={addCertification}
            removeCertification={removeCertification}
          />
        );
      default:
        return null;
    }
  };

  const renderResumePreview = () => {
  
    switch (selectedLayout) {
      case "Layout1":
        return (
          <ResumePreviewLayout1  formData={formData} />
        );
      case "Layout2":
        return (
          <ResumePreviewLayout2  formData={formData} />
        );
      default:
        return (
          <ResumePreviewLayout1  formData={formData} />
        );
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar onMenuClick={handleMenuClick} />
      <main className="flex-grow p-6">{renderContent()}</main>
    </div>
  );
};

export default Page;